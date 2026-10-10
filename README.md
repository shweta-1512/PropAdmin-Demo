# PropAdmin Demo — React + FastAPI + MySQL

This is a small **development demo** with a login module and role-based dashboard shell.

## Included
- React + Vite frontend
- FastAPI backend
- MySQL database schema and SQLAlchemy connection
- JWT login endpoint
- Password hashing
- Demo users seeded on first backend startup
- Protected `/api/auth/me` endpoint
- Role-aware dashboard landing page (demo shell only)

## Demo accounts
All demo accounts use password: `Demo@123`

- `admin@propadmin.local` — Admin
- `manager@propadmin.local` — Manager
- `backend@propadmin.local` — Back-End
- `client@propadmin.local` — Client / Committee

**Do not use these credentials or default secret in production.**

## Requirements
- Python 3.11+
- Node.js 20+
- MySQL 8+

## 1. Create the database
Open MySQL and run `database/schema.sql`.

## 2. Configure and run backend
Open a terminal in `backend`:

Windows PowerShell:
```powershell
py -m venv .venv
.\\.venv\\Scripts\\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Edit `.env` and set your MySQL username/password and a long random `SECRET_KEY`.

Then run:
```powershell
uvicorn app.main:app --reload
```

Backend API: http://127.0.0.1:8000  
Swagger docs: http://127.0.0.1:8000/docs

## 3. Run frontend
Open a second terminal in `frontend`:
```powershell
npm install
npm run dev
```
Open the URL Vite prints, usually http://localhost:5173.

## Notes
- The backend seeds demo accounts when the app starts and the `users` table is empty.
- JWT is stored in `sessionStorage` for this demo. For production, review secure cookie/token handling, HTTPS, rate limiting, audit logging, password reset, account lockout, and secrets management.
- The current role dashboard is a starter shell, not the full PropAdmin modules or final permission matrix.
- Scope restrictions for Back-End users (only assigned projects) must be enforced server-side when project APIs are added; hiding UI elements alone is not security.
