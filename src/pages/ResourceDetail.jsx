import { useNavigate } from 'react-router-dom'
import './Page.css'

function ResourceDetail() {
  const navigate = useNavigate()

  return (
    <div className="shell-page">
      <div className="shell-bg" aria-hidden />
      <div className="shell-content">
        <header className="shell-header">
          <button type="button" className="shell-back" onClick={() => navigate('/activity-list')}>
            <span>←</span>
            <span>返回列表</span>
          </button>
          <h1 className="shell-title">资源详情</h1>
          <span className="shell-header-spacer" aria-hidden />
        </header>
        <main className="shell-card">
          <div className="shell-accent-line" />
          <p>
            民族文化素材、服饰纹样与场景说明将在此呈现，便于深入了解每一项互动背后的文化内涵。
          </p>
          <span className="shell-badge">内容建设中</span>
        </main>
      </div>
    </div>
  )
}

export default ResourceDetail
