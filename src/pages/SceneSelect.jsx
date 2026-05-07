import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './SceneSelect.css'

const scenes = [
  {
    id: 1,
    name: '壮族绣球广场',
    icon: '🏮',
    description: '充满民族风情的广场，绣球飞舞',
    background: 'linear-gradient(135deg, #E91E63 0%, #FF9800 100%)',
    particles: '#FFC107'
  },
  {
    id: 2,
    name: '苗族银饰殿堂',
    icon: '💎',
    description: '银饰闪烁的华丽殿堂',
    background: 'linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)',
    particles: '#E1BEE7'
  },
  {
    id: 3,
    name: '傣族竹楼庭院',
    icon: '🏡',
    description: '热带雨林中的竹楼风情',
    background: 'linear-gradient(135deg, #00BCD4 0%, #009688 100%)',
    particles: '#B2EBF2'
  },
  {
    id: 4,
    name: '彝族火把广场',
    icon: '🔥',
    description: '篝火熊熊的热情之夜',
    background: 'linear-gradient(135deg, #FF5722 0%, #E64A19 100%)',
    particles: '#FFCC80'
  },
  {
    id: 5,
    name: '藏族雪山圣殿',
    icon: '⛰️',
    description: '雪域高原的神圣殿堂',
    background: 'linear-gradient(135deg, #607D8B 0%, #455A64 100%)',
    particles: '#CFD8DC'
  },
  {
    id: 6,
    name: '维吾尔绿洲',
    icon: '🌴',
    description: '沙漠中的绿色奇迹',
    background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
    particles: '#C8E6C9'
  },
]

function SceneSelect() {
  const navigate = useNavigate()
  const [selectedScene, setSelectedScene] = useState(scenes[0])
  const [particlePositions, setParticlePositions] = useState([])

  useEffect(() => {
    const particles = []
    for (let i = 0; i < 30; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 2
      })
    }
    setParticlePositions(particles)
  }, [])

  const handleGoHome = () => {
    navigate('/')
  }

  const handleSelectScene = (scene) => {
    setSelectedScene(scene)
  }

  const handleConfirm = () => {
    navigate('/capture')
  }

  return (
    <div className="scene-container" style={{ '--scene-color': selectedScene.background }}>
      <div className="scene-particles">
        {particlePositions.map(p => (
          <div
            key={p.id}
            className="scene-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: selectedScene.particles,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      <div className="scene-overlay">
        <header className="scene-header">
          <button type="button" className="back-btn" onClick={handleGoHome}>
            <span>←</span>
            <span>首页</span>
          </button>
          <h1 className="page-title">场景选择</h1>
          <div className="header-spacer"></div>
        </header>

        <div className="scene-content exp-dual">
          <aside className="exp-op scene-op">
            <div className="exp-op-head">
              <span className="exp-op-badge">交互域 · 触控操作</span>
              <h2 className="exp-op-title">校园文化场景选择</h2>
              <p className="exp-op-desc">
                左侧列表里点选场景，右侧看大图预览；满意后点「确认场景」即可返回。
              </p>
            </div>

            <div className="scenes-grid scene-op-grid">
              {scenes.map(scene => (
                <button
                  type="button"
                  key={scene.id}
                  className={`scene-card ${selectedScene.id === scene.id ? 'selected' : ''}`}
                  onClick={() => handleSelectScene(scene)}
                  style={{ '--card-bg': scene.background }}
                >
                  <div className="card-icon">{scene.icon}</div>
                  <div className="card-name">{scene.name}</div>
                  <div className="card-desc">{scene.description}</div>

                  {selectedScene.id === scene.id && (
                    <div className="selected-indicator">✓</div>
                  )}
                </button>
              ))}
            </div>
          </aside>

          <section className="exp-display scene-display">
            <span className="exp-display-tag">展示域 · 场景预览</span>
            <div className="preview-section">
              <div className="scene-preview" style={{ background: selectedScene.background }}>
                <div className="preview-icon">{selectedScene.icon}</div>
                <div className="preview-name">{selectedScene.name}</div>
                <div className="preview-desc">{selectedScene.description}</div>

                <div className="preview-effects">
                  <div className="effect-ring"></div>
                  <div className="effect-ring delay-1"></div>
                  <div className="effect-ring delay-2"></div>
                </div>
              </div>

              <button type="button" className="confirm-btn" onClick={handleConfirm}>
                <span className="btn-icon">🎬</span>
                <span className="btn-text">确认场景</span>
              </button>
            </div>
          </section>
        </div>

        <footer className="scene-footer">
          <span className="footer-text">选择场景后，使用手势控制进行互动</span>
        </footer>
      </div>
    </div>
  )
}

export default SceneSelect
