import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ActivityList.css'

const activitiesData = [
  {
    id: 1,
    name: '民族服饰文化节',
    time: '2026.05.15 14:00-18:00',
    location: '学校民族大礼堂',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20Chinese%20ethnic%20costumes%20cultural%20exhibition%20festive%20atmosphere&image_size=landscape_16_9',
    status: 'upcoming',
    category: 'ethnic',
    registered: false
  },
  {
    id: 2,
    name: '校园音乐节',
    time: '2026.05.20 19:00-22:00',
    location: '学校体育场',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=university%20campus%20outdoor%20concert%20night%20with%20stage%20lighting&image_size=landscape_16_9',
    status: 'upcoming',
    category: 'campus',
    registered: false
  },
  {
    id: 3,
    name: '书画艺术展',
    time: '2026.05.25 09:00-17:00',
    location: '学校艺术馆',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20calligraphy%20and%20painting%20art%20gallery%20exhibition%20elegant&image_size=landscape_16_9',
    status: 'upcoming',
    category: 'campus',
    registered: false
  },
  {
    id: 4,
    name: '壮锦编织体验课',
    time: '2026.05.12 10:00-12:00',
    location: '学校手工坊',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20Chinese%20embroidery%20and%20weaving%20workshop%20colorful%20threads&image_size=landscape_16_9',
    status: 'ongoing',
    category: 'ethnic',
    registered: false
  },
  {
    id: 5,
    name: '校园读书分享会',
    time: '2026.05.18 15:00-17:00',
    location: '学校图书馆报告厅',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=university%20library%20book%20sharing%20meeting%20reading%20club%20academic&image_size=landscape_16_9',
    status: 'upcoming',
    category: 'campus',
    registered: false
  },
  {
    id: 6,
    name: '虚拟形象设计大赛',
    time: '2026.05.22 14:00-18:00',
    location: '线上活动',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20virtual%20avatar%20design%20competition%20digital%20art%20tech&image_size=landscape_16_9',
    status: 'upcoming',
    category: 'virtual',
    registered: false
  },
  {
    id: 7,
    name: '传统手工艺体验',
    time: '2026.05.01 10:00-12:00',
    location: '学校文化中心',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20Chinese%20handicrafts%20workshop%20paper%20cutting%20pottery&image_size=landscape_16_9',
    status: 'ended',
    category: 'ethnic',
    registered: true
  },
  {
    id: 8,
    name: '汉服文化日',
    time: '2026.05.10 09:00-17:00',
    location: '学校广场',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20Chinese%20Hanfu%20clothing%20cultural%20day%20ancient%20style&image_size=landscape_16_9',
    status: 'ongoing',
    category: 'ethnic',
    registered: false
  },
  {
    id: 9,
    name: 'AI 数字艺术展',
    time: '2026.05.28 10:00-18:00',
    location: '学校数字艺术中心',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20AI%20digital%20art%20exhibition%20colorful%20abstract%20modern&image_size=landscape_16_9',
    status: 'upcoming',
    category: 'virtual',
    registered: false
  },
  {
    id: 10,
    name: '校园戏剧节',
    time: '2026.05.30 19:00-21:30',
    location: '学校大剧场',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=university%20campus%20theatre%20drama%20festival%20stage%20performance&image_size=landscape_16_9',
    status: 'upcoming',
    category: 'campus',
    registered: false
  },
  {
    id: 11,
    name: '少数民族美食节',
    time: '2026.05.08 11:00-18:00',
    location: '学校食堂广场',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20ethnic%20minority%20food%20festival%20colorful%20dishes%20market&image_size=landscape_16_9',
    status: 'ongoing',
    category: 'ethnic',
    registered: false
  },
  {
    id: 12,
    name: '虚拟歌手演唱会',
    time: '2026.06.01 20:00-22:00',
    location: '线上直播',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=virtual%20singer%20concert%20digital%20hologram%20stage%20futuristic&image_size=landscape_16_9',
    status: 'upcoming',
    category: 'virtual',
    registered: false
  }
]

