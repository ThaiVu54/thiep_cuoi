// Script nén ảnh gallery: resize tối đa 1920px, JPEG quality 80, mozjpeg.
// Chạy: node scripts/optimize-gallery.mjs
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const GALLERY_DIR = join(process.cwd(), "public", "images", "gallery");
const MAX_WIDTH = 1920;
const QUALITY = 80;

function fmt(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

async function run() {
  const files = (await readdir(GALLERY_DIR)).filter((f) =>
    /\.(jpe?g)$/i.test(f),
  );

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const inputPath = join(GALLERY_DIR, file);
    const tmpPath = join(GALLERY_DIR, `.tmp-${file}`);

    const before = (await stat(inputPath)).size;
    totalBefore += before;

    await sharp(inputPath)
      .rotate() // giữ đúng hướng theo EXIF trước khi xoá metadata
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(tmpPath);

    await unlink(inputPath);
    await rename(tmpPath, inputPath);

    const after = (await stat(inputPath)).size;
    totalAfter += after;

    console.log(`${file}: ${fmt(before)} -> ${fmt(after)}`);
  }

  console.log("----------------------------------------");
  console.log(`Tổng: ${fmt(totalBefore)} -> ${fmt(totalAfter)}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
