# OWASP Top 10 Vulnerabilities Demo — MERN Stack

This project demonstrates real-world examples of the [OWASP Top 10](https://owasp.org/www-project-top-ten/) web security vulnerabilities.

## Completed Vulnerabilities

### 1. Broken Access Control — JWT Manipulation
- **Vulnerability:** The backend allows access to admin-only endpoints without verifying the user's role from the JWT.
- **Exploit:** A regular user can modify the JWT token to `role: "admin"` and access protected routes.
- **Demo:**
  - Insecure endpoint: `GET /api/admin-data`
  - Secure endpoint: `GET /api/admin-data-secure`

### 2. Injection — MongoDB NoSQL Injection
- **Vulnerability:** The login API does not sanitize input, allowing attackers to inject raw MongoDB operators like `$ne`.
- **Exploit:** Attempt login with:
  ```json
  {
    "username": { "$ne": null },
    "password": { "$ne": null }
  }
   ```

Bypasses login without valid credentials.

* **Demo:**

  * Insecure endpoint: `POST /api/auth/login`
  * Secure endpoint: `POST /api/auth/login-secure` (input sanitized)

### 3. Server-Side Request Forgery (SSRF)

* **Vulnerability:** The server fetches URLs directly from user input without validation.
* **Exploit:** Fetch internal services like `http://localhost:3000` or cloud metadata.
* **Demo:**

  * Insecure endpoint: `GET /api/ssrf/fetch?url=...`
  * Secure endpoint: `GET /api/ssrf/fetch-secure?url=...` (whitelisted domains only)

---

## Setup Instructions

### Prerequisites

* Node.js + npm
* MongoDB (running locally on default port)

### Backend

```bash
cd OWASP-Top-10-Server
npm install
node server.js
```

### Frontend

```bash
cd OWASP-Top-10-Client
npm install
npm start
```