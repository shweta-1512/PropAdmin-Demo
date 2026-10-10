from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parent.parent
ENV_FILE = BACKEND_DIR / ".env"


class Settings(BaseSettings):
    database_url: str = "mysql+pymysql://root:password@127.0.0.1:3306/propadmin_demo"
    secret_key: str = "development-only-change-this-secret"
    access_token_expire_minutes: int = 60
    frontend_origin: str = "http://localhost:5174"

    model_config = SettingsConfigDict(env_file=str(ENV_FILE), extra="ignore")


settings = Settings()
