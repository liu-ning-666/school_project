import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScaledDesignSurface from '../components/ScaledDesignSurface'
import './Display.css'

function Display() {
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const [screensaverVisible, setScreensaverVisible] = useState(true)
  const idleTimerRef = useRef(null)

  const resetIdleTimer = () => {
    clearTimeout(idleTimerRef.current)
    setScreensaverVisible(false)
    idleTimerRef.current = setTimeout(() => {
      setScreensaverVisible(true)
    }, 10000)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let animationId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = Math.random() > 0.5 ? 'rgba(0, 191, 165, 0.6)' : 'rgba(13, 71, 161, 0.6)'
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles = []
      const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 15000))
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 120) {
            ctx.strokeStyle = `rgba(0, 191, 165, ${0.15 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animateParticles)
    }

    const onResize = () => {
      resizeCanvas()
    }
    window.addEventListener('resize', onResize)
    resizeCanvas()
    animateParticles()
    resetIdleTimer()

    document.addEventListener('mousemove', resetIdleTimer)
    document.addEventListener('touchstart', resetIdleTimer)
    document.addEventListener('click', resetIdleTimer)

    return () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('mousemove', resetIdleTimer)
      document.removeEventListener('touchstart', resetIdleTimer)
      document.removeEventListener('click', resetIdleTimer)
      cancelAnimationFrame(animationId)
      clearTimeout(idleTimerRef.current)
    }
  }, [])

  const handleStart = () => {
    navigate('/avatar-select')
  }

  const handleFeatureClick = (feature) => {
    const navMap = {
      '动作捕捉': '/capture',
      '虚拟换装': '/avatar-select',
      '文化库': '/activity-list',
      '节奏互动': '/music-interaction',
      '场景选择': '/scene-select',
    }
    const url = navMap[feature]
    if (url) {
      navigate(url)
    }
  }

  return (
    <div className="display-container">
      <canvas ref={canvasRef} id="particles"></canvas>
      <div className="cultural-pattern"></div>

      <ScaledDesignSurface placement="fullscreen">
        <div className={`screensaver ${screensaverVisible ? '' : 'hidden'}`} id="screensaver">
          <div className="screensaver-avatar">💃</div>
          <div className="screensaver-text">校园文化互动展示平台</div>
          <div className="screensaver-hint">靠近屏幕即可开始体验</div>
        </div>

        <div className="main-container">
            <header className="header">
              <h1 className="main-title">校园文化互动展示平台</h1>
              <p className="sub-title sub-title--nav" aria-label="功能导览">
                <span>AI 动作捕捉</span>
                <span className="sub-title-sep">|</span>
                <span>虚拟形象</span>
                <span className="sub-title-sep">|</span>
                <span>多民族文化</span>
                <span className="sub-title-sep">|</span>
                <span>节奏互动体验</span>
              </p>
            </header>

            <section className="center-area">
              <div className="center-bg">
                <div className="skeleton-animation">
                  <div className="skeleton-dot"></div>
                  <div className="skeleton-dot"></div>
                  <div className="skeleton-dot"></div>
                  <div className="skeleton-dot"></div>
                  <div className="skeleton-dot"></div>
                  <div className="skeleton-dot"></div>
                  <div className="skeleton-dot"></div>
                  <div className="skeleton-dot"></div>
                </div>
              </div>

              <div className="hero-dashboard">
                <nav className="feature-column feature-column--left" aria-label="左侧入口">
                  <button
                    type="button"
                    className="feature-card feature-card--tile"
                    onClick={() => handleFeatureClick('动作捕捉')}
                  >
                    <div className="card-icon">🦴</div>
                    <h3 className="card-title">AI 动作捕捉</h3>
                    <p className="card-desc">肢体 + 面部实时识别</p>
                  </button>
                  <button
                    type="button"
                    className="feature-card feature-card--tile"
                    onClick={() => handleFeatureClick('虚拟换装')}
                  >
                    <div className="card-icon">👘</div>
                    <h3 className="card-title">虚拟形象换装</h3>
                    <p className="card-desc">多民族服饰自由切换</p>
                  </button>
                  <button
                    type="button"
                    className="feature-card feature-card--tile"
                    onClick={() => handleFeatureClick('文化库')}
                  >
                    <div className="card-icon">🏛️</div>
                    <h3 className="card-title">多民族文化库</h3>
                    <p className="card-desc">服饰 / 场景 / 文化展示</p>
                  </button>
                </nav>

                <div className="hero-center">
                  <button type="button" className="main-button" id="startButton" onClick={handleStart}>
                    <span className="button-text">点击开始体验</span>
                  </button>
                  <div className="button-hint">站到大屏幕前即可参与互动</div>
                </div>

                <nav className="feature-column feature-column--right" aria-label="右侧入口">
                  <button
                    type="button"
                    className="feature-card feature-card--tile"
                    onClick={() => handleFeatureClick('节奏互动')}
                  >
                    <div className="card-icon">🎵</div>
                    <h3 className="card-title">节奏舞蹈互动</h3>
                    <p className="card-desc">跟跳评分 · 趣味反馈</p>
                  </button>
                  <button
                    type="button"
                    className="feature-card feature-card--tile"
                    onClick={() => handleFeatureClick('场景选择')}
                  >
                    <div className="card-icon">🎬</div>
                    <h3 className="card-title">场景选择</h3>
                    <p className="card-desc">校园文化场景 · 预览确认</p>
                  </button>
                  <button type="button" className="feature-card feature-card--tile" onClick={() => navigate('/song-select')}>
                    <div className="card-icon">🎼</div>
                    <h3 className="card-title">歌曲选择</h3>
                    <p className="card-desc">试听曲目 · 节拍联动选用</p>
                  </button>
                </nav>
              </div>
            </section>

            <footer className="footer">
              <span className="footer-text">广西民族大学</span>
              <div className="footer-divider"></div>
              <span className="footer-text">校园文化互动展示小程序</span>
              <div className="footer-divider"></div>
              <span className="footer-text">© 2026 All Rights Reserved</span>
            </footer>
        </div>
      </ScaledDesignSurface>
    </div>
  )
}

export default Display
