const bucket = new Map<string, number[]>();

export function checkRateLimit(key: string, max = 8, windowMs = 60_000) {
  const now = Date.now();
  const list = bucket.get(key) ?? [];
  const recent = list.filter((ts) => now - ts < windowMs);
  if (recent.length >= max) {
    bucket.set(key, recent);
    return false;
  }
  recent.push(now);
  bucket.set(key, recent);
  return true;
}
