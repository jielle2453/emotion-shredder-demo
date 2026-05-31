import gladiolusImage from "../../劍蘭.png";
import forgetMeNotImage from "../../勿忘我.png";
import sunflowerImage from "../../向日葵.png";
import daturaImage from "../../曼陀羅.png";
import narcissusImage from "../../水仙花.png";
import roseImage from "../../玫瑰.png";
import hydrangeaImage from "../../繡球花.png";
import poppyImage from "../../罌粟花.png";
import dandelionImage from "../../蒲公英.png";
import lavenderImage from "../../薰衣草.png";
import marigoldImage from "../../金盞花.png";
import tulipImage from "../../鬱金香.png";
import type { AppLanguage } from "./i18n";

export type FlowerInfo = {
  name: string;
  englishName: string;
  meaning: string;
  meaningEn: string;
  scenario: string;
  scenarioEn: string;
  imageSrc: string;
};

export type FlowerCopy = {
  name: string;
  meaning: string;
  scenario: string;
};

export const FLOWERS: FlowerInfo[] = [
  {
    name: "罌粟花",
    englishName: "Poppy",
    meaning: "珍惜眼前得幸福",
    meaningEn: "Cherish the happiness in front of you",
    scenario: "面對一段關係的結束，心中滿是遺憾，卻又希望彼此留住最美回憶的時刻。",
    scenarioEn: "When a relationship is ending, your heart holds regret while still wishing to keep the most beautiful memories.",
    imageSrc: poppyImage,
  },
  {
    name: "勿忘我",
    englishName: "Forget-me-not",
    meaning: "記得自己，也被記得",
    meaningEn: "Remember yourself, and be remembered",
    scenario: "想念某個人、某段時光，或害怕被遺忘時，它提醒你珍貴的連結並不會消失。",
    scenarioEn: "For missing someone or a past season, or fearing being forgotten; it reminds you that precious bonds do not simply disappear.",
    imageSrc: forgetMeNotImage,
  },
  {
    name: "金盞花",
    englishName: "Marigold",
    meaning: "失落中仍有光",
    meaningEn: "Light remains within loss",
    scenario: "事情不如預期、心情低落時，陪你承認難過，也慢慢看見還能往前的地方。",
    scenarioEn: "When things do not go as expected, it lets you acknowledge sadness while slowly seeing a way forward.",
    imageSrc: marigoldImage,
  },
  {
    name: "水仙花",
    englishName: "Narcissus",
    meaning: "看見自己的價值",
    meaningEn: "See your own worth",
    scenario: "在懷疑自己、需要重新找回自信時，提醒你把目光溫柔地轉回自己身上。",
    scenarioEn: "When you doubt yourself and need confidence again, it gently turns your gaze back toward your own value.",
    imageSrc: narcissusImage,
  },
  {
    name: "曼陀羅",
    englishName: "Datura",
    meaning: "複雜情緒裡的清醒",
    meaningEn: "Clarity inside complicated feelings",
    scenario: "情緒混亂、想法彼此拉扯時，陪你看見那些不容易說出口的矛盾。",
    scenarioEn: "When emotions are tangled and thoughts pull against each other, it helps you notice the contradictions that are hard to say aloud.",
    imageSrc: daturaImage,
  },
  {
    name: "蒲公英",
    englishName: "Dandelion",
    meaning: "放手，也是自由",
    meaningEn: "Letting go can be freedom",
    scenario: "想放下某件事、離開某個階段，卻還有點不捨時，提醒你輕輕鬆手也能往前。",
    scenarioEn: "When you want to leave something behind but still feel attached, it reminds you that a gentle release can also move you forward.",
    imageSrc: dandelionImage,
  },
  {
    name: "繡球花",
    englishName: "Hydrangea",
    meaning: "矛盾，也是一種真心",
    meaningEn: "Contradiction can still be sincere",
    scenario: "同時擁有多種感受、很難只用一種心情概括時，它容納你的反覆與細膩。",
    scenarioEn: "When many feelings exist at once and no single mood can explain them, it holds your nuance and uncertainty.",
    imageSrc: hydrangeaImage,
  },
  {
    name: "向日葵",
    englishName: "Sunflower",
    meaning: "把臉轉向陽光",
    meaningEn: "Turn your face toward the sun",
    scenario: "想重新振作、需要一點鼓勵時，陪你把注意力放回仍然明亮的方向。",
    scenarioEn: "When you want to recover your energy and need encouragement, it helps you look toward what is still bright.",
    imageSrc: sunflowerImage,
  },
  {
    name: "玫瑰",
    englishName: "Rose",
    meaning: "愛、熱烈與柔軟",
    meaningEn: "Love, intensity, and tenderness",
    scenario: "面對愛、渴望、受傷或被珍惜的時刻，提醒你真心值得被好好對待。",
    scenarioEn: "For moments of love, longing, hurt, or being cherished; it reminds you that sincerity deserves care.",
    imageSrc: roseImage,
  },
  {
    name: "劍蘭",
    englishName: "Gladiolus",
    meaning: "挺直自己，繼續前進",
    meaningEn: "Stand tall and keep going",
    scenario: "承受壓力、需要勇氣把事情完成時，陪你整理力量，穩穩走下去。",
    scenarioEn: "When pressure is heavy and courage is needed, it helps you gather strength and keep moving steadily.",
    imageSrc: gladiolusImage,
  },
  {
    name: "鬱金香",
    englishName: "Tulip",
    meaning: "溫柔的新開始",
    meaningEn: "A gentle new beginning",
    scenario: "準備踏進新階段、心裡既期待又不安時，提醒你可以慢慢展開。",
    scenarioEn: "When entering a new stage with both hope and unease, it reminds you that you can unfold slowly.",
    imageSrc: tulipImage,
  },
  {
    name: "薰衣草",
    englishName: "Lavender",
    meaning: "平靜與安放",
    meaningEn: "Calm and being held",
    scenario: "焦慮、疲憊、睡前仍停不下來時，陪你把心慢慢放回安穩的位置。",
    scenarioEn: "When anxiety, exhaustion, or racing thoughts linger, it helps your heart settle into a steadier place.",
    imageSrc: lavenderImage,
  },
];

