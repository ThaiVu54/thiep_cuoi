# Thiệp cưới online - Next.js 14

Ứng dụng thiệp cưới online mobile-first, có route cá nhân hoá khách mời, RSVP, sổ lưu bút và trang admin cơ bản.

## 1) Cài đặt và chạy local

```bash
npm install
cp .env.example .env
# Cập nhật DATABASE_URL trong .env thành kết nối Postgres thật của bạn
npx prisma db push
npm run prisma:seed
npm run dev
```

Mở `http://localhost:3000` để xem thiệp.

- Link cá nhân hoá mẫu: `http://localhost:3000/nguyen-van-a`
- Trang admin: `http://localhost:3000/admin` (Basic Auth với `ADMIN_PASSWORD` trong `.env`)

## 2) Build production

```bash
npm run build
npm run start
```

## 3) Cấu hình nội dung thiệp (quan trọng nhất)

Chỉnh toàn bộ thông tin tại `config/site.config.ts`:
- Tên cô dâu/chú rể, bố mẹ hai bên
- Ngày cưới, lịch sự kiện, địa chỉ, map URL
- Tài khoản mừng cưới + ảnh QR
- Nhạc nền

> Có comment tiếng Việt trong code để bạn biết chỗ cần chỉnh.

## 4) Thêm ảnh và nhạc

- Ảnh hero/story/gallery: đặt trong `public/images/...`
- QR ngân hàng: đặt trong `public/qr/`
- Nhạc nền: đặt file `public/audio/background.mp3`

Dự án đang để sẵn SVG placeholder để chạy ngay không cần tải ảnh internet.

## 5) Import danh sách khách mời

### Cách nhanh qua seed
1. Mở `prisma/seed.ts`
2. Sửa mảng `names`
3. Chạy:

```bash
npm run prisma:seed
```

### Cách qua API admin
Gọi `POST /api/guests` (Basic Auth) với JSON:

```json
{
  "name": "Nguyễn Văn A",
  "side": "BOTH",
  "maxSeats": 2
}
```

Hệ thống tự sinh slug tiếng Việt không dấu (ví dụ: `nguyen-van-a`).

## 6) Biến môi trường

Xem `.env.example`:
- `DATABASE_URL`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_SITE_URL`

## 7) Deploy Vercel

1. Push code lên GitHub.
2. Import repo vào Vercel.
3. Khai báo env vars giống `.env.example`.
4. Build command: `npm run build`.
5. Với production DB, đổi `DATABASE_URL` sang Postgres là chạy được (Prisma giữ nguyên model).

## 8) Tính năng chính đã có

- Next.js 14 App Router + TypeScript + Tailwind
- Prisma + PostgreSQL
- Zod validation cho RSVP/Wish
- Anti-spam cơ bản (rate-limit memory + honeypot field)
- Open Graph image (`/opengraph-image`)
- Nhạc nền chỉ phát sau khi bấm **Mở thiệp** + toggle bật/tắt luôn hiển thị
- Admin dashboard + danh sách khách/RSVP + export CSV + duyệt/ẩn lời chúc
