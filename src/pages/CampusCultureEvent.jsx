import { useNavigate } from 'react-router-dom'
import './Page.css'

function CampusCultureEvent() {
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
          <h1 className="shell-title">校园文化活动</h1>
          <span className="shell-header-spacer" aria-hidden />
        </header>
        <main className="shell-card">
          <div className="shell-accent-line" />
          <p>
            活动时间轴、场地指引与报名方式将在此集中展示，与活动中心列表联动展示最新校园文化资讯。
          </p>
          <span className="shell-badge">内容建设中</span>
        </main>
      </div>
    </div>
  )
}

export default CampusCultureEvent
