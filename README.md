# PulmoSense Web

Frontend PulmoSense dibangun dengan Next.js App Router, React, TypeScript, Tailwind CSS, dan shadcn/ui.

## Fungsi Utama

- Dashboard aplikasi PulmoSense.
- Upload file audio `.wav` untuk analisis suara paru.
- Mengirim file ke FastAPI AI service lewat `POST /predict`.
- Menampilkan progress proses dan ringkasan hasil prediksi.
- Menyimpan hasil analisis dan energy band ke PostgreSQL.
- Menampilkan riwayat dan detail analisis dari database.
- Authentication berbasis session cookie untuk role `superadmin` dan `admin`.
- Manajemen user yang hanya dapat diakses superadmin.

`sessionStorage` hanya dipakai untuk membawa file audio dan hasil terakhir selama perpindahan halaman. Data riwayat disimpan permanen melalui Prisma.

## Env

Buat `.env` dari `.env.example`:

```bash
copy .env.example .env
```

Isi penting:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/paruscan_ai?schema=public"
NEXT_PUBLIC_AI_SERVICE_URL="http://127.0.0.1:8000"
NEXT_PUBLIC_APP_NAME="ParuScan AI"
PARUSCAN_AUTH_SECRET="replace-with-at-least-32-random-characters"
PARUSCAN_COOKIE_SECURE="false"
PARUSCAN_SUPERADMIN_NAME="Super Admin"
PARUSCAN_SUPERADMIN_EMAIL="superadmin@paruscan.local"
PARUSCAN_SUPERADMIN_PASSWORD="ChangeThis123!"
```

`NEXT_PUBLIC_AI_SERVICE_URL` harus bisa diakses dari browser user. Untuk LAN atau deploy, jangan pakai `127.0.0.1` kecuali browser berjalan di mesin yang sama dengan AI service.

## Development

Install dependency:

```bash
npm install
```

Jalankan dev server:

```bash
npm run dev
```

Buka:

```text
http://127.0.0.1:3000
```

## Script

```bash
npm run dev
npm run lint
npm run build
```

## Docker

Dari root project:

```bash
docker compose up --build -d web
```

Container web menjalankan `prisma migrate deploy` sebelum Next.js dimulai. URL default adalah `http://127.0.0.1:3000`.

Setelah migrasi, container menjalankan `npm run auth:bootstrap` untuk memastikan akun superadmin awal tersedia. Password akun bootstrap disinkronkan dengan `PARUSCAN_SUPERADMIN_PASSWORD`, sehingga rotasi password dapat dilakukan dengan mengubah env lalu recreate container web.

## Route Penting

```text
/dashboard
/dashboard/analisis-baru
/dashboard/analisis-baru/proses
/dashboard/riwayat-analisis
/dashboard/riwayat-analisis/detail
/dashboard/users
/dashboard/pengaturan
```

`/dashboard/users` hanya tersedia untuk role `superadmin`. API `/api/users` tetap memvalidasi role dan mengembalikan HTTP 403 untuk admin.

## Flow Upload dan Prediksi

1. `src/app/dashboard/analisis-baru/page.tsx`
   - validasi file `.wav`,
   - simpan pending analysis ke `sessionStorage`,
   - redirect ke halaman proses.

2. `src/app/dashboard/analisis-baru/proses/page.tsx`
   - baca pending analysis,
   - buat `FormData`,
   - panggil `predictAudio`,
   - simpan hasil ke `POST /api/analyses`,
   - simpan ID dan hasil terakhir ke `sessionStorage` untuk navigasi langsung.

3. `src/lib/ai-service.ts`
   - client helper untuk request ke FastAPI.

4. `src/app/api/analyses/route.ts`
   - validasi payload,
   - simpan analisis dan energy band ke PostgreSQL melalui Prisma.

5. `src/app/dashboard/riwayat-analisis/`
   - query daftar dan detail analisis dari database.

6. `src/lib/analysis-session.ts`
   - tipe dan key `sessionStorage`.

## Troubleshooting

### Request ke AI service gagal

Cek FastAPI:

```bash
curl http://127.0.0.1:8000/models
```

Cek env:

```env
NEXT_PUBLIC_AI_SERVICE_URL="http://127.0.0.1:8000"
```

Jika memakai LAN, gunakan IP LAN service:

```env
NEXT_PUBLIC_AI_SERVICE_URL="http://192.168.1.10:8000"
```

### Perubahan env tidak terbaca

Restart dev server Next.js setelah mengubah `.env`.
