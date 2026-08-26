# Phân tích Codebase: thiep_cuoi

> Cập nhật lần cuối: 2026-08-25

## 1. Tổng quan

Dự án là một ứng dụng web thiệp cưới online chạy trên Next.js App Router. Mục tiêu chính là render một trang thiệp mobile-first cho khách mời, tích hợp RSVP, lời chúc, trang admin quản trị và dữ liệu khách mời lưu trong Prisma.

Từ code hiện tại, ứng dụng có các tính năng chính sau:
- Trang thiệp công khai gồm nhiều section: Hero, Countdown, Love Story, Gallery, Event Info, RSVP, Wishes, GiftBox và Footer.
- Route động theo slug khách mời: /[guestSlug].
- API xác nhận tham dự và lưu lời chúc.
- Trang admin bảo vệ bằng HTTP Basic Auth.
- Xuất Google Calendar / .ics từ dữ liệu sự kiện.
- Cấu hình nội dung thiệp tập trung trong config/site.config.ts.

## 2. Tech Stack

| Thành phần | Công nghệ |
|-----------|----------|
| Ngôn ngữ | TypeScript 5, React 18 |
| Framework | Next.js 14.2.35 (App Router) |
| UI | Tailwind CSS 3.4, Framer Motion |
| Data validation | Zod |
| Database | PostgreSQL qua Prisma ORM |
| Auth | Basic Auth custom trong middleware.ts và lib/admin-auth.ts |
| Build tool | next build, Prisma generate, tsx |
| Linter | ESLint 8 + next/core-web-vitals |
| Formatter | Prettier + prettier-plugin-tailwindcss |
| Testing | Chưa cấu hình; không có script test |
| CI/CD | Không có workflow CI; deploy chủ yếu theo README / Vercel |
| Container | Không có Dockerfile hoặc docker-compose.yml |

## 3. Cấu trúc thư mục

```text
.
├── app/                             # App Router routes và API handlers
│   ├── layout.tsx                   # Root layout, metadata, font, OG metadata
│   ├── page.tsx                     # Trang thiệp mặc định cho khách mời chung
│   ├── opengraph-image.tsx          # Open Graph image động
│   ├── [guestSlug]/page.tsx         # Trang theo slug khách mời
│   ├── admin/                       # Trang admin (dashboard / guests / rsvp / wishes)
│   └── api/                         # Route handlers
│       ├── calendar/route.ts        # Xuất link / file .ics
│       ├── guests/route.ts          # CRUD khách mời (admin)
│       ├── rsvp/route.ts            # GET/POST RSVP
│       └── wishes/route.ts          # GET/POST wish + approve
├── components/                      # Component UI
│   ├── InvitationPageClient.tsx     # Client wrapper cho toàn bộ trang thiệp
│   ├── common/                      # MusicPlayer, RevealOnScroll, FallingPetals...
│   ├── sections/                    # Section nội dung thiệp
│   └── ui/                          # Button, Input, Modal, Skeleton, Toast
├── config/                          # Cấu hình nội dung và theme
│   ├── site.config.ts               # Nội dung thiệp: tên cô dâu/chú rể, sự kiện, ngân hàng...
│   └── theme.config.ts              # Màu và class dùng chung
├── hooks/                           # Custom hooks: countdown, audio
├── lib/                             # Business logic, utility, validation
│   ├── admin-auth.ts                # Kiểm tra Basic Auth
│   ├── calendar.ts                  # Tạo link Google Calendar / ICS
│   ├── db.ts                        # Prisma singleton
│   ├── rate-limit.ts                # Rate limiting in-memory
│   ├── slug.ts                      # Tạo slug không dấu
│   ├── utils.ts                     # cn(), formatDateVN()
│   └── validations.ts               # Zod schema cho RSVP, wish, guest
├── prisma/                          # Prisma schema và seed
│   ├── schema.prisma                # Mô hình dữ liệu Guest / Rsvp / Wish
│   └── seed.ts                      # Seed khách mời mẫu
├── public/                          # Tài nguyên tĩnh
│   ├── audio/                       # File nhạc nền
│   ├── images/                      # Ảnh hero/story/gallery
│   └── qr/                          # QR thanh toán
├── styles/globals.css               # Tailwind directives + CSS khởi tạo
├── types/index.ts                   # kiểu dữ liệu cấu hình
├── middleware.ts                    # Middleware chặn /admin
├── package.json                     # Scripts và dependencies
├── next.config.mjs                  # Cấu hình Next.js
├── tailwind.config.ts               # Cấu hình Tailwind
├── tsconfig.json                    # Cấu hình TypeScript
├── README.md                        # Hướng dẫn setup và deploy
├── .env.example                     # Env mẫu
├── .github/                         # Hướng dẫn Copilot / instruction files
├── .specs/                          # Tài liệu spec và template
└── .vscode/                         # Cấu hình editor/MCP
```

