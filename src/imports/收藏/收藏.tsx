import { useEffect, useMemo, useState } from "react";
import svgPaths from "./svg-hoq6bh9lff";
import { dailyFinalEmotionRecords, getEmotionRecords, revealedEmotionRecords, uniqueFlowerIndexes } from "../../utils/records";
import { FLOWER_COMPONENTS as FLOWER_IMAGE_COMPONENTS, FLOWERS as FLOWER_DATA, FlowerArtwork, getFlowerCopy } from "../../utils/flowers";
import type { AppLanguage } from "../../utils/i18n";
import SwappingFlowerStrip from "../../app/components/SwappingFlowerStrip";

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
          <path d={svgPaths.pf609f00} fill="var(--fill-0, #958475)" id="Vector" />
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
    <div className="absolute h-[54.18px] left-[15px] top-[11px] w-[30.37px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.3701 54.1804">
        <g id="flower">
          <path d={svgPaths.p1240000} fill="var(--fill-0, #F9A092)" id="Vector 13" />
          <path d={svgPaths.p1587a000} fill="var(--fill-0, #BACAC0)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[56px] relative shrink-0 w-full">
      <div className="absolute h-[80px] left-[-2px] overflow-clip top-[-8px] w-[60px]" data-name="flower">
        <Flower1 />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[word-break:break-word] col-1 font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-0 relative row-1 text-[#767676] text-[16px] text-center w-[56px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        ?��???      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[22px] top-[26px] w-[56px]">
      <Frame2 />
      <Group />
    </div>
  );
}

