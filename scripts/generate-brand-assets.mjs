import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const brandDirectory = path.resolve("public/assets/brand");
const masterPath = path.join(brandDirectory, "logo-master.png");
const midnight = { r: 5, g: 11, b: 24, alpha: 1 };

function clamp(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

async function extractedLockup() {
  const image = sharp(masterPath).ensureAlpha();
  const { width = 0, height = 0 } = await image.metadata();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const output = Buffer.alloc(data.length);

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const index = (y * info.width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const maximum = Math.max(r, g, b);
      const minimum = Math.min(r, g, b);
      const saturation = maximum === 0 ? 0 : (maximum - minimum) / maximum;
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const isSymbolRegion = x < width * 0.37;
      const symbolAlpha = isSymbolRegion && saturation > 0.34 && maximum > 86
        ? (maximum - 64) * 3.2
        : 0;
      const wordmarkAlpha = !isSymbolRegion && saturation < 0.18 && luminance > 112
        ? (luminance - 92) * 2.4
        : 0;
      const alpha = clamp(Math.max(symbolAlpha, wordmarkAlpha));

      output[index] = r;
      output[index + 1] = g;
      output[index + 2] = b;
      output[index + 3] = alpha;
    }
  }

  return sharp(output, { raw: info })
    .extract({
      left: Math.round(width * 0.105),
      top: Math.round(height * 0.235),
      width: Math.round(width * 0.83),
      height: Math.round(height * 0.49),
    })
    .png()
    .toBuffer();
}

async function recolorWordmark(lockup, color) {
  const image = sharp(lockup).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  for (let y = 0; y < info.height; y += 1) {
    for (let x = Math.round(info.width * 0.31); x < info.width; x += 1) {
      const index = (y * info.width + x) * 4;
      if (data[index + 3] === 0) continue;
      data[index] = color.r;
      data[index + 1] = color.g;
      data[index + 2] = color.b;
    }
  }
  return sharp(data, { raw: info }).png().toBuffer();
}

async function monochrome(lockup, color) {
  const { data, info } = await sharp(lockup).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let index = 0; index < data.length; index += 4) {
    data[index] = color.r;
    data[index + 1] = color.g;
    data[index + 2] = color.b;
  }
  return sharp(data, { raw: info }).png().toBuffer();
}

async function iconFromLockup(lockup) {
  const { width = 0, height = 0 } = await sharp(lockup).metadata();
  return sharp(lockup)
    .extract({ left: 0, top: 0, width: Math.round(width * 0.31), height })
    .resize(448, 448, { fit: "contain" })
    .extend({ top: 32, right: 32, bottom: 32, left: 32, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

async function wordmarkFromLockup(lockup) {
  const { width = 0, height = 0 } = await sharp(lockup).metadata();
  const left = Math.round(width * 0.31);
  return sharp(lockup)
    .extract({ left, top: 0, width: width - left, height })
    .png()
    .toBuffer();
}

async function appIcon(icon, size, padding, destination) {
  const foreground = await sharp(icon)
    .resize(size - padding * 2, size - padding * 2, { fit: "contain" })
    .png()
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: midnight } })
    .composite([{ input: foreground, gravity: "center" }])
    .png()
    .toFile(path.join(brandDirectory, destination));
}

async function socialImage(width, height, destination) {
  const lockup = await sharp(masterPath)
    .resize(width, height, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();
  await fs.writeFile(path.join(brandDirectory, destination), lockup);
}

function icoFromPng(png) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(0, 6);
  header.writeUInt8(0, 7);
  header.writeUInt8(0, 8);
  header.writeUInt8(0, 9);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18);
  return Buffer.concat([header, png]);
}

const lockup = await extractedLockup();
const dark = await recolorWordmark(lockup, { r: 246, g: 247, b: 249 });
const light = await recolorWordmark(lockup, { r: 11, g: 18, b: 32 });
const white = await monochrome(lockup, { r: 246, g: 247, b: 249 });
const black = await monochrome(lockup, { r: 11, g: 18, b: 32 });
const icon = await iconFromLockup(lockup);
const wordmarkDark = await wordmarkFromLockup(dark);
const wordmarkLight = await wordmarkFromLockup(light);
const wordmarkWhite = await wordmarkFromLockup(white);
const wordmarkBlack = await wordmarkFromLockup(black);

await Promise.all([
  fs.writeFile(path.join(brandDirectory, "logo-dark.png"), dark),
  fs.writeFile(path.join(brandDirectory, "logo-light.png"), light),
  fs.writeFile(path.join(brandDirectory, "logo-white.png"), white),
  fs.writeFile(path.join(brandDirectory, "logo-black.png"), black),
  fs.writeFile(path.join(brandDirectory, "logo-icon.png"), icon),
  fs.writeFile(path.join(brandDirectory, "wordmark-dark.png"), wordmarkDark),
  fs.writeFile(path.join(brandDirectory, "wordmark-light.png"), wordmarkLight),
  fs.writeFile(path.join(brandDirectory, "wordmark-white.png"), wordmarkWhite),
  fs.writeFile(path.join(brandDirectory, "wordmark-black.png"), wordmarkBlack),
]);

const faviconPng = await sharp(icon).resize(256, 256).png().toBuffer();
await fs.writeFile(path.join(brandDirectory, "favicon.png"), faviconPng);
await fs.writeFile(path.join(brandDirectory, "favicon.ico"), icoFromPng(faviconPng));
await appIcon(icon, 180, 20, "apple-touch-icon.png");
await appIcon(icon, 192, 24, "android-chrome-192x192.png");
await appIcon(icon, 512, 64, "android-chrome-512x512.png");
await appIcon(icon, 512, 92, "android-chrome-maskable-512x512.png");
await socialImage(1200, 630, "opengraph-image.png");
await socialImage(1200, 600, "twitter-image.png");

console.log("Generated official VAYON derivatives from public/assets/brand/logo-master.png");
