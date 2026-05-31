import { useEffect, useMemo, useState } from "react";
import svgPaths from "./svg-eyhspj0gv8";
import { getEmotionRecords, recordsInMonth, uniqueFlowerIndexes, type StoredEmotionRecord } from "../../utils/records";
import { FLOWER_COUNT, FLOWERS } from "../../utils/flowers";

const MONTH_NAMES = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
const GRID_LEFT = 68;
const GRID_TOP = 202;
const CELL_WIDTH = 32;
const CELL_HEIGHT = 82;
const COL_GAP = 12;
const ROW_GAP = 17;

function Flower() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="flower">
          <path d={svgPaths.p37336300} fill="var(--fill-0, #F2EEEA)" id="Vector" />
          <path d={svgPaths.p2016c800} id="Vector_2" stroke="var(--stroke-0, #F2EEEA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
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
          <path d={svgPaths.p17502100} fill="var(--fill-0, #958475)" id="Vector" />
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

function Arrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "prev month" : "next month"}
      className={`absolute aspect-[16/16] flex items-center justify-center top-[144px] cursor-pointer bg-transparent ${
        direction === "prev" ? "left-[52px]" : "right-[52px]"
      }`}
      style={{ containerType: "size" }}
    >
      <div className={`flex-none h-[100cqw] w-[100cqh] ${direction === "prev" ? "-rotate-90 -scale-x-100" : "rotate-90"}`}>
        <div className="overflow-clip relative size-full" data-name="arrow">
          <div className="absolute inset-[20.89%_8.55%_31.26%_8.39%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.2883 7.65595">
              <path d={svgPaths.p2993fb00} fill="var(--fill-0, #767676)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}

function dayKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function flowersByDay(records: StoredEmotionRecord[], year: number, month: number) {
  const monthlyRecords = recordsInMonth(records, year, month);
  const grouped = new Map<number, StoredEmotionRecord[]>();

  for (const record of monthlyRecords) {
    const date = new Date(record.date);
    if (Number.isNaN(date.getTime())) continue;
    const day = date.getDate();
    grouped.set(day, [...(grouped.get(day) ?? []), record]);
  }

  return new Map(
    [...grouped.entries()].map(([day, dayRecords]) => [
      day,
      uniqueFlowerIndexes(dayRecords, FLOWER_COUNT),
    ]),
  );
}

