// Bỏ 0/o/1/l/i để tránh nhầm lẫn khi khách đọc link bằng mắt
const ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";

export function createInviteCode(length = 8) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);

  let code = "";
  for (let i = 0; i < bytes.length; i += 1) {
    code += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return code;
}
