import { useMemo, useState } from "react";
import giftIcon from "../../assets/monthly-bouquet/gift.png";
import bouquetBack from "../../assets/monthly-bouquet/bouquet-back.png";
import bouquetFront from "../../assets/monthly-bouquet/bouquet-front.png";
import messageCard from "../../assets/monthly-bouquet/message-card.png";
import graduationCap from "../../assets/monthly-bouquet/graduation.png";
import downloadIcon from "../../assets/monthly-bouquet/download.png";
import shareIcon from "../../assets/monthly-bouquet/share.png";
import { FLOWERS, clampFlowerIndex } from "../../utils/flowers";
import type { AppLanguage } from "../../utils/i18n";
import { recordsInMonth, type StoredEmotionRecord } from "../../utils/records";

export type BouquetPeriod = {
  year: number;
  month: number;
};

type BouquetLayoutItem = {
  flowerIndex: number;
  height: number;
  id: string;
  left: number;
  rotate: number;
  top: number;
  width: number;
  zIndex: number;
};

const MONTH_NAMES_ZH = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
const MONTH_NAMES_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const BOUQUET_CENTER_X = 201;
const BOUQUET_FLOWER_Y_OFFSET = 144;
const BOUQUET_SIZE_MULTIPLIER = 1.1;
const SHARE_IMAGE_WIDTH = 1080;
const SHARE_IMAGE_HEIGHT = 1920;
const SHARE_SCENE_SCALE = 2.05;
const SHARE_SCENE_CARD_TOP = 500;
const MESSAGE_CARD_FRAME = { left: 18, top: 236, width: 174, height: 261 };
const MESSAGE_CARD_TEXT = { centerX: 86, centerY: 104, width: 138, rotate: -13 };
const GRADUATION_CAP_FRAME = { left: 248, top: 238, width: 130, height: 195 };

const BOUQUET_CARD_MESSAGES = [
  {
    zh: "慢慢來，\n花會替你記得",
    en: "Take it slow.\nThe flowers remember.",
  },
  {
    zh: "這個月的你，\n也值得被收藏",
    en: "This month of you\nis worth keeping.",
  },
  {
    zh: "辛苦了，\n你已經走很遠了",
    en: "You made it\nso far already.",
  },
  {
    zh: "把沉重放下，\n把花留下",
    en: "Leave the weight.\nKeep the flowers.",
  },
  {
    zh: "新的路，\n會慢慢長出光",
    en: "A new path\nwill find light.",
  },
];

const BOUQUET_HEAD_SLOTS = [
  { x: 201, y: 250, scale: 1.05, rotate: 0 },
  { x: 150, y: 250, scale: 1, rotate: -7 },
  { x: 252, y: 252, scale: 1, rotate: 7 },
  { x: 198, y: 214, scale: 1.02, rotate: -2 },
  { x: 132, y: 266, scale: 0.96, rotate: -20 },
  { x: 270, y: 274, scale: 0.96, rotate: 20 },
  { x: 174, y: 322, scale: 1.02, rotate: -4 },
  { x: 226, y: 324, scale: 1.02, rotate: 4 },
  { x: 122, y: 292, scale: 0.86, rotate: -24 },
  { x: 260, y: 300, scale: 0.98, rotate: 34 },
  { x: 130, y: 224, scale: 0.86, rotate: -14 },
  { x: 272, y: 225, scale: 0.86, rotate: 14 },
  { x: 201, y: 358, scale: 0.96, rotate: 0 },
  { x: 118, y: 312, scale: 0.78, rotate: -26 },
  { x: 284, y: 314, scale: 0.78, rotate: 26 },
  { x: 140, y: 378, scale: 0.86, rotate: -12 },
  { x: 262, y: 380, scale: 0.86, rotate: 12 },
  { x: 166, y: 382, scale: 0.84, rotate: -7 },
  { x: 236, y: 386, scale: 0.84, rotate: 7 },
  { x: 201, y: 306, scale: 0.86, rotate: 0 },
  { x: 112, y: 254, scale: 0.78, rotate: -17 },
  { x: 290, y: 256, scale: 0.78, rotate: 17 },
  { x: 124, y: 390, scale: 0.7, rotate: -28 },
  { x: 278, y: 394, scale: 0.7, rotate: 28 },
  { x: 201, y: 190, scale: 0.78, rotate: 0 },
  { x: 154, y: 344, scale: 0.78, rotate: -8 },
  { x: 248, y: 346, scale: 0.78, rotate: 8 },
  { x: 180, y: 242, scale: 0.74, rotate: -5 },
  { x: 222, y: 242, scale: 0.74, rotate: 5 },
  { x: 136, y: 416, scale: 0.68, rotate: -26 },
  { x: 266, y: 416, scale: 0.68, rotate: 26 },
];