function CalendarDay({
  day,
  flowerIndexes,
  onPickDay,
}: {
  day: number;
  flowerIndexes: number[];
  onPickDay?: () => void;
}) {
  const visibleFlowers = flowerIndexes.slice(0, 3);

  return (
    <button
      onClick={onPickDay}
      aria-label={`day ${day}`}
      className="relative h-[82px] w-[32px] overflow-hidden rounded-[10px] bg-white"
      data-name="calendar day"
    >
      <span aria-hidden="true" className="absolute inset-0 rounded-[10px] border-3 border-[#f3f3f3] border-solid" />
      {visibleFlowers.map((flowerIndex, index) => {
        const flower = FLOWERS[flowerIndex];
        if (!flower) return null;
        const offset = (index - (visibleFlowers.length - 1) / 2) * 9;

        return (
          <img
            key={`${flowerIndex}-${index}`}
            src={flower.imageSrc}
            alt=""
            aria-hidden="true"
            className="absolute left-1/2 top-[12px] h-[56px] w-[34px] object-contain opacity-95"
            style={{ transform: `translateX(calc(-50% + ${offset}px)) rotate(${offset / 3}deg)` }}
            draggable={false}
          />
        );
      })}
      <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full px-[3px] py-[1px] font-['Fredoka:SemiBold',sans-serif] text-[12px] font-semibold leading-none text-[#958475]">
        {day}
      </span>
    </button>
  );
}

function CalendarGrid({
  year,
  month,
  dayFlowers,
  onPickDay,
}: {
  year: number;
  month: number;
  dayFlowers: Map<number, number[]>;
  onPickDay?: (year: number, month: number, day: number) => void;
}) {
  const daysInMonth = new Date(year, month, 0).getDate();

  return (
    <div
      className="absolute grid grid-cols-7 gap-x-[12px] gap-y-[17px]"
      style={{
        left: `${GRID_LEFT}px`,
        top: `${GRID_TOP}px`,
        gridAutoRows: `${CELL_HEIGHT}px`,
        gridTemplateColumns: `repeat(7, ${CELL_WIDTH}px)`,
      }}
      data-name="calendar grid"
    >
      {Array.from({ length: daysInMonth }, (_, index) => {
        const day = index + 1;
        return (
          <CalendarDay
            key={day}
            day={day}
            flowerIndexes={dayFlowers.get(day) ?? []}
            onPickDay={() => onPickDay?.(year, month, day)}
          />
        );
      })}
    </div>
  );
}

function FlowerStrip() {
  const strip = [
    { index: 8, left: 40, top: 730, width: 48, height: 76, rotate: -8 },
    { index: 5, left: 106, top: 727, width: 42, height: 82, rotate: 7 },
    { index: 7, left: 160, top: 731, width: 46, height: 78, rotate: -4 },
    { index: 1, left: 226, top: 722, width: 44, height: 86, rotate: 2 },
    { index: 9, left: 292, top: 723, width: 42, height: 88, rotate: -9 },
    { index: 11, left: 345, top: 726, width: 50, height: 82, rotate: 8 },
  ];

  return (
    <>
      {strip.map(({ index, left, top, width, height, rotate }) => (
        <img
          key={`${index}-${left}`}
          src={FLOWERS[index].imageSrc}
          alt=""
          aria-hidden="true"
          className="absolute object-contain pointer-events-none z-10"
          style={{ left, top, width, height, transform: `rotate(${rotate}deg)` }}
          draggable={false}
        />
      ))}
    </>
  );
}

export default function Component({ onPickDay }: { onPickDay?: (year: number, month: number, day: number) => void } = {}) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(6);
  const [records, setRecords] = useState<StoredEmotionRecord[]>([]);

  useEffect(() => {
    let active = true;

    getEmotionRecords()
      .then((loadedRecords) => {
        if (active) setRecords(loadedRecords);
      })
      .catch((err) => {
        console.warn("Failed to load calendar flowers:", err);
      });

    return () => {
      active = false;
    };
  }, []);

  const dayFlowers = useMemo(() => flowersByDay(records, year, month), [records, year, month]);

  const prev = () => {
    if (month === 1) {
      setMonth(12);
      setYear((currentYear) => currentYear - 1);
      return;
    }
    setMonth((currentMonth) => currentMonth - 1);
  };

  const next = () => {
    if (month === 12) {
      setMonth(1);
      setYear((currentYear) => currentYear + 1);
      return;
    }
    setMonth((currentMonth) => currentMonth + 1);
  };

  return (
    <div className="bg-[#f4f4f4] overflow-clip relative rounded-[40px] size-full" data-name="日歷">
      <p className="absolute left-[12px] top-[13px] font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] text-[16px] text-[#b9b9b9]">
        日歷
      </p>
      <div className="absolute left-[10px] top-[44px] h-[830px] w-[382px] overflow-hidden rounded-[40px] bg-white">
        <div className="[word-break:break-word] absolute left-1/2 top-[62px] h-[62px] w-[160px] -translate-x-1/2 font-['Fredoka:Regular',sans-serif] font-normal leading-[normal] text-[#767676] whitespace-nowrap">
          <p className="absolute left-1/2 top-0 -translate-x-1/2 text-center text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {year}
          </p>
          <p className="absolute left-1/2 top-[23px] -translate-x-1/2 text-center text-[32px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {MONTH_NAMES[month - 1]}
          </p>
        </div>
        <Arrow direction="prev" onClick={prev} />
        <Arrow direction="next" onClick={next} />
        <CalendarGrid year={year} month={month} dayFlowers={dayFlowers} onPickDay={onPickDay} />
        <FlowerStrip />
        <div className="absolute bg-[#dfd4ca] content-stretch flex gap-[40px] items-center justify-center left-0 px-[32px] py-[20px] top-[754px] w-full z-20" data-name="navigation bar">
          <Flower />
          <Calender />
          <Home />
          <Collection />
          <Setting />
        </div>
      </div>
    </div>
  );
}
