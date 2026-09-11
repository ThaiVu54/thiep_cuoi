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
    "/images/gallery/_MEL3432.jpg",
    "/images/gallery/_MEL3808.jpg",
    "/images/gallery/_MEL8054.jpg",
    "/images/gallery/_MEL8177.jpg",
    "/images/gallery/_MEL8669.jpg",
    "/images/gallery/_MEL8492.jpg",
  ],
  events: [
    {
      title: "Lễ Vu Quy",
      date: "2026-11-20T09:00:00+07:00",
      address: "tổ dân phố Giáp 3, xã Quỹ Nhất, Ninh Bình",
      mapUrl: "https://byvn.net/V40b",
      mapEmbedUrl: "https://www.google.com/maps?q=20.0506377,106.1707825&z=17&output=embed",
      dressCode: "Tông hồng pastel",
    },
    {
      title: "Tiệc Cưới",
      date: "2026-11-20T11:00:00+07:00",
      address: "tổ dân phố Giáp 3, xã Quỹ Nhất, Ninh Bình",
      mapUrl: "https://byvn.net/V40b",
      mapEmbedUrl: "https://www.google.com/maps?q=20.0506377,106.1707825&z=17&output=embed",
      dressCode: "Lịch sự / trang trọng",
    },
  ],
  locations: {
    groom: {
      label: "Nhà trai",
      address: "tổ dân phố Giáp 3, xã Quỹ Nhất, Ninh Bình",
      mapUrl: "https://byvn.net/V40b",
      mapEmbedUrl: "https://www.google.com/maps?q=20.0506377,106.1707825&z=17&output=embed",
    },
    bride: {
      label: "Nhà gái",
      address: "659M+W83, khu phố 2, Nghĩa Hưng, Ninh Bình, Việt Nam",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=20.2197074,106.1834315",
      mapEmbedUrl: "https://www.google.com/maps?q=20.2197074,106.1834315&z=17&output=embed",
    },
  },
  bank: [
    {
      owner: "VU VAN THAI",
      bank: "Pvcombank",
      number: "108003212015",
      qr: "/qr/download.jpg?v=20260809",
    },
  ],
  music: "/audio/background.mp3",
  contact: {
    phone: "0337334335",
    email: "Nghĩa tân",
  },
  contact1: {
    phone: "0862594196",
    email: "Nghĩa Hưng",
  },
};
