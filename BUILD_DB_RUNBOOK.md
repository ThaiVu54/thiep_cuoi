# Build va Database Runbook

Tai lieu nay tong hop nhanh cac thanh phan build/deploy va cach kiem tra database cho du an.

## 1. Tong quan ky thuat

- Framework: Next.js 14 (App Router)
- Ngon ngu: TypeScript
- ORM: Prisma
- Database: PostgreSQL (Neon)
- Runtime: Node.js
- Hosting: Vercel

## 2. Lenh quan trong

Trong [package.json](package.json):

- dev: `next dev`
- build: `prisma generate && next build`
- start: `next start`
- prisma:generate: `prisma generate`
- prisma:push: `prisma db push`
- prisma:seed: `tsx prisma/seed.ts`

## 3. Luong build va deploy

### Local build check

```bash
npm install
npx prisma db push
npm run prisma:seed
npm run build
npm run dev
```

### Production deploy (Vercel)

```bash
npx vercel --prod --yes
```

URL production dang alias:

- https://thiep-cuoi-beige.vercel.app

## 4. Bien moi truong bat buoc

- DATABASE_URL: chuoi ket noi PostgreSQL
- ADMIN_PASSWORD: mat khau cho route admin Basic Auth
- NEXT_PUBLIC_SITE_URL: domain public cua website

File mau tham chieu:

- [.env.example](.env.example)

## 5. Cau hinh Prisma DB

Trong [prisma/schema.prisma](prisma/schema.prisma):

- datasource provider: postgresql
- datasource url: env(DATABASE_URL)

Bang du lieu chinh:

- Guest
- Rsvp
- Wish

## 6. Checklist kiem tra DB nhanh

### A. Kiem tra ket noi Prisma

```bash
npx prisma db push
```

Ket qua mong doi:

- Khong co loi P1001
- Co dong bao da dong bo schema thanh cong

### B. Kiem tra seed du lieu

```bash
npm run prisma:seed
```

### C. Kiem tra API ghi doc du lieu

1) Tao RSVP test:

```bash
curl -X POST https://thiep-cuoi-beige.vercel.app/api/rsvp \
  -H "content-type: application/json" \
  -d '{"name":"Test User","attending":true,"seats":1,"message":"test","honeypot":""}'
```

2) Doc danh sach RSVP (admin):

```bash
# tao header Basic Auth dang :ADMIN_PASSWORD
AUTH=$(printf ':123456' | base64)
curl "https://thiep-cuoi-beige.vercel.app/api/rsvp?admin=1" \
  -H "authorization: Basic $AUTH"
```

3) Tao wish test:

```bash
curl -X POST https://thiep-cuoi-beige.vercel.app/api/wishes \
  -H "content-type: application/json" \
  -d '{"name":"Test User","content":"chuc mung","honeypot":""}'
```

## 7. Loi thuong gap va cach xu ly

### Loi P1001: khong ket noi duoc DB

Nguyen nhan thuong gap:

- DATABASE_URL sai host/port
- DATABASE_URL bi ghi de boi env khac
- DB service bi tat

Cach kiem tra:

```bash
node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL)"
```

Neu thay localhost khi dang dung Neon, can sua lai file [.env](.env) hoac env tren Vercel.

## 8. Bao mat

- Khong commit DATABASE_URL that hoac password that vao git.
- Nen rotate password Neon neu tung chia se URL cong khai.
- Tren Vercel, de DATABASE_URL o che do Sensitive cho Production/Preview.

## 9. Quy trinh release chuan

### A. Pre-check truoc khi deploy

- [ ] Kiem tra env local va Vercel da co `DATABASE_URL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL`.
- [ ] Chay build local thanh cong:

```bash
npm run build
```

- [ ] Kiem tra schema DB sync thanh cong:

```bash
npx prisma db push
```

- [ ] Neu can du lieu mau, chay seed:

```bash
npm run prisma:seed
```

### B. Deploy production (auto tu nhanh dev)

Mac dinh su dung GitHub Actions workflow:

- File workflow: `.github/workflows/vercel-prod-from-dev.yml`
- Trigger: moi lan push len nhanh `dev`

One-time setup tren GitHub repo:

1) Vao `Settings -> Secrets and variables -> Actions`.
2) Tao secret sau:
- `VERCEL_TOKEN`: token tao tu Vercel account settings.

Ghi chu: `VERCEL_ORG_ID` va `VERCEL_PROJECT_ID` da duoc co dinh trong workflow cho project hien tai.

Sau khi setup xong, moi commit push len `dev` se tu dong build va deploy production.

Neu can deploy khan cap thu cong, dung lenh:

```bash
npx vercel --prod --yes
```

Sau khi deploy xong, ghi lai 2 thong tin:

- Deploy inspect URL (tu output CLI)
- Production alias URL (du an hien tai: https://thiep-cuoi-beige.vercel.app)

### C. Post-check sau deploy

1) Kiem tra trang chu:

```bash
curl -I https://thiep-cuoi-beige.vercel.app
```

Mong doi: HTTP `200 OK`.

2) Kiem tra API ghi RSVP:

```bash
curl -X POST https://thiep-cuoi-beige.vercel.app/api/rsvp \
  -H "content-type: application/json" \
  -d '{"name":"Release Check","attending":true,"seats":1,"message":"post-deploy check","honeypot":""}'
```

Mong doi: tra ve `{"ok":true}`.

3) Kiem tra API doc RSVP (admin):

```bash
AUTH=$(printf ':123456' | base64)
curl "https://thiep-cuoi-beige.vercel.app/api/rsvp?admin=1" \
  -H "authorization: Basic $AUTH"
```

Mong doi: co field `data` va thay ban ghi vua tao.

4) Kiem tra API ghi wish:

```bash
curl -X POST https://thiep-cuoi-beige.vercel.app/api/wishes \
  -H "content-type: application/json" \
  -d '{"name":"Release Check","content":"wish check","honeypot":""}'
```

Mong doi: tra ve `{"ok":true}`.

### D. Rollback nhanh neu co su co

1) Vao Vercel project -> Deployments.
2) Chon deployment on dinh truoc do.
3) Re-promote deployment do lam production.
4) Chay lai checklist Post-check o muc C.