## 4. Kiến trúc

Kiến trúc tổng thể là một monolith full-stack theo mô hình layered trong cùng dự án Next.js:

- Presentation layer: app/, components/, hooks/
- Config layer: config/, types/
- API layer: app/api/*/route.ts
- Data access layer: lib/db.ts + Prisma schema
- Cross-cutting concerns: middleware.ts, admin-auth.ts, rate-limit.ts, validations.ts

Luồng dữ liệu cơ bản:

1. Request đến Next.js route
2. Server Component hoặc Route Handler xử lý request
3. Nếu cần, đọc/ghi Prisma database
4. Trả JSX hoặc JSON/CSV/ICS cho client

Các model quan trọng từ schema.prisma:
- Guest: id, name, slug, side, phone, maxSeats, viewCount, createdAt
- Rsvp: guestId (nullable unique), name, attending, seats, message
- Wish: name, content, approved

Tính đối tượng API và UI được tách khá rõ: UI render ở component và page, logic nghiệp vụ nằm trong lib và route handlers. Toàn bộ dữ liệu nội dung thiệp được đặt ở config/site.config.ts để dễ chỉnh mà không làm lộn code UI.

## 5. Entry Point & Luồng khởi động

Entry point chính của ứng dụng là:
- app/layout.tsx: root layout, load font và metadata
- app/page.tsx: render trang public mặc định
- app/[guestSlug]/page.tsx: render trang theo khách mời
- middleware.ts: chặn truy cập /admin/*

Luồng khởi động và hoạt động chính:
1. Request / hoặc /[guestSlug] => App Router render page.
2. Page server component đọc dữ liệu khách mời và tăng viewCount nếu có slug.
3. InvitationPageClient được dùng như client-side shell cho toàn bộ trang thiệp.
4. Khi người dùng bấm "Mở thiệp", MusicPlayer phát file âm thanh.
5. Khi submit RSVP/wish, client gửi request vào app/api/rsvp hoặc app/api/wishes.
6. Route handler validate input bằng Zod, áp dụng rate limit, gọi Prisma rồi trả response.
7. Admin truy cập /admin/* sẽ đi qua middleware để kiểm tra Basic Auth.

## 6. Quy ước code

- Tên biến/hàm/component chủ yếu viết bằng tiếng Anh, trong khi thông báo người dùng chủ yếu tiếng Việt.
- Component React có tên dạng PascalCase, ví dụ: RsvpForm.tsx, MusicPlayer.tsx.
- File utility/hook/config dùng camelCase hoặc tên hợp chuẩn, ví dụ: useCountdown.ts, rate-limit.ts, site.config.ts.
- App Router ưu tiên dùng Server Component; chỉ thêm "use client" khi cần dùng state/effect hoặc tương tác browser.
- Alias @/* được cấu hình trong tsconfig.json.
- Styling chủ yếu dùng Tailwind utility classes; class động có helper cn() trong lib/utils.ts.
- Input từ người dùng được validate bằng Zod trong lib/validations.ts.
- Linter: ESLint with next/core-web-vitals.
- Formatter: Prettier + tailwind plugin.

## 7. Build / Run / Test

```bash
# install
npm install
cp .env.example .env

# database
npx prisma db push
npm run prisma:seed

# run dev server
npm run dev

# production build
npm run build
npm run start

# lint / format
npm run lint
npm run format

# prisma
npm run prisma:generate
npm run prisma:push
```

Lưu ý: dự án hiện chưa có script test và không có test framework nào được cấu hình.

## 8. Điểm cần lưu ý / Nợ kỹ thuật

- Không có test coverage thực tế; repo không có Jest/Vitest/Playwright hay script test.
- Prisma đang dùng PostgreSQL trong schema; cần đảm bảo DATABASE_URL đúng với production DB trước khi deploy.
- Middleware auth và admin-auth chỉ so mật khẩu, không kiểm tra username và không dùng constant-time comparison; đây là điểm rủi ro bảo mật.
- /api/rsvp GET hiện có logic admin gating dựa trên query parameter admin=1, không phải bearer token hoặc middleware bảo vệ rõ ràng.
- Rate limit lưu trong memory map, không thích hợp cho serverless/Vercel production với nhiều instance.
- Dữ liệu và logic khách mời khá gắn với route slug; thiếu handling notFound rõ ràng cho slug không tồn tại và thiếu logging/monitoring rõ ràng.
- Không có file error boundary / not-found boundary tại app/, nên lỗi runtime sẽ mặc định sử dụng UI lỗi của Next.js.
- Tài nguyên media như file âm nhạc / QR / ảnh placeholder có thể thiếu trong public/ nếu không được chuẩn bị đúng trước khi chạy ứng dụng.
