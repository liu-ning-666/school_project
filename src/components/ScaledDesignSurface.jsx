import { DESIGN_BASE_HEIGHT, DESIGN_BASE_WIDTH } from '../designScaleConstants'
import { useDesignScale } from '../hooks/useDesignScale'
import './ScaledDesignSurface.css'

/**
 * 将子节点置于固定设计尺寸画布内并按视口同比缩放（与 Display 首页逻辑一致）。
 * @param {'viewport'|'fullscreen'} placement viewport=独立整页；fullscreen=叠在父级定位容器内（首页）
 */
export default function ScaledDesignSurface({ children, placement = 'viewport' }) {
  const scale = useDesignScale()
  const outerClass =
    placement === 'fullscreen'
      ? 'scaled-design-outer scaled-design-outer--fullscreen'
      : 'scaled-design-outer'

  return (
    <div className={outerClass}>
      <div
        className="scaled-design-inner"
        style={{
          width: DESIGN_BASE_WIDTH,
          height: DESIGN_BASE_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
