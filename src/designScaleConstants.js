/** 大屏 UI 统一设计稿尺寸，全站按视口同比缩放 */
export const DESIGN_BASE_WIDTH = 1920
export const DESIGN_BASE_HEIGHT = 1080

/** 极小窗口下限，避免缩放过小不可点 */
export const DESIGN_MIN_SCALE = 0.22

export function computeDesignScale(vw = window.innerWidth, vh = window.innerHeight) {
  const s = Math.min(vw / DESIGN_BASE_WIDTH, vh / DESIGN_BASE_HEIGHT)
  return Math.max(DESIGN_MIN_SCALE, s)
}
