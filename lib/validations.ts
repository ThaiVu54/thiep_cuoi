import { z } from "zod";

export const rsvpSchema = z.object({
  guestSlug: z.string().optional(),
  name: z.string().min(2, "Tên cần ít nhất 2 ký tự").max(80),
  attending: z.boolean(),
  seats: z.coerce.number().int().min(1).max(10),
  message: z.string().max(300).optional().or(z.literal("")),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});

export const wishSchema = z.object({
  name: z.string().min(2, "Tên cần ít nhất 2 ký tự").max(80),
  content: z.string().min(3, "Lời chúc quá ngắn").max(500),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});
