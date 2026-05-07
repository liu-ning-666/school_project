import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Capture.css'

function Capture() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const videoRef = useRef(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [gesture, setGesture] = useState('')
  const [score, setScore] = useState(0)
  const skeletonDotsRef = useRef([])

  useEffect(() => {
    let animationId = null
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const initSkeleton = () => {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const spacing = 80
      
      skeletonDotsRef.current = [
        { x: centerX, y: centerY - spacing * 2, name: 'head' },
        { x: centerX - spacing * 0.8, y: centerY - spacing, name: 'left_shoulder' },
        { x: centerX + spacing * 0.8, y: centerY - spacing, name: 'right_shoulder' },
        { x: centerX - spacing, y: centerY, name: 'left_elbow' },
        { x: centerX + spacing, y: centerY, name: 'right_elbow' },
        { x: centerX - spacing * 0.9, y: centerY + spacing, name: 'left_wrist' },
        { x: centerX + spacing * 0.9, y: centerY + spacing, name: 'right_wrist' },
        { x: centerX, y: centerY + spacing * 1.5, name: 'hip' }
      ]
    }

    const animateSkeleton = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      skeletonDotsRef.current.forEach((dot, index) => {
        const offset = Math.sin(Date.now() / 500 + index) * 10
        const x = dot.x + offset
        const y = dot.y + offset
        
        ctx.beginPath()
        ctx.arc(x, y, 12, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 191, 165, 0.8)'
        ctx.fill()
        ctx.strokeStyle = '#00BFA5'
        ctx.lineWidth = 3
        ctx.stroke()
        ctx.shadowColor = '#00BFA5'
        ctx.shadowBlur = 15
        
        if (index > 0) {
          const prevDot = skeletonDotsRef.current[index - 1]
          const prevOffset = Math.sin(Date.now() / 500 + (index - 1)) * 10
          ctx.beginPath()
          ctx.moveTo(prevDot.x + prevOffset, prevDot.y + prevOffset)
          ctx.lineTo(x, y)
          ctx.strokeStyle = 'rgba(0, 191, 165, 0.5)'
          ctx.lineWidth = 4
          ctx.stroke()
        }
      })

      animationId = requestAnimationFrame(animateSkeleton)
    }

    const resizeCanvas = () => {
      const el = containerRef.current
      if (!el) return
      const w = el.clientWidth
      const h = el.clientHeight
      if (w < 2 || h < 2) return
      canvas.width = w
      canvas.height = h
      initSkeleton()
    }

    const detectGesture = () => {
      const gestures = ['✋ 举手', '🤝 握手', '👍 点赞', '✌️ 胜利', '🤟 爱你']
      setGesture(gestures[Math.floor(Math.random() * gestures.length)])
      setScore(prev => Math.min(prev + Math.floor(Math.random() * 10) + 1, 100))
    }

    const stopCapture = () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop())
        setIsCapturing(false)
      }
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    requestAnimationFrame(resizeCanvas)
    animateSkeleton()

    const gestureInterval = setInterval(detectGesture, 2000)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationId != null) {
        cancelAnimationFrame(animationId)
      }
      clearInterval(gestureInterval)
      stopCapture()
    }
  }, [])

  const handleBack = () => {
    navigate('/')
  }

  const handleSwitchScene = () => {
    navigate('/scene-select')
  }

  const handleAvatarSelect = () => {
    navigate('/avatar-select')
  }

  const handleMusic = () => {
    navigate('/music-interaction')
  }

  const handleSongSelect = () => {
    navigate('/song-select')
  }

  const toggleCapture = () => {
    if (isCapturing) {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      }
      setIsCapturing(false)
    } else {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream
          setIsCapturing(true)
        })
        .catch(err => {
          console.error('无法访问摄像头:', err)
        })
    }
  }

  return (
    <div ref={containerRef} className="capture-container">
      <canvas ref={canvasRef} className="capture-canvas"></canvas>
      
      <video ref={videoRef} className={`video-feed ${isCapturing ? 'visible' : ''}`} autoPlay muted playsInline></video>

      <div className="capture-overlay">
        <header className="capture-header">
          <button type="button" className="back-btn" onClick={handleBack}>
            <span>←</span>
            <span>返回首页</span>
          </button>
          <h1 className="page-title">动作捕捉 · AR 互动体验</h1>
          <button type="button" className="scene-btn" onClick={handleSwitchScene}>
            <span>🎬</span>
            <span>切换场景</span>
          </button>
        </header>

        <div className="capture-content exp-dual">
          <aside className="exp-op capture-op">
            <div className="exp-op-head">
              <span className="exp-op-badge">交互域 · 触控操作</span>
              <h2 className="exp-op-title">动作捕捉与资源切换</h2>
              <p className="exp-op-desc">
                打开摄像头后，大屏实时显示你的画面与动作反馈；需要换装、换场景等功能时点下方按钮即可。
              </p>
            </div>

            <div className="exp-permission-tip">首次使用请允许访问摄像头。</div>

            <div className="capture-op-actions">
              <button
                type="button"
                className={`capture-op-btn primary ${isCapturing ? 'recording' : ''}`}
                onClick={toggleCapture}
              >
                <span className="capture-op-btn-icon">{isCapturing ? '⏹️' : '🎬'}</span>
                <span>{isCapturing ? '停止捕捉' : '开始捕捉'}</span>
              </button>
              <button type="button" className="capture-op-btn" onClick={handleAvatarSelect}>
                <span className="capture-op-btn-icon">👗</span>
                <span>民族服饰</span>
              </button>
              <button type="button" className="capture-op-btn" onClick={handleSwitchScene}>
                <span className="capture-op-btn-icon">🏞️</span>
                <span>校园文化场景</span>
              </button>
              <button type="button" className="capture-op-btn" onClick={handleMusic}>
                <span className="capture-op-btn-icon">🎵</span>
                <span>节奏互动</span>
              </button>
              <button type="button" className="capture-op-btn" onClick={handleSongSelect}>
                <span className="capture-op-btn-icon">🎼</span>
                <span>歌曲选择</span>
              </button>
            </div>

            <div className="capture-op-infos">
              <div className="info-card">
                <div className="info-icon">👆</div>
                <div className="info-content">
                  <div className="info-title">当前手势</div>
                  <div className="info-value gesture-value">{gesture || '识别中...'}</div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">📊</div>
                <div className="info-content">
                  <div className="info-title">动作评分</div>
                  <div className="score-display">
                    <div className="score-bar">
                      <div className="score-fill" style={{ width: `${score}%` }}></div>
                    </div>
                    <span className="score-text">{score}分</span>
                  </div>
                </div>
              </div>

              <div className="info-card compact">
                <div className="info-icon">💡</div>
                <div className="info-content">
                  <div className="info-title">手势提示</div>
                  <div className="info-value small">举手 → 上一场景</div>
                  <div className="info-value small">挥手 → 下一场景</div>
                  <div className="info-value small">点赞 → 确认</div>
                </div>
              </div>
            </div>
          </aside>

          <section className="exp-display capture-display">
            <span className="exp-display-tag">展示域 · AR 合成预览</span>
            <div className="capture-display-inner">
              <div className="capture-frame">
                <div className="frame-corner top-left"></div>
                <div className="frame-corner top-right"></div>
                <div className="frame-corner bottom-left"></div>
                <div className="frame-corner bottom-right"></div>

                {!isCapturing ? (
                  <div className="capture-prompt">
                    <div className="prompt-icon">🎥</div>
                    <div className="prompt-text">点下方「开始捕捉」开启摄像头，右侧预览区查看画面</div>
                  </div>
                ) : (
                  <div className="capture-status">
                    <span className="status-dot"></span>
                    <span className="status-text">正在捕捉中...</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        <footer className="capture-footer">
          <span className="footer-text">AI 实时识别 | 肢体 + 面部追踪</span>
        </footer>
      </div>
    </div>
  )
}

export default Capture
