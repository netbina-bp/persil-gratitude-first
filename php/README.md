# PHP API

Simple REST endpoint that accepts POST data and stores it in MySQL.

## Setup

**Database config** is read from environment variables (or a `.env` file in this folder).

- **Local/dev:** Copy `.env.example` to `.env` and set `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`. Use `127.0.0.1` and port `3306` if MySQL runs in Docker on the host.
- **Production:** The deploy workflow writes `php/.env` from GitHub Actions secrets (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) so you never commit credentials.

1. For dev: `cp .env.example .env` and fill in your MySQL credentials.
2. Ensure MySQL is running and the user can create databases.

## Request

- **Method:** POST  
- **Content-Type:** `application/x-www-form-urlencoded`, `multipart/form-data`, or `application/json`

**Parameters:**

| Parameter      | Type   | Required | Description        |
|----------------|--------|----------|--------------------|
| `name`         | string | yes      | Name               |
| `phone_number` | string | yes      | Phone number       |
| `code`         | string | yes      | Code (max 50 chars)|

**JSON example:**

```json
{
  "name": "John",
  "phone_number": "+1234567890",
  "code": "abc123..."
}
```

## Response

- **201 Created** – record inserted; body: `{ "success": true, "message": "Record created", "id": 1 }`
- **400 Bad Request** – missing/invalid params
- **405 Method Not Allowed** – not POST
- **500 Internal Server Error** – DB error

## Run locally

From the `php` folder, use the router script so OPTIONS requests are handled correctly:

```bash
cd php
php -S localhost:8080 router.php
```

Then:

```bash
curl -X POST http://localhost:8080/api.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone_number":"+123","code":"mycode"}'
```

With Apache/Nginx, point the document root (or a vhost) to the `php` folder and call `/api.php`.