const BOUQUET_FLOWER_SCALE = [1.04, 0.94, 1.06, 0.98, 1.06, 1.06, 1.08, 1.08, 1, 1.04, 0.98, 1];
const WIDE_BOUQUET_FLOWERS = new Set([2, 5, 6, 7, 8]);

export function previousMonthPeriod(baseDate = new Date()): BouquetPeriod {
  const previousMonth = new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, 1);
  return {
    year: previousMonth.getFullYear(),
    month: previousMonth.getMonth() + 1,
  };
}

export function bouquetPeriodKey(period: BouquetPeriod) {
  return `${period.year}-${String(period.month).padStart(2, "0")}`;
}

export function bouquetMonthName(period: BouquetPeriod, language: AppLanguage = "zh") {
  const monthIndex = period.month - 1;
  return language === "en" ? MONTH_NAMES_EN[monthIndex] : MONTH_NAMES_ZH[monthIndex];
}

export function bouquetArrivalTitle(period: BouquetPeriod, language: AppLanguage = "zh") {
  const monthName = bouquetMonthName(period, language);
  return language === "en" ? `${monthName} bouquet delivered` : `${monthName}花束已送達`;
}

function bouquetArrivalSubtitle(period: BouquetPeriod, language: AppLanguage = "zh") {
  const monthName = bouquetMonthName(period, language);
  return language === "en"
    ? `You can revisit it from the ${monthName} gift in the calendar.`
    : `之後也可以到月曆的${monthName}禮物中再次查看。`;
}

export function monthlyFlowerIndexes(records: StoredEmotionRecord[], year: number, month: number) {
  return recordsInMonth(records, year, month)
    .slice()
    .reverse()
    .map((record) => clampFlowerIndex(record.flowerIndex))
    .filter((flowerIndex) => flowerIndex >= 0 && flowerIndex < FLOWERS.length);
}

function bouquetBaseHeight(count: number) {
  if (count <= 8) return 166;
  if (count <= 14) return 150;
  if (count <= 20) return 136;
  if (count <= 26) return 122;
  return 112;
}

function bouquetFlowerLayout(flowerIndexes: number[]): BouquetLayoutItem[] {
  const baseHeight = bouquetBaseHeight(flowerIndexes.length);

  return flowerIndexes.map((flowerIndex, index) => {
    const slot = BOUQUET_HEAD_SLOTS[index % BOUQUET_HEAD_SLOTS.length];
    const pass = Math.floor(index / BOUQUET_HEAD_SLOTS.length);
    const layerOffset = pass * 9;
    const side = slot.x >= BOUQUET_CENTER_X ? 1 : -1;
    const flowerScale = BOUQUET_FLOWER_SCALE[flowerIndex] ?? 1;
    const height = Math.round(baseHeight * slot.scale * flowerScale * BOUQUET_SIZE_MULTIPLIER * Math.max(0.76, 1 - pass * 0.08));
    const widthRatio = WIDE_BOUQUET_FLOWERS.has(flowerIndex) ? 0.84 : 0.68;
    const width = Math.round(height * widthRatio);
    const x = slot.x + side * layerOffset;
    const y = slot.y + pass * 12 + BOUQUET_FLOWER_Y_OFFSET;
    const outwardRotate = Math.max(-18, Math.min(18, (x - BOUQUET_CENTER_X) / 8));
    const rotate = slot.rotate + outwardRotate * 0.55;

    return {
      id: `${flowerIndex}-${index}`,
      flowerIndex,
      height,
      left: Math.round(x - width / 2),
      rotate,
      top: Math.round(y - height * 0.34),
      width,
      zIndex: Math.min(58, Math.max(20, Math.round((y - 170) / 8))),
    };
  });
}

