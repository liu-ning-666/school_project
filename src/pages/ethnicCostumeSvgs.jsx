/**
 * 简化的民族服饰剪影 SVG（示意用途），用于选项卡与左侧全身预览。
 * viewBox 统一便于缩放。
 */

const VB = '0 0 96 128'

function SvgWrap({ children, className, title }) {
  return (
    <svg
      className={className}
      viewBox={VB}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

/** 选项卡片用小图标；size="hero" 用于中间预览大区剪影 */
export function EthnicCostumeIcon({ costumeKey, accent, size = 'card' }) {
  const fill = accent || '#fff'
  const svgCls = size === 'hero' ? 'ethnic-svg ethnic-svg--hero' : 'ethnic-svg ethnic-svg--card'
  switch (costumeKey) {
    case 'zhuang':
      return (
        <SvgWrap className={svgCls}>
          <path d="M48 18 L62 26 L68 44 L72 72 L76 102 L48 118 L20 102 L24 72 L28 44 L34 26 Z" fill={fill} opacity="0.92" />
          <path d="M38 30 L58 30 L56 48 L40 48 Z" fill="#fff" opacity="0.35" />
          <circle cx="48" cy="56" r="5" fill="#FFC107" opacity="0.9" />
          <circle cx="42" cy="68" r="3" fill="#FF5252" opacity="0.85" />
          <circle cx="54" cy="74" r="3.5" fill="#4CAF50" opacity="0.85" />
          <path d="M30 78 L66 78 L64 98 L32 98 Z" fill="#000" opacity="0.12" />
        </SvgWrap>
      )
    case 'miao':
      return (
        <SvgWrap className={svgCls}>
          <path d="M48 12 L58 22 L62 38 L66 52 L70 68 L74 88 L76 108 L48 118 L18 108 L22 88 L26 68 L30 52 L34 38 L38 22 Z" fill={fill} opacity="0.92" />
          <path d="M48 14 L52 28 L44 28 Z" fill="#E0E0E0" opacity="0.95" />
          <circle cx="48" cy="36" r="10" fill="#fff" opacity="0.25" />
          <path d="M34 52 L62 52 L60 72 L36 72 Z" fill="#000" opacity="0.15" />
          <path d="M28 76 L68 76 L64 104 L32 104 Z" fill="#fff" opacity="0.12" />
        </SvgWrap>
      )
    case 'dai':
      return (
        <SvgWrap className={svgCls}>
          <path d="M48 28 L60 34 L64 48 L68 70 L72 98 L48 116 L24 98 L28 70 L32 48 L36 34 Z" fill={fill} opacity="0.92" />
          <path d="M40 32 L56 32 L54 46 L42 46 Z" fill="#fff" opacity="0.4" />
          <path d="M36 50 L60 50 L58 62 L38 62 Z" fill="#000" opacity="0.1" />
          <ellipse cx="48" cy="82" rx="18" ry="28" fill="#000" opacity="0.08" />
        </SvgWrap>
      )
    case 'yi':
      return (
        <SvgWrap className={svgCls}>
          <path d="M48 22 L66 40 L70 64 L74 92 L48 118 L22 92 L26 64 L30 40 Z" fill={fill} opacity="0.92" />
          <path d="M32 34 L64 34 L58 50 L38 50 Z" fill="#fff" opacity="0.3" />
          <path d="M38 56 L58 56 L54 68 L42 68 Z" fill="#FF5722" opacity="0.45" />
          <path d="M34 72 L62 72 L56 88 L40 88 Z" fill="#FF9800" opacity="0.35" />
        </SvgWrap>
      )
    case 'zang':
      return (
        <SvgWrap className={svgCls}>
          <path d="M18 38 L78 38 L82 58 L80 88 L76 112 L48 118 L20 112 L16 88 L14 58 Z" fill={fill} opacity="0.92" />
          <path d="M22 42 L74 42 L72 56 L24 56 Z" fill="#fff" opacity="0.25" />
          <ellipse cx="30" cy="72" rx="12" ry="22" fill="#000" opacity="0.08" />
          <ellipse cx="66" cy="72" rx="12" ry="22" fill="#000" opacity="0.08" />
          <path d="M38 58 L58 58 L52 96 L44 96 Z" fill="#000" opacity="0.12" />
        </SvgWrap>
      )
    case 'uyghur':
      return (
        <SvgWrap className={svgCls}>
          <path d="M48 26 L62 34 L68 52 L72 78 L74 106 L48 118 L22 106 L24 78 L28 52 L34 34 Z" fill={fill} opacity="0.92" />
          <path d="M30 36 L66 36 L64 50 L32 50 Z" fill="#fff" opacity="0.35" />
          <path d="M28 54 L68 54" stroke="#fff" strokeWidth="3" opacity="0.5" />
          <path d="M26 62 L70 62" stroke="#fff" strokeWidth="2.5" opacity="0.45" />
          <path d="M28 70 L68 70" stroke="#fff" strokeWidth="3" opacity="0.5" />
        </SvgWrap>
      )
    case 'mongol':
      return (
        <SvgWrap className={svgCls}>
          <path d="M22 36 L74 36 L80 56 L78 90 L74 114 L48 118 L22 114 L18 90 L16 56 Z" fill={fill} opacity="0.92" />
          <rect x="26" y="52" width="44" height="12" rx="3" fill="#5D4037" opacity="0.65" />
          <ellipse cx="48" cy="62" rx="22" ry="8" fill="#000" opacity="0.12" />
          <path d="M26 44 L70 44 L68 54 L28 54 Z" fill="#fff" opacity="0.28" />
        </SvgWrap>
      )
    case 'manchu':
      return (
        <SvgWrap className={svgCls}>
          <path d="M48 26 L64 36 L70 54 L74 84 L76 108 L48 118 L20 108 L22 84 L26 54 L32 36 Z" fill={fill} opacity="0.92" />
          <path d="M38 34 L58 34 L56 52 L40 52 Z" fill="#fff" opacity="0.38" />
          <path d="M48 52 L52 108 L44 108 Z" fill="#0D47A1" opacity="0.35" />
          <path d="M34 58 L62 58 L60 76 L36 76 Z" fill="#000" opacity="0.12" />
        </SvgWrap>
      )

    /* —— 男装剪影：短褂 / 袍服 + 长裤，避免裙装轮廓 —— */
    case 'zhuang_m':
      return (
        <SvgWrap className={svgCls}>
          <path d="M28 24 L68 24 L72 46 L70 68 L26 68 L24 46 Z" fill={fill} opacity="0.92" />
          <path d="M36 30 L60 30 L58 44 L38 44 Z" fill="#fff" opacity="0.28" />
          <path d="M30 68 L46 68 L44 112 L34 112 Z" fill={fill} opacity="0.88" />
          <path d="M50 68 L66 68 L62 112 L52 112 Z" fill={fill} opacity="0.88" />
          <path d="M46 68 L50 68 L49 112 Z" fill="#000" opacity="0.15" />
          <rect x="38" y="52" width="20" height="8" rx="2" fill="#C62828" opacity="0.55" />
        </SvgWrap>
      )
    case 'miao_m':
      return (
        <SvgWrap className={svgCls}>
          <path d="M32 20 L64 20 L68 38 L66 56 L30 56 L28 38 Z" fill={fill} opacity="0.92" />
          <path d="M34 22 L62 22 L60 34 L36 34 Z" fill="#ECEFF1" opacity="0.5" />
          <circle cx="48" cy="42" r="8" fill="#fff" opacity="0.2" />
          <path d="M28 56 L44 56 L42 108 L32 108 Z" fill={fill} opacity="0.88" />
          <path d="M52 56 L68 56 L64 108 L54 108 Z" fill={fill} opacity="0.88" />
          <path d="M44 56 L52 56 L50 108 Z" fill="#000" opacity="0.12" />
        </SvgWrap>
      )
    case 'dai_m':
      return (
        <SvgWrap className={svgCls}>
          <path d="M36 26 L60 26 L64 42 L62 62 L34 62 L32 42 Z" fill={fill} opacity="0.92" />
          <path d="M38 28 L58 28 L56 40 L40 40 Z" fill="#fff" opacity="0.35" />
          <path d="M32 62 L46 62 L44 110 L34 110 Z" fill={fill} opacity="0.88" />
          <path d="M50 62 L64 62 L60 110 L50 110 Z" fill={fill} opacity="0.88" />
          <path d="M46 62 L50 62 L48 110 Z" fill="#000" opacity="0.1" />
        </SvgWrap>
      )
    case 'yi_m':
      return (
        <SvgWrap className={svgCls}>
          <path d="M26 22 L70 22 L74 44 L72 64 L24 64 L22 44 Z" fill={fill} opacity="0.92" />
          <path d="M30 26 L66 26 L62 42 L34 42 Z" fill="#fff" opacity="0.25" />
          <path d="M34 46 L62 46 L58 58 L38 58 Z" fill="#FF5722" opacity="0.35" />
          <path d="M28 64 L46 64 L42 108 L32 108 Z" fill={fill} opacity="0.88" />
          <path d="M50 64 L68 64 L62 108 L52 108 Z" fill={fill} opacity="0.88" />
        </SvgWrap>
      )
    case 'zang_m':
      return (
        <SvgWrap className={svgCls}>
          <path d="M16 30 L80 30 L84 52 L82 78 L78 104 L48 114 L18 104 L14 78 L12 52 Z" fill={fill} opacity="0.92" />
          <path d="M20 34 L76 34 L74 48 L22 48 Z" fill="#fff" opacity="0.22" />
          <path d="M28 64 L46 64 L42 108 L32 108 Z" fill={fill} opacity="0.88" />
          <path d="M50 64 L68 64 L64 108 L54 108 Z" fill={fill} opacity="0.88" />
          <path d="M42 52 L54 52 L50 72 L46 72 Z" fill="#000" opacity="0.12" />
        </SvgWrap>
      )
    case 'uyghur_m':
      return (
        <SvgWrap className={svgCls}>
          <path d="M30 24 L66 24 L70 40 L68 58 L28 58 L26 40 Z" fill={fill} opacity="0.92" />
          <path d="M32 28 L64 28 L62 38 L34 38 Z" fill="#fff" opacity="0.32" />
          <path d="M28 42 L68 42" stroke="#fff" strokeWidth="2.5" opacity="0.45" />
          <path d="M30 58 L46 58 L44 108 L34 108 Z" fill={fill} opacity="0.88" />
          <path d="M50 58 L66 58 L62 108 L52 108 Z" fill={fill} opacity="0.88" />
        </SvgWrap>
      )
    case 'mongol_m':
      return (
        <SvgWrap className={svgCls}>
          <path d="M18 32 L78 32 L82 50 L80 76 L76 102 L48 112 L20 102 L16 76 L14 50 Z" fill={fill} opacity="0.92" />
          <path d="M22 36 L74 36 L72 48 L24 48 Z" fill="#fff" opacity="0.24" />
          <rect x="28" y="54" width="40" height="10" rx="3" fill="#4E342E" opacity="0.7" />
          <path d="M28 68 L46 68 L42 108 L32 108 Z" fill={fill} opacity="0.88" />
          <path d="M50 68 L68 68 L64 108 L54 108 Z" fill={fill} opacity="0.88" />
        </SvgWrap>
      )
    case 'manchu_m':
      return (
        <SvgWrap className={svgCls}>
          <path d="M30 26 L66 26 L70 44 L68 62 L28 62 L26 44 Z" fill={fill} opacity="0.92" />
          <path d="M34 30 L62 30 L60 42 L36 42 Z" fill="#fff" opacity="0.34" />
          <path d="M38 46 L58 46 L54 58 L42 58 Z" fill="#0D47A1" opacity="0.4" />
          <path d="M30 62 L46 62 L42 108 L34 108 Z" fill={fill} opacity="0.88" />
          <path d="M50 62 L66 62 L62 108 L54 108 Z" fill={fill} opacity="0.88" />
        </SvgWrap>
      )
    default:
      return (
        <SvgWrap className={svgCls}>
          <ellipse cx="48" cy="64" rx="28" ry="44" fill={fill} opacity="0.8" />
        </SvgWrap>
      )
  }
}

/** 左侧预览：肩颈以下衣裙（与头部 CSS 拼接） */
export function EthnicCostumeTorso({ costumeKey, accent }) {
  const fill = accent || '#00BCD4'
  switch (costumeKey) {
    case 'zhuang':
      return (
        <SvgWrap className="ethnic-svg ethnic-svg--preview">
          <path d="M48 8 L68 18 L74 38 L78 62 L82 92 L48 118 L14 92 L18 62 L22 38 L28 18 Z" fill={fill} />
          <path d="M34 16 L62 16 L58 36 L38 36 Z" fill="#fff" opacity="0.28" />
          <circle cx="48" cy="48" r="7" fill="#FFC107" opacity="0.95" />
          <circle cx="38" cy="62" r="4" fill="#E91E63" opacity="0.85" />
          <circle cx="58" cy="68" r="4" fill="#4CAF50" opacity="0.85" />
          <path d="M26 76 L70 76 L66 100 L30 100 Z" fill="#000" opacity="0.1" />
        </SvgWrap>
      )
    case 'miao':
      return (
        <SvgWrap className="ethnic-svg ethnic-svg--preview">
          <path d="M48 4 L62 14 L68 32 L72 50 L76 70 L80 94 L48 118 L16 94 L20 70 L24 50 L28 32 L34 14 Z" fill={fill} />
          <path d="M48 6 L54 22 L42 22 Z" fill="#ECEFF1" opacity="0.95" />
          <path d="M30 38 L66 38 L62 58 L34 58 Z" fill="#fff" opacity="0.18" />
          <path d="M24 62 L72 62 L68 88 L28 88 Z" fill="#000" opacity="0.08" />
        </SvgWrap>
      )
    case 'dai':
      return (
        <SvgWrap className="ethnic-svg ethnic-svg--preview">
          <path d="M48 10 L64 18 L70 36 L74 58 L78 88 L48 118 L18 88 L22 58 L26 36 L32 18 Z" fill={fill} />
          <path d="M36 14 L60 14 L58 34 L38 34 Z" fill="#fff" opacity="0.42" />
          <ellipse cx="48" cy="72" rx="22" ry="38" fill="#000" opacity="0.06" />
        </SvgWrap>
      )
    case 'yi':
      return (
        <SvgWrap className="ethnic-svg ethnic-svg--preview">
          <path d="M48 6 L70 28 L74 52 L78 82 L48 118 L18 82 L22 52 L26 28 Z" fill={fill} />
          <path d="M30 18 L66 18 L60 38 L36 38 Z" fill="#fff" opacity="0.28" />
          <path d="M34 44 L62 44 L56 62 L40 62 Z" fill="#FF5722" opacity="0.5" />
          <path d="M28 68 L68 68 L62 92 L34 92 Z" fill="#FFC107" opacity="0.28" />
        </SvgWrap>
      )
    case 'zang':
      return (
        <SvgWrap className="ethnic-svg ethnic-svg--preview">
          <path d="M12 22 L84 22 L88 46 L86 78 L82 108 L48 118 L14 108 L10 78 L8 46 Z" fill={fill} />
          <path d="M16 26 L80 26 L78 42 L18 42 Z" fill="#fff" opacity="0.22" />
          <ellipse cx="26" cy="72" rx="14" ry="30" fill="#000" opacity="0.07" />
          <ellipse cx="70" cy="72" rx="14" ry="30" fill="#000" opacity="0.07" />
          <path d="M38 46 L58 46 L52 102 L44 102 Z" fill="#000" opacity="0.1" />
        </SvgWrap>
      )
    case 'uyghur':
      return (
        <SvgWrap className="ethnic-svg ethnic-svg--preview">
          <path d="M48 10 L66 20 L72 40 L76 66 L78 96 L48 118 L18 96 L20 66 L24 40 L30 20 Z" fill={fill} />
          <path d="M28 18 L68 18 L66 38 L30 38 Z" fill="#fff" opacity="0.35" />
          <path d="M22 46 L74 46" stroke="#fff" strokeWidth="4" opacity="0.45" />
          <path d="M20 56 L76 56" stroke="#fff" strokeWidth="3.5" opacity="0.4" />
          <path d="M22 66 L74 66" stroke="#fff" strokeWidth="4" opacity="0.45" />
          <path d="M24 76 L72 76" stroke="#fff" strokeWidth="3" opacity="0.38" />
        </SvgWrap>
      )
    case 'mongol':
      return (
        <SvgWrap className="ethnic-svg ethnic-svg--preview">
          <path d="M18 24 L78 24 L84 48 L82 82 L78 112 L48 118 L18 112 L14 82 L12 48 Z" fill={fill} />
          <rect x="22" y="42" width="52" height="16" rx="4" fill="#4E342E" opacity="0.75" />
          <path d="M22 28 L74 28 L72 40 L24 40 Z" fill="#fff" opacity="0.26" />
          <ellipse cx="48" cy="52" rx="26" ry="10" fill="#000" opacity="0.1" />
        </SvgWrap>
      )
    case 'manchu':
      return (
        <SvgWrap className="ethnic-svg ethnic-svg--preview">
          <path d="M48 8 L68 22 L74 44 L78 78 L80 106 L48 118 L16 106 L18 78 L22 44 L28 22 Z" fill={fill} />
          <path d="M36 16 L60 16 L58 40 L38 40 Z" fill="#fff" opacity="0.4" />
          <path d="M48 42 L54 114 L42 114 Z" fill="#1565C0" opacity="0.45" />
          <path d="M30 48 L66 48 L62 72 L34 72 Z" fill="#000" opacity="0.1" />
        </SvgWrap>
      )
    default:
      return (
        <SvgWrap className="ethnic-svg ethnic-svg--preview">
          <ellipse cx="48" cy="64" rx="30" ry="48" fill={fill} />
        </SvgWrap>
      )
  }
}
