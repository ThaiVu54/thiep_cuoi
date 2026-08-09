# Phân tích Codebase: thiep_cuoi (Thiệp cưới online)

> Cập nhật lần cuối: 2026-07-29

## 1. Tổng quan

Ứng dụng web **thiệp cưới online mobile-first** viết bằng Next.js 14 (App Router).

Chức năng chính quan sát được từ code:

- Trang thiệp một cột (single page) gồm nhiều section: Hero, Countdown, Invitation, LoveStory, Gallery, EventInfo, LocationMap, RsvpForm, Wishes, GiftBox, Footer.
- **Link cá nhân hoá theo khách mời** qua route động `/[guestSlug]`, tự tăng `viewCount` mỗi lượt xem.
- **RSVP** (xác nhận tham dự) và **sổ lưu bút / lời chúc** (có duyệt trước khi hiển thị).
- **Trang admin** (`/admin`) bảo vệ bằng HTTP Basic Auth: dashboard, danh sách khách mời, RSVP (export CSV), duyệt lời chúc.
- Xuất lịch sự kiện: link Google Calendar và file `.ics` (`/api/calendar`).
- Ảnh Open Graph động (`app/opengraph-image.tsx`).

Toàn bộ nội dung thiệp được tập trung tại `config/site.config.ts`.

## 2. Tech Stack

| Thành phần    | Công nghệ                                                                 |
| ------------- | ------------------------------------------------------------------------- |
| Ngôn ngữ      | TypeScript 5 (`strict: true`), React 18                                    |
| Framework     | Next.js 14.2.35 — App Router, Server Components + Route Handlers           |
| UI / Styling  | Tailwind CSS 3.4, PostCSS + Autoprefixer, Framer Motion 11 (animation)     |
| Database      | SQLite qua Prisma ORM 6.14 (`DATABASE_URL="file:./dev.db"`)                |
| Validation    | Zod 3.23                                                                   |
| Auth          | HTTP Basic Auth tự viết (`middleware.ts` + `lib/admin-auth.ts`)            |
| Build tool    | Next CLI (`next build`), `tsx` để chạy seed script                         |
| Linter        | ESLint 8 + `next/core-web-vitals`                                          |
| Formatter     | Prettier 3 + `prettier-plugin-tailwindcss`                                 |
| Testing       | **Chưa có** — không có test runner, không có script `test`, không có file test |
| CI/CD         | **Chưa có** file CI. README hướng dẫn deploy thủ công lên Vercel           |
| Container     | Không có `Dockerfile` / `docker-compose.yml`                               |

## 3. Cấu trúc thư mục

```
.
├── app/                        # Next.js App Router (route + API)
│   ├── layout.tsx              # Root layout, metadata + OpenGraph, lang="vi"
│   ├── page.tsx                # Trang thiệp mặc định (không có tên khách)
│   ├── opengraph-image.tsx     # Ảnh OG sinh động
│   ├── [guestSlug]/page.tsx    # Server Component: tra khách theo slug, +1 viewCount
│   ├── admin/                  # Khu vực quản trị (layout + dashboard/guests/rsvp/wishes)
│   └── api/                    # Route Handlers
│       ├── calendar/route.ts   # GET  -> file .ics
│       ├── guests/route.ts     # GET/POST khách mời (yêu cầu admin)
│       ├── rsvp/route.ts       # GET (json/csv) + POST xác nhận tham dự
│       └── wishes/route.ts     # GET/POST lời chúc + PATCH duyệt (admin)
├── components/
│   ├── InvitationPageClient.tsx  # Client component ghép toàn bộ section
│   ├── sections/               # 11 section nội dung của thiệp
│   ├── common/                 # FallingPetals, MusicPlayer, RevealOnScroll
│   └── ui/                     # Primitive: Button, Input, Modal, Skeleton, Toast
├── config/
│   ├── site.config.ts          # ⭐ Toàn bộ nội dung thiệp (tên, ngày, sự kiện, bank...)
│   └── theme.config.ts         # Class gradient/card dùng chung
├── hooks/                      # useAudio (nhạc nền), useCountdown (đếm ngược)
├── lib/                        # Logic dùng chung, không phụ thuộc UI
│   ├── db.ts                   # Singleton PrismaClient (tránh tạo lại khi HMR)
│   ├── admin-auth.ts           # Kiểm tra Basic Auth cho Route Handler
│   ├── validations.ts          # Zod schema: rsvpSchema, wishSchema (có honeypot)
│   ├── rate-limit.ts           # Rate limit in-memory theo IP
│   ├── slug.ts                 # Sinh slug tiếng Việt không dấu
│   ├── calendar.ts             # Google Calendar link + nội dung ICS
│   └── utils.ts                # cn(), formatDateVN()
├── prisma/
│   ├── schema.prisma           # Model Guest / Rsvp / Wish (không có thư mục migrations)
│   └── seed.ts                 # Seed danh sách khách mời mẫu
├── public/                     # images/ (SVG placeholder), qr/, audio/
├── styles/globals.css          # Tailwind directives + style toàn cục
├── types/index.ts              # Side, WeddingEvent, BankInfo, SiteConfig
├── middleware.ts               # Basic Auth chặn `/admin/:path*`
└── .specs/ , .github/          # Tài liệu spec-driven + hướng dẫn Copilot
```