function bouquetCardMessage(flowerIndexes: number[], period: BouquetPeriod, language: AppLanguage = "zh") {
  const flowerSeed = flowerIndexes.reduce((total, flowerIndex, index) => {
    return total + (flowerIndex + 1) * (index + 3);
  }, 0);
  const seed = period.year * 37 + period.month * 17 + flowerSeed;
  const message = BOUQUET_CARD_MESSAGES[Math.abs(seed) % BOUQUET_CARD_MESSAGES.length];
  return language === "en" ? message.en : message.zh;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawContainImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  left: number,
  top: number,
  width: number,
  height: number,
) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const renderedWidth = image.naturalWidth * scale;
  const renderedHeight = image.naturalHeight * scale;
  context.drawImage(
    image,
    left + (width - renderedWidth) / 2,
    top + (height - renderedHeight) / 2,
    renderedWidth,
    renderedHeight,
  );
}

function drawMessageCard(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  message: string,
  originX: number,
  originY: number,
  scale: number,
  language: AppLanguage,
) {
  drawContainImage(
    context,
    image,
    originX + MESSAGE_CARD_FRAME.left * scale,
    originY + MESSAGE_CARD_FRAME.top * scale,
    MESSAGE_CARD_FRAME.width * scale,
    MESSAGE_CARD_FRAME.height * scale,
  );

  context.save();
  context.translate(
    originX + (MESSAGE_CARD_FRAME.left + MESSAGE_CARD_TEXT.centerX) * scale,
    originY + (MESSAGE_CARD_FRAME.top + MESSAGE_CARD_TEXT.centerY) * scale,
  );
  context.rotate((MESSAGE_CARD_TEXT.rotate * Math.PI) / 180);
  context.fillStyle = "#7d6d60";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = language === "en"
    ? `500 ${15 * scale}px "ChenYuluoyan 2.0 Thin", "Noto Sans TC", sans-serif`
    : `500 ${20 * scale}px "ChenYuluoyan 2.0 Thin", "Noto Sans TC", sans-serif`;

  const lines = message.split("\n");
  const lineGap = (language === "en" ? 21 : 27) * scale;
  lines.forEach((line, index) => {
    context.fillText(line, 0, (index - (lines.length - 1) / 2) * lineGap, MESSAGE_CARD_TEXT.width * scale);
  });
  context.restore();
}

function drawGraduationCap(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  originX: number,
  originY: number,
  scale: number,
) {
  drawContainImage(
    context,
    image,
    originX + GRADUATION_CAP_FRAME.left * scale,
    originY + GRADUATION_CAP_FRAME.top * scale,
    GRADUATION_CAP_FRAME.width * scale,
    GRADUATION_CAP_FRAME.height * scale,
  );
}

function clipBouquetFlowerLayer(context: CanvasRenderingContext2D, originX: number, originY: number, scale: number) {
  const points = [
    [0, 0],
    [402, 0],
    [402, 471.96],
    [337.68, 471.96],
    [293.46, 576.84],
    [249.24, 681.72],
    [233.16, 751.64],
    [168.84, 751.64],
    [152.76, 681.72],
    [108.54, 576.84],
    [64.32, 471.96],
    [0, 471.96],
  ];

  context.beginPath();
  points.forEach(([x, y], index) => {
    const canvasX = originX + x * scale;
    const canvasY = originY + y * scale;
    if (index === 0) context.moveTo(canvasX, canvasY);
    else context.lineTo(canvasX, canvasY);
  });
  context.closePath();
  context.clip();
}

