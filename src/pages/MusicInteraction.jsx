import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './MusicInteraction.css'

const LANES = [
  { id: 0, label: '左', hint: '左翼节拍' },
  { id: 1, label: '中', hint: '中央主旋律' },
  { id: 2, label: '右', hint: '右翼节拍' },
]

const BEAT_INTERVAL_MS = 680
const HIT_WINDOW_MS = 420

function MusicInteraction() {
  const navigate = useNavigate()
  const location = useLocation()
  const pickedSong = location.state?.selectedSong
  const [playing, setPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [bestCombo, setBestCombo] = useState(0)
  const [laneFlash, setLaneFlash] = useState(null)
  const [feedback, setFeedback] = useState('')
  const targetLaneRef = useRef(null)
  const deadlineRef = useRef(0)
  const playingRef = useRef(false)
  const comboRef = useRef(0)
  const spawnTimerRef = useRef(null)
  const missTimerRef = useRef(null)

  const clearTimers = useCallback(() => {
    if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current)
    if (missTimerRef.current) clearTimeout(missTimerRef.current)
    spawnTimerRef.current = null
    missTimerRef.current = null
  }, [])

  const scheduleNextSpawn = useCallback(() => {
    if (!playingRef.current) return
    const lane = Math.floor(Math.random() * 3)
    targetLaneRef.current = lane
    deadlineRef.current = Date.now() + HIT_WINDOW_MS
    setLaneFlash(lane)
    setFeedback('')

    missTimerRef.current = setTimeout(() => {
      if (targetLaneRef.current === lane && playingRef.current) {
        setFeedback('错过')
        setCombo(0)
        comboRef.current = 0
      }
      targetLaneRef.current = null
      setLaneFlash(null)
      spawnTimerRef.current = setTimeout(scheduleNextSpawn, BEAT_INTERVAL_MS)
    }, HIT_WINDOW_MS)
  }, [])

  const startGame = () => {
    clearTimers()
    setScore(0)
    setCombo(0)
    setBestCombo(0)
    comboRef.current = 0
    setFeedback('')
    setPlaying(true)
    playingRef.current = true
    scheduleNextSpawn()
  }

  const stopGame = () => {
    playingRef.current = false
    setPlaying(false)
    targetLaneRef.current = null
    setLaneFlash(null)
    clearTimers()
    setFeedback('已暂停')
  }

  useEffect(() => () => clearTimers(), [clearTimers])

  const hitLane = (laneId) => {
    if (!playingRef.current || targetLaneRef.current === null) return
    const expected = targetLaneRef.current
    const inTime = Date.now() <= deadlineRef.current
    clearTimers()
    targetLaneRef.current = null
    setLaneFlash(null)

    if (laneId === expected && inTime) {
      const nextCombo = comboRef.current + 1
      comboRef.current = nextCombo
      setCombo(nextCombo)
      setBestCombo(b => Math.max(b, nextCombo))
      setScore(s => s + 12 + Math.min(nextCombo, 20) * 2)
      setFeedback(nextCombo >= 8 ? '超棒连击！' : '完美')
    } else {
      comboRef.current = 0
      setCombo(0)
      setFeedback(
        !inTime && laneId === expected ? '慢了' : '节拍不符'
      )
    }

    if (playingRef.current) {
      spawnTimerRef.current = setTimeout(scheduleNextSpawn, BEAT_INTERVAL_MS * 0.35)
    }
  }

  return (
    <div className="music-page">
      <div className="music-bg" aria-hidden />

      <header className="music-header">
        <button type="button" className="music-back" onClick={() => navigate('/')}>
          <span className="music-back-arrow">←</span>
          <span className="music-back-text">返回首页</span>
        </button>
        <h1 className="music-title">节奏舞蹈互动</h1>
        <span className="music-header-spacer" aria-hidden />
      </header>

      {pickedSong && (
        <div className="music-picked-banner" role="status">
          <span className="music-picked-label">当前曲目</span>
          <span className="music-picked-title">{pickedSong.title}</span>
          <span className="music-picked-meta">
            {pickedSong.tag} · {pickedSong.duration}
          </span>
        </div>
      )}

      <div className="music-body">
        <main className="music-main exp-dual">
          <aside className="exp-op music-op">
            <div className="exp-op-head">
              <span className="exp-op-badge">交互域 · 触控操作</span>
              <h2 className="exp-op-title">节奏舞蹈互动</h2>
              <p className="exp-op-desc">
                本页是<strong>节拍游戏</strong>：亮起时点左 / 中 / 右；单纯选歌试听请从首页「歌曲选择」进入。
              </p>
            </div>

            <p className="music-lead">
              节拍亮起时轻触左 / 中 / 右，跟上校园舞曲节奏。
            </p>

            <div className="music-stats">
              <div className="music-stat">
                <span className="music-stat-label">得分</span>
                <span className="music-stat-value">{score}</span>
              </div>
              <div className="music-stat">
                <span className="music-stat-label">当前连击</span>
                <span className="music-stat-value accent">{combo}</span>
              </div>
              <div className="music-stat">
                <span className="music-stat-label">最高连击</span>
                <span className="music-stat-value">{bestCombo}</span>
              </div>
            </div>

            <div className={`music-feedback ${feedback ? 'visible' : ''}`} role="status">
              {feedback}
            </div>

            <div className="music-pads" role="group" aria-label="节拍触控区">
              {LANES.map(lane => (
                <button
                  key={lane.id}
                  type="button"
                  className={`music-pad ${laneFlash === lane.id ? 'active' : ''}`}
                  onClick={() => hitLane(lane.id)}
                  disabled={!playing}
                >
                  <span className="music-pad-ring" aria-hidden />
                  <span className="music-pad-label">{lane.label}</span>
                  <span className="music-pad-hint">{lane.hint}</span>
                </button>
              ))}
            </div>

            <div className="music-actions">
              {!playing ? (
                <button type="button" className="music-btn primary" onClick={startGame}>
                  开始挑战
                </button>
              ) : (
                <button type="button" className="music-btn ghost" onClick={stopGame}>
                  暂停结束
                </button>
              )}
            </div>

            <section className="music-tips">
              <h2 className="music-tips-title">玩法说明</h2>
              <ul>
                <li>点击「开始挑战」后，某一方位会高亮 pulse，请在亮起时间内点击同一方位。</li>
                <li>判定「完美」累积连击；超时未点或点错方位会打断连击。</li>
                <li>看准亮起的区域再出手，保持节奏更容易打出高连击。</li>
              </ul>
            </section>
          </aside>

          <section className="exp-display music-viz" aria-hidden>
            <span className="exp-display-tag">展示域 · 节拍可视化</span>
            <div className="music-viz-stage">
              {LANES.map(lane => (
                <div
                  key={lane.id}
                  className={`music-viz-lane ${laneFlash === lane.id ? 'hot' : ''}`}
                >
                  <div className="music-viz-orbit" />
                  <span className="music-viz-label">{lane.label}</span>
                  <span className="music-viz-hint">{lane.hint}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default MusicInteraction
