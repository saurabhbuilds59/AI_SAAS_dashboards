# Backend Debug/Repair TODO

## Step 1: Plan-approved fixes
- [x] Add `POST /api/v1/users/logout/` endpoint using SimpleJWT refresh-token blacklisting.

- [x] Harden CORS in `core/settings.py` for production (use `CORS_ALLOWED_ORIGINS`).
- [x] Configure drf-spectacular Swagger to expose JWT Bearer auth (“Authorize” button).
- [x] Standardize `change-password` error handling (`raise_exception=True`).


## Step 2: Verification
- [ ] Run `python manage.py check`.
- [ ] Run `python manage.py makemigrations`.
- [ ] Run `python manage.py migrate`.
- [ ] Start server and ensure no runtime tracebacks.
- [ ] Test required endpoints via Swagger and ensure correct status codes.
- [ ] Ensure no 404/400/500 caused by backend logic.