function drawRotatedFlower(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  item: BouquetLayoutItem,
  originX: number,
  originY: number,
  scale: number,
) {
  const left = originX + item.left * scale;
  const top = originY + item.top * scale;
  const width = item.width * scale;
  const height = item.height * scale;
  const transformOriginX = width * 0.5;
  const transformOriginY = height * 0.92;

  context.save();
  context.translate(left + transformOriginX, top + transformOriginY);
  context.rotate((item.rotate * Math.PI) / 180);
  context.beginPath();
  context.rect(-transformOriginX, -transformOriginY, width, height * 0.78);
  context.clip();
  context.drawImage(image, -transformOriginX, -transformOriginY, width, height);
  context.restore();
}

function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Unable to create bouquet image"));
    }, "image/png");
  });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function bouquetFilename(period: BouquetPeriod, language: AppLanguage) {
  return language === "en"
    ? `${bouquetMonthName(period, language)}-bouquet.png`
    : `${bouquetMonthName(period, language)}花束.png`;
}

function bouquetSharePeriodLabel(period: BouquetPeriod) {
  return `${period.year}/${String(period.month).padStart(2, "0")}`;
}

function drawBouquetShareBackground(context: CanvasRenderingContext2D) {
  const gradient = context.createLinearGradient(0, 0, 0, SHARE_IMAGE_HEIGHT);
  gradient.addColorStop(0, "#e9ded4");
  gradient.addColorStop(0.5, "#c9bdb2");
  gradient.addColorStop(1, "#9b8d80");
  context.fillStyle = gradient;
  context.fillRect(0, 0, SHARE_IMAGE_WIDTH, SHARE_IMAGE_HEIGHT);

  const glow = context.createRadialGradient(470, 600, 120, 540, 700, 760);
  glow.addColorStop(0, "rgba(255, 250, 245, 0.24)");
  glow.addColorStop(0.55, "rgba(255, 250, 245, 0.08)");
  glow.addColorStop(1, "rgba(255, 250, 245, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, SHARE_IMAGE_WIDTH, SHARE_IMAGE_HEIGHT);
}

function drawBouquetShareFooter(context: CanvasRenderingContext2D, period: BouquetPeriod) {
  context.save();
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "rgba(255, 255, 255, 0.9)";
  context.shadowColor = "rgba(70, 58, 48, 0.18)";
  context.shadowBlur = 14;
  context.font = '300 58px "ChenYuluoyan 2.0 Thin", "Noto Sans TC", sans-serif';
  context.fillText("情緒碎紙機", SHARE_IMAGE_WIDTH / 2, 1628);
  context.font = '300 36px "ChenYuluoyan 2.0 Thin", "Noto Sans TC", sans-serif';
  context.fillText(bouquetSharePeriodLabel(period), SHARE_IMAGE_WIDTH / 2, 1704);
  context.restore();
}

async function createBouquetShareBlob(flowerIndexes: number[], period: BouquetPeriod, language: AppLanguage) {
  const canvas = document.createElement("canvas");
  canvas.width = SHARE_IMAGE_WIDTH;
  canvas.height = SHARE_IMAGE_HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not available");
  if ("fonts" in document) await document.fonts.ready;

  const [backImage, frontImage, cardImage, capImage, ...flowerImages] = await Promise.all([
    loadImage(bouquetBack),
    loadImage(bouquetFront),
    loadImage(messageCard),
    loadImage(graduationCap),
    ...FLOWERS.map((flower) => loadImage(flower.imageSrc)),
  ]);
  const layout = bouquetFlowerLayout(flowerIndexes);
  const cardMessage = bouquetCardMessage(flowerIndexes, period, language);

  drawBouquetShareBackground(context);

  const sceneScale = SHARE_SCENE_SCALE;
  const sceneOriginX = SHARE_IMAGE_WIDTH / 2 - 201 * sceneScale;
  const sceneOriginY = SHARE_SCENE_CARD_TOP - MESSAGE_CARD_FRAME.top * sceneScale;
  drawContainImage(context, backImage, sceneOriginX, sceneOriginY + 318 * sceneScale, 402 * sceneScale, 360 * sceneScale);
  drawMessageCard(context, cardImage, cardMessage, sceneOriginX, sceneOriginY, sceneScale, language);
  drawGraduationCap(context, capImage, sceneOriginX, sceneOriginY, sceneScale);

  context.save();
  clipBouquetFlowerLayer(context, sceneOriginX, sceneOriginY, sceneScale);
  layout
    .slice()
    .sort((a, b) => a.zIndex - b.zIndex)
    .forEach((item) => {
      const image = flowerImages[item.flowerIndex];
      if (image) drawRotatedFlower(context, image, item, sceneOriginX, sceneOriginY, sceneScale);
    });
  context.restore();

  drawContainImage(context, frontImage, sceneOriginX, sceneOriginY + 318 * sceneScale, 402 * sceneScale, 360 * sceneScale);
  drawBouquetShareFooter(context, period);

  return canvasToBlob(canvas);
}

export function BouquetGiftButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      aria-label="Open monthly bouquet"
      className="absolute bottom-[169px] right-[24px] z-30 size-[58px] bg-transparent p-0"
      onClick={onClick}
      type="button"
    >
      <img alt="" aria-hidden="true" className="h-full w-full object-contain" draggable={false} src={giftIcon} />
    </button>
  );
}

