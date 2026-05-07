/**
 * 全身 Q 版小人 SVG（偏手游虚拟形象：大头、高光眼、白鞋）
 * 支持性别、肤色、发型与民族服饰 key。
 */
import { useId } from 'react'

/** 衣裙下摆大致高度（越大裙摆越长，遮住腿） */
const HEM_Y = {
  zhuang: 312,
  miao: 318,
  dai: 268,
  yi: 308,
  zang: 328,
  uyghur: 300,
  mongol: 318,
  manchu: 314,
}

function CostumeLayer({ costumeKey, accent, gender }) {
  const fill = accent
  const hem = HEM_Y[costumeKey] ?? 302
  const cx = 120
  const w = gender === 'male' ? 1.05 : 1
  return (
    <g transform={`translate(${cx},0) scale(${w},1) translate(${-cx},0)`}>
      {costumeKey === 'zhuang' && (
        <>
          <path
            d={`M75 172 L165 172 L178 ${hem} L120 338 L62 ${hem} Z`}
            fill={fill}
          />
          <path d="M88 172 L152 172 L148 198 L92 198 Z" fill="#fff" opacity="0.28" />
          <circle cx="108" cy="228" r="9" fill="#FFC107" opacity="0.95" />
          <circle cx="132" cy="242" r="6" fill="#E91E63" opacity="0.85" />
          <path d="M86 258 L154 258 L150 282 L90 282 Z" fill="#000" opacity="0.1" />
        </>
      )}
      {costumeKey === 'miao' && (
        <>
          <path
            d={`M68 168 L172 168 L185 ${hem} L120 342 L55 ${hem} Z`}
            fill={fill}
          />
          <path d="M120 155 L128 188 L112 188 Z" fill="#ECEFF1" opacity="0.95" />
          <ellipse cx="120" cy="208" rx="44" ry="28" fill="#fff" opacity="0.14" />
          <path d="M78 248 L162 248 L156 288 L84 288 Z" fill="#000" opacity="0.08" />
        </>
      )}
      {costumeKey === 'dai' && (
        <>
          <path
            d={`M82 172 L158 172 L172 ${hem} L120 318 L68 ${hem} Z`}
            fill={fill}
          />
          <path d="M92 174 L148 174 L144 204 L96 204 Z" fill="#fff" opacity="0.38" />
          <ellipse cx="120" cy="248" rx="38" ry="52" fill="#000" opacity="0.06" />
        </>
      )}
      {costumeKey === 'yi' && (
        <>
          <path
            d={`M70 170 L170 170 L182 ${hem} L120 336 L58 ${hem} Z`}
            fill={fill}
          />
          <path d="M85 178 L155 178 L150 208 L90 208 Z" fill="#fff" opacity="0.26" />
          <path d="M88 222 L152 222 L146 248 L94 248 Z" fill="#FF5722" opacity="0.45" />
          <path d="M82 262 L158 262 L152 292 L88 292 Z" fill="#FFC107" opacity="0.32" />
        </>
      )}
      {costumeKey === 'zang' && (
        <>
          <path
            d={`M52 178 L188 178 L196 218 L190 ${hem} L120 344 L50 ${hem} L44 218 Z`}
            fill={fill}
          />
          <path d="M58 182 L182 182 L178 212 L62 212 Z" fill="#fff" opacity="0.18" />
          <ellipse cx="78" cy="258" rx="22" ry="46" fill="#000" opacity="0.06" />
          <ellipse cx="162" cy="258" rx="22" ry="46" fill="#000" opacity="0.06" />
          <path d="M96 218 L144 218 L138 304 L102 304 Z" fill="#000" opacity="0.1" />
        </>
      )}
      {costumeKey === 'uyghur' && (
        <>
          <path
            d={`M76 172 L164 172 L178 ${hem} L120 332 L62 ${hem} Z`}
            fill={fill}
          />
          <path d="M84 176 L156 176 L152 208 L88 208 Z" fill="#fff" opacity="0.32" />
          {[216, 232, 248, 264].map((y, i) => (
            <line
              key={i}
              x1="78"
              y1={y}
              x2="162"
              y2={y}
              stroke="#fff"
              strokeWidth="5"
              opacity={0.35 - i * 0.04}
              strokeLinecap="round"
            />
          ))}
        </>
      )}
      {costumeKey === 'mongol' && (
        <>
          <path
            d={`M56 180 L184 180 L192 204 L188 ${hem} L120 340 L52 ${hem} L48 204 Z`}
            fill={fill}
          />
          <rect x="72" y="212" width="96" height="22" rx="5" fill="#4E342E" opacity="0.72" />
          <path d="M62 184 L178 184 L174 206 L66 206 Z" fill="#fff" opacity="0.22" />
        </>
      )}
      {costumeKey === 'manchu' && (
        <>
          <path
            d={`M74 170 L166 170 L180 ${hem} L120 338 L60 ${hem} Z`}
            fill={fill}
          />
          <path d="M88 174 L152 174 L148 208 L92 208 Z" fill="#fff" opacity="0.36" />
          <path d="M120 210 L126 328 L114 328 Z" fill="#0D47A1" opacity="0.4" />
          <path d="M86 232 L154 232 L150 268 L90 268 Z" fill="#000" opacity="0.09" />
        </>
      )}
      {!HEM_Y[costumeKey] && (
        <path
          d={`M76 172 L164 172 L178 ${hem} L120 332 L62 ${hem} Z`}
          fill={fill}
        />
      )}
    </g>
  )
}

