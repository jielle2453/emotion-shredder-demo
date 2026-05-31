import { useEffect, useMemo, useState } from "react";
import svgPaths from "./svg-eyhspj0gv8";
import { dailyFinalEmotionRecords, getEmotionRecords, recordsInMonth, revealedEmotionRecords, type StoredEmotionRecord } from "../../utils/records";
import { FLOWERS, clampFlowerIndex } from "../../utils/flowers";
import type { AppLanguage } from "../../utils/i18n";
import SwappingFlowerStrip from "../../app/components/SwappingFlowerStrip";

const MONTH_NAMES_EN = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
const MONTH_NAMES_ZH = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
const COL_OFFSETS = [-129, -85.5, -42.5, 0.5, 44, 87, 130];
const ROW_TOPS = [0, 96.22, 192.43, 288.65, 384.86, 481.08];

type CalendarToday = {
  year: number;
  month: number;
  day: number;
};

function flowersByDay(records: StoredEmotionRecord[], year: number, month: number) {
  const grouped = new Map<number, number[]>();

  for (const record of recordsInMonth(records, year, month)) {
    const date = new Date(record.date);
    if (Number.isNaN(date.getTime())) continue;

    const day = date.getDate();
    const flowerIndex = clampFlowerIndex(record.flowerIndex);
    if (flowerIndex >= 0) grouped.set(day, [flowerIndex]);
  }

  return grouped;
}

