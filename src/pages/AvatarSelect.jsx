import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AvatarSelect.css'

/** 民族服饰（与 UI2 costume 列表一致） */
const COSTUMES = [
  { id: 'hanfu', name: '汉族汉服', icon: '👗' },
  { id: 'zangpao', name: '藏族藏袍', icon: '🧥' },
  { id: 'menggu', name: '蒙古族袍服', icon: '👘' },
  { id: 'zhuang', name: '壮族壮锦', icon: '🪁' },
  { id: 'miaozu', name: '苗族银饰', icon: '💍' },
  { id: 'manzu', name: '满族旗装', icon: '🥻' },
]

const DEFAULT_COSTUME_ID = 'hanfu'
const DEFAULT_GENDER = 'female'

function computePreview(costumeId, gender) {
  const costume = COSTUMES.find(c => c.id === costumeId)
  const genderLabel = gender === 'male' ? '男' : '女'
  if (!costume) {
    return { icon: '👗', name: `默认形象・${genderLabel}` }
  }
  return {
    icon: costume.icon,
    name: `${costume.name}・${genderLabel}`,
  }
}

function AvatarSelect() {
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const idleTimerRef = useRef(null)
  const avatarFlashTimerRef = useRef(null)

  const [screensaverVisible, setScreensaverVisible] = useState(false)
  const [gender, setGender] = useState(DEFAULT_GENDER)
  const [costumeId, setCostumeId] = useState(DEFAULT_COSTUME_ID)
  const [previewFlashIcon, setPreviewFlashIcon] = useState(null)
  const [modal, setModal] = useState(null)

  const preview = useMemo(() => computePreview(costumeId, gender), [costumeId, gender])
  const displayIcon = previewFlashIcon ?? preview.icon

  const resetIdleTimer = useCallback(() => {
    clearTimeout(idleTimerRef.current)
    setScreensaverVisible(false)
    idleTimerRef.current = setTimeout(() => {
      setScreensaverVisible(true)
    }, 60000)
  }, [])

  useEffect(() => {
    resetIdleTimer()
    const onActivity = () => resetIdleTimer()
    document.addEventListener('mousemove', onActivity)
    document.addEventListener('touchstart', onActivity)
    document.addEventListener('click', onActivity)
    return () => {
      document.removeEventListener('mousemove', onActivity)
      document.removeEventListener('touchstart', onActivity)
      document.removeEventListener('click', onActivity)
      clearTimeout(idleTimerRef.current)
    }
  }, [resetIdleTimer])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    let particles = []
    let animationId

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
      const count = Math.min(150, Math.floor((canvas.width * canvas.height) / 15000))
      for (let i = 0; i < count; i++) {
        particles.push(new Particle())
      }
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.update()
        p.draw()
      })
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.strokeStyle = `rgba(0, 191, 165, ${0.15 * (1 - dist / 120)})`
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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    animateParticles()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  useEffect(() => {
    return () => clearTimeout(avatarFlashTimerRef.current)
  }, [])

  const handleRandomize = () => {
    const pick = COSTUMES[Math.floor(Math.random() * COSTUMES.length)]
    setCostumeId(pick.id)
    setGender(Math.random() > 0.5 ? 'male' : 'female')
  }

  const handleSave = () => {
    setModal('success')
    window.setTimeout(() => setModal(null), 2000)
  }

  const handlePreviewAvatarClick = () => {
    const actions = ['👋', '💃', '🙋', '🎀']
    clearTimeout(avatarFlashTimerRef.current)
    const pick = actions[Math.floor(Math.random() * actions.length)]
    setPreviewFlashIcon(pick)
    avatarFlashTimerRef.current = window.setTimeout(() => {
      setPreviewFlashIcon(null)
    }, 1000)
  }

  return (
    <div className="avatar-select-ui2">
      <canvas ref={canvasRef} className="as2-particles" aria-hidden />
      <div className="cultural-pattern" aria-hidden />
      <div className="golden-cloud" aria-hidden />

      <div className={`screensaver ${screensaverVisible ? '' : 'hidden'}`} id="screensaver">
        <div className="screensaver-avatar">👗</div>
        <div className="screensaver-text">选择你的虚拟形象</div>
        <div className="screensaver-hint">触摸屏幕即可开始</div>
      </div>

      <div className="main-container">
        <nav className="top-nav">
          <button type="button" className="nav-btn back" onClick={() => navigate('/')}>
            ← 返回
          </button>
          <h1 className="nav-title">选择你的虚拟形象</h1>
          <button type="button" className="nav-btn random" onClick={handleRandomize}>
            <span className="nav-btn-random-ico" aria-hidden>
              ✨
            </span>
            <span className="nav-btn-random-label">随机生成</span>
          </button>
        </nav>

        <section className="center-preview">
          <div className="preview-box" id="previewBox">
            <div className="preview-avatar-stage">
              <button
                type="button"
                className="preview-avatar"
                id="previewAvatar"
                onClick={handlePreviewAvatarClick}
                aria-label="预览形象"
              >
                {displayIcon}
              </button>
            </div>
            <div className="preview-name" id="previewName">
              {preview.name}
            </div>
            <div className="preview-hint">拖动旋转查看细节</div>
          </div>
        </section>

        <aside className="category-panel category-panel--gender" aria-label="性别">
          <p className="gender-panel-label">性别</p>
          <button
            type="button"
            className={`category-btn ${gender === 'female' ? 'active' : ''}`}
            onClick={() => setGender('female')}
          >
            女
          </button>
          <button
            type="button"
            className={`category-btn ${gender === 'male' ? 'active' : ''}`}
            onClick={() => setGender('male')}
          >
            男
          </button>
        </aside>

        <aside className="resource-panel" aria-label="民族服饰">
          <div className="resource-scroll" id="resourceScroll">
            {COSTUMES.map(item => (
              <button
                key={item.id}
                type="button"
                className={`resource-card ${costumeId === item.id ? 'selected' : ''}`}
                onClick={() => setCostumeId(item.id)}
              >
                <div className="resource-thumb">
                  <span className="resource-thumb-icon">{item.icon}</span>
                </div>
                <div className="resource-name">{item.name}</div>
              </button>
            ))}
          </div>
        </aside>

        <footer className="bottom-bar">
          <button type="button" className="action-btn save" onClick={handleSave}>
            保存搭配
          </button>
          <button type="button" className="action-btn start" onClick={() => navigate('/scene-select')}>
            开始体验
          </button>
        </footer>
      </div>

      {modal === 'success' ? (
        <div className="modal-overlay" role="presentation">
          <div className="modal modal-success" role="status">
            <div className="success-icon">✅</div>
            <p className="success-text">搭配保存成功</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default AvatarSelect
