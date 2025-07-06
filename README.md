Paytm Practice project

- **Frontend:** React, React Router DOM, Axios, Tailwind
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Auth:** JWT + Protected Routes



- On **signup/signin**, backend returns token → store in `localStorage`
- Protected routes (`/dashboard`, `/send`) check token using `ProtectedRoute`
- Auth routes (`/signup`, `/signin`) block logged-in users using `AuthRedirect`
- Logout clears token from localStorage

## Routes Overview

### **Backend**
| Route | Auth | Description |
|-------|------|-------------|
| POST `/user/signup` | ❌ | Register new user |
| POST `/user/signin` | ❌ | Login user |
| PUT `/user/` | ✅ | Update password / name |
| GET `/user/bulk?filter=` | ❌ | Search users |
| GET `/account/balance` | ✅ | Get balance |
| POST `/account/transfer` | ✅ | Transfer money (uses MongoDB transaction) |



## Remember

- `ProtectedRoute` checks token and redirects to `/signup` if missing
- `AuthRedirect` sends logged-in users to `/dashboard`
- Use `useNavigate()` for redirect after signup/signin/logout
- `useEffect()` must not be `async` — wrap `async` logic inside it
- `Appbar` contains Logout button → clears token + navigates to `/signup`
- User list is fetched from `/user/bulk`, filtered by name input
- Transfer form uses `useSearchParams()` to get recipient name + ID

---

## Functions

- [x] Signup + store JWT
- [x] Signin + redirect
- [x] Protected dashboard route
- [x] Check balance
- [x] Search users
- [x] Send money with transaction
- [x] Logout
- [x] Redirect based on login state

---

