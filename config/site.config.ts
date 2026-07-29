import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  groom: {
    name: "Thái Vũ",
    father: "Ông Nguyễn Văn A",
    mother: "Bà Trần Thị B",
  },
  bride: {
    name: "Ngọc Anh",
    father: "Ông Lê Văn C",
    mother: "Bà Phạm Thị D",
  },
  weddingDate: "2026-11-20T11:00:00+07:00",
  venueName: "Trung Tâm Hội Nghị Hạnh Phúc",
  invitationTitle: "Trân trọng kính mời",
  invitationMessage:
    "Sự hiện diện của bạn là niềm vinh hạnh lớn nhất trong ngày trọng đại của chúng mình.",
  story: [
    {
      title: "Lần đầu gặp gỡ",
      date: "03/2019",
      content: "Một buổi chiều mưa, chúng mình gặp nhau tại quán cà phê quen.",
      image: "/images/story/story-1.svg",
    },
    {
      title: "Bắt đầu hẹn hò",
      date: "08/2020",
      content: "Sau nhiều lần trò chuyện, cả hai quyết định đồng hành cùng nhau.",
      image: "/images/story/story-2.svg",
    },
    {
      title: "Lời cầu hôn",
      date: "12/2025",
      content: "Một lời hứa, một chiếc nhẫn và hành trình mới chính thức bắt đầu.",
      image: "/images/story/story-3.svg",
    },
  ],
  gallery: [
    "/images/gallery/gallery-1.svg",
    "/images/gallery/gallery-2.svg",
    "/images/gallery/gallery-3.svg",
    "/images/gallery/gallery-4.svg",
  ],
  events: [
    {
      title: "Lễ Vu Quy",
      date: "2026-11-20T09:00:00+07:00",
      address: "123 Đường Hoa Hồng, Quận 1, TP.HCM",
      mapUrl: "https://maps.google.com/?q=10.774,106.699",
      dressCode: "Tông hồng pastel",
    },
    {
      title: "Tiệc Cưới",
      date: "2026-11-20T11:00:00+07:00",
      address: "Nhà hàng Hạnh Phúc, 45 Lê Lợi, TP.HCM",
      mapUrl: "https://maps.google.com/?q=10.776,106.703",
      dressCode: "Lịch sự / trang trọng",
    },
  ],
  bank: [
    {
      owner: "NGUYEN THAI VU",
      bank: "Vietcombank",
      number: "0123456789",
      qr: "/qr/bank-qr.svg",
    },
  ],
  music: "/audio/background.mp3",
  contact: {
    phone: "0909 123 456",
    email: "thai.vu@example.com",
  },
};
