import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Thiệp cưới Thái Vũ & Ngọc Anh",
  description: "Thiệp cưới online với RSVP và lời chúc.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Thiệp cưới Thái Vũ & Ngọc Anh",
    description: "Trân trọng kính mời bạn tới dự lễ thành hôn.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