function Calendar({
  year,
  month,
  dayFlowers,
  today,
  onPickDay,
}: {
  year: number;
  month: number;
  dayFlowers: Map<number, number[]>;
  today: CalendarToday;
  onPickDay?: (year: number, month: number, day: number) => void;
}) {
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const cells: { day: number; col: number; row: number }[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const idx = firstWeekday + d - 1;
    cells.push({ day: d, col: idx % 7, row: Math.floor(idx / 7) });
  }

  return (
    <div className="-translate-x-1/2 absolute contents left-1/2 top-0" data-name="Calendar">
      {cells.map(({ day, col, row }) => {
        const flowerIndexes = dayFlowers.get(day) ?? [];
        const hasFlowers = flowerIndexes.length > 0;
        const isToday = today.year === year && today.month === month && today.day === day;
        const canOpenDay = hasFlowers || isToday;

        return (
          <button
            key={day}
            onClick={canOpenDay ? () => onPickDay?.(year, month, day) : undefined}
            disabled={!canOpenDay}
            className={`-translate-x-1/2 absolute content-stretch flex flex-col h-[82px] items-center justify-center overflow-hidden px-[9px] py-[10px] rounded-[10px] w-[32px] ${isToday ? "bg-[#958475]" : ""} ${canOpenDay ? (isToday ? "cursor-pointer" : "cursor-pointer hover:bg-[#f2eeea]") : "cursor-default"}`}
            style={{ left: `calc(50% + ${COL_OFFSETS[col]}px)`, top: `${ROW_TOPS[row]}px` }}
            data-name="Frame"
            aria-label={`day ${day}`}
            aria-disabled={!canOpenDay}
          >
            {!isToday && <span aria-hidden="true" className="absolute border-3 border-[#f3f3f3] border-solid inset-0 pointer-events-none rounded-[10px]" />}
            {!isToday && flowerIndexes.slice(0, 1).map((flowerIndex, index, flowers) => {
              const flower = FLOWERS[flowerIndex];
              if (!flower) return null;

              const offset = (index - (flowers.length - 1) / 2) * 8;

              return (
                <img
                  key={`${day}-${flowerIndex}-${index}`}
                  src={flower.imageSrc}
                  alt=""
                  aria-hidden="true"
                  className="absolute left-1/2 top-[10px] h-[58px] w-[34px] object-contain opacity-95"
                  style={{ transform: `translateX(calc(-50% + ${offset}px)) rotate(${offset / 3}deg)` }}
                  draggable={false}
                />
              );
            })}
            {!hasFlowers && (
              <p className={`[word-break:break-word] font-['Fredoka:SemiBold',sans-serif] font-semibold leading-[normal] relative z-10 shrink-0 ${isToday ? "text-white" : "text-[#958475]"} text-[12px] uppercase whitespace-nowrap`} style={{ fontVariationSettings: "'wdth' 100" }}>
                {day}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}

function Frame31({
  year,
  month,
  dayFlowers,
  today,
  onPickDay,
}: {
  year: number;
  month: number;
  dayFlowers: Map<number, number[]>;
  today: CalendarToday;
  onPickDay?: (year: number, month: number, day: number) => void;
}) {
  return (
    <div className="absolute h-[546px] left-[55px] top-[154px] w-[292px]">
      <Calendar year={year} month={month} dayFlowers={dayFlowers} today={today} onPickDay={onPickDay} />
    </div>
  );
}

function Frame32({ year, month, language }: { year: number; month: number; language: AppLanguage }) {
  return (
    <div className="[word-break:break-word] absolute font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal h-[62px] leading-[normal] left-1/2 -translate-x-1/2 text-[#767676] top-[60px] w-[120px] whitespace-nowrap">
      <p className="absolute left-1/2 -translate-x-1/2 text-[16px] top-0 text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
        {year}
      </p>
      <p className="absolute left-1/2 -translate-x-1/2 text-[32px] top-[23px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
        {(language === "en" ? MONTH_NAMES_EN : MONTH_NAMES_ZH)[month - 1]}
      </p>
    </div>
  );
}

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

function Flower1() {
  return (
    <div className="absolute h-[57.203px] left-[10px] top-[11px] w-[37.744px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.7441 57.2027">
        <g id="flower">
          <path d={svgPaths.p221a3b60} fill="var(--fill-0, #FABBA9)" id="Vector 4" />
          <path d={svgPaths.p2af97d00} fill="var(--fill-0, #B2A8A7)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Flower2() {
  return (
    <div className="absolute h-[54.18px] left-[15px] top-[11px] w-[30.37px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.3701 54.1807">
        <g id="flower">
          <path d={svgPaths.p1240000} fill="var(--fill-0, #F9A092)" id="Vector 13" />
          <path d={svgPaths.pb12ce70} fill="var(--fill-0, #BACAC0)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Flower3() {
  return (
    <div className="absolute h-[59.065px] left-[9px] top-[15px] w-[41.006px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41.0063 59.065">
        <g id="flower">
          <path d={svgPaths.p187dca00} fill="var(--fill-0, #F5CF88)" id="Vector 3" />
          <path clipRule="evenodd" d={svgPaths.p3a46ff00} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Flower4() {
  return (
    <div className="absolute h-[50.162px] left-[11px] top-[15px] w-[37.087px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.0868 50.1617">
        <g id="flower">
          <path d={svgPaths.p3b5e3080} fill="var(--fill-0, #E9D4DD)" id="Vector 18" />
          <path d={svgPaths.p3691f860} fill="var(--fill-0, #B6DBE4)" id="Vector 19" />
        </g>
      </svg>
    </div>
  );
}

function Flower5() {
  return (
    <div className="absolute h-[69.255px] left-[13px] top-[11px] w-[29.081px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.0809 69.255">
        <g id="flower">
          <path d={svgPaths.p371635f0} fill="var(--fill-0, #C2A8C1)" id="Vector 8" />
          <path d={svgPaths.p2771c100} fill="var(--fill-0, #B9C9BF)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Flower6() {
  return (
    <div className="absolute h-[53.903px] left-[8px] top-[15px] w-[45.852px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45.8521 53.9028">
        <g id="flower">
          <path d={svgPaths.p16074900} fill="var(--fill-0, #EFB2C2)" id="Vector 1" />
          <path d={svgPaths.p318d270} fill="var(--fill-0, #B5DAE2)" id="Vector 2" />
        </g>
      </svg>
    </div>
  );
}

export default function Component({
  onPickDay,
  language = "zh",
}: {
  onPickDay?: (year: number, month: number, day: number) => void;
  language?: AppLanguage;
} = {}) {
  const today = useMemo(() => {
    const date = new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }, []);
  const [year, setYear] = useState(today.year);
  const [month, setMonth] = useState(today.month);
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

  const revealedDailyRecords = useMemo(() => dailyFinalEmotionRecords(revealedEmotionRecords(records)), [records]);
  const dayFlowers = useMemo(() => flowersByDay(revealedDailyRecords, year, month), [revealedDailyRecords, year, month]);

  const prev = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else setMonth(month - 1);
  };

  const next = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else setMonth(month + 1);
  };

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] size-full" data-name="?�歷">
      <Frame31 year={year} month={month} dayFlowers={dayFlowers} today={today} onPickDay={onPickDay} />
      <Frame32 year={year} month={month} language={language} />
      <div className="absolute bg-[#dfd4ca] content-stretch flex gap-[40px] items-center justify-center left-[-1px] px-[32px] py-[20px] top-[798px]" data-name="navigation bar">
        <Flower />
        <Calender />
        <Home />
        <Collection />
        <Setting />
      </div>
      <SwappingFlowerStrip className="-translate-x-1/2 absolute bottom-[76px] h-[80px] left-1/2 w-[360px]" />
      <button onClick={prev} aria-label="prev month" className="absolute aspect-[16/16] flex items-center justify-center left-[9.95%] right-[86.07%] top-[96px] cursor-pointer bg-transparent" style={{ containerType: "size" }}>
        <div className="-rotate-90 -scale-x-100 flex-none h-[100cqw] w-[100cqh]">
          <div className="overflow-clip relative size-full" data-name="arrow">
            <div className="absolute inset-[20.89%_8.55%_31.26%_8.39%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.2883 7.65595">
                <path d={svgPaths.p2993fb00} fill="var(--fill-0, #767676)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </button>
      <button onClick={next} aria-label="next month" className="absolute aspect-[16/16] flex items-center justify-center left-[86.07%] right-[9.95%] top-[96px] cursor-pointer bg-transparent" style={{ containerType: "size" }}>
        <div className="flex-none h-[100cqw] rotate-90 w-[100cqh]">
          <div className="overflow-clip relative size-full" data-name="arrow">
            <div className="absolute inset-[20.89%_8.55%_31.26%_8.39%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.2883 7.65595">
                <path d={svgPaths.p2993fb00} fill="var(--fill-0, #767676)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
