"""
Password hashing and signed session tokens — no external auth service needed.

Passwords: salted PBKDF2-SHA256 (stdlib `hashlib`, 200k iterations).
Sessions: a stateless signed token (email + expiry, HMAC-SHA256 signed with
SECRET_KEY) — no session table to manage, verifiable without a DB round trip.

Set a real SECRET_KEY env var before deploying; the default here is only for
local development.
"""

import base64
import hashlib
import hmac
import json
import os
import secrets
import time

SECRET_KEY = os.getenv("SECRET_KEY", "dev-insecure-secret-change-me-before-deploying")
TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7  # 7 days
PBKDF2_ITERATIONS = 200_000


def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), bytes.fromhex(salt), PBKDF2_ITERATIONS)
    return f"{salt}${digest.hex()}"


def verify_password(password: str, stored_hash: str) -> bool:
    try:
        salt, digest_hex = stored_hash.split("$", 1)
    except ValueError:
        return False
    candidate = hashlib.pbkdf2_hmac("sha256", password.encode(), bytes.fromhex(salt), PBKDF2_ITERATIONS)
    return hmac.compare_digest(candidate.hex(), digest_hex)


def _sign(payload_b64: bytes) -> str:
    return hmac.new(SECRET_KEY.encode(), payload_b64, hashlib.sha256).hexdigest()


def create_token(email: str) -> str:
    payload = {"email": email, "exp": int(time.time()) + TOKEN_TTL_SECONDS}
    payload_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode()
    return f"{payload_b64}.{_sign(payload_b64.encode())}"


def verify_token(token: str) -> str | None:
    """Returns the email embedded in a valid, unexpired token, else None."""
    try:
        payload_b64, sig = token.split(".", 1)
    except ValueError:
        return None
    if not hmac.compare_digest(_sign(payload_b64.encode()), sig):
        return None
    try:
        payload = json.loads(base64.urlsafe_b64decode(payload_b64.encode()))
    except Exception:
        return None
    if payload.get("exp", 0) < time.time():
        return None
    return payload.get("email")
