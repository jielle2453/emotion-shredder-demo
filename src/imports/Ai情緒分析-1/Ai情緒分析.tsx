import svgPaths from "./svg-9cgn2hsbfv";
import svgPaths2 from "../Ai情緒分析-2/svg-qe4ya16f9a";
import type { AppLanguage } from "../../utils/i18n";

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
          <path d={svgPaths.p2c30b280} fill="var(--fill-0, #958475)" id="Vector" />
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

function Group() {
  return (
    <div className="absolute inset-[59.38%_24.88%_20.62%_24.88%] pointer-events-none z-10" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 202 174.81">
        <g id="Group">
          <path d={svgPaths2.p2930a800} fill="var(--fill-0, #B8E6C3)" id="Vector" />
          <path d={svgPaths2.p10fc2700} fill="var(--fill-0, #777775)" id="Vector_2" />
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

function normalizeEmotionLabel(data: any, language: AppLanguage) {
  const fallback = language === "en" ? "Neutral" : EMOTION_LABEL_FALLBACK;
  const raw = typeof data?.emotionLabel === "string" ? data.emotionLabel.trim() : "";
  if (raw) {
    if (hasLatinText(raw)) {
      return raw.replace(/[，,。！？!?、]+/g, "").trim() || fallback;
    }

    return Array.from(raw.replace(/[，,。！？!?、\s]/g, "")).slice(0, 4).join("") || fallback;
  }

  const sourceText = [
    data?.keyword,
    ...(Array.isArray(data?.keywords) ? data.keywords : []),
    data?.summary,
    data?.text,
  ].join(" ");
  return EMOTION_LABEL_HINTS.find((label) => sourceText.includes(label)) || fallback;
}

export default function Ai({ data, language = "zh" }: { data?: any; language?: AppLanguage }) {
  const summary = data?.summary || (language === "en" ? "You are trying to find balance between effort and rest." : "在自我要求與放鬆之間，你努力尋找平衡。");
  const emotionLabel = normalizeEmotionLabel(data, language);
  const displaySummary = formatSummaryForDisplay(summary);
  const summaryLength = Array.from(displaySummary).length;
  const summaryClassName = summaryLength > 32
    ? "text-[20px] leading-[1.28] tracking-[0.06em]"
    : "text-[23px] leading-[1.3] tracking-[0.1em]";

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] size-full" data-name="AI情緒分析">
      <div className="-translate-x-1/2 absolute bottom-0 h-[200px] left-1/2 w-[402px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 402 200">
          <path d={svgPaths.p153b9200} fill="url(#paint0_linear_4_1845)" id="Rectangle 2" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_4_1845" x1="201" x2="201" y1="0" y2="118.5">
              <stop stopColor="#D4B69B" />
              <stop offset="1" stopColor="#DFD4CA" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="[word-break:break-word] absolute font-chenyuluoyan-thin left-[68px] not-italic text-black top-[236px] whitespace-normal w-[286px] z-20">
        {emotionLabel && (
          <p className="mb-[10px] text-[26px] leading-[1.15] tracking-[0.2em]">{emotionLabel}</p>
        )}
        <p
          className={`${summaryClassName} overflow-hidden`}
          style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
        >
          {displaySummary}
        </p>
      </div>
      <div className="absolute bg-[#dfd4ca] content-stretch flex gap-[40px] items-center justify-center left-[-1px] px-[32px] py-[20px] top-[798px] z-30" data-name="navigation bar">
        <Flower />
        <Calender />
        <Home />
        <Collection />
        <Setting />
      </div>
      
      <Group />

      <div className="absolute bg-[#f2eeea] left-[36px] overflow-clip rounded-[100px] size-[48px] top-[36px] z-30 cursor-pointer">
        <Cancel />
      </div>
    </div>
  );
}
