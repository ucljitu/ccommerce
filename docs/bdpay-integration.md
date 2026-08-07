# BD Pay integration and cPanel deployment

The integration uses the merchant's own BD Pay API key. Keys are encrypted at rest with AES-256-GCM, are never returned by an API, and are sent to BD Pay only from server-side route handlers.

## Gateway contract

- Base URL: `https://payment.bdpayment.online`
- Create payment: `POST /api/payment/create`
- Verify payment: `POST /api/payment/verify`
- Authentication header: `API-KEY`
- Official documentation: <https://bdpayment.online/developers>

The current BD Pay documentation specifies success and cancel redirects but no signed webhook/IPN contract. Payment is therefore marked paid only after the server verifies the returned transaction ID with BD Pay and confirms the exact order amount. A redirect alone never marks an order paid.

## cPanel environment

Copy `.env.example` values into the Node.js application's environment:

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=your_database
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password
DATABASE_SSL=false

BDPAY_BASE_URL=https://payment.bdpayment.online
APP_URL=https://yourdomain.com
PAYMENT_CREDENTIAL_ENCRYPTION_KEY=<32-random-bytes-as-base64>
```

Generate the encryption key locally:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

Keep this key stable and backed up securely. Losing it makes saved merchant API keys undecryptable. Changing it requires a controlled key rotation.

`APP_URL` must be the final HTTPS origin with no path. The gateway callback URLs are generated from it. Do not put a global BD Pay API key in the environment; each merchant saves their own key in Merchant Dashboard → Payments → Payment Gateways.

## Database and initial merchant

1. Create a MySQL database and user in cPanel.
2. Import `database/migrations/001_payment_foundation.sql` through phpMyAdmin or the MySQL CLI.
3. Generate a password hash with `node scripts/hash-password.mjs "a-long-password"`.
4. Provision merchant, store, and merchant user records with UUID public IDs and the generated hash.
5. Sign in as that merchant and save either a Sandbox or Live API key.

Sandbox and production use the same endpoint. The selected mode records whether an attempt is Test or Live; the merchant must supply the matching Sandbox or Live key. Enabling Production requires an explicit confirmation in the dashboard.

## Build and run

```bash
npm ci
npm run build
npm run start
```

Set the cPanel Node.js startup command to `npm run start` and use the Node version supported by this Next.js release. Ensure the application proxy preserves HTTPS and the original `Host`/`Origin` headers.

## Payment lifecycle

1. The application creates an order using server-side product prices.
2. `/api/payments/bdpay/initiate` loads the order, merchant, amount, and encrypted credential from MySQL.
3. BD Pay returns an approved HTTPS checkout URL.
4. On success, the server calls BD Pay's verify endpoint.
5. Only `COMPLETED` with the same transaction ID and exact amount updates the payment and order inside a database transaction.
6. Duplicate callbacks remain idempotent; a paid transaction cannot be downgraded by a later cancel callback.

Do not test with a live key or real money during automated testing. Use a Sandbox key only for manual staging verification.