const carouselActivities = [
  { id: 1, name: '民族服饰文化节', time: '2026.05.15 14:00-18:00', location: '学校民族大礼堂' },
  { id: 2, name: '校园音乐节', time: '2026.05.20 19:00-22:00', location: '学校体育场' },
  { id: 3, name: '书画艺术展', time: '2026.05.25 09:00-17:00', location: '学校艺术馆' }
]

function ActivityList() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [currentCategory, setCurrentCategory] = useState('all')
  const [displayedCount, setDisplayedCount] = useState(6)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showMyActivityModal, setShowMyActivityModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [pendingRegisterActivity, setPendingRegisterActivity] = useState(null)
  const [pendingCancelActivity, setPendingCancelActivity] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [activities, setActivities] = useState(activitiesData)
  const [isLoading, setIsLoading] = useState(true)
  const idleTimerRef = useRef(null)
  const autoSlideIntervalRef = useRef(null)

  const resetIdleTimer = () => {
    clearTimeout(idleTimerRef.current)
    idleTimerRef.current = setTimeout(() => {
      navigate('/')
    }, 90000)
  }

  const filteredActivities = activities.filter(activity => {
    if (currentCategory === 'all') return true
    if (currentCategory === 'ongoing') return activity.status === 'ongoing'
    if (currentCategory === 'upcoming') return activity.status === 'upcoming'
    if (currentCategory === 'ended') return activity.status === 'ended'
    return activity.category === currentCategory
  })

  const displayedActivities = filteredActivities.slice(0, displayedCount)

  const getStatusText = (status) => {
    const texts = {
      ongoing: '🔥 正在进行',
      upcoming: '⏰ 即将开始',
      ended: '已结束',
      virtual: '🤖 虚拟形象参与'
    }
    return texts[status]
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let animationId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    requestAnimationFrame(resize)
    window.addEventListener('resize', resize)

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

    for (let i = 0; i < 100; i++) particles.push(new Particle())

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw(); })
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x, dy = p1.y - p2.y, d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.strokeStyle = `rgba(0, 191, 165, ${0.15 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })
      animationId = requestAnimationFrame(animate)
    }
    animate()

    setTimeout(() => {
      setIsLoading(false)
    }, 500)

    resetIdleTimer()
    document.addEventListener('mousemove', resetIdleTimer)
    document.addEventListener('touchstart', resetIdleTimer)
    document.addEventListener('click', resetIdleTimer)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
      clearTimeout(idleTimerRef.current)
      document.removeEventListener('mousemove', resetIdleTimer)
      document.removeEventListener('touchstart', resetIdleTimer)
      document.removeEventListener('click', resetIdleTimer)
    }
  }, [navigate])

  useEffect(() => {
    const nextSlide = () => {
      setCurrentSlide(prev => (prev + 1) % carouselActivities.length)
    }
    autoSlideIntervalRef.current = setInterval(nextSlide, 5000)
    return () => clearInterval(autoSlideIntervalRef.current)
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    clearInterval(autoSlideIntervalRef.current)
    const nextSlide = () => {
      setCurrentSlide(prev => (prev + 1) % carouselActivities.length)
    }
    autoSlideIntervalRef.current = setInterval(nextSlide, 5000)
  }

  const openRegisterModalByActivity = (activity) => {
    setPendingRegisterActivity(activity)
    setShowRegisterModal(true)
  }

  const confirmRegister = () => {
    if (!pendingRegisterActivity) return
    setActivities(prev => {
      const targetId =
        pendingRegisterActivity.id ??
        prev.find(a => a.name === pendingRegisterActivity.name)?.id
      if (targetId == null) return prev
      return prev.map(a => (a.id === targetId ? { ...a, registered: true } : a))
    })
    setShowRegisterModal(false)
    setPendingRegisterActivity(null)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const loadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setDisplayedCount(prev => prev + 4)
      setIsLoading(false)
    }, 800)
  }

  const openActivityDetail = (activity) => {
    if (activity.category === 'virtual' || activity.category === 'ethnic') {
      navigate('/resource-detail')
    } else {
      navigate('/campus-culture-event')
    }
  }

  const viewReview = (id) => {
    alert(`正在加载活动回顾...\n\n活动ID: ${id}`)
  }

  const confirmCancel = () => {
    if (pendingCancelActivity) {
      setActivities(prev =>
        prev.map(a =>
          a.id === pendingCancelActivity.id ? { ...a, registered: false } : a
        )
      )
    }
    setShowCancelModal(false)
    setPendingCancelActivity(null)
  }

  const myActivities = activities.filter(a => a.registered)

  return (
    <div ref={containerRef} className="activity-list-container">
      <canvas ref={canvasRef} id="particles"></canvas>
      <div className="cultural-pattern"></div>

      <div className="main-container">
        <div className="top-bar">
          <button type="button" className="back-btn" onClick={() => navigate('/')}>
            <span>←</span>
            <span>返回首页</span>
          </button>
          <div className="page-title">校园文化活动中心</div>
          <button className="my-activity-btn" onClick={() => setShowMyActivityModal(true)}>
            <span>👤</span>
            <span>我的活动</span>
          </button>
        </div>

        <div className="carousel-section">
          <div className="carousel-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {carouselActivities.map((activity, index) => (
              <div key={index} className="carousel-item">
                <div className="carousel-content">
                  <div className="carousel-info">
                    <div className="carousel-title">{activity.name}</div>
                    <div className="carousel-time">{activity.time}</div>
                    <div className="carousel-location">{activity.location}</div>
                  </div>
                  <button className="carousel-register-btn" onClick={() => {
                    setPendingRegisterActivity(activity)
                    setShowRegisterModal(true)
                  }}>立即报名</button>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-indicators">
            {carouselActivities.map((_, index) => (
              <div
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              ></div>
            ))}
          </div>
        </div>

        <div className="main-content">
          <div className="category-sidebar">
            <button className={`category-btn ${currentCategory === 'all' ? 'active' : ''}`} onClick={() => setCurrentCategory('all')}>全部活动</button>
            <button className={`category-btn ${currentCategory === 'ongoing' ? 'active' : ''}`} onClick={() => setCurrentCategory('ongoing')}>
              正在进行
              <span className="category-badge ongoing">3</span>
            </button>
            <button className={`category-btn ${currentCategory === 'upcoming' ? 'active' : ''}`} onClick={() => setCurrentCategory('upcoming')}>
              即将开始
              <span className="category-badge upcoming">5</span>
            </button>
            <button className={`category-btn ${currentCategory === 'ended' ? 'active' : ''}`} onClick={() => setCurrentCategory('ended')}>往期回顾</button>
            <button className={`category-btn ${currentCategory === 'ethnic' ? 'active' : ''}`} onClick={() => setCurrentCategory('ethnic')}>民族文化活动</button>
            <button className={`category-btn ${currentCategory === 'campus' ? 'active' : ''}`} onClick={() => setCurrentCategory('campus')}>校园主题活动</button>
            <button className={`category-btn ${currentCategory === 'virtual' ? 'active' : ''}`} onClick={() => setCurrentCategory('virtual')}>虚拟形象专属活动</button>
          </div>

          <div className="activity-list">
            {isLoading ? (
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="skeleton-card">
                  <div className="skeleton-cover"></div>
                  <div className="skeleton-info">
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line short"></div>
                    <div className="skeleton-line short"></div>
                  </div>
                </div>
              ))
            ) : displayedActivities.length === 0 ? (
              <div className="empty-state" style={{ gridColumn: 'span 2' }}>
                <div className="empty-icon">📂</div>
                <div className="empty-text">该分类下暂无活动</div>
                <button className="empty-btn" onClick={() => setCurrentCategory('all')}>查看全部活动</button>
              </div>
            ) : (
              displayedActivities.map(activity => (
                <div key={activity.id} className="activity-card" onClick={() => openActivityDetail(activity)}>
                  <div className="activity-cover" style={{ backgroundImage: `url(${activity.cover})` }}></div>
                  <div className="activity-info">
                    <div className="activity-name">{activity.name}</div>
                    <div className="activity-time">{activity.time}</div>
                    <div className="activity-location">地点：{activity.location}</div>
                    <div className="activity-footer">
                      <span className={`status-tag ${activity.status}`}>{getStatusText(activity.status)}</span>
                      {activity.registered ? (
                        <button className="action-btn registered">已报名</button>
                      ) : activity.status === 'ended' ? (
                        <button className="action-btn review" onClick={(e) => { e.stopPropagation(); viewReview(activity.id); }}>查看回顾</button>
                      ) : (
                        <button className="action-btn register" onClick={(e) => { e.stopPropagation(); openRegisterModalByActivity(activity); }}>立即报名</button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="load-more-section">
          {filteredActivities.length > displayedCount ? (
            <button className="load-more-btn" onClick={loadMore} disabled={isLoading}>
              {isLoading ? (
                <><div className="loading-spinner"></div><span>加载中...</span></>
              ) : (
                <span>加载更多</span>
              )}
            </button>
          ) : (
            <div className="no-more-text">没有更多活动了</div>
          )}
        </div>
      </div>

      {showRegisterModal && pendingRegisterActivity && (
        <div className="modal-overlay show" onClick={() => { setShowRegisterModal(false); setPendingRegisterActivity(null) }}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ width: '600px', height: '400px' }}>
            <div className="modal-title">确认报名活动</div>
            <div className="modal-content">
              <div className="modal-info-item">
                <span className="label">活动名称：</span>
                <span className="value">{pendingRegisterActivity.name}</span>
              </div>
              <div className="modal-info-item">
                <span className="label">活动时间：</span>
                <span>{pendingRegisterActivity.time}</span>
              </div>
              <div className="modal-info-item">
                <span className="label">活动地点：</span>
                <span>{pendingRegisterActivity.location}</span>
              </div>
            </div>
            <div className="modal-buttons">
              <button type="button" className="modal-btn secondary" onClick={() => { setShowRegisterModal(false); setPendingRegisterActivity(null) }}>取消</button>
              <button className="modal-btn primary" onClick={confirmRegister}>确认报名</button>
            </div>
          </div>
        </div>
      )}

      {showMyActivityModal && (
        <div className="modal-overlay show" onClick={() => setShowMyActivityModal(false)}>
          <div className="modal my-activity-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">
              <span>我的活动</span>
              <button className="close-btn" onClick={() => setShowMyActivityModal(false)}>×</button>
            </div>
            <div className="my-activity-list">
              {myActivities.length === 0 ? (
                <div className="my-activity-empty">暂无已报名活动，请在列表中点击「立即报名」</div>
              ) : (
                myActivities.map(activity => (
                  <div key={activity.id} className="my-activity-item">
                    <div className="my-activity-info">
                      <div className="my-activity-name">{activity.name}</div>
                      <div className="my-activity-meta">{activity.time} | {activity.location}</div>
                    </div>
                    <span className={`my-activity-status ${activity.status}`}>{getStatusText(activity.status)}</span>
                    {activity.status !== 'ended' ? (
                      <button
                        type="button"
                        className="modal-btn danger"
                        onClick={() => {
                          setPendingCancelActivity(activity)
                          setShowCancelModal(true)
                        }}
                      >
                        取消报名
                      </button>
                    ) : (
                      <button type="button" className="modal-btn secondary" onClick={() => viewReview(activity.id)}>查看回顾</button>
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="modal-footer">
              <button className="modal-btn secondary" style={{ width: '200px' }} onClick={() => setShowMyActivityModal(false)}>关闭</button>
            </div>
          </div>
        </div>
      )}

      {showCancelModal && (
        <div className="modal-overlay show" onClick={() => { setShowCancelModal(false); setPendingCancelActivity(null) }}>
          <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">确认取消报名</div>
            <div className="modal-content" style={{ textAlign: 'center' }}>
              <div className="modal-info-item" style={{ fontSize: '28px', color: '#666', marginBottom: '0' }}>确定要取消此活动的报名吗？</div>
            </div>
            <div className="modal-buttons">
              <button type="button" className="modal-btn secondary" onClick={() => { setShowCancelModal(false); setPendingCancelActivity(null) }}>取消</button>
              <button className="modal-btn danger" onClick={confirmCancel}>确认取消</button>
            </div>
          </div>
        </div>
      )}

      <div className={`toast ${showToast ? 'show' : ''}`}>
        <div className="toast-icon">✅</div>
        <div className="toast-text">报名成功</div>
        <div className="toast-subtext">活动开始前将通过平台推送提醒</div>
      </div>
    </div>
  )
}

export default ActivityList