export const FLOWER_COUNT = FLOWERS.length;

export function clampFlowerIndex(index: number): number {
  return Number.isInteger(index) ? Math.min(FLOWER_COUNT - 1, Math.max(0, index)) : -1;
}

export function getFlowerCopy(flower: FlowerInfo, language: AppLanguage): FlowerCopy {
  if (language === "en") {
    return {
      name: flower.englishName,
      meaning: flower.meaningEn,
      scenario: flower.scenarioEn,
    };
  }

  return {
    name: flower.name,
    meaning: flower.meaning,
    scenario: flower.scenario,
  };
}

export function FlowerArtwork({
  flowerIndex,
  className = "",
  imageClassName = "",
  decorative = false,
  language = "zh",
}: {
  flowerIndex: number;
  className?: string;
  imageClassName?: string;
  decorative?: boolean;
  language?: AppLanguage;
}) {
  const index = clampFlowerIndex(flowerIndex);
  const flower = FLOWERS[index >= 0 ? index : 0];
  const flowerCopy = getFlowerCopy(flower, language);

  return (
    <div className={className}>
      <img
        src={flower.imageSrc}
        alt={decorative ? "" : flowerCopy.name}
        aria-hidden={decorative || undefined}
        className={`h-full w-full object-contain ${imageClassName}`}
        draggable={false}
      />
    </div>
  );
}

export const FLOWER_COMPONENTS = FLOWERS.map((flower, index) => {
  function FlowerImage() {
    return <FlowerArtwork flowerIndex={index} decorative className="absolute inset-0" />;
  }

  FlowerImage.displayName = `${flower.englishName}Image`;
  return FlowerImage;
});