export function MonthlyBouquetOverlay({
  flowerIndexes,
  language = "zh",
  onClose,
  period,
}: {
  flowerIndexes: number[];
  language?: AppLanguage;
  onClose: () => void;
  period: BouquetPeriod;
}) {
  const layout = useMemo(() => bouquetFlowerLayout(flowerIndexes), [flowerIndexes]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const title = bouquetArrivalTitle(period, language);
  const subtitle = bouquetArrivalSubtitle(period, language);
  const cardMessage = bouquetCardMessage(flowerIndexes, period, language);
  const isBusy = isDownloading || isSharing;

  const downloadBouquet = async () => {
    if (isBusy) return;

    setIsDownloading(true);
    try {
      const blob = await createBouquetShareBlob(flowerIndexes, period, language);
      downloadBlob(blob, bouquetFilename(period, language));
    } catch (err) {
      console.warn("Failed to download monthly bouquet:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const shareBouquet = async () => {
    if (isBusy) return;

    setIsSharing(true);
    try {
      const blob = await createBouquetShareBlob(flowerIndexes, period, language);
      const filename = bouquetFilename(period, language);
      const file = new File([blob], filename, { type: "image/png" });
      const shareData: ShareData = {
        files: [file],
        title,
      };

      if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
        await navigator.share(shareData);
      } else {
        downloadBlob(blob, filename);
      }
    } catch (err) {
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        console.warn("Failed to share monthly bouquet:", err);
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div
      aria-modal="true"
      className="monthly-bouquet-overlay absolute inset-0 z-[80] bg-black/60 backdrop-blur-[1px]"
      onClick={onClose}
      role="dialog"
    >
      <div className="pointer-events-none absolute left-0 top-[146px] z-[90] w-full px-[30px] text-center">
        <h2 className="font-chenyuluoyan-thin text-[#f8f1ea] text-[36px] leading-[1.1] drop-shadow-[0_2px_9px_rgba(0,0,0,0.35)]">
          {title}
        </h2>
        <p className="mt-[10px] text-[#f8f1ea]/90 text-[14px] leading-[1.55] drop-shadow-[0_2px_9px_rgba(0,0,0,0.35)]">
          {subtitle}
        </p>
      </div>
      <div className="monthly-bouquet-scene absolute inset-0">
        <img
          alt=""
          aria-hidden="true"
          className="absolute left-0 top-[318px] z-10 h-[360px] w-[402px] object-contain"
          draggable={false}
          onClick={(event) => event.stopPropagation()}
          src={bouquetBack}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-[18]"
          style={{
            height: MESSAGE_CARD_FRAME.height,
            left: MESSAGE_CARD_FRAME.left,
            top: MESSAGE_CARD_FRAME.top,
            width: MESSAGE_CARD_FRAME.width,
          }}
        >
          <img alt="" className="absolute inset-0 h-full w-full object-contain" draggable={false} src={messageCard} />
          <p
            className="absolute whitespace-pre-line text-center font-chenyuluoyan-thin text-[#7d6d60]"
            style={{
              fontSize: language === "en" ? 15 : 20,
              fontWeight: 500,
              left: MESSAGE_CARD_TEXT.centerX - MESSAGE_CARD_TEXT.width / 2,
              lineHeight: language === "en" ? "21px" : "27px",
              top: MESSAGE_CARD_TEXT.centerY - (language === "en" ? 21 : 27),
              transform: `rotate(${MESSAGE_CARD_TEXT.rotate}deg)`,
              transformOrigin: "center",
              width: MESSAGE_CARD_TEXT.width,
            }}
          >
            {cardMessage}
          </p>
        </div>
        <img
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute z-[19] object-contain"
          draggable={false}
          src={graduationCap}
          style={{
            height: GRADUATION_CAP_FRAME.height,
            left: GRADUATION_CAP_FRAME.left,
            top: GRADUATION_CAP_FRAME.top,
            width: GRADUATION_CAP_FRAME.width,
          }}
        />
        <div className="monthly-bouquet-flower-layer absolute inset-0 z-20">
          {layout.map((item) => {
            const flower = FLOWERS[item.flowerIndex];
            if (!flower) return null;

            return (
              <img
                key={item.id}
                alt=""
                aria-hidden="true"
                className="monthly-bouquet-flower absolute object-contain"
                draggable={false}
                onClick={(event) => event.stopPropagation()}
                src={flower.imageSrc}
                style={{
                  height: item.height,
                  left: item.left,
                  top: item.top,
                  transform: `rotate(${item.rotate}deg)`,
                  width: item.width,
                  zIndex: item.zIndex,
                }}
              />
            );
          })}
        </div>
        <img
          alt=""
          aria-hidden="true"
          className="absolute left-0 top-[318px] z-[70] h-[360px] w-[402px] object-contain"
          draggable={false}
          onClick={(event) => event.stopPropagation()}
          src={bouquetFront}
        />
      </div>
      <div className="absolute bottom-[112px] left-1/2 z-[90] flex -translate-x-1/2 items-start gap-[42px]">
        <button
          aria-label="download monthly bouquet"
          className="flex w-[58px] flex-col items-center gap-[7px] bg-transparent p-0 text-[#f8f1ea] text-[14px] leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.38)] disabled:opacity-60"
          disabled={isBusy}
          onClick={(event) => {
            event.stopPropagation();
            void downloadBouquet();
          }}
          type="button"
        >
          <img alt="" aria-hidden="true" className="size-[56px] object-contain" draggable={false} src={downloadIcon} />
          <span>{language === "en" ? "Download" : "下載"}</span>
        </button>
        <button
          aria-label="share monthly bouquet"
          className="flex w-[58px] flex-col items-center gap-[7px] bg-transparent p-0 text-[#f8f1ea] text-[14px] leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.38)] disabled:opacity-60"
          disabled={isBusy}
          onClick={(event) => {
            event.stopPropagation();
            void shareBouquet();
          }}
          type="button"
        >
          <img alt="" aria-hidden="true" className="size-[56px] object-contain" draggable={false} src={shareIcon} />
          <span>{language === "en" ? "Share" : "分享"}</span>
        </button>
      </div>
    </div>
  );
}
