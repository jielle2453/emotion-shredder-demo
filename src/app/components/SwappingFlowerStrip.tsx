import type { CSSProperties } from "react";
import flower01 from "../../assets/flower-strip-flower-01.png";
import flower02 from "../../assets/flower-strip-flower-02.png";
import flower03 from "../../assets/flower-strip-flower-03.png";
import flower04 from "../../assets/flower-strip-flower-04.png";
import flower05 from "../../assets/flower-strip-flower-05.png";
import flower06 from "../../assets/flower-strip-flower-06.png";

const FLOWER_STRIP_ITEMS = [
  { src: flower01, left: "0%", width: "19%", distance: "1.8px", angle: "1.4deg", duration: "3.2s", delay: "-0.2s" },
  { src: flower02, left: "16.5%", width: "18%", distance: "1.5px", angle: "-1.7deg", duration: "3.45s", delay: "-1.0s" },
  { src: flower03, left: "33%", width: "19%", distance: "1.9px", angle: "1.2deg", duration: "3.1s", delay: "-1.7s" },
  { src: flower04, left: "49.5%", width: "18%", distance: "1.4px", angle: "-1.1deg", duration: "3.55s", delay: "-0.6s" },
  { src: flower05, left: "66%", width: "18%", distance: "1.8px", angle: "1.6deg", duration: "3.3s", delay: "-1.4s" },
  { src: flower06, left: "82%", width: "18.5%", distance: "1.5px", angle: "-1.3deg", duration: "3.65s", delay: "-2.1s" },
];

export default function SwappingFlowerStrip({
  className = "",
  imageClassName = "",
}: {
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={className} data-name="flower">
      {FLOWER_STRIP_ITEMS.map((item, index) => (
        <img
          key={item.src}
          alt=""
          aria-hidden="true"
          className={`flower-strip-stem absolute bottom-0 h-full object-contain object-bottom pointer-events-none ${imageClassName}`}
          draggable={false}
          src={item.src}
          style={{
            left: item.left,
            width: item.width,
            "--sway-distance": item.distance,
            "--sway-angle": item.angle,
            "--sway-duration": item.duration,
            "--sway-delay": item.delay,
            "--sway-origin": `${50 + (index % 2 === 0 ? -3 : 3)}% 100%`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
