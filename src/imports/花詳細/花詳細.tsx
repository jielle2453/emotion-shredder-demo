import { useEffect, useMemo, useState } from "react";
import svgPaths from "./svg-vyic02djs4";
import { FLOWERS, FlowerArtwork, clampFlowerIndex, getFlowerCopy } from "../../utils/flowers";
import { dailyFinalEmotionRecords, getEmotionRecords, revealedEmotionRecords } from "../../utils/records";
import type { AppLanguage } from "../../utils/i18n";

function FlowerIcon() {
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

export default function FlowerDetail({
  flowerIndex,
  language = "zh",
}: {
  flowerIndex?: number;
  language?: AppLanguage;
}) {
  const index = useMemo(() => {
    const clampedIndex = clampFlowerIndex(flowerIndex ?? 0);
    return clampedIndex >= 0 ? clampedIndex : 0;
  }, [flowerIndex]);
  const flowerData = FLOWERS[index];
  const flowerCopy = getFlowerCopy(flowerData, language);
  const [obtainedCount, setObtainedCount] = useState(0);

  useEffect(() => {
    let active = true;

    getEmotionRecords()
      .then((records) => {
        if (!active) return;
        const revealedDailyRecords = dailyFinalEmotionRecords(revealedEmotionRecords(records));
        setObtainedCount(revealedDailyRecords.filter((record) => clampFlowerIndex(record.flowerIndex) === index).length);
      })
      .catch((err) => {
        console.warn("Failed to load flower detail count:", err);
      });

    return () => {
      active = false;
    };
  }, [index]);

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] size-full" data-name="花詳細">
      <div className="absolute bg-[#dfd4ca] content-stretch flex gap-[40px] items-center justify-center left-[-1px] px-[32px] py-[20px] top-[798px]" data-name="navigation bar">
        <FlowerIcon />
        <Calender />
        <Home />
        <Collection />
        <Setting />
      </div>
      
      <div className="absolute bg-[#f2eeea] left-[36px] overflow-clip rounded-[100px] size-[48px] top-[36px] z-10">
        <Cancel />
      </div>

      <FlowerArtwork
        flowerIndex={index}
        className="absolute left-[62px] top-[72px] h-[466px] w-[278px] z-0"
        imageClassName="object-contain"
        language={language}
      />

      <div className="absolute bg-white border border-[#f3f3f3] border-solid h-[208px] left-[41px] overflow-visible rounded-[20px] shadow-[4px_4px_20px_5px_rgba(219,219,219,0.2)] top-[496px] w-[320px] z-10">
        <div className="absolute right-[-5px] top-[-19px] flex size-[42px] items-center justify-center rounded-full bg-[#9c8f82]">
          <span className="font-['Fredoka:SemiBold',sans-serif] font-semibold leading-none text-white text-[24px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {obtainedCount}
          </span>
        </div>
        <p className="absolute left-0 right-0 top-[24px] font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal text-[#767676] text-[32px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
          {flowerCopy.name}
        </p>
        <p className="absolute left-[24px] right-[24px] top-[75px] font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal text-[#767676] text-[16px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
          {flowerCopy.meaning}
        </p>
        <p className="absolute left-[36px] right-[36px] top-[122px] font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal text-[#767676] text-[16px] leading-[1.25] text-left" style={{ fontVariationSettings: "'wdth' 100" }}>
          {flowerCopy.scenario}
        </p>
      </div>
    </div>
  );
}
