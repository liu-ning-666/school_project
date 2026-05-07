import { useNavigate } from 'react-router-dom'
import './Page.css'

function Settings() {
  const navigate = useNavigate()

  return (
    <div className="shell-page">
      <div className="shell-bg" aria-hidden />
      <div className="shell-content">
        <header className="shell-header">
          <button type="button" className="shell-back" onClick={() => navigate('/')}>
            <span>←</span>
            <span>返回首页</span>
          </button>
          <h1 className="shell-title">设置</h1>
          <span className="shell-header-spacer" aria-hidden />
        </header>
        <main className="shell-card">
          <div className="shell-accent-line" />
          <p>
            音量、画质等常用偏好将出现在这里，便于大屏与现场调试。功能陆续上线，敬请期待。
          </p>
          <span className="shell-badge">敬请期待</span>
        </main>
      </div>
    </div>
  )
}

export default Settings
