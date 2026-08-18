"""
Data layer for the platform's own persisted data (newsletter signups, contact leads).

Set the MONGODB_URI environment variable to point at a real MongoDB instance
(a local `mongod`/Docker container, or a free MongoDB Atlas cluster) and this
module talks to it via PyMongo — that's the path for a real deployment.

With no MONGODB_URI set, it falls back to TinyDB, a zero-setup embedded NoSQL
document store that writes to a local JSON file. That keeps local development
and demos working without installing or running a database server, using the
same collection-shaped documents either way.
"""

import os
from datetime import datetime, timezone
from pathlib import Path

MONGODB_URI = os.getenv("MONGODB_URI", "").strip()

if MONGODB_URI:
    from pymongo import MongoClient
    from pymongo.errors import DuplicateKeyError

    _client = MongoClient(MONGODB_URI)
    _db = _client.get_default_database()
    if _db is None:
        _db = _client["million_minds"]

    _newsletter = _db["newsletter_subscribers"]
    _contacts = _db["contact_messages"]
    _users = _db["users"]
    _login_events = _db["login_events"]
    _newsletter.create_index("email", unique=True)
    _users.create_index("email", unique=True)

    def insert_subscriber(doc: dict) -> bool:
        try:
            _newsletter.insert_one(doc)
            return True
        except DuplicateKeyError:
            return False

    def list_subscribers() -> list[dict]:
        return list(_newsletter.find({}, {"_id": 0}).sort("created_at", -1))

    def insert_contact_message(doc: dict) -> None:
        _contacts.insert_one(doc)

    def list_contact_messages() -> list[dict]:
        return list(_contacts.find({}, {"_id": 0}).sort("created_at", -1))

    def create_user(doc: dict) -> bool:
        try:
            _users.insert_one(doc)
            return True
        except DuplicateKeyError:
            return False

    def find_user_by_email(email: str) -> dict | None:
        return _users.find_one({"email": email}, {"_id": 0})

    def record_login(email: str) -> None:
        _login_events.insert_one({"email": email, "logged_in_at": now_iso()})

    def count_users() -> int:
        return _users.count_documents({})

    def count_logins() -> int:
        return _login_events.count_documents({})

    def list_users() -> list[dict]:
        return list(_users.find({}, {"_id": 0, "password_hash": 0}).sort("created_at", -1))

    def list_login_events() -> list[dict]:
        return list(_login_events.find({}, {"_id": 0}).sort("logged_in_at", -1))

    BACKEND_NAME = "mongodb"

else:
    from tinydb import Query, TinyDB

    _data_dir = Path(__file__).parent / "data"
    _data_dir.mkdir(exist_ok=True)
    _tdb = TinyDB(_data_dir / "db.json")
    _newsletter = _tdb.table("newsletter_subscribers")
    _contacts = _tdb.table("contact_messages")
    _users = _tdb.table("users")
    _login_events = _tdb.table("login_events")

    def insert_subscriber(doc: dict) -> bool:
        existing = Query()
        if _newsletter.contains(existing.email == doc["email"]):
            return False
        _newsletter.insert(doc)
        return True

    def list_subscribers() -> list[dict]:
        return sorted(_newsletter.all(), key=lambda d: d["created_at"], reverse=True)

    def insert_contact_message(doc: dict) -> None:
        _contacts.insert(doc)

    def list_contact_messages() -> list[dict]:
        return sorted(_contacts.all(), key=lambda d: d["created_at"], reverse=True)

    def create_user(doc: dict) -> bool:
        existing = Query()
        if _users.contains(existing.email == doc["email"]):
            return False
        _users.insert(doc)
        return True

    def find_user_by_email(email: str) -> dict | None:
        existing = Query()
        return _users.get(existing.email == email)

    def record_login(email: str) -> None:
        _login_events.insert({"email": email, "logged_in_at": now_iso()})

    def count_users() -> int:
        return len(_users)

    def count_logins() -> int:
        return len(_login_events)

    def list_users() -> list[dict]:
        users = sorted(_users.all(), key=lambda d: d["created_at"], reverse=True)
        return [{k: v for k, v in u.items() if k != "password_hash"} for u in users]

    def list_login_events() -> list[dict]:
        return sorted(_login_events.all(), key=lambda d: d["logged_in_at"], reverse=True)

    BACKEND_NAME = "tinydb (local file — set MONGODB_URI to use real MongoDB)"


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()
