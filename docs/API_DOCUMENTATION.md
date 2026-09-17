# DOKUMENTASI API — SISTEM INFORMASI PNBP BDI MAKASSAR

---

## 1. KONVENSI

- **Base URL:** `/api/`
- **Format Response:** JSON
- **Authentication:** JWT via cookie (NextAuth)
- **Error Format:** `{ "error": "pesan error" }`
- **Success Format:** `{ "data": ..., "message": "..." }` atau `{ "data": [...], "pagination": {...} }`

---

## 2. AUTENTIKASI

### 2.1 Login

| | |
|---|---|
| **Endpoint** | `POST /api/auth/[...nextauth]` |
| **Auth** | Tidak |
| **Input** | `{ email, password }` via NextAuth Credentials |
| **Response** | Session JWT di cookie |

### 2.2 Registrasi

| | |
|---|---|
| **Endpoint** | `POST /api/auth/register` |
| **Auth** | Tidak (public) |
| **Input** | `{ name, email, phone?, instansi?, password, confirmPassword }` |
| **Validasi** | Zod `registerSchema` |
| **Proses** | Cek email exists → hash password → $transaction (create User + Profile) |
| **Response** | `201 { message: "Registrasi berhasil", userId }` |
| **Error** | `400` validasi gagal, `400` email sudah terdaftar, `500` server error |

---

## 3. KATEGORI

### GET /api/categories

| | |
|---|---|
| **Auth** | Tidak |
| **Role** | — |
| **Query** | — |
| **Response** | `200` array kategori aktif dengan jumlah layanan |
| **DB** | `ServiceCategory` (where isActive, include _count services) |

---

## 4. LAYANAN

### GET /api/services

| | |
|---|---|
| **Auth** | Tidak |
| **Role** | — |
| **Response** | `200` array layanan aktif dengan kategori + tarif terverifikasi |
| **DB** | `Service` (include category, tariffs take 1) |

### POST /api/services

| | |
|---|---|
| **Auth** | Ya |
| **Role** | ADMIN, SUPER_ADMIN |
| **Input** | `{ name, slug, description, categoryId, status, targetUser?, requirements?, procedure?, paymentInfo?, cancellation?, estimationTime? }` |
| **Validasi** | Zod `serviceSchema` |
| **Proses** | Cek slug exists → create service → audit log |
| **Response** | `201 { data: service, message }` |
| **Error** | `400` validasi/duplicate slug, `404` kategori tidak ada, `500` server |

### GET /api/services/[id]

| | |
|---|---|
| **Auth** | Tidak |
| **Lookup** | ID atau slug (fallback) |
| **Response** | `200` detail layanan + kategori + semua tarif |
| **Error** | `404` tidak ditemukan |

### PUT /api/services/[id]

| | |
|---|---|
| **Auth** | Ya |
| **Role** | ADMIN, SUPER_ADMIN |
| **Input** | Partial serviceSchema |
| **Proses** | Cek exists → update → audit log |
| **Response** | `200 { data, message }` |

### DELETE /api/services/[id]

| | |
|---|---|
| **Auth** | Ya |
| **Role** | ADMIN, SUPER_ADMIN |
| **Guard** | Tidak bisa hapus jika ada permohonan terkait |
| **Proses** | Cek dependencies → delete → audit log |
| **Response** | `200 { message }` |
| **Error** | `400` "Tidak dapat menghapus layanan yang sudah memiliki permohonan" |

---

## 5. TARIF

### POST /api/tariffs

| | |
|---|---|
| **Auth** | Ya |
| **Role** | ADMIN, SUPER_ADMIN |
| **Input** | `{ serviceId, name, price, unit, description?, legalBasis?, regulationNumber?, regulationYear?, effectiveStartDate, effectiveEndDate? }` |
| **Validasi** | Zod `tariffSchema` |
| **Proses** | Convert dates → create tariff → audit log |
| **Response** | `201 { data: tariff, message }` |

### GET /api/tariffs/[id]

| | |
|---|---|
| **Auth** | Tidak |
| **Response** | `200` detail tarif + nama layanan |

### PUT /api/tariffs/[id]

| | |
|---|---|
| **Auth** | Ya |
| **Role** | ADMIN, SUPER_ADMIN |
| **Input** | Partial tariffSchema |
| **Proses** | Cek exists → update → audit log |
| **Response** | `200 { data, message }` |

### DELETE /api/tariffs/[id]

| | |
|---|---|
| **Auth** | Ya |
| **Role** | ADMIN, SUPER_ADMIN |
| **Guard** | Tidak bisa hapus jika tarif digunakan di invoice |
| **Response** | `200 { message }` |
| **Error** | `400` "Tidak dapat menghapus tarif yang sudah digunakan di invoice" |

