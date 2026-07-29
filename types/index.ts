export type Side = "GROOM" | "BRIDE" | "BOTH";

export type WeddingEvent = {
  title: string;
  date: string;
  address: string;
  mapUrl: string;
  dressCode?: string;
};

export type BankInfo = {
  owner: string;
  bank: string;
  number: string;
  qr: string;
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
  bank: BankInfo[];
  music: string;
  contact: { phone: string; email?: string };
};
