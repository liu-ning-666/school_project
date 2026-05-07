import { useEffect, useState } from 'react'
import { computeDesignScale } from '../designScaleConstants'

/** 视口变化时返回与首页一致的缩放系数 */
export function useDesignScale() {
  const [scale, setScale] = useState(() => computeDesignScale())

  useEffect(() => {
    const onResize = () => setScale(computeDesignScale())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return scale
}