function Bangs({ gender, hairId }) {
  const f = gender === 'female'
  if (!f) {
    return hairId === 2 ? (
      <path d="M72 88 L168 88 L164 102 L76 102 Z" fill="#5D4037" opacity="0.88" />
    ) : (
      <path d="M78 82 L162 82 L158 96 L82 96 Z" fill="#3E2723" opacity="0.78" />
    )
  }
  if (hairId === 3) {
    return <path d="M85 78 L155 78 L152 92 L88 92 Z" fill="#4E342E" opacity="0.92" />
  }
  return (
    <path
      d="M68 72 C85 62 155 62 172 72 L168 88 C120 78 72 88 72 88 Z"
      fill="#B39DDB"
      opacity="0.96"
    />
  )
}

/** 后发主体（可用 mask 在脸上挖洞）；刘海单独画在上方 */
function HairBulk({ gender, hairId }) {
  const f = gender === 'female'

  let main = null
  if (f && hairId === 1) {
    main = (
      <>
        <path
          d="M120 34 C48 40 34 95 42 168 C46 198 58 208 68 198 C62 130 78 72 120 62 C162 72 178 130 172 198 C182 208 194 198 198 168 C206 95 192 40 120 34Z"
          fill="#B39DDB"
        />
        <path
          d="M62 118 Q52 175 58 228 L74 224 Q68 170 78 130 Q95 98 120 92 Q145 98 162 130 Q172 170 166 224 L182 228 Q188 175 178 118 Q165 82 120 76 Q75 82 62 118Z"
          fill="#9575CD"
          opacity="0.88"
        />
      </>
    )
  } else if (f && hairId === 2) {
    main = <ellipse cx="120" cy="68" rx="56" ry="46" fill="#8D6E63" />
  } else if (f && hairId === 3) {
    main = (
      <>
        <circle cx="120" cy="54" r="34" fill="#5D4037" />
        <ellipse cx="90" cy="72" rx="20" ry="32" fill="#5D4037" />
        <ellipse cx="150" cy="72" rx="20" ry="32" fill="#5D4037" />
      </>
    )
  } else if (!f && hairId === 1) {
    main = (
      <path
        d="M120 46 C58 50 44 108 48 168 L68 166 C66 112 82 60 120 56 C158 60 174 112 172 166 L192 168 C196 108 182 50 120 46Z"
        fill="#4E342E"
      />
    )
  } else if (!f && hairId === 2) {
    main = (
      <path
        d="M120 48 C72 52 60 92 64 126 L176 126 C180 92 168 52 120 48Z"
        fill="#6D4C41"
      />
    )
  } else {
    main = (
      <path
        d="M120 50 C78 54 65 86 68 116 L172 116 C175 86 162 54 120 50Z"
        fill="#37474F"
      />
    )
  }

  return <g>{main}</g>
}

function Face({ skin, gender }) {
  const f = gender === 'female'
  const rx = f ? 50 : 46
  const ry = f ? 56 : 52
  return (
    <g>
      <ellipse cx="120" cy="102" rx={rx} ry={ry} fill={skin} />
      <ellipse cx="98" cy="114" rx="11" ry="6" fill="#FF8A80" opacity="0.38" />
      <ellipse cx="142" cy="114" rx="11" ry="6" fill="#FF8A80" opacity="0.38" />
      {f ? (
        <>
          <ellipse cx="102" cy="100" rx="15" ry="21" fill="#283593" />
          <ellipse cx="138" cy="100" rx="15" ry="21" fill="#283593" />
          <ellipse cx="104" cy="94" rx="9" ry="11" fill="#fff" opacity="0.96" />
          <ellipse cx="136" cy="94" rx="9" ry="11" fill="#fff" opacity="0.96" />
          <circle cx="106" cy="98" r="4.5" fill="#1A237E" />
          <circle cx="134" cy="98" r="4.5" fill="#1A237E" />
          <circle cx="108" cy="96" r="2" fill="#fff" opacity="0.92" />
          <circle cx="136" cy="96" r="2" fill="#fff" opacity="0.92" />
          <path
            d="M112 128 Q120 134 128 128"
            fill="none"
            stroke="#AD1457"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path d="M88 92 L108 88 L106 94 Z" fill="#37474F" opacity="0.85" />
          <path d="M132 88 L152 92 L134 94 Z" fill="#37474F" opacity="0.85" />
          <ellipse cx="102" cy="102" rx="11" ry="13" fill="#1A237E" />
          <ellipse cx="138" cy="102" rx="11" ry="13" fill="#1A237E" />
          <ellipse cx="103" cy="98" rx="5" ry="6" fill="#fff" opacity="0.92" />
          <ellipse cx="137" cy="98" rx="5" ry="6" fill="#fff" opacity="0.92" />
          <circle cx="104" cy="101" r="3.5" fill="#263238" />
          <circle cx="136" cy="101" r="3.5" fill="#263238" />
          <path
            d="M114 126 L126 126"
            stroke="#6D4C41"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )}
    </g>
  )
}

