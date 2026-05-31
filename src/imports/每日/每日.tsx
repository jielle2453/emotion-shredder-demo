import { useEffect, useMemo, useState } from "react";
import svgPaths from "./svg-4wce26mwpy";
import sproutPaths from "../Ai情緒分析-2/svg-qe4ya16f9a";
import imgPaper40 from "./ce046c6e86a43d8c567567a8ce149265418b87fc.png";
import { getEmotionRecords, updateEmotionRecordNote, type StoredEmotionRecord } from "../../utils/records";
import { FLOWERS, FlowerArtwork, clampFlowerIndex, getFlowerCopy } from "../../utils/flowers";
import { normalizeKeywords, pickRandomKeywords } from "../../utils/keywords";
import type { AppLanguage } from "../../utils/i18n";
import SwappingFlowerStrip from "../../app/components/SwappingFlowerStrip";

function toLocalDateKey(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function todayDateKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

type DailyRecord = StoredEmotionRecord & { note?: string; emotionLabel?: string };

const EMOTION_LABEL_FALLBACK = "中性";
const EMOTION_LABEL_HINTS = [
  "矛盾",
  "嘲諷",
  "焦慮",
  "複雜",
  "難過",
  "傷心",
  "煩躁",
  "疲憊",
  "開心",
  "期待",
  "不安",
  "委屈",
  "平靜",
  "釋放",
  "安心",
  "中性",
];

function formatSummaryForDisplay(value: string) {
  return value.trim();
}

function hasLatinText(value: string) {
  return /[A-Za-z]/.test(value);
}

function normalizeEmotionLabel(record: DailyRecord | null) {
  const raw = record?.emotionLabel?.trim();
  if (raw) {
    if (hasLatinText(raw)) {
      return raw.replace(/[，,。！？!?、]+/g, "").trim() || EMOTION_LABEL_FALLBACK;
    }

    return Array.from(raw.replace(/[，,。！？!?、\s]/g, "")).slice(0, 4).join("") || EMOTION_LABEL_FALLBACK;
  }

  if (!record) return "";

  const sourceText = [
    record.keyword,
    ...(Array.isArray(record.keywords) ? record.keywords : []),
    record.summary,
    record.text,
  ].join(" ");
  return EMOTION_LABEL_HINTS.find((label) => sourceText.includes(label)) || EMOTION_LABEL_FALLBACK;
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

function Cancel() {
  return (
    <div className="absolute left-[12px] size-[24px] top-[12px]" data-name="cancel">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="cancel">
          <path clipRule="evenodd" d={svgPaths.p5b9900} fill="var(--fill-0, #958475)" fillRule="evenodd" id="Vector" stroke="var(--stroke-0, #958475)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Fa7SolidPen() {
  return (
    <div className="absolute left-[23px] size-[24px] top-[516px]" data-name="fa7-solid:pen">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fa7-solid:pen">
          <path d={svgPaths.p85c400} fill="var(--fill-0, #958475)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame({
  flowerName,
  flowerMeaning,
  note,
  onNoteChange,
  onNoteSave,
  language,
  disabled = false,
}: {
  flowerName: string;
  flowerMeaning: string;
  note: string;
  onNoteChange: (value: string) => void;
  onNoteSave: () => void;
  language: AppLanguage;
  disabled?: boolean;
}) {
  return (
    <div className="-translate-x-1/2 absolute bg-white border border-[#f3f3f3] border-solid drop-shadow-[4px_4px_10px_rgba(219,219,219,0.2)] h-[560px] left-1/2 rounded-[10px] top-[128px] w-[320px]" data-name="Frame">
      <p className="[word-break:break-word] absolute font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] left-[29px] text-[#767676] text-[20px] top-[24px] w-[170px]" style={{ fontVariationSettings: "'wdth' 100" }}>{flowerName}</p>
      {flowerMeaning && (
        <p className="[word-break:break-word] absolute font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[1.2] left-[29px] text-[#767676] text-[14px] top-[55px] w-[190px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          {flowerMeaning}
        </p>
      )}
      <div className="absolute h-0 left-[-1px] top-[318px] w-[320px]">
        <div className="absolute inset-[-3px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320 3">
            <line id="Line 3" stroke="var(--stroke-0, #F3F3F3)" strokeDasharray="6 6" strokeLinecap="round" strokeWidth="3" x1="1.5" x2="318.5" y1="1.5" y2="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[-1px] top-[500px] w-[320px]">
        <div className="absolute inset-[-3px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320 3">
            <line id="Line 4" stroke="var(--stroke-0, #F3F3F3)" strokeDasharray="6 6" strokeLinecap="round" strokeWidth="3" x1="1.5" x2="318.5" y1="1.5" y2="1.5" />
          </svg>
        </div>
      </div>
      <Fa7SolidPen />
      <textarea
        value={note}
        onChange={(event) => onNoteChange(event.target.value)}
        onBlur={onNoteSave}
        disabled={disabled}
        placeholder={language === "en" ? "Add a note..." : "想記錄些什麼嗎..."}
        rows={2}
        className="absolute left-[57px] top-[516px] h-[40px] w-[232px] resize-none bg-transparent border-0 outline-none font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] text-[#9c9490] text-[16px] leading-[20px] placeholder:text-[#9c9490] disabled:opacity-60"
        style={{ fontVariationSettings: "'wdth' 100" }}
      />
    </div>
  );
}

const KEYWORD_PAPER_LAYOUT = [
  { left: 70, top: 246, rotate: -4 },
  { left: 154, top: 286, rotate: 3 },
  { left: 78, top: 333, rotate: 2 },
  { left: 169, top: 342, rotate: -3 },
  { left: 50, top: 300, rotate: 5 },
];

function KeywordPaper({ keyword, index }: { keyword: string; index: number }) {
  const layout = KEYWORD_PAPER_LAYOUT[index % KEYWORD_PAPER_LAYOUT.length];
  const length = Array.from(keyword).length;
  const latin = hasLatinText(keyword);
  const width = Math.min(latin ? 150 : 122, Math.max(58, 34 + length * (latin ? 8 : 14)));
  const height = Math.min(46, Math.max(34, 30 + Math.ceil(length / 3) * 4));

  return (
    <div
      className="absolute z-20 flex items-center justify-center"
      style={{
        left: `${layout.left}px`,
        top: `${layout.top}px`,
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotate(${layout.rotate}deg)`,
      }}
    >
      <img alt="" className="absolute inset-0 h-full w-full object-fill pointer-events-none" src={imgPaper40} />
      <span className={`[word-break:keep-all] relative z-10 px-2 text-center font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] text-[#767676] ${latin ? "text-[13px]" : "text-[15px]"} leading-none whitespace-nowrap`} style={{ fontVariationSettings: "'wdth' 100" }}>
        {keyword}
      </span>
    </div>
  );
}

function SproutArtwork({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <svg className="block h-full w-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 202 174.81">
        <path d={sproutPaths.p2930a800} fill="#B8E6C3" />
        <path d={sproutPaths.p10fc2700} fill="#777775" />
      </svg>
    </div>
  );
}

export default function Daily({
  activeDate,
  onChangeDate,
  language = "zh",
}: {
  activeDate?: string;
  onChangeDate?: (date: string) => void;
  language?: AppLanguage;
}) {
  const [records, setRecords] = useState<DailyRecord[]>([]);
  const [data, setData] = useState<DailyRecord | null>(null);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        const loadedRecords = await getEmotionRecords() as DailyRecord[];
        const dayRecords = loadedRecords
          .filter((item) => toLocalDateKey(item.date) === activeDate)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const record = dayRecords[dayRecords.length - 1] ?? null;
        if (isMounted) {
          setRecords(loadedRecords);
          setData(record);
          setNote(record?.note ?? "");
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setRecords([]);
          setData(null);
          setNote("");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    setData(null);
    setNote("");
    if (activeDate) load();

    return () => {
      isMounted = false;
    };
  }, [activeDate]);

  const isTodayDate = activeDate === todayDateKey();
  const dayRecords = useMemo(() => {
    if (!activeDate) return [] as DailyRecord[];
    return records
      .filter((record) => toLocalDateKey(record.date) === activeDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [activeDate, records]);
  const flowerIndex = data ? clampFlowerIndex(data.flowerIndex) : -1;
  const flowerData = isTodayDate ? null : flowerIndex >= 0 ? FLOWERS[flowerIndex] : null;
  const flowerCopy = flowerData ? getFlowerCopy(flowerData, language) : null;
  const keywords = useMemo(() => {
    const sourceRecords = dayRecords.length > 0 ? dayRecords : data ? [data] : [];
    return pickRandomKeywords(
      sourceRecords.flatMap((record) =>
        normalizeKeywords(record, record.keyword ? [record.keyword] : []),
      ),
    );
  }, [data, dayRecords]);
  const summaryEntries = dayRecords.length > 0
    ? dayRecords
        .map((record) => ({
          emotionLabel: normalizeEmotionLabel(record),
          summary: formatSummaryForDisplay(record.summary || ""),
        }))
        .filter((entry) => entry.summary)
    : [{ emotionLabel: "", summary: isLoading ? "" : language === "en" ? "No record for this day yet." : "這一天還沒有紀錄。" }].filter((entry) => entry.summary);
  const recordDates = useMemo(() => {
    const dates = new Set(records.map((record) => toLocalDateKey(record.date)));
    if (activeDate === todayDateKey()) dates.add(activeDate);
    return Array.from(dates).sort();
  }, [activeDate, records]);
  const currentDateIndex = activeDate ? recordDates.indexOf(activeDate) : -1;
  const hasPreviousRecord = currentDateIndex > 0;
  const hasNextRecord = currentDateIndex >= 0 && currentDateIndex < recordDates.length - 1;
  const [, month, day] = (activeDate || "2026-06-26").split("-");
  const updateActiveDate = (direction: -1 | 1) => {
    const nextDate = recordDates[currentDateIndex + direction];
    if (nextDate) onChangeDate?.(nextDate);
  };
  const updateNote = (value: string) => {
    setNote(value);
    setData((current) => current ? { ...current, note: value } : current);
  };
  const saveNote = async () => {
    if (!data) return;

    const updatedRecord = { ...data, note };
    setData(updatedRecord);
    setRecords((current) => current.map((record) => record.id === updatedRecord.id ? updatedRecord : record));

    try {
      await updateEmotionRecordNote(updatedRecord.id, note);
    } catch (err) {
      console.warn("Failed to save daily note:", err);
    }
  };

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] size-full" data-name="每日">
      <div className="absolute bg-[#dfd4ca] content-stretch flex gap-[40px] items-center justify-center left-[-1px] px-[32px] py-[20px] top-[798px]" data-name="navigation bar">
        <Flower />
        <Calender />
        <Home />
        <Collection />
        <Setting />
      </div>
      <SwappingFlowerStrip className="-translate-x-1/2 absolute h-[80px] left-1/2 top-[718px] w-[360px]" />
      <div className="absolute bg-[#f2eeea] left-[36px] overflow-clip rounded-[100px] size-[48px] top-[36px]">
        <Cancel />
      </div>
      <button
        type="button"
        onClick={() => updateActiveDate(-1)}
        disabled={!hasPreviousRecord}
        aria-label="previous daily record"
        className={`absolute z-30 aspect-[40/40] flex items-center justify-center left-0 right-[90.05%] top-[426px] bg-transparent ${hasPreviousRecord ? "cursor-pointer" : "cursor-default"}`}
        style={{ containerType: "size" }}
      >
        <div className="-rotate-90 -scale-x-100 flex-none h-[100cqw] w-[100cqh]">
          <div className="overflow-clip relative size-full" data-name="arrow">
            <div className="absolute inset-[20.89%_8.55%_31.26%_8.39%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.2206 19.1399">
                <path d={svgPaths.p34e50100} fill={hasPreviousRecord ? "var(--fill-0, #DAD5D1)" : "var(--fill-0, #F3F3F3)"} id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </button>
      <button
        type="button"
        onClick={() => updateActiveDate(1)}
        disabled={!hasNextRecord}
        aria-label="next daily record"
        className={`absolute z-30 aspect-[40/40] flex items-center justify-center left-[90.05%] right-0 top-[426px] bg-transparent ${hasNextRecord ? "cursor-pointer" : "cursor-default"}`}
        style={{ containerType: "size" }}
      >
        <div className="flex-none h-[100cqw] rotate-90 w-[100cqh]">
          <div className="overflow-clip relative size-full" data-name="arrow">
            <div className="absolute inset-[20.89%_8.55%_31.26%_8.39%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.2206 19.1399">
                <path d={svgPaths.p34e50100} fill={hasNextRecord ? "var(--fill-0, #DAD5D1)" : "var(--fill-0, #F3F3F3)"} id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </button>
      <Frame
        flowerName={isTodayDate ? (language === "en" ? "Little sprout" : "小綠芽") : flowerCopy?.name ?? ""}
        flowerMeaning={isTodayDate ? (language === "en" ? "Growing quietly. See you tomorrow." : "正在悄悄長大，明天見") : flowerCopy?.meaning ?? ""}
        note={note}
        onNoteChange={updateNote}
        onNoteSave={saveNote}
        language={language}
        disabled={!data}
      />
      <div className="[word-break:break-word] absolute font-chenyuluoyan-thin left-[72px] not-italic text-black top-[466px] h-[144px] w-[286px] overflow-y-auto pr-[10px]">
        {summaryEntries.map((entry, index) => {
          const summaryLength = Array.from(entry.summary).length;
          const summaryClassName = summaryLength > 32
            ? "text-[20px] leading-[1.28] tracking-[0.06em]"
            : "text-[23px] leading-[1.3] tracking-[0.1em]";

          return (
            <div key={`${entry.summary}-${index}`} className={index > 0 ? "mt-[18px]" : ""}>
              {entry.emotionLabel && (
                <p className="mb-[10px] text-[26px] leading-[1.15] tracking-[0.2em]">{entry.emotionLabel}</p>
              )}
              <p className={`${summaryClassName} whitespace-pre-wrap`}>
                {entry.summary}
              </p>
            </div>
          );
        })}
      </div>
      {keywords.map((item, index) => (
        <KeywordPaper key={`${item}-${index}`} keyword={item} index={index} />
      ))}
      <p className="[word-break:break-word] absolute font-['Fredoka:SemiBold',sans-serif] font-semibold leading-[normal] left-[291px] text-[#958475] text-[24px] top-[43px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{parseInt(month || "6")}</p>
      <p className="[word-break:break-word] absolute font-['Fredoka:SemiBold',sans-serif] font-semibold leading-[normal] left-[331px] text-[#958475] text-[24px] top-[65px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        {parseInt(day || "26")}
      </p>
      <p className="[word-break:break-word] absolute font-['Fredoka:Light',sans-serif] font-light leading-[normal] left-[309px] text-[#958475] text-[48px] top-[36px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        /
      </p>
      {isTodayDate ? (
        <SproutArtwork className="pointer-events-none absolute z-10 h-[194px] left-[196px] top-[210px] w-[142px]" />
      ) : flowerIndex >= 0 && (
        <FlowerArtwork flowerIndex={flowerIndex} className="pointer-events-none absolute z-10 h-[314px] left-[190px] top-[124px] w-[170px]" imageClassName="object-contain" language={language} />
      )}
    </div>
  );
}
