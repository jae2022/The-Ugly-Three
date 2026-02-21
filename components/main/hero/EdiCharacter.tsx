"use client"

interface Props { isActive: boolean }

// Edi는 육각형 몸체 + 직사각형 다리 → 다리에 rotation 없이 scaleY 압축만
const EDI_STYLES = `
  @keyframes edi-jump {
    0%   { transform: translateY(0px) scaleX(1.04) scaleY(0.96); }
    18%  { transform: translateY(0.5px) scaleX(1.07) scaleY(0.93); }
    40%  { transform: translateY(-8px) scaleX(0.97) scaleY(1.04); }
    55%  { transform: translateY(-5px) scaleX(0.98) scaleY(1.02); }
    75%  { transform: translateY(0.2px) scaleX(1.05) scaleY(0.95); }
    100% { transform: translateY(0px) scaleX(1.04) scaleY(0.96); }
  }
  @keyframes edi-wobble {
    0%   { transform: rotate(0deg); }
    18%  { transform: rotate(-0.8deg); }
    40%  { transform: rotate(0.4deg); }
    55%  { transform: rotate(0deg); }
    75%  { transform: rotate(0.7deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes edi-tuck {
    0%   { transform: translate(0px, 0px) scaleY(1.0); }
    18%  { transform: translate(0px, 0.6px) scaleY(0.96); }
    40%  { transform: translate(0px, -2px) scaleY(0.84); }
    55%  { transform: translate(0px, -1px) scaleY(0.90); }
    75%  { transform: translate(0px, 0.4px) scaleY(0.97); }
    100% { transform: translate(0px, 0px) scaleY(1.0); }
  }
  .edi-runner {
    transform-origin: 47px 52px;
    transform-box: fill-box;
    will-change: transform;
  }
  .edi-runner--active {
    animation: edi-jump 0.68s ease-in-out infinite;
  }
  .edi-body {
    transform-origin: 47px 52px;
    transform-box: fill-box;
    will-change: transform;
  }
  .edi-body--active {
    animation: edi-wobble 0.68s ease-in-out infinite;
  }
  .edi-leg {
    transform-box: fill-box;
    transform-origin: 50% 0%;
    will-change: transform;
  }
  .edi-leg--active {
    animation: edi-tuck 0.68s ease-in-out infinite;
  }
  .edi-legR--active {
    animation-delay: -0.34s;
  }
  @media (prefers-reduced-motion: reduce) {
    .edi-runner--active, .edi-body--active, .edi-leg--active { animation: none !important; }
  }
`

export function EdiCharacter({ isActive }: Props) {
  const a = isActive ? "--active" : ""
  return (
    <svg width="95" height="95" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
      <defs>
        <linearGradient id="edi-g0" x1="38.5666" y1="93.5488" x2="38.5666" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#82EBD1"/>
          <stop offset="1" stopColor="#00CA97"/>
        </linearGradient>
        <linearGradient id="edi-g1" x1="54.5671" y1="93.5518" x2="54.5671" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#82EBD1"/>
          <stop offset="1" stopColor="#00CA97"/>
        </linearGradient>
        <filter id="edi-f0" x="21.2098" y="37.7181" width="27.2781" height="13.4705" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="0.673526"/>
          <feGaussianBlur stdDeviation="0.673526"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
      </defs>
      <style>{EDI_STYLES}</style>

      <g className={`edi-runner${a ? " edi-runner" + a : ""}`}>
        {/* left leg */}
        <g className={`edi-leg${a ? " edi-leg" + a : ""}`}>
          <path d="M45.1286 90.5151C45.1286 90.5165 45.1297 90.5176 45.131 90.5176C45.1324 90.5176 45.1335 90.5187 45.1335 90.52V92.0332C45.1335 92.8703 44.4549 93.5488 43.6179 93.5488H33.5153C32.6783 93.5488 31.9997 92.8703 31.9997 92.0332C31.9997 91.1961 32.6783 90.5176 33.5153 90.5176H34.0151C34.945 90.5176 35.6989 89.7637 35.6989 88.8338V73.6838C35.6989 72.7539 36.4528 72 37.3827 72H43.4448C44.3747 72 45.1286 72.7539 45.1286 73.6838V90.5151Z" fill="url(#edi-g0)"/>
        </g>

        {/* right leg */}
        <g className={`edi-leg${a ? " edi-leg" + a + " edi-legR" + a : ""}`}>
          <path d="M61.1345 91.5317C61.1345 91.532 61.1342 91.5322 61.134 91.5322C61.1337 91.5322 61.1335 91.5324 61.1335 91.5327V92.542C61.1335 93.0997 60.6814 93.5518 60.1237 93.5518H49.5148C48.678 93.5518 47.9997 92.8734 47.9997 92.0366C47.9997 91.1998 48.678 90.5215 49.5148 90.5215H50.0219C50.9519 90.5215 51.7057 89.7676 51.7057 88.8377V73.6838C51.7057 72.7539 52.4596 72 53.3896 72H59.4506C60.3806 72 61.1345 72.7539 61.1345 73.6838V91.5317Z" fill="url(#edi-g1)"/>
        </g>

        {/* body + eyes */}
        <g className={`edi-body${a ? " edi-body" + a : ""}`}>
          <path d="M57.4296 8.51855H36.8684C36.1392 8.51855 35.4297 8.75524 34.8465 9.19303L17.8944 21.9196C17.3521 22.3267 16.9453 22.8881 16.7273 23.5302L9.62862 44.4411C9.39036 45.1429 9.3903 45.9037 9.62843 46.6056L16.7229 67.516C16.9409 68.1584 17.3477 68.72 17.8902 69.1273L34.843 81.8537C35.4261 82.2914 36.1356 82.5281 36.8648 82.5281H57.4257C58.1549 82.5281 58.8644 82.2914 59.4476 81.8536L76.3997 69.1271C76.942 68.7199 77.3488 68.1586 77.5668 67.5164L84.6655 46.6056C84.9038 45.9037 84.9038 45.1429 84.6657 44.441L77.5712 23.5306C77.3532 22.8882 76.9464 22.3266 76.4039 21.9194L59.4514 9.193C58.8683 8.75523 58.1588 8.51855 57.4296 8.51855Z" fill="#82EBD1"/>
          <g filter="url(#edi-f0)">
            <rect x="22.5568" y="38.3916" width="7.40879" height="10.7764" rx="3.70439" fill="white"/>
            <rect x="40.0685" y="38.3916" width="7.07202" height="10.7764" rx="3.53601" fill="white"/>
          </g>
        </g>
      </g>
    </svg>
  )
}
