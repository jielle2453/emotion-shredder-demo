import { useEffect, useMemo, useState, type CSSProperties } from "react";
import svgPaths from "./svg-sbn47rlj4l";
import { FLOWERS, FlowerArtwork, clampFlowerIndex } from "../../utils/flowers";
import { dailyFinalEmotionRecords, getEmotionRecords, revealedEmotionRecords } from "../../utils/records";

function Group5() {
  return (
    <div className="h-[112.903px] relative w-[96.04px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 96.0401 112.903">
        <g id="Group 8">
          <path d={svgPaths.p27aa300} fill="var(--fill-0, #EFB2C2)" id="Vector 1" />
          <path d={svgPaths.p324ea800} fill="var(--fill-0, #B5DAE2)" id="Vector 2" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute h-[133.367px] left-[43px] top-[555px] w-[87.999px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 87.9991 133.367">
        <g id="Group 3">
          <path d={svgPaths.p1cc4c080} fill="var(--fill-0, #FABBA9)" id="Vector 4" />
          <path d={svgPaths.p129dbf70} fill="var(--fill-0, #B2A8A7)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="h-[114.065px] relative w-[79.19px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79.1905 114.065">
        <g id="Group 2">
          <path d={svgPaths.p13d60300} fill="var(--fill-0, #F5CF88)" id="Vector 3" />
          <path clipRule="evenodd" d={svgPaths.p2d831c40} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute h-[200.435px] left-[105px] top-[480px] w-[84.165px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84.1647 200.435">
        <g id="Group 4">
          <path d={svgPaths.p149d800} fill="var(--fill-0, #C2A8C1)" id="Vector 8" />
          <path d={svgPaths.p178dd580} fill="var(--fill-0, #B9C9BF)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute h-[144.505px] left-[198px] top-[535px] w-[81px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 81 144.505">
        <g id="Group 5">
          <path d={svgPaths.p3d025600} fill="var(--fill-0, #F9A092)" id="Vector 13" />
          <path d={svgPaths.p2e55b780} fill="var(--fill-0, #BACAC0)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute h-[124.434px] left-[162px] top-[418px] w-[92px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 92 124.434">
        <g id="Group 6">
          <path d={svgPaths.p28ee5380} fill="var(--fill-0, #E9D4DD)" id="Vector 18" />
          <path d={svgPaths.p2c310680} fill="var(--fill-0, #B6DBE4)" id="Vector 19" />
        </g>
      </svg>
    </div>
  );
}

function Flower() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="flower">
          <path d={svgPaths.p37336300} fill="var(--fill-0, #958475)" id="Vector" />
          <path d={svgPaths.p2016c800} id="Vector_2" stroke="var(--stroke-0, #958475)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Calender() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="calender">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="calender">
          <path d={svgPaths.p17502100} fill="var(--fill-0, #F2EEEA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Home() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="home">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="home">
          <path d={svgPaths.p2c30b280} fill="var(--fill-0, #F2EEEA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Collection() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="collection">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="collection">
          <path d={svgPaths.pf609f00} fill="var(--fill-0, #F2EEEA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Setting() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="setting">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="setting">
          <path d={svgPaths.p8073b80} fill="var(--fill-0, #F2EEEA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

const APP_WIDTH = 402;
const NAV_TOP = 798;
const NAV_COLOR = "#dfd4ca";

function getSoilHeight(count: number) {
  if (count <= 0) return 170;
  if (count <= 3) return 210;
  if (count <= 7) return 280;
  if (count <= 12) return 340;
  if (count <= 18) return 455;
  return 520;
}

function getFlowerHeight(count: number) {
  if (count <= 1) return 285;
  if (count <= 3) return 255;
  if (count <= 7) return 195;
  if (count <= 12) return 158;
  if (count <= 18) return 132;
  return 122;
}

function getRowCount(count: number) {
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  if (count <= 14) return 4;
  if (count <= 20) return 5;
  return 6;
}

function buildTriangleRows(count: number) {
  if (count <= 0) return [];
  if (count <= 2) return [count];

  const rowPresets: Record<number, number[]> = {
    3: [1, 2],
    4: [2, 2],
    5: [2, 3],
    6: [2, 2, 2],
    7: [2, 2, 3],
    8: [2, 3, 3],
    9: [2, 3, 4],
    10: [2, 3, 2, 3],
    11: [2, 3, 3, 3],
    12: [2, 3, 3, 4],
    13: [2, 3, 4, 4],
    14: [2, 3, 4, 5],
    15: [2, 3, 3, 3, 4],
    16: [2, 3, 3, 4, 4],
    17: [2, 3, 4, 4, 4],
    18: [2, 3, 4, 4, 5],
    19: [2, 3, 4, 5, 5],
    20: [2, 3, 4, 5, 6],
  };

  if (rowPresets[count]) return rowPresets[count];

  const rowCount = getRowCount(count);
  const weights = Array.from({ length: rowCount }, (_, index) => index + 1);
  const weightTotal = weights.reduce((sum, weight) => sum + weight, 0);
  const rows = weights.map((weight) => Math.max(1, Math.floor((weight / weightTotal) * count)));

  while (rows.reduce((sum, value) => sum + value, 0) < count) {
    for (let index = rows.length - 1; index >= 0 && rows.reduce((sum, value) => sum + value, 0) < count; index -= 1) {
      rows[index] += 1;
    }
  }

  while (rows.reduce((sum, value) => sum + value, 0) > count) {
    const removableIndex = rows.findIndex((value) => value > 1);
    if (removableIndex < 0) break;
    rows[removableIndex] -= 1;
  }

  if (count >= 20 && rows.length >= 5) {
    const borrowFromFullestRow = () => {
      let fullestIndex = rows.length - 1;
      for (let index = rows.length - 1; index > 1; index -= 1) {
        if (rows[index] > rows[fullestIndex]) fullestIndex = index;
      }
      if (rows[fullestIndex] > 1) rows[fullestIndex] -= 1;
    };

    if (rows[0] < 2) {
      rows[0] += 1;
      borrowFromFullestRow();
    }

    if (rows[1] < 3) {
      rows[1] += 1;
      borrowFromFullestRow();
    }
  }

  return rows;
}

function pseudo(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function signed(seed: number) {
  return pseudo(seed) * 2 - 1;
}

const DUPLICATE_FLOWER_PATTERN = [
  { x: -1, y: 0.8, rotate: -8, scale: 1.02 },
  { x: 1, y: -1, rotate: 9, scale: 0.96 },
  { x: -0.65, y: -0.45, rotate: -6, scale: 0.98 },
  { x: 0.75, y: 0.5, rotate: 7, scale: 1 },
];
const HYDRANGEA_FLOWER_INDEX = 6;
const ROUND_HEAD_FLOWER_INDEXES = new Set([2, 6, 7]);

type GardenLayoutItem = {
  id: string;
  flowerIndex: number;
  left: number;
  top: number;
  width: number;
  height: number;
  rotate: number;
  swayAngle?: number;
  flip: number;
  zIndex: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getFlowerHeadBounds(item: GardenLayoutItem) {
  const isRoundHead = ROUND_HEAD_FLOWER_INDEXES.has(item.flowerIndex);
  const width = item.width * (isRoundHead ? 0.88 : 0.66);
  const height = item.height * (isRoundHead ? 0.5 : 0.42);

  return {
    centerX: item.left + item.width / 2,
    centerY: item.top + item.height * (isRoundHead ? 0.3 : 0.25),
    height,
    width,
  };
}

function softenFlowerOverlaps(items: GardenLayoutItem[]) {
  const adjusted = items.map((item) => ({ ...item }));

  for (let pass = 0; pass < 3; pass += 1) {
    for (let index = 1; index < adjusted.length; index += 1) {
      const current = adjusted[index];

      for (let previousIndex = 0; previousIndex < index; previousIndex += 1) {
        const previous = adjusted[previousIndex];
        const currentHead = getFlowerHeadBounds(current);
        const previousHead = getFlowerHeadBounds(previous);
        const overlapX = (currentHead.width + previousHead.width) / 2 - Math.abs(currentHead.centerX - previousHead.centerX);
        const overlapY = (currentHead.height + previousHead.height) / 2 - Math.abs(currentHead.centerY - previousHead.centerY);

        if (overlapX <= 0 || overlapY <= 0) continue;

        const direction = currentHead.centerX >= previousHead.centerX ? 1 : -1;
        const isRoundHeadCollision =
          ROUND_HEAD_FLOWER_INDEXES.has(current.flowerIndex) ||
          ROUND_HEAD_FLOWER_INDEXES.has(previous.flowerIndex);
        const shiftX = Math.min(isRoundHeadCollision ? 24 : 18, overlapX * (isRoundHeadCollision ? 0.5 : 0.42) + 4) * direction;
        const shiftY = Math.min(isRoundHeadCollision ? 18 : 12, overlapY * (isRoundHeadCollision ? 0.34 : 0.22));
        const nextLeft = clamp(current.left + shiftX, 10, APP_WIDTH - current.width - 10);
        const appliedShiftX = nextLeft - current.left;

        current.left = nextLeft;
        current.top += currentHead.centerY >= previousHead.centerY ? shiftY : -shiftY * 0.35;

        if (Math.abs(appliedShiftX) < Math.abs(shiftX) * 0.6) {
          const fallbackShift = Math.min(18, Math.abs(shiftX - appliedShiftX) * 0.55 + 4) * -direction;
          previous.left = clamp(previous.left + fallbackShift, 10, APP_WIDTH - previous.width - 10);
          previous.top -= isRoundHeadCollision ? 6 : 3;
          current.top += isRoundHeadCollision ? 6 : 3;
        }
      }
    }
  }

  return adjusted.map((item) => ({
    ...item,
    zIndex: Math.round(item.top + item.height),
  }));
}

function anchorDenseClusterFlowers(items: GardenLayoutItem[]) {
  if (items.length < 6) return items;

  return items.map((item) => {
    if (item.flowerIndex !== HYDRANGEA_FLOWER_INDEX) return item;

    const targetCenterX = APP_WIDTH * (items.length <= 12 ? 0.7 : 0.62);
    const targetTop = NAV_TOP - (items.length <= 12 ? 310 : 290);
    const targetLeft = targetCenterX - item.width / 2;

    return {
      ...item,
      left: clamp(item.left * 0.25 + targetLeft * 0.75, 10, APP_WIDTH - item.width - 10),
      top: Math.min(item.top, targetTop),
    };
  });
}

function getGardenLayout(flowerIndexes: number[]) {
  const count = flowerIndexes.length;
  const soilHeight = getSoilHeight(count);
  const soilTop = NAV_TOP - soilHeight;
  const flowerHeight = getFlowerHeight(count);
  const flowerWidth = Math.round(flowerHeight * 0.7);
  const rows = buildTriangleRows(count);
  const topBaseY = soilTop + (count <= 3 ? 118 : count <= 12 ? 66 : count <= 18 ? 80 : 96);
  const bottomBaseY = NAV_TOP - (count <= 3 ? 72 : count <= 12 ? 90 : 96);
  const rowGap = rows.length > 1 ? (bottomBaseY - topBaseY) / (rows.length - 1) : 0;
  let flowerCursor = 0;
  const duplicateSeen = new Map<number, number>();
  const duplicateTotals = flowerIndexes.reduce((totals, flowerIndex) => {
    totals.set(flowerIndex, (totals.get(flowerIndex) ?? 0) + 1);
    return totals;
  }, new Map<number, number>());

  const layout = rows.flatMap<GardenLayoutItem>((rowSize, rowIndex) => {
    const rowProgress = rows.length === 1 ? 1 : rowIndex / (rows.length - 1);
    const baseY = rows.length === 1 ? bottomBaseY : topBaseY + rowIndex * rowGap;
    const depthScale = count <= 3
      ? 1
      : 0.96 + rowProgress * 0.05;
    const spacing = Math.min(82, Math.max(50, flowerWidth * (count <= 3 ? 0.74 : 0.56)));
    const rowJitter = signed(rowIndex + count * 0.31) * (count <= 7 ? 8 : 7);

    return Array.from({ length: rowSize }, (_, itemIndex) => {
      const flowerIndex = flowerIndexes[flowerCursor];
      const duplicateOrder = duplicateSeen.get(flowerIndex) ?? 0;
      duplicateSeen.set(flowerIndex, duplicateOrder + 1);
      const duplicateTotal = duplicateTotals.get(flowerIndex) ?? 1;
      const duplicatePattern = duplicateTotal > 1
        ? DUPLICATE_FLOWER_PATTERN[duplicateOrder % DUPLICATE_FLOWER_PATTERN.length]
        : { x: 0, y: 0, rotate: 0, scale: 1 };
      const duplicateSpreadX = count <= 7 ? 46 : count <= 12 ? 34 : 30;
      const duplicateSpreadY = count <= 7 ? 34 : count <= 12 ? 26 : 24;
      const normalized = rowSize === 1 ? 0 : itemIndex / (rowSize - 1) - 0.5;
      const edgeWeight = rowSize === 1 ? 0 : Math.abs(normalized) * 2;
      const individuality = signed(flowerCursor + flowerIndex * 1.7) * 0.035;
      const sizeBoost = rowIndex === 0 && rowSize === 1 ? 0.08 : 0;
      const itemHeight = Math.round(flowerHeight * Math.max(0.76, depthScale + individuality + sizeBoost) * duplicatePattern.scale);
      const itemWidth = Math.round(flowerWidth * Math.max(0.76, depthScale + individuality + sizeBoost) * duplicatePattern.scale);
      const maxRowSpan = count <= 3 ? 196 : count <= 12 ? 238 : 266;
      const rowSpan = rowSize > 1 ? Math.min(spacing * (rowSize - 1), maxRowSpan) : 0;
      const duplicateX = duplicatePattern.x * duplicateSpreadX;
      const duplicateY = duplicatePattern.y * duplicateSpreadY;
      const centerX = APP_WIDTH / 2 + normalized * rowSpan + rowJitter + signed(flowerCursor + 2.4) * (count <= 7 ? 9 : 6) + duplicateX;
      const arcDrop = edgeWeight * edgeWeight * (count <= 3 ? 14 : count <= 12 ? 10 : 14);
      const lift = signed(flowerCursor + rowIndex * 2.13) * (count <= 3 ? 10 : 8);
      const baseRotate = [-10, 7, -5, 8, -6, 4][flowerCursor % 6] + signed(flowerCursor + 4.9) * 2.5 + duplicatePattern.rotate;
      const rotate = baseRotate;
      const flip = pseudo(flowerCursor + flowerIndex * 0.77) > 0.58 ? -1 : 1;
      const top = baseY - itemHeight + arcDrop + lift + duplicateY;
      const left = clamp(centerX - itemWidth / 2, 10, APP_WIDTH - itemWidth - 10);
      const zIndex = Math.round(top + itemHeight);
      const id = `${flowerIndex}-${flowerCursor}`;
      flowerCursor += 1;

      return {
        id,
        flowerIndex,
        left,
        top,
        width: itemWidth,
        height: itemHeight,
        rotate,
        flip,
        zIndex,
      };
    });
  });

  return softenFlowerOverlaps(anchorDenseClusterFlowers(layout));
}

function Soil({ count }: { count: number }) {
  const height = getSoilHeight(count);
  const edgeY = Math.round(Math.min(145, Math.max(70, height * 0.25)));
  const peakY = Math.round(Math.min(64, Math.max(32, height * 0.1)));

  return (
    <div className="absolute left-0 w-[402px]" style={{ top: `${NAV_TOP - height}px`, height }}>
      <svg className="absolute inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={`0 0 ${APP_WIDTH} ${height}`}>
        <path d={`M0 ${edgeY} C96 ${peakY} 285 ${peakY} ${APP_WIDTH} ${edgeY} V${height} H0 Z`} fill="url(#garden_soil_gradient)" />
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="garden_soil_gradient" x1="201" x2="201" y1={peakY} y2={height}>
            <stop stopColor="#D4B69B" />
            <stop offset="1" stopColor={NAV_COLOR} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function GardenFlower({
  flowerIndex,
  left,
  top,
  width,
  height,
  rotate,
  swayAngle,
  flip,
  zIndex,
}: {
  flowerIndex: number;
  left: number;
  top: number;
  width: number;
  height: number;
  rotate: number;
  swayAngle?: number;
  flip: number;
  zIndex: number;
}) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left,
        top,
        width,
        height,
        zIndex,
      }}
      aria-label={FLOWERS[flowerIndex]?.name}
    >
      <div
        className="garden-flower-sway h-full w-full"
        style={{
          "--garden-rotate": `${rotate}deg`,
          "--garden-flip": flip,
          "--garden-sway-distance": `${1.8 + (flowerIndex % 3) * 0.45}px`,
          "--garden-sway-angle": `${swayAngle ?? 1.1 + (zIndex % 4) * 0.25}deg`,
          "--garden-sway-duration": `${3.4 + (flowerIndex % 4) * 0.25}s`,
          "--garden-sway-delay": `${-0.35 * (zIndex % 7)}s`,
        } as CSSProperties}
      >
        <FlowerArtwork flowerIndex={flowerIndex} decorative className="h-full w-full" imageClassName="h-full w-full" />
      </div>
    </div>
  );
}

export default function Component() {
  const [allFlowerIndexes, setAllFlowerIndexes] = useState<number[]>([]);
  const gardenLayout = useMemo(() => getGardenLayout(allFlowerIndexes), [allFlowerIndexes]);

  useEffect(() => {
    let active = true;

    getEmotionRecords()
      .then((records) => {
        const flowerIndexes = dailyFinalEmotionRecords(revealedEmotionRecords(records))
          .slice()
          .reverse()
          .map((record) => clampFlowerIndex(record.flowerIndex))
          .filter((index) => index >= 0 && index < FLOWERS.length);
        if (active) setAllFlowerIndexes(flowerIndexes);
      })
      .catch((err) => {
        console.warn("Failed to load garden flowers:", err);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] size-full" data-name="花圃">
      <div className="absolute bg-[#dfd4ca] left-0 top-[798px] h-[76px] w-[402px]" />
      <Soil count={allFlowerIndexes.length} />
      {gardenLayout.map((item) => (
        <GardenFlower
          key={item.id}
          flowerIndex={item.flowerIndex}
          left={item.left}
          top={item.top}
          width={item.width}
          height={item.height}
          rotate={item.rotate}
          swayAngle={item.swayAngle}
          flip={item.flip}
          zIndex={item.zIndex}
        />
      ))}
      <div className="absolute bg-[#dfd4ca] content-stretch flex gap-[40px] items-center justify-center left-[-1px] px-[32px] py-[20px] top-[798px] z-50" data-name="navigation bar">
        <Flower />
        <Calender />
        <Home />
        <Collection />
        <Setting />
      </div>
    </div>
  );
}
