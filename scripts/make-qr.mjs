import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";

const url = process.argv[2];
const outputPath = process.argv[3] ?? "dist/demo-qr.svg";

if (!url) {
  console.error("Usage: npm run qr -- https://your-demo-url.example [output-file]");
  process.exit(1);
}

try {
  new URL(url);
} catch {
  console.error(`Invalid URL: ${url}`);
  process.exit(1);
}

await mkdir(path.dirname(outputPath), { recursive: true });

const svg = await QRCode.toString(url, {
  type: "svg",
  margin: 2,
  color: {
    dark: "#4f463f",
    light: "#ffffff",
  },
  width: 1024,
});

await writeFile(outputPath, svg, "utf8");
console.log(`QR code written to ${outputPath}`);
