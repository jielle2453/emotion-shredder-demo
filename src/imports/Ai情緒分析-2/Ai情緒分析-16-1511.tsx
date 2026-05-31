import svgPaths from "./svg-qe4ya16f9a";

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
    <div className="absolute inset-[59.38%_24.88%_20.62%_24.88%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 202 174.81">
        <g id="Group">
          <path d={svgPaths.p2930a800} fill="var(--fill-0, #B8E6C3)" id="Vector" />
          <path d={svgPaths.p10fc2700} fill="var(--fill-0, #777775)" id="Vector_2" />
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

export default function Ai() {
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
      <div className="[word-break:break-word] absolute font-['ChenYuluoyan_2.0:細體',sans-serif] leading-[0] left-[71px] not-italic text-[24px] text-black top-[261px] tracking-[4.8px] whitespace-nowrap">
        <p className="leading-[normal] mb-0">在自我要求與放鬆之間，</p>
        <p className="leading-[normal]">你努力尋找平衡。</p>
      </div>
      <p className="[word-break:break-word] absolute font-['ChenYuluoyan_2.0:細體',sans-serif] leading-[normal] left-[71px] not-italic text-[24px] text-black top-[220px] tracking-[4.8px] whitespace-nowrap">矛盾</p>
      <div className="absolute bg-[#dfd4ca] content-stretch flex gap-[40px] items-center justify-center left-[-1px] px-[32px] py-[20px] top-[798px]" data-name="navigation bar">
        <Flower />
        <Calender />
        <Home />
        <Collection />
        <Setting />
      </div>
      <Group />
      <div className="absolute bg-[#f2eeea] left-[36px] overflow-clip rounded-[100px] size-[48px] top-[36px]">
        <Cancel />
      </div>
    </div>
  );
}