## 4. Kiến trúc

Mô hình: **Next.js App Router theo lớp (layered), monolith full-stack** — frontend và backend nằm chung một dự án.

```
Browser
   │
   ├─ (SSR) app/page.tsx | app/[guestSlug]/page.tsx   ← Server Component, đọc DB trực tiếp
   │        └─ components/InvitationPageClient.tsx    ← "use client", ghép các section
   │              └─ components/sections/*, common/*, ui/*  (+ hooks/*)
   │
   └─ (fetch) app/api/*/route.ts                      ← Route Handler
              ├─ lib/validations.ts   (Zod parse input)
              ├─ lib/rate-limit.ts    (chống spam theo IP)
              ├─ lib/admin-auth.ts    (Basic Auth cho endpoint admin)
              └─ lib/db.ts → Prisma → SQLite
```

Các lớp:

| Lớp                | Vị trí                     | Trách nhiệm                                              |
| ------------------ | -------------------------- | -------------------------------------------------------- |
| Presentation       | `app/`, `components/`      | Render UI, không chứa logic nghiệp vụ phức tạp            |
| Cấu hình nội dung  | `config/`, `types/`        | Nội dung thiệp tách khỏi code, gõ kiểu bằng `SiteConfig`  |
| API / Controller   | `app/api/*/route.ts`       | Xác thực, validate, gọi Prisma, trả JSON/CSV/ICS          |
| Domain / Utility   | `lib/`, `hooks/`           | Validation schema, auth, rate-limit, slug, calendar       |
| Data Access        | `lib/db.ts`, `prisma/`     | Prisma Client singleton + schema                          |
| Cross-cutting      | `middleware.ts`            | Chặn toàn bộ `/admin/*` bằng Basic Auth                   |

Mô hình dữ liệu (`prisma/schema.prisma`):

- `Guest` (id, name, **slug unique**, side, phone, maxSeats, viewCount) — 1‑1 (optional) với `Rsvp`.
- `Rsvp` (guestId unique nullable, name, attending, seats, message).
- `Wish` (name, content, **approved** mặc định `false`).

## 5. Entry Point & Luồng khởi động

- **Entry point ứng dụng**: `app/layout.tsx` (root layout, `<html lang="vi">`, metadata + OG).
- **Luồng trang công khai**:
  1. Request `/` → `app/page.tsx` render `InvitationPageClient` (không có tên khách).
  2. Request `/<slug>` → `app/[guestSlug]/page.tsx` (Server Component) query `db.guest.findUnique`, tăng `viewCount`, truyền `guestName`/`guestSlug` xuống client.
  3. `InvitationPageClient` giữ state `opened`; bấm **Mở thiệp** ở `Hero` → `MusicPlayer` mới phát nhạc (tránh chặn autoplay của trình duyệt).
  4. Các section bọc trong `RevealOnScroll` (Framer Motion) để animate khi cuộn.
- **Luồng admin**: mọi request `/admin/*` đi qua `middleware.ts` → kiểm tra header `Authorization: Basic` so với `process.env.ADMIN_PASSWORD` (chỉ so phần password, bỏ qua username) → 401 kèm `WWW-Authenticate` nếu sai.
- **Luồng API**: Route Handler → (rate-limit) → Zod `safeParse` → kiểm tra honeypot → Prisma → `Response.json`.

## 6. Quy ước code

- **Ngôn ngữ**: định danh (biến/hàm/component) bằng tiếng Anh; comment và **toàn bộ thông báo cho người dùng bằng tiếng Việt**.
- **Đặt tên file**:
  - Component React: `PascalCase.tsx` (`RsvpForm.tsx`, `MusicPlayer.tsx`).
  - Hook / lib / config: `camelCase.ts` hoặc `kebab-case.ts` (`useCountdown.ts`, `admin-auth.ts`, `rate-limit.ts`, `site.config.ts`).
- **Export**: dùng **named export** cho component và hàm tiện ích; `export default` chỉ dùng cho page/layout của Next.js (theo yêu cầu framework).
- **Client vs Server**: mặc định là Server Component; chỉ thêm `"use client"` khi cần state/effect/audio (`InvitationPageClient`, `hooks/*`, phần lớn `components/`).
- **Import alias**: `@/*` trỏ về gốc dự án (`tsconfig.json` → `paths`).
- **Styling**: Tailwind utility trực tiếp trong JSX; gộp class động bằng `cn()` trong `lib/utils.ts`; màu thương hiệu khai báo ở `tailwind.config.ts` (`primary`, `secondary`, `ink`, `soft`).
- **Validation**: mọi input từ người dùng đều đi qua Zod schema đặt trong `lib/validations.ts` (hoặc schema cục bộ trong route như `guestSchema`).
- **Linter/Formatter**: ESLint `next/core-web-vitals`; Prettier (`semi: true`, `singleQuote: false`, `trailingComma: "all"`) kèm plugin sắp xếp class Tailwind.
- **Tài liệu**: quy trình spec-driven trong `.github/instructions/`, spec từng tính năng đặt tại `.specs/<tên-tính-năng>/`.