function Flower2() {
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

function Frame5() {
  return (
    <div className="h-[56px] relative shrink-0 w-full">
      <div className="absolute h-[80px] left-[-2px] overflow-clip top-[-8px] w-[60px]" data-name="flower">
        <Flower2 />
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[word-break:break-word] col-1 font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-0 relative row-1 text-[#767676] text-[16px] text-center w-[56px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        ?��???      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[22px] top-[26px] w-[56px]">
      <Frame5 />
      <Group1 />
    </div>
  );
}

function Flower3() {
  return (
    <div className="absolute h-[69.255px] left-[13px] top-[11px] w-[29.081px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.0809 69.2551">
        <g id="flower">
          <path d={svgPaths.p371635f0} fill="var(--fill-0, #9C9490)" id="Vector 8" />
          <path d={svgPaths.p31728100} fill="var(--fill-0, #9C9490)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="h-[56px] relative shrink-0 w-full">
      <div className="absolute h-[80px] left-[-2px] overflow-clip top-[-8px] w-[60px]" data-name="flower">
        <Flower3 />
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[word-break:break-word] col-1 font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-0 relative row-1 text-[#767676] text-[16px] text-center w-[56px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        ?��???      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[22px] top-[26px] w-[56px]">
      <Frame7 />
      <Group2 />
    </div>
  );
}

function Flower4() {
  return (
    <div className="absolute h-[54.18px] left-[15px] top-[11px] w-[30.37px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.3701 54.1804">
        <g id="flower">
          <path d={svgPaths.p1240000} fill="var(--fill-0, #9C9490)" id="Vector 13" />
          <path d={svgPaths.p1587a000} fill="var(--fill-0, #9C9490)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="h-[56px] relative shrink-0 w-full">
      <div className="absolute h-[80px] left-[-2px] overflow-clip top-[-8px] w-[60px]" data-name="flower">
        <Flower4 />
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[word-break:break-word] col-1 font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-0 relative row-1 text-[#767676] text-[16px] text-center w-[56px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        ?��???      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[22px] top-[26px] w-[56px]">
      <Frame9 />
      <Group3 />
    </div>
  );
}

function Flower5() {
  return (
    <div className="absolute h-[54.18px] left-[15px] top-[11px] w-[30.37px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.3701 54.1804">
        <g id="flower">
          <path d={svgPaths.p1240000} fill="var(--fill-0, #9C9490)" id="Vector 13" />
          <path d={svgPaths.p1587a000} fill="var(--fill-0, #9C9490)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-[56px] relative shrink-0 w-full">
      <div className="absolute h-[80px] left-[-2px] overflow-clip top-[-8px] w-[60px]" data-name="flower">
        <Flower5 />
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[word-break:break-word] col-1 font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-0 relative row-1 text-[#767676] text-[16px] text-center w-[56px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        ?��???      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[22px] top-[26px] w-[56px]">
      <Frame11 />
      <Group4 />
    </div>
  );
}

function Flower6() {
  return (
    <div className="absolute h-[54.18px] left-[15px] top-[11px] w-[30.37px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.3701 54.1804">
        <g id="flower">
          <path d={svgPaths.p1240000} fill="var(--fill-0, #9C9490)" id="Vector 13" />
          <path d={svgPaths.p1587a000} fill="var(--fill-0, #9C9490)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="h-[56px] relative shrink-0 w-full">
      <div className="absolute h-[80px] left-[-2px] overflow-clip top-[-8px] w-[60px]" data-name="flower">
        <Flower6 />
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[word-break:break-word] col-1 font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-0 relative row-1 text-[#767676] text-[16px] text-center w-[56px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        ?��???      </p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[22px] top-[26px] w-[56px]">
      <Frame13 />
      <Group5 />
    </div>
  );
}

function Flower7() {
  return (
    <div className="absolute h-[54.18px] left-[15px] top-[11px] w-[30.37px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.3701 54.1804">
        <g id="flower">
          <path d={svgPaths.p1240000} fill="var(--fill-0, #9C9490)" id="Vector 13" />
          <path d={svgPaths.p1587a000} fill="var(--fill-0, #9C9490)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="h-[56px] relative shrink-0 w-full">
      <div className="absolute h-[80px] left-[-2px] overflow-clip top-[-8px] w-[60px]" data-name="flower">
        <Flower7 />
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[word-break:break-word] col-1 font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-0 relative row-1 text-[#767676] text-[16px] text-center w-[56px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        ?��???      </p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[22px] top-[26px] w-[56px]">
      <Frame15 />
      <Group6 />
    </div>
  );
}

function Flower8() {
  return (
    <div className="absolute h-[54.18px] left-[15px] top-[11px] w-[30.37px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.3701 54.1804">
        <g id="flower">
          <path d={svgPaths.p1240000} fill="var(--fill-0, #9C9490)" id="Vector 13" />
          <path d={svgPaths.p1587a000} fill="var(--fill-0, #9C9490)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Frame17() {
  return (
    <div className="h-[56px] relative shrink-0 w-full">
      <div className="absolute h-[80px] left-[-2px] overflow-clip top-[-8px] w-[60px]" data-name="flower">
        <Flower8 />
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[word-break:break-word] col-1 font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-0 relative row-1 text-[#767676] text-[16px] text-center w-[56px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        ?��???      </p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[22px] top-[26px] w-[56px]">
      <Frame17 />
      <Group7 />
    </div>
  );
}

function Flower9() {
  return (
    <div className="absolute h-[54.18px] left-[15px] top-[11px] w-[30.37px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.3701 54.1804">
        <g id="flower">
          <path d={svgPaths.p1240000} fill="var(--fill-0, #9C9490)" id="Vector 13" />
          <path d={svgPaths.p1587a000} fill="var(--fill-0, #9C9490)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Frame19() {
  return (
    <div className="h-[56px] relative shrink-0 w-full">
      <div className="absolute h-[80px] left-[-2px] overflow-clip top-[-8px] w-[60px]" data-name="flower">
        <Flower9 />
      </div>
    </div>
  );
}

function Group8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[word-break:break-word] col-1 font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-0 relative row-1 text-[#767676] text-[16px] text-center w-[56px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        ?��???      </p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[22px] top-[26px] w-[56px]">
      <Frame19 />
      <Group8 />
    </div>
  );
}

function Flower10() {
  return (
    <div className="absolute h-[54.18px] left-[15px] top-[11px] w-[30.37px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.3701 54.1804">
        <g id="flower">
          <path d={svgPaths.p1240000} fill="var(--fill-0, #9C9490)" id="Vector 13" />
          <path d={svgPaths.p1587a000} fill="var(--fill-0, #9C9490)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Frame21() {
  return (
    <div className="h-[56px] relative shrink-0 w-full">
      <div className="absolute h-[80px] left-[-2px] overflow-clip top-[-8px] w-[60px]" data-name="flower">
        <Flower10 />
      </div>
    </div>
  );
}

function Group9() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[word-break:break-word] col-1 font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-0 relative row-1 text-[#767676] text-[16px] text-center w-[56px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        ?��???      </p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[22px] top-[26px] w-[56px]">
      <Frame21 />
      <Group9 />
    </div>
  );
}

function Flower11() {
  return (
    <div className="absolute h-[54.18px] left-[15px] top-[11px] w-[30.37px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.3701 54.1804">
        <g id="flower">
          <path d={svgPaths.p1240000} fill="var(--fill-0, #9C9490)" id="Vector 13" />
          <path d={svgPaths.p1587a000} fill="var(--fill-0, #9C9490)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Frame23() {
  return (
    <div className="h-[56px] relative shrink-0 w-full">
      <div className="absolute h-[80px] left-[-2px] overflow-clip top-[-8px] w-[60px]" data-name="flower">
        <Flower11 />
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[word-break:break-word] col-1 font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-0 relative row-1 text-[#767676] text-[16px] text-center w-[56px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        ?��???      </p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[22px] top-[26px] w-[56px]">
      <Frame23 />
      <Group10 />
    </div>
  );
}

function Flower12() {
  return (
    <div className="absolute h-[54.18px] left-[15px] top-[11px] w-[30.37px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.3701 54.1804">
        <g id="flower">
          <path d={svgPaths.p1240000} fill="var(--fill-0, #9C9490)" id="Vector 13" />
          <path d={svgPaths.p1587a000} fill="var(--fill-0, #9C9490)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Frame25() {
  return (
    <div className="h-[56px] relative shrink-0 w-full">
      <div className="absolute h-[80px] left-[-2px] overflow-clip top-[-8px] w-[60px]" data-name="flower">
        <Flower12 />
      </div>
    </div>
  );
}

function Group11() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[word-break:break-word] col-1 font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-0 relative row-1 text-[#767676] text-[16px] text-center w-[56px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        ?��???      </p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[22px] top-[26px] w-[56px]">
      <Frame25 />
      <Group11 />
    </div>
  );
}

export const FLOWER_COMPONENTS = FLOWER_IMAGE_COMPONENTS;
export { FlowerArtwork };

export const FLOWERS = FLOWER_DATA;

const LEGACY_FLOWERS = []; /*
  { name: "?��?", meaning: "?��??��?中�??��??��?", scenario: "?��??�在???默�??�注?�人，卻?�能?�酸?�苦�???��?底、獨?��??��?夜�??? },
  { name: "?��???, meaning: "?�傷?��?妒、離?��??��?", scenario: "?��?活中經歷了離?��??�是心中不自覺�?起�?他人比�??�產?��??�苦嫉�??��? },
  { name: "?��???, meaning: "請想念�??��??��?永�??��???, scenario: "?��?一段�?係�?結�?，�?中滿?�遺?��??��?希�?彼此?��??�美�??��??�刻?? },
  { name: "紫藤", meaning: "?��??��?迷、�?幸�??��??�、�?依�???, scenario: "?�然夾帶?�傷，�??��??�是對�?段�??��?美好?��??�於?��?，難以�??��?糾�??��? },
  { name: "?��?�?, meaning: "不可?�知?��??�、�??��?顛�?流離", scenario: "?��??��??�未?��??�極度�??��??�是?�活節奏被?��??�陷?�深深�??�慮?�無?��?中�? },
  { name: "仙人?�花", meaning: "?�強?�孤?�、隱忍�?溫�?", scenario: "外表?��?沒�??�長滿�??�防衛�??��?但內心其實無比孤?��?�?��?��??��??�難?�刻?? },
  { name: "?�公??, meaning: "?��??��??��??�渴?�自?�、迷?��?追�?", scenario: "?�覺?�己?�被風吹???種�?，�??��?下�?站落?��??��??�滿對未來�?迷茫?��?確�??��? },
  { name: "?�日??, meaning: "?�敢?�去追�?幸�??��?默�??�、自信�???, scenario: "決�??�雲見日，�??�灰塵�??�出?��??�面?��??��?滿正?��??�勵志�??��? },
  { name: "天竺??, meaning: "?�然?�相?�、幸福就?�身?�、自信�??��?", scenario: "突然?�通�??�個困?��?久�????，�??�找?��??��?活�??�信?��?定�??? },
  { name: "?�瑰", meaning: "?��??�熱?�?�耀?��??��?", scenario: "不�??�是?��?，更?��??�在對�??�新計畫?�新?�好?�到滿�??��?，迫不�?待大展身?��??��??? },
  { name: "?�蘭", meaning: "高�??��?貞、�?節高�??�武裝�??�信", scenario: "?��??�戰?�考試?��?穿�??�己?��??��?準�?�?��迎戰?�勢?��?得�??�信紀?��? },
  { name: "繡�???, meaning: "希�??��?貞、短?��?變�?（�?帶�??��?之�?�?, scenario: "?�然心�??�在變�?，�?已�??�到了雨?�天?��??��?，�??��??�活?��??��??? },
  { name: "鬱�?�?, meaning: "?��?�???�榮譽、�?麗�??�盼", scenario: "?�活一?�步?�正軌�?心中?�滿粉�??�泡泡�?對�?活�?滿溫?��?待�?安穩?��??? },
  { name: "風信�?, meaning: "點�??�命之火?��?享�?富、�??��???, scenario: "經歷了�?段�?潮�?，�??�決定放下�??��??�新?�起對�?活熱?��??��??�宣?�」�? },
  { name: "?�蘭", meaning: "幸�?歸�?", scenario: "?��??�在?��??��?尾。在經歷了�???��?�混亂�?，�?活�??��?歸平?��??��??�到?��?踏實?? },
  { name: "?�衣??, meaning: "等�??��??��?心相?�、寧?��??�平", scenario: "點�?香�??�聽?�音樂�??�深夜裡?��?亂�??��?梳�?完畢，內心�?歸無波無?��?平�??? },
  { name: "?��?", meaning: "純�??��??�、�?心相?�、坦?��??��?", scenario: "?��??�?�偽裝�??�日記裡誠實?�面對自己�??�弱?��?完�?，�??�己?��??�解?? },
  { name: "滿天??, meaning: "?��??��??��??�思念?��?純�?�?, scenario: "淡淡?�想念�??�個人?��?段�??��?不�??�、�??�擾，只?�溫?�地?��?底�?一?��?置給它�? },
*/

function FlowerCard({
  name,
  flowerIndex,
  unlocked,
  language,
  onClick,
}: {
  name: string;
  flowerIndex: number;
  unlocked: boolean;
  language: AppLanguage;
  onClick?: () => void;
}) {
  const FlowerSvg = FLOWER_COMPONENTS[flowerIndex % FLOWER_COMPONENTS.length];
  const shouldWrapEnglishName = language === "en" && name === "Forget-me-not";
  const shouldKeepEnglishNameInline = language === "en" && !shouldWrapEnglishName;
  const nameLength = Array.from(name).length;
  const nameFontSize = language === "en"
    ? shouldWrapEnglishName
      ? 15
      : nameLength >= 9
        ? 13
        : nameLength >= 8
          ? 14
          : 15
    : 16;

  return (
    <button
      onClick={unlocked ? onClick : undefined}
      disabled={!unlocked}
      className={`bg-white h-[140px] relative rounded-[20px] shrink-0 w-[100px] ${unlocked ? "cursor-pointer" : "cursor-default"}`}
      data-name="花卡"
      aria-label={unlocked ? name : language === "en" ? `${name} locked` : `${name} 未解鎖`}
    >
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute content-stretch flex flex-col gap-[25px] items-center left-[22px] top-[26px] w-[56px]">
          <div className={`h-[56px] relative shrink-0 w-full ${unlocked ? "" : "grayscale opacity-35"}`}>
            <div className="absolute h-[80px] left-[-2px] overflow-clip top-[-8px] w-[60px]" data-name="flower">
              <FlowerSvg />
            </div>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <p
              className={`col-1 font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[1.1] ml-0 mt-0 relative row-1 text-center ${shouldKeepEnglishNameInline ? "w-[96px] whitespace-nowrap" : shouldWrapEnglishName ? "w-[84px] [word-break:normal]" : "w-[56px] [word-break:break-word]"} ${unlocked ? "text-[#767676]" : "text-[#b9b0aa]"}`}
              style={{ fontVariationSettings: "'wdth' 100", fontSize: `${nameFontSize}px` }}
            >
              {name}
            </p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f3f3] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[4px_4px_20px_5px_rgba(219,219,219,0.2)]" />
    </button>
  );
}

function Frame3({
  unlockedFlowerIndexes,
  onPickFlower,
  language,
}: {
  unlockedFlowerIndexes: number[];
  onPickFlower?: (index: number) => void;
  language: AppLanguage;
}) {
  const unlockedSet = useMemo(() => new Set(unlockedFlowerIndexes), [unlockedFlowerIndexes]);

  return (
    <div className="-translate-x-1/2 absolute gap-x-[20px] gap-y-[20px] grid-cols-[repeat(3,fit-content(100%))] inline-grid left-1/2 top-0">
      {FLOWERS.map((f, i) => (
        <FlowerCard key={i} name={getFlowerCopy(f, language).name} flowerIndex={i} unlocked={unlockedSet.has(i)} language={language} onClick={() => onPickFlower?.(i)} />
      ))}
    </div>
  );
}

function Frame4({
  unlockedFlowerIndexes,
  onPickFlower,
  language,
}: {
  unlockedFlowerIndexes: number[];
  onPickFlower?: (index: number) => void;
  language: AppLanguage;
}) {
  return (
    <div className="-translate-x-1/2 absolute h-[576px] left-1/2 overflow-y-auto overflow-x-hidden top-[127px] w-[402px]">
      <div className="relative pb-[40px]">
        <Frame3 unlockedFlowerIndexes={unlockedFlowerIndexes} onPickFlower={onPickFlower} language={language} />
      </div>
    </div>
  );
}

function Flower13() {
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

function Flower14() {
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

function Flower15() {
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

function Flower16() {
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

function Flower17() {
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

function Flower18() {
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
  onPickFlower,
  language = "zh",
}: {
  onPickFlower?: (index: number) => void;
  language?: AppLanguage;
} = {}) {
  const [unlockedFlowerIndexes, setUnlockedFlowerIndexes] = useState<number[]>([]);

  useEffect(() => {
    let active = true;

    getEmotionRecords()
      .then((records) => {
        if (active) {
          const revealedDailyRecords = dailyFinalEmotionRecords(revealedEmotionRecords(records));
          setUnlockedFlowerIndexes(uniqueFlowerIndexes(revealedDailyRecords, FLOWERS.length));
        }
      })
      .catch((err) => {
        console.warn("Failed to load unlocked flowers:", err);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] size-full" data-name="收藏">
      <p className="[word-break:break-word] absolute font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal leading-[normal] left-1/2 -translate-x-1/2 text-[#767676] text-[32px] top-[60px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        {language === "en" ? "Collection" : "收藏"}
      </p>
      <div className="absolute bg-[#dfd4ca] content-stretch flex gap-[40px] items-center justify-center left-[-1px] px-[32px] py-[20px] top-[798px] z-10" data-name="navigation bar">
        <Flower />
        <Calender />
        <Home />
        <Collection />
        <Setting />
      </div>
      <Frame4 unlockedFlowerIndexes={unlockedFlowerIndexes} onPickFlower={onPickFlower} language={language} />
      <SwappingFlowerStrip className="-translate-x-1/2 absolute bottom-[76px] h-[80px] left-1/2 w-[360px]" />
    </div>
  );
}
