import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "../styles/globals.css";

// Nạp font kèm subset "vietnamese" để hiển thị đúng các dấu tiếng Việt (ế, ệ, ữ, ợ...)
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Thiệp cưới Thái Vũ & Minh Ánh",
  description: "Thiệp cưới online với RSVP và lời chúc.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Thiệp cưới Thái Vũ & Minh Ánh",
    description: "Trân trọng kính mời bạn tới dự lễ thành hôn.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${playfairDisplay.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
