export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDateVN(input: string) {
  return new Date(input).toLocaleString("vi-VN", {
    dateStyle: "full",
    timeStyle: "short",
  });
}
