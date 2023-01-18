export default function Oval({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="383"
      height="364"
      fill="none"
      className={className}
    >
      <g filter="url(#a)">
        <path
          fill="url(#b)"
          d="M383 168c0 100.516-100.484 196-201 196S0 282.516 0 182 81.484 0 182 0s201 67.484 201 168Z"
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1="383"
          x2="-66.438"
          y1="364"
          y2="124.866"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".13" stop-color="#0026FF" />
          <stop offset=".745" stop-color="#7E00CC" />
        </linearGradient>
        <filter
          id="a"
          width="395"
          height="376"
          x="-4"
          y="-4"
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="8" dy="8" />
          <feGaussianBlur stdDeviation="16" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
          <feBlend
            in2="shape"
            mode="overlay"
            result="effect1_innerShadow_304_21"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="-4" dy="-4" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
          <feBlend
            in2="effect1_innerShadow_304_21"
            mode="overlay"
            result="effect2_innerShadow_304_21"
          />
        </filter>
      </defs>
    </svg>
  );
}