## 7. Build / Run / Test

```bash
# Cài đặt
npm install
cp .env.example .env          # DATABASE_URL, ADMIN_PASSWORD, NEXT_PUBLIC_SITE_URL
npx prisma db push            # tạo schema cho SQLite
npm run prisma:seed           # seed danh sách khách mời mẫu

# Chạy dev
npm run dev                   # http://localhost:3000

# Build & chạy production
npm run build
npm run start

# Kiểm tra chất lượng
npm run lint                  # ESLint (next lint)
npm run format                # Prettier --write .

# Prisma
npm run prisma:generate
npm run prisma:push

# Test
# (chưa có test runner nào được cấu hình trong dự án)
```

## 8. Điểm cần lưu ý / Nợ kỹ thuật

Các mục dưới đây là quan sát trực tiếp từ code, **chưa được sửa** (bước này chỉ phân tích).

**Bảo mật**

1. `GET /api/rsvp` **trả về toàn bộ danh sách RSVP mà không cần xác thực** nếu request không kèm `?admin=1` — biến kiểm tra `isAdmin` chỉ dựa vào query param do client tự đặt, nên dữ liệu khách mời (tên, lời nhắn, số ghế) đang bị lộ công khai, kể cả bản CSV (`?format=csv`). Đây là rủi ro cao nhất hiện tại.
2. So sánh mật khẩu admin bằng `!==` / `===` thông thường (`middleware.ts`, `lib/admin-auth.ts`) — không phải so sánh hằng thời gian; ngoài ra chỉ so phần password, username bị bỏ qua hoàn toàn.
3. `.env.example` để mật khẩu mẫu yếu (`123456`); README cũng dùng giá trị này — dễ bị mang thẳng lên production.
4. Xuất CSV (`/api/rsvp?format=csv`) chỉ escape dấu `"`, chưa xử lý **CSV/formula injection** (giá trị bắt đầu bằng `=`, `+`, `-`, `@`).
5. Rate limit (`lib/rate-limit.ts`) lưu trong `Map` bộ nhớ tiến trình → **vô hiệu trên môi trường serverless/nhiều instance** (Vercel), và có thể phình bộ nhớ vì không bao giờ dọn key cũ. IP lấy từ `x-forwarded-for` — header client có thể giả mạo nếu không có proxy tin cậy.

**Dữ liệu & logic**

6. `POST /api/rsvp` dùng `db.rsvp.upsert({ where: { guestId: guest?.id ?? "" } })` rồi bọc `.catch()` để `create` lại — logic chống lỗi bằng chuỗi rỗng khá mong manh, dễ tạo bản ghi trùng cho khách vãng lai (không có slug).
7. Sinh slug trong `POST /api/guests` dùng `count({ where: { slug: { startsWith: baseSlug } } })` để thêm hậu tố số → có **race condition** và đếm sai khi đã tồn tại slug dạng `ten-2`; nên bắt lỗi unique constraint thay vì đếm trước.
8. `app/[guestSlug]/page.tsx` tăng `viewCount` ngay trong lượt render, nên bot/preview link cũng làm tăng số đếm; đồng thời trang không gọi `notFound()` khi slug sai (mọi slug lạ đều hiển thị thiệp chung).
9. Prisma **không có thư mục `migrations/`** — dự án dùng `db push`, nên không có lịch sử schema khi chuyển sang Postgres như README gợi ý.
10. SQLite file (`file:./dev.db`) **không dùng được trên Vercel** (filesystem chỉ đọc/ephemeral) — cần đổi sang Postgres trước khi deploy thật.

**Chất lượng & vận hành**

11. **Không có test nào** (không jest/vitest/playwright, không script `test`), dù repo đã có `.github/instructions/testing.instructions.md`. Không có CI workflow.
12. Không có `error.tsx` / `not-found.tsx` / `loading.tsx` trong `app/` → lỗi runtime sẽ rơi vào trang lỗi mặc định của Next.js.
13. Metadata trong `app/layout.tsx` **hardcode tên "Thái Vũ & Ngọc Anh"**, không khớp với `config/site.config.ts` (đang là "Vũ Văn Thái & Ngô Thị Minh Anh") — nội dung nên đọc từ `siteConfig` để tránh lệch.
14. Ảnh hiện là **SVG placeholder** trong `public/images/`, `public/qr//download.jpg`; file nhạc `public/audio/background.mp3` chưa tồn tại (chỉ có README) → `useAudio` sẽ fail im lặng (`catch` rỗng) nếu thiếu file.
15. `lib/calendar.ts` cố định thời lượng sự kiện 3 giờ và chỉ dùng `siteConfig.weddingDate`, chưa dùng danh sách `events` — nếu có nhiều sự kiện (nhà trai/nhà gái) thì lịch xuất ra chưa phản ánh đúng.