function Arms({ skin, costumeKey, gender }) {
  const hem = HEM_Y[costumeKey] ?? 302
  const sleeve =
    costumeKey === 'zang' || costumeKey === 'mongol' || costumeKey === 'manchu'
      ? hem - 38
      : hem - 68
  const y2 = Math.min(sleeve, 268)
  const hx = gender === 'male' ? 56 : 62
  return (
    <g>
      <path
        d={`M${120 - hx} 178 Q${120 - hx - 18} 220 ${120 - hx - 8} ${y2}`}
        fill="none"
        stroke={skin}
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        d={`M${120 + hx} 178 Q${120 + hx + 18} 220 ${120 + hx + 8} ${y2}`}
        fill="none"
        stroke={skin}
        strokeWidth="22"
        strokeLinecap="round"
      />
      <circle cx={120 - hx - 8} cy={y2 + 4} r="10" fill={skin} />
      <circle cx={120 + hx + 8} cy={y2 + 4} r="10" fill={skin} />
    </g>
  )
}

function LegsAndShoes({ skin, costumeKey }) {
  const hem = HEM_Y[costumeKey] ?? 302
  const legTop = hem - 8
  const showLeg = legTop < 318
  if (!showLeg) {
    return (
      <g>
        <ellipse cx="120" cy="382" rx="52" ry="10" fill="#000" opacity="0.18" />
        <path
          d="M92 340 L108 340 L106 378 L94 378 Z"
          fill="#FAFAFA"
          stroke="#E0E0E0"
          strokeWidth="2"
        />
        <path
          d="M132 340 L148 340 L146 378 L134 378 Z"
          fill="#FAFAFA"
          stroke="#E0E0E0"
          strokeWidth="2"
        />
      </g>
    )
  }
  return (
    <g>
      <path
        d={`M98 ${legTop} L98 348 L114 348 L114 ${legTop} Z`}
        fill={skin}
        opacity="0.96"
      />
      <path
        d={`M126 ${legTop} L126 348 L142 348 L142 ${legTop} Z`}
        fill={skin}
        opacity="0.96"
      />
      <ellipse cx="120" cy="382" rx="54" ry="11" fill="#000" opacity="0.18" />
      <path
        d="M88 348 L118 348 L116 388 L90 388 Z"
        fill="#FAFAFA"
        stroke="#E0E0E0"
        strokeWidth="2"
      />
      <path
        d="M122 348 L152 348 L150 388 L124 388 Z"
        fill="#FAFAFA"
        stroke="#E0E0E0"
        strokeWidth="2"
      />
      <ellipse cx="104" cy="392" rx="14" ry="6" fill="#ECEFF1" opacity="0.9" />
      <ellipse cx="136" cy="392" rx="14" ry="6" fill="#ECEFF1" opacity="0.9" />
    </g>
  )
}

export function AvatarFigureSvg({
  gender,
  skin,
  hairId,
  costumeKey,
  costumeAccent,
}) {
  const gid = useId().replace(/:/g, '')
  const gradId = `afbg-${gid}`
  const hairMaskId = `afhair-${gid}`
  const accent = costumeAccent || '#00acc1'

  return (
    <svg
      className="avatar-figure-svg"
      viewBox="0 0 240 420"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e3f2fd" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#90caf9" stopOpacity="0.12" />
        </linearGradient>
        <mask id={hairMaskId} maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="240" height="420" fill="white" />
          <ellipse cx="120" cy="102" rx="54" ry="60" fill="black" />
        </mask>
      </defs>
      <rect width="240" height="420" fill={`url(#${gradId})`} rx="18" />

      <g transform="translate(0,6)">
        <CostumeLayer costumeKey={costumeKey} accent={accent} gender={gender} />
        <LegsAndShoes skin={skin} costumeKey={costumeKey} />
        <Arms skin={skin} costumeKey={costumeKey} gender={gender} />
        <path d="M108 158 L132 158 L130 176 L110 176 Z" fill={skin} />
        <Face skin={skin} gender={gender} />
        <g mask={`url(#${hairMaskId})`}>
          <HairBulk gender={gender} hairId={hairId} />
        </g>
        <Bangs gender={gender} hairId={hairId} />
        <ellipse cx="120" cy="178" rx="28" ry="8" fill="#fff" opacity="0.14" />
      </g>
    </svg>
  )
}
