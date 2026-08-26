export type Side = "GROOM" | "BRIDE" | "BOTH";

export type WeddingEvent = {
  title: string;
  date: string;
  address: string;
  mapUrl: string;
  /** URL nhúng iframe (google.com/maps?...&output=embed); khác với mapUrl (link mở tab mới) */
  mapEmbedUrl?: string;
  dressCode?: string;
};

export type BankInfo = {
  owner: string;
  bank: string;
  number: string;
  qr: string;
};

export type LocationInfo = {
  label: string;
  address: string;
  /** Link mở Google Maps ở tab mới (nút Chỉ đường) */
  mapUrl: string;
  /** URL nhúng iframe (google.com/maps?...&output=embed) */
  mapEmbedUrl?: string;
};

export type SiteConfig = {
  groom: { name: string; father: string; mother: string };
  bride: { name: string; father: string; mother: string };
  weddingDate: string;
  venueName: string;
  invitationTitle: string;
  invitationMessage: string;
  story: Array<{ title: string; date: string; content: string; image: string }>;
  gallery: string[];
  events: WeddingEvent[];
  locations: { groom: LocationInfo; bride: LocationInfo };
  bank: BankInfo[];
  music: string;
  contact: { phone: string; email?: string };
  contact1: { phone: string; email?: string };
};
