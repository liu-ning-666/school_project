import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CAMPUS_SONGS, playMelodyHz } from '../lib/campusSongs'
import './SongSelect.css'

function SongSelect() {
  const navigate = useNavigate()
  const busyRef = useRef(false)
  const [playingId, setPlayingId] = useState(null)
  const [selectedId, setSelectedId] = useState(CAMPUS_SONGS[0].id)

  const preview = (song) => {
    if (busyRef.current) return
    busyRef.current = true
    setPlayingId(song.id)
    try {
      playMelodyHz(song.melody)
    } catch {
      /* ignore */
    }
    const ms = song.melody.length * 220 + 400
    window.setTimeout(() => {
      busyRef.current = false
      setPlayingId(null)
    }, ms)
  }

  const selected = CAMPUS_SONGS.find(s => s.id === selectedId) ?? CAMPUS_SONGS[0]

  const goRhythm = () => {
    navigate('/music-interaction', {
      state: {
        selectedSong: {
          title: selected.title,
          tag: selected.tag,
          duration: selected.duration,
        },
      },
    })
  }

  return (
    <div className="song-select-page">
      <div className="song-select-bg" aria-hidden />

      <header className="song-select-header">
        <button type="button" className="song-select-back" onClick={() => navigate('/')}>
          <span>←</span>
          <span>返回首页</span>
        </button>
        <h1 className="song-select-title">歌曲选择</h1>
        <span className="song-select-spacer" aria-hidden />
      </header>

      <div className="song-select-body exp-dual">
        <aside className="exp-op song-select-op">
          <div className="exp-op-head">
            <span className="exp-op-badge">交互域 · 触控操作</span>
            <h2 className="exp-op-title">校园主题曲目</h2>
            <p className="exp-op-desc">
              点选卡片切换预览；「试听」播放示意旋律；「选用」后可在右侧大图确认并进入节奏页。
            </p>
          </div>

          <div className="song-select-grid">
            {CAMPUS_SONGS.map(song => (
              <button
                key={song.id}
                type="button"
                className={`song-pick-card ${selectedId === song.id ? 'picked' : ''} ${playingId === song.id ? 'playing' : ''}`}
                onClick={() => setSelectedId(song.id)}
              >
                {selectedId === song.id ? <span className="song-pick-check">✓</span> : null}
                <span className="song-pick-thumb">
                  <span className="song-pick-icon">{song.icon}</span>
                </span>
                <span className="song-pick-name">{song.title}</span>
                <span className="song-pick-meta">
                  {song.tag} · {song.duration}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section className="exp-display song-select-display">
          <span className="exp-display-tag">展示域 · 曲目预览</span>

          <div className="song-preview-layout">
            <div className="song-preview-wrap">
              <div
                className="song-preview-hero"
                style={{ background: selected.previewBg }}
              >
                <div className="song-preview-hero-shine" aria-hidden />
                <div className="song-preview-hero-icon">{selected.icon}</div>
                <h2 className="song-preview-hero-title">{selected.title}</h2>
                <p className="song-preview-hero-sub">
                  {selected.tag} · 约 {selected.duration}
                </p>
              </div>

              <div className="song-preview-toolbar">
                <button
                  type="button"
                  className="song-preview-btn ghost"
                  onClick={() => preview(selected)}
                  disabled={!!playingId}
                >
                  {playingId === selected.id ? '播放中…' : '试听'}
                </button>
                <button type="button" className="song-preview-btn primary" onClick={() => setSelectedId(selected.id)}>
                  选用此曲
                </button>
              </div>

              <button type="button" className="song-preview-go-rhythm" onClick={goRhythm}>
                <span className="song-preview-go-icon">🎯</span>
                <span>
                  用「{selected.title}」进入节奏舞蹈互动
                </span>
              </button>

              <p className="song-preview-tip">
                本页侧重<strong>选歌与试听</strong>；节拍玩法请在节奏页完成。首页亦可先进入「场景选择」再回来换曲。
              </p>
            </div>

            <aside className="song-select-side" aria-label="节拍联动说明">
              <p className="song-side-kicker">节拍联动</p>
              <h3 className="song-side-title">选用后带入节奏页</h3>
              <ul className="song-side-list">
                <li>
                  <strong>试听</strong>
                  ：示意旋律，确认氛围与节拍感
                </li>
                <li>
                  <strong>选用此曲</strong>
                  ：锁定当前曲目为大图预览
                </li>
                <li>
                  <strong>进入节奏页</strong>
                  ：跟跳评分与趣味反馈
                </li>
              </ul>
              <div className="song-side-bars" aria-hidden>
                {[0.35, 0.55, 0.85, 0.45, 0.7, 0.5, 0.9, 0.4].map((h, i) => (
                  <span key={i} className="song-side-bar" style={{ '--h': String(h) }} />
                ))}
              </div>
              <div className="song-side-current">
                <span className="song-side-current-label">当前选用</span>
                <span className="song-side-current-title">{selected.title}</span>
                <span className="song-side-current-meta">
                  {selected.tag} · {selected.duration}
                </span>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SongSelect
