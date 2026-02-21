"use client"

interface Props { isActive: boolean }

// 유저 제공 애니메이션을 그대로 적용
const LOCO_STYLES = `
  @keyframes loco-jump {
    0%   { transform: translateY(0px) scaleX(1.05) scaleY(0.95); }
    18%  { transform: translateY(0.6px) scaleX(1.08) scaleY(0.92); }
    40%  { transform: translateY(-8px) scaleX(0.97) scaleY(1.04); }
    55%  { transform: translateY(-5.2px) scaleX(0.98) scaleY(1.02); }
    75%  { transform: translateY(0.2px) scaleX(1.06) scaleY(0.94); }
    100% { transform: translateY(0px) scaleX(1.05) scaleY(0.95); }
  }
  @keyframes loco-wobble {
    0%   { transform: rotate(0deg); }
    18%  { transform: rotate(-1.2deg); }
    40%  { transform: rotate(0.6deg); }
    55%  { transform: rotate(0deg); }
    75%  { transform: rotate(1.0deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes loco-tuck {
    0%   { transform: translate(0px, 0px) rotate(0deg) scaleY(1.0); }
    18%  { transform: translate(0px, 0.6px) rotate(6deg) scaleY(0.98); }
    40%  { transform: translate(0px, -1.2px) rotate(-10deg) scaleY(0.92); }
    55%  { transform: translate(0px, -0.6px) rotate(-6deg) scaleY(0.95); }
    75%  { transform: translate(0px, 0.4px) rotate(8deg) scaleY(0.98); }
    100% { transform: translate(0px, 0px) rotate(0deg) scaleY(1.0); }
  }
  .loco-runner {
    transform-origin: 47px 52px;
    transform-box: fill-box;
    will-change: transform;
  }
  .loco-runner--active {
    animation: loco-jump 0.68s ease-in-out infinite;
  }
  .loco-body {
    transform-origin: 47px 52px;
    transform-box: fill-box;
    will-change: transform;
  }
  .loco-body--active {
    animation: loco-wobble 0.68s ease-in-out infinite;
  }
  .loco-leg {
    transform-box: fill-box;
    transform-origin: 50% 10%;
    will-change: transform;
  }
  .loco-leg--active {
    animation: loco-tuck 0.68s ease-in-out infinite;
  }
  .loco-legR--active {
    animation-delay: -0.34s;
  }
  @media (prefers-reduced-motion: reduce) {
    .loco-runner--active, .loco-body--active, .loco-leg--active { animation: none !important; }
  }
`

export function LocoCharacter({ isActive }: Props) {
  const a = isActive ? "--active" : ""
  return (
    <svg width="95" height="95" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
      <defs>
        <linearGradient id="loco-g0" x1="42.9206" y1="70.4473" x2="25.8567" y2="88.1606" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5413D0"/>
          <stop offset="1" stopColor="#AF85FF"/>
        </linearGradient>
        <linearGradient id="loco-g1" x1="47.1497" y1="75.0312" x2="71.0238" y2="80.9527" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5413D0"/>
          <stop offset="1" stopColor="#AF85FF"/>
        </linearGradient>
        <filter id="loco-f0" x="22.5636" y="37.7181" width="27.2781" height="13.4705" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
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
      <style>{LOCO_STYLES}</style>

      <g className={`loco-runner${a ? " loco-runner" + a : ""}`}>
        {/* left leg */}
        <g className={`loco-leg${a ? " loco-leg" + a : ""}`}>
          <path d="M25.7179 88.3043C24.9126 88.7692 23.8827 88.4933 23.4178 87.6879L18.4504 79.0841C18.032 78.3594 18.2803 77.4328 19.0049 77.0144C19.7296 76.596 20.6563 76.8443 21.0747 77.569L21.3277 78.0073C21.7927 78.8127 22.8225 79.0886 23.6279 78.6236L36.7498 71.0477C37.5551 70.5827 38.5849 70.8586 39.0499 71.664L42.0805 76.913C42.5454 77.7184 42.2695 78.7482 41.4641 79.2132L25.7179 88.3043Z" fill="url(#loco-g0)"/>
        </g>

        {/* right leg */}
        <g className={`loco-leg${a ? " loco-leg" + a + " loco-legR" + a : ""}`}>
          <path d="M53.1698 72.5256C53.6348 71.7203 54.6646 71.4443 55.47 71.9094L70.9266 80.8343L71.2174 81.0022C72.0227 81.4671 72.2987 82.4969 71.8337 83.3023L66.8665 91.9057C66.448 92.6306 65.521 92.879 64.7961 92.4604C64.0712 92.0419 63.8229 91.115 64.2414 90.3901L64.4942 89.9522C64.9592 89.1468 64.6832 88.117 63.8779 87.652L50.7551 80.0756C49.9497 79.6106 49.6738 78.5808 50.1388 77.7755L53.1698 72.5256Z" fill="url(#loco-g1)"/>
        </g>

        {/* body + eyes */}
        <g className={`loco-body${a ? " loco-body" + a : ""}`}>
          <path d="M61.6675 1.99219C62.8355 1.17576 64.4259 2.08859 64.3101 3.50879L63.3472 15.2695C75.304 21.2275 83.5189 33.5735 83.519 47.8398C83.519 67.9266 67.2357 84.2109 47.1489 84.2109C27.0621 84.2109 10.7788 67.9267 10.7788 47.8398C10.779 27.7532 27.0622 11.4697 47.1489 11.4697C47.4643 11.4697 47.7788 11.4735 48.0923 11.4814L61.6675 1.99219Z" fill="#AF85FF"/>
          <g filter="url(#loco-f0)">
            <rect x="23.9106" y="38.3916" width="7.40879" height="10.7764" rx="3.70439" fill="white"/>
            <rect x="41.4224" y="38.3916" width="7.07202" height="10.7764" rx="3.53601" fill="white"/>
          </g>
        </g>
      </g>
    </svg>
  )
}