---

## 6. PERMOHONAN

### GET /api/applications

| | |
|---|---|
| **Auth** | Ya |
| **Role** | Semua authenticated |
| **Query** | `page` (default 1), `limit` (default 10, max 100), `status` (enum validation), `serviceId` |
| **Filter** | USER: hanya own applications. OPERATOR+: semua. |
| **Response** | `200 { data: [...], pagination: { page, limit, total, totalPages } }` |

### POST /api/applications

| | |
|---|---|
| **Auth** | Ya |
| **Role** | USER, OPERATOR, ADMIN |
| **Input** | `{ serviceId, notes? }` |
| **Validasi** | Zod `applicationSchema` |
| **Proses** | Cek service → generate nomor (retry 10x) → create application + statusHistory → cek tariff → buat invoice jika ada → set paymentStatus → audit log |
| **Response** | `201 { data: application, message }` |
| **Nomor format** | `PNBP-YYYYMM-XXXX` |

### GET /api/applications/[id]

| | |
|---|---|
| **Auth** | Ya |
| **Guard** | USER hanya bisa lihat own |
| **Response** | `200` detail lengkap: service, user, invoice (items + payments), statusHistory (changedBy), documents |

### PATCH /api/applications/[id]

| | |
|---|---|
| **Auth** | Ya |
| **Guard** | USER hanya bisa update own + status DRAFT/REVISION_REQUIRED |
| **Input** | `{ notes? }` |
| **Response** | `200 { data, message }` |
| **Catatan** | Tidak ada audit log untuk PATCH ini |

### PATCH /api/applications/[id]/status

| | |
|---|---|
| **Auth** | Ya |
| **Guard** | State machine + role check via `canTransition()` |
| **Input** | `{ status, notes?, rejectionReason? }` |
| **Validasi** | Zod `statusSchema` |
| **Proses** | Cek transition valid → cek pembayaran jika APPROVED → $transaction (update status + create history + audit log) |
| **Timestamps** | `submittedAt`, `reviewedAt`, `completedAt` di-set otomatis |

---

## 7. PEMBAYARAN

### GET /api/payments

| | |
|---|---|
| **Auth** | Ya |
| **Query** | `page`, `limit` (max 100), `status` (enum validation) |
| **Filter** | USER: hanya own payments. OPERATOR+: semua. |
| **Response** | `200 { data: [...], pagination }` |

### POST /api/payments

| | |
|---|---|
| **Auth** | Ya |
| **Input** | `{ invoiceId, amount, paymentMethod, paymentReference?, bankName?, accountNumber?, notes? }` |
| **Validasi** | Zod `paymentSchema` |
| **Proses** | Cek invoice → cek ownership → cek already paid → create payment + event SUBMITTED → audit log |
| **Response** | `201 { data: payment, message }` |
| **Nomor format** | `PAY-<base36-timestamp>` |

### PATCH /api/payments/[id]/verify

| | |
|---|---|
| **Auth** | Ya |
| **Role** | OPERATOR, ADMIN, SUPER_ADMIN |
| **Input** | `{ status: "PAID" | "FAILED", notes? }` |
| **Validasi** | Zod `verifySchema` |
| **Proses** | Cek exists → cek status PENDING → $transaction (update payment + create event) → aggregate paidAmount → update invoice → update application |
| **Idempotent** | Jika sudah di target status, return success tanpa reprocess |
| **Catatan** | Post-transaction aggregate/update tidak dalam transaction |

---

## 8. PENGGUMUMAN

### POST /api/announcements

| | |
|---|---|
| **Auth** | Ya |
| **Role** | ADMIN, SUPER_ADMIN |
| **Input** | `{ title, content, isPublished? }` |
| **Validasi** | Zod `announcementSchema` |
| **Proses** | Jika isPublished → set publishedAt → create → audit log |
| **Response** | `201 { data, message }` |

### GET /api/announcements/[id]

| | |
|---|---|
| **Auth** | Tidak |
| **Response** | `200` detail pengumuman |

### PUT /api/announcements/[id]

| | |
|---|---|
| **Auth** | Ya |
| **Role** | ADMIN, SUPER_ADMIN |
| **Input** | Partial announcementSchema |
| **Proses** | Smart publishedAt: hanya set jika first-time publish |
| **Response** | `200 { data, message }` |

### DELETE /api/announcements/[id]

| | |
|---|---|
| **Auth** | Ya |
| **Role** | ADMIN, SUPER_ADMIN |
| **Response** | `200 { message }` |

---

## 9. FAQ

### POST /api/faqs

