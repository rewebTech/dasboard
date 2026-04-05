# Sunday Hundred — Next.js Dashboard

Production-ready dashboard with **Next.js App Router**, **Tailwind CSS**, and **Axios**.

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_BASE_URL=http://your-backend:4000/api
npm run dev
```

## Architecture (4 Layers)

```
UI (page.jsx)  →  Hooks  →  Services  →  axiosInstance  →  Backend API
```

- **`api/endpoints.js`** — all routes in one place
- **`api/urlBuilder.js`** — dynamic URL + query params
- **`api/axiosInstance.js`** — token, interceptors, error handling
- **`services/*.js`** — one file per module, calls axiosInstance
- **`hooks/*.js`** — loading/error/data state, components use these only
- **`components/ui/`** — full design system (Button, Input, Card, Modal, Badge, Toast)

## Rendering Strategy

- **SSR (Server-Side Rendering):** `app/dashboard/page.jsx` fetches initial data on the server using `services/dashboardServerService.js` for better first paint and SEO.
- **CSR (Client-Side Rendering):** `app/dashboard/DashboardClient.jsx` and `app/dashboard/analytics/page.jsx` handle rich interactivity, refresh actions, and local UI state.

## Route Layout System

- Shared shell lives in `components/shared/DashboardLayout.jsx`
- Includes reusable `Sidebar`, `Header`, and `Footer`
- Route-level guard in `app/dashboard/layout.jsx` uses cookie token for SSR auth checks

## Dashboard Pages

- `app/dashboard/page.jsx` (overview)
- `app/dashboard/analytics/page.jsx` (second dashboard module)

## Subscriptions (Razorpay + Manual QR)

Business signup is now a 2-step email OTP flow before payment and subscription creation.

### 3.0 Business Signup System

#### Step 1 - Request OTP

`POST /api/v1/subscriptions/register/request-otp`

Body:
```json
{
	"name": "Business Owner",
	"email": "owner@gmail.com",
	"phone": "9876543210",
	"password": "password123",
	"plan": "3_months"
}
```

Response `200`:
```json
{
	"success": true,
	"message": "OTP sent to email",
	"data": {
		"email": "owner@gmail.com",
		"expires_in_minutes": 10
	}
}
```

#### Step 2 - Verify OTP + Register

`POST /api/v1/subscriptions/register`

Body:
```json
{
	"name": "Business Owner",
	"email": "owner@gmail.com",
	"phone": "9876543210",
	"password": "password123",
	"plan": "3_months",
	"otp": "123456"
}
```

If the OTP is valid, user, dashboard, payment, and subscription records are created.

#### Step 3 - Payment Mode Branch

1. Razorpay mode (`payment_mode = RAZORPAY`):
- Response includes `order_id`, `amount`, `currency`, and `key_id`.
- Frontend opens Razorpay checkout.

2. Manual QR mode (`payment_mode = MANUAL_QR`):
- Response includes `payment_reference`, `qr.upi_id`, and `qr.qr_image_url`.
- User pays via QR and submits the transaction ID.

#### Step 4A - Razorpay Verify

`POST /api/v1/subscriptions/verify`

Body:
```json
{
	"razorpay_order_id": "order_xxx",
	"razorpay_payment_id": "pay_xxx",
	"razorpay_signature": "signature_xxx"
}
```

Result: payment captured, subscription active, business login enabled.

#### Step 4B - Manual Submit + Admin Approve

User submit:
`POST /api/v1/subscriptions/manual/submit`

Admin approve:
`POST /api/v1/subscriptions/manual/action`

Result after approval: payment captured, subscription active, business login enabled.

#### Step 5 - Business Login

`POST /api/v1/users/login-business`

This returns the business token and unlocks dashboard APIs.

#### Important OTP/Error Cases

- `400` OTP not found. Please request a new OTP.
- `400` OTP has expired. Please request a new OTP.
- `400` Invalid OTP
- `409` Email or phone already registered

### Frontend State Flow

`FORM_SUBMIT` -> `OTP_SENT` -> `OTP_VERIFIED_REGISTERED` -> (`PAYMENT_PENDING` or `ADMIN_APPROVAL_PENDING`) -> `ACTIVE` -> `LOGIN_SUCCESS`

### 3.1 Register + Create Order

Business registration is now OTP-gated, so the signup screen should first request and verify email OTP before creating the payment order.

## Adding a New Module

1. Add endpoint in `api/endpoints.js`
2. Create `services/myService.js`
3. Create `hooks/useMyModule.js`
4. Create `app/my-module/page.jsx` — only use the hook
5. Add nav link in `components/shared/Sidebar.jsx`
