import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  groom: {
    name: "Vũ Văn Thái",
    father: "Ông Vũ Văn Thơi",
    mother: "Bà Vũ Thị Hòa",
  },
  bride: {
    name: "Ngô Thị Minh Ánh",
    father: "Ông Ngô Văn Dương",
    mother: "Bà Ngô Thị Hải",
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
      address: "tổ dân phố Giáp 3, xã Quỹ Nhất, Ninh Bình",
      mapUrl: "https://byvn.net/V40b",
      dressCode: "Tông hồng pastel",
    },
    {
      title: "Tiệc Cưới",
      date: "2026-11-20T11:00:00+07:00",
      address: "tổ dân phố Giáp 3, xã Quỹ Nhất, Ninh Bình",
      mapUrl: "https://byvn.net/V40b",
      dressCode: "Lịch sự / trang trọng",
    },
  ],
  bank: [
    {
      owner: "VU VAN THAI",
      bank: "Pvcombank",
      number: "0123456789",
      qr: "/qr/download.jpg",
    },
  ],
  music: "/audio/background.mp3",
  contact: {
    phone: "0337334335",
    email: "thaivv@pvcombank.com.vn",
  },
};
