/** 校园主题曲目列表 + 简易试听（Web Audio） */

export const CAMPUS_SONGS = [
  {
    id: 'mountain',
    title: '山歌迎客',
    tag: '壮族风 · 欢快',
    duration: '2:18',
    icon: '🏔️',
    previewBg: 'linear-gradient(145deg, #1b5e20 0%, #43a047 45%, #81c784 100%)',
    melody: [523.25, 587.33, 659.25, 698.46, 783.99, 659.25, 587.33],
  },
  {
    id: 'bamboo',
    title: '竹楼月光',
    tag: '傣族风 · 舒缓',
    duration: '3:05',
    icon: '🎋',
    previewBg: 'linear-gradient(145deg, #004d40 0%, #00897b 50%, #4db6ac 100%)',
    melody: [440, 493.88, 523.25, 587.33, 523.25, 493.88, 440, 392],
  },
  {
    id: 'silver',
    title: '银饰叮当',
    tag: '苗族风 · 跳跃',
    duration: '2:42',
    icon: '💎',
    previewBg: 'linear-gradient(145deg, #4a148c 0%, #7b1fa2 55%, #ba68c8 100%)',
    melody: [622.25, 698.46, 783.99, 830.61, 783.99, 698.46, 622.25],
  },
  {
    id: 'snow',
    title: '雪域之光',
    tag: '藏族风 · 辽阔',
    duration: '3:20',
    icon: '❄️',
    previewBg: 'linear-gradient(145deg, #01579b 0%, #0277bd 50%, #4fc3f7 100%)',
    melody: [392, 440, 493.88, 523.25, 587.33, 523.25, 440, 392],
  },
  {
    id: 'campus',
    title: '青春律动',
    tag: '校园主题',
    duration: '2:04',
    icon: '🎓',
    previewBg: 'linear-gradient(145deg, #0d47a1 0%, #1565c0 45%, #29b6f6 100%)',
    melody: [523.25, 523.25, 659.25, 587.33, 523.25, 698.46, 783.99],
  },
  {
    id: 'hydrangea',
    title: '绣球飞舞',
    tag: '节庆 · 热烈',
    duration: '2:31',
    icon: '🏮',
    previewBg: 'linear-gradient(145deg, #b71c1c 0%, #e53935 48%, #ff9800 100%)',
    melody: [587.33, 659.25, 698.46, 783.99, 880, 783.99, 698.46, 659.25],
  },
]

export function playMelodyHz(notes) {
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx || !notes?.length) return
  const ctx = new Ctx()
  const step = 0.22
  const t0 = ctx.currentTime
  notes.forEach((freq, i) => {
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'triangle'
    o.connect(g)
    g.connect(ctx.destination)
    const start = t0 + i * step
    o.frequency.setValueAtTime(freq, start)
    g.gain.setValueAtTime(0, start)
    g.gain.linearRampToValueAtTime(0.11, start + 0.03)
    g.gain.exponentialRampToValueAtTime(0.001, start + 0.2)
    o.start(start)
    o.stop(start + 0.22)
  })
}