| | |
|---|---|
| **Auth** | Ya |
| **Role** | ADMIN, SUPER_ADMIN |
| **Input** | `{ question, answer, category?, sortOrder?, isActive? }` |
| **Validasi** | Zod `faqSchema` |
| **Response** | `201 { data, message }` |

### GET /api/faqs/[id]

| | |
|---|---|
| **Auth** | Tidak |
| **Response** | `200` detail FAQ |

### PUT /api/faqs/[id]

| | |
|---|---|
| **Auth** | Ya |
| **Role** | ADMIN, SUPER_ADMIN |
| **Input** | Partial faqSchema |
| **Response** | `200 { data, message }` |

### DELETE /api/faqs/[id]

| | |
|---|---|
| **Auth** | Ya |
| **Role** | ADMIN, SUPER_ADMIN |
| **Response** | `200 { message }` |

---

## 10. PENGGUNA

### GET /api/users/[id]

| | |
|---|---|
| **Auth** | Ya |
| **Role** | ADMIN, SUPER_ADMIN |
| **Response** | `200` detail user (tanpa password) + profile |

### PUT /api/users/[id]

| | |
|---|---|
| **Auth** | Ya |
| **Role** | ADMIN, SUPER_ADMIN |
| **Input** | `{ role?: enum, isActive?: boolean }` |
| **Validasi** | Zod `updateUserSchema` |
| **Guard** | Self-protection: tidak bisa ubah role/aktifkan nonaktifkan/hapus diri sendiri |
| **Response** | `200 { data, message }` |

### DELETE /api/users/[id]

| | |
|---|---|
| **Auth** | Ya |
| **Role** | SUPER_ADMIN only |
| **Guard** | Self-deletion prevention. User dengan aplikasi → soft delete (deactivate) |
| **Response** | `200 { message }` |

---

## 11. MEKANISME AUTENTIKASI

### Flow Login

```
1. Client: signIn("credentials", { email, password })
2. NextAuth: authorize() callback
3. Prisma: user.findUnique({ email })
4. bcrypt: compare(password, user.password)
5. Return: { id, email, name, role }
6. JWT issued dengan custom claims: { sub, role, id }
7. Cookie: next-auth.session-token
```

### Flow API Request

```
1. Client: fetch("/api/...") dengan credentials: "include"
2. Middleware: getToken({ req, secret: NEXTAUTH_SECRET })
3. Middleware: verifikasi JWT signature + expiry
4. API Route: requireAuth() → getAuthSession() → auth()
5. Session: { userId, email, name, role }
```

### Mekanisme Role Check

```typescript
// Middleware — hanya check role >= USER untuk route tertentu
const ROLE_HIERARCHY = { PUBLIC: 0, USER: 1, OPERATOR: 2, ADMIN: 3, SUPER_ADMIN: 4, LEADER: 5, AUDITOR: 6 };

// API Routes — check role spesifik
requireRole("ADMIN", "SUPER_ADMIN") // hanya admin+
requireAuth() // semua authenticated user
```

---

## 12. PATTERN ERROR HANDLING

| Pattern | HTTP Status | Contoh |
|---------|-------------|--------|
| Zod validation | 400 | `{ error: "Nama minimal 2 karakter" }` |
| Duplicate | 400 | `{ error: "Email sudah terdaftar" }` |
| Not found | 404 | `{ error: "Layanan tidak ditemukan" }` |
| Unauthorized | 401 | `{ error: "Unauthorized" }` |
| Forbidden | 403 | `{ error: "Forbidden" }` |
| Dependency blocked | 400 | `{ error: "Tidak dapat menghapus..." }` |
| Server error | 500 | `{ error: "Gagal memproses..." }` |

---

## 13. AUDIT LOGGING

Setiap mutasi (kecuali `PATCH /api/applications/[id]`) membuat record `AuditLog`:

```typescript
{
  userId: session.userId,
  action: "CREATE" | "UPDATE" | "DELETE" | "STATUS_CHANGE" | "VERIFY_PAYMENT",
  entity: "Application" | "Service" | "Tariff" | "Announcement" | "FAQ" | "User" | "Payment",
  entityId: record.id,
  oldData?: previousValues,
  newData?: newValues,
  ipAddress: getClientIp(request)
}
```

---

## 14. DATABASE TRANSACTIONS

Digunakan di 3 endpoint:

| Endpoint | Operasi |
|----------|---------|
| `POST /api/auth/register` | create User + create Profile |
| `PATCH /api/applications/[id]/status` | update Application + create StatusHistory + create AuditLog |
| `PATCH /api/payments/[id]/verify` | update Payment + create PaymentEvent + create AuditLog |
