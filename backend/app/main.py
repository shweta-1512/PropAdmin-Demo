from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from .auth import router as auth_router
from .config import settings
from .database import Base, SessionLocal, engine
from .models import User
from .security import hash_password

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Creates tables from SQLAlchemy models. database/schema.sql creates the database itself.
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        if db.query(User).count() == 0:
            demo_users = [
                ("Demo Admin", "admin@propadmin.local", "admin"),
                ("Demo Manager", "manager@propadmin.local", "manager"),
                ("Demo Back-End", "backend@propadmin.local", "backend"),
                ("Demo Client / Committee", "client@propadmin.local", "client"),
            ]
            for name, email, role in demo_users:
                db.add(User(full_name=name, email=email, password_hash=hash_password("Demo@123"), role=role))
            db.commit()
    yield

app = FastAPI(title="PropAdmin Demo API", version="0.1.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://10.61.9.218:5173",
        "http://10.61.9.218:5174",
        "http://10.61.9.218:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)

@app.get("/")
def root():
    return {"name": "PropAdmin Demo API", "status": "running"}

@app.get("/api/health")
def health():
    return {"status": "ok"}
