import { useState, useRef } from 'react'
import { C } from '../styles/tokens.js'
import { useApp } from '../context/AppContext.jsx'

// ─── STATUS BAR ───────────────────────────────────────────────────────────────
export function StatusBar({ light }) {
  const col = light ? C.white : C.dark
  return (
    <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', flexShrink: 0 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: col }}>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {[8, 10, 12].map((h, i) => (
          <div key={i} style={{ width: 3, height: h, borderRadius: 2, background: col }} />
        ))}
        <svg width={16} height={11} viewBox="0 0 18 13" fill="none" style={{ marginLeft: 2 }}>
          <path d="M9 3.5C11.5 3.5 13.7 4.6 15.2 6.3L17 4.4C15 2.2 12.2 1 9 1 5.8 1 3 2.2 1 4.4L2.8 6.3C4.3 4.6 6.5 3.5 9 3.5Z" fill={col} />
          <path d="M9 7C10.3 7 11.4 7.5 12.2 8.4L14 6.5C12.8 5.3 11 4.5 9 4.5 7 4.5 5.2 5.3 4 6.5L5.8 8.4C6.6 7.5 7.7 7 9 7Z" fill={col} />
          <circle cx="9" cy="11.5" r="1.5" fill={col} />
        </svg>
        <svg width={26} height={12} viewBox="0 0 26 12" fill="none" style={{ marginLeft: 2 }}>
          <rect x={0} y={1} width={22} height={10} rx={3} stroke={col} strokeWidth={1.5} />
          <rect x={1.5} y={2.5} width={16} height={7} rx={2} fill={col} />
          <path d="M23.5 4.5V7.5a2 2 0 000-3z" fill={col} />
        </svg>
      </div>
    </div>
  )
}

// ─── PHONE FRAME ──────────────────────────────────────────────────────────────
export function PhoneFrame({ children, bg = C.bg, lightStatus = false }) {
  return (
    <div
      className="screen-enter"
      style={{
        width: 390, minHeight: 844,
        background: bg, borderRadius: 48,
        border: '3px solid #111',
        boxShadow: '0 40px 100px rgba(0,0,0,0.4), 0 8px 30px rgba(0,0,0,0.2)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}
    >
      <StatusBar light={lightStatus} />
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  )
}

// ─── PRODUCT IMAGE ────────────────────────────────────────────────────────────
// Handles loading state and fallback so images always show
export function ProductImage({ src, alt, style: sx = {}, className = '' }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError]   = useState(false)

  const fallbackColors = ['#EEF3FF', '#E6F9F1', '#FEF3C7', '#F4F5F8']
  const fallbackColor  = fallbackColors[Math.abs((alt || '').charCodeAt(0) % fallbackColors.length)]

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: fallbackColor, ...sx }}>
      {/* Shimmer while loading */}
      {!loaded && !error && (
        <div
          className="img-shimmer"
          style={{ position: 'absolute', inset: 0, borderRadius: 'inherit' }}
        />
      )}
      {/* Fallback emoji if error */}
      {error && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
          🛍️
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true) }}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          opacity: loaded && !error ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

// ─── VERIFIED BADGE ───────────────────────────────────────────────────────────
export function VerifiedBadge({ size = 13 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: C.greenLight, color: C.green, borderRadius: 20, padding: '2px 7px', fontSize: size - 2, fontWeight: 700, letterSpacing: 0.2, whiteSpace: 'nowrap' }}>
      <svg width={size} height={size} viewBox="0 0 16 16">
        <path d="M8 1L10.2 3.4L13.4 3L13.8 6.2L16 8L13.8 9.8L13.4 13L10.2 12.6L8 15L5.8 12.6L2.6 13L2.2 9.8L0 8L2.2 6.2L2.6 3L5.8 3.4L8 1Z" fill={C.green} />
        <path d="M5.5 8L7 9.5L11 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Verified
    </span>
  )
}

// ─── AVAILABILITY PILL ────────────────────────────────────────────────────────
export function AvailPill({ status, count }) {
  const map = {
    available: { bg: C.greenLight, c: C.green, l: 'Available' },
    low:       { bg: C.amberLight, c: C.amber, l: count ? `${count} left` : 'Low Stock' },
    out:       { bg: C.redLight,   c: C.red,   l: 'Out of Stock' },
  }
  const s = map[status] || map.available
  return (
    <span style={{ background: s.bg, color: s.c, borderRadius: 20, padding: '3px 9px', fontSize: 11, fontWeight: 700, letterSpacing: 0.3, display: 'inline-block', whiteSpace: 'nowrap' }}>
      {s.l}
    </span>
  )
}

// ─── BUTTON ───────────────────────────────────────────────────────────────────
export function Btn({ children, onClick, variant = 'primary', full = false, small = false, disabled = false, style: sx = {} }) {
  const variants = {
    primary:   { background: C.blue,  color: C.white,  border: 'none' },
    secondary: { background: C.white, color: C.blue,   border: `1.5px solid ${C.blue}` },
    ghost:     { background: 'transparent', color: C.grey700, border: `1.5px solid ${C.grey300}` },
    danger:    { background: C.red,   color: C.white,  border: 'none' },
    green:     { background: C.green, color: C.white,  border: 'none' },
    dark:      { background: C.dark,  color: C.white,  border: 'none' },
  }
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className="btn-press"
      style={{
        ...variants[variant],
        borderRadius: 14, padding: small ? '10px 18px' : '15px 24px',
        fontSize: small ? 13 : 15, fontWeight: 700,
        width: full ? '100%' : 'auto',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        letterSpacing: 0.3, transition: 'transform 0.1s, opacity 0.1s',
        ...sx,
      }}
    >
      {children}
    </button>
  )
}

// ─── BACK BUTTON ─────────────────────────────────────────────────────────────
export function BackBtn({ light = false }) {
  const { goBack } = useApp()
  return (
    <button onClick={goBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: light ? C.white : C.grey700, fontSize: 15, fontWeight: 600, padding: '4px 0' }}>
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 5l-7 7 7 7" />
      </svg>
      Back
    </button>
  )
}

// ─── SEARCH BAR ───────────────────────────────────────────────────────────────
export function SearchBar({ placeholder = 'Search for products…', value, onChange, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.white, borderRadius: 16, padding: '13px 18px', border: `1.5px solid ${C.grey300}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', cursor: onClick ? 'pointer' : 'text' }}
    >
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={C.grey500} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2={16.65} y2={16.65} />
      </svg>
      {onChange
        ? <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: C.dark, background: 'transparent' }} />
        : <span style={{ flex: 1, fontSize: 14, color: C.grey500 }}>{placeholder}</span>
      }
      {value && onChange && (
        <button onClick={e => { e.stopPropagation(); onChange('') }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.grey400, fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
      )}
    </div>
  )
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
export function ProductCard({ product: p, onClick }) {
  return (
    <div
      onClick={onClick}
      className="btn-press"
      style={{ background: C.white, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', cursor: 'pointer', border: `1px solid ${C.grey100}` }}
    >
      <div style={{ height: 140, position: 'relative' }}>
        <ProductImage src={p.img} alt={p.name} />
        <div style={{ position: 'absolute', top: 8, left: 8 }}>
          <AvailPill status={p.status} count={p.count} />
        </div>
      </div>
      <div style={{ padding: '12px 12px 14px' }}>
        <p style={{ margin: '0 0 2px', fontSize: 12, fontWeight: 700, color: C.dark, lineHeight: 1.3 }}>{p.name}</p>
        <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 800, color: C.blue }}>{p.price}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 10, color: C.grey500, fontWeight: 600, maxWidth: 72, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {p.vendor.split(' ')[0]}
            </span>
            <svg width={10} height={10} viewBox="0 0 16 16">
              <path d="M8 1L10.2 3.4L13.4 3L13.8 6.2L16 8L13.8 9.8L13.4 13L10.2 12.6L8 15L5.8 12.6L2.6 13L2.2 9.8L0 8L2.2 6.2L2.6 3L5.8 3.4L8 1Z" fill={C.green} />
              <path d="M5.5 8L7 9.5L11 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ fontSize: 10, color: C.grey500 }}>📍 {p.dist}</span>
        </div>
      </div>
    </div>
  )
}

// ─── INPUT FIELD ─────────────────────────────────────────────────────────────
export function InputField({ label, placeholder, type = 'text', value, onChange, helper }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{ fontSize: 12, fontWeight: 700, color: C.grey700, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value || ''}
        onChange={e => onChange && onChange(e.target.value)}
        style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: `1.5px solid ${C.grey300}`, fontSize: 14, outline: 'none', color: C.dark, boxSizing: 'border-box', background: C.white }}
      />
      {helper && <p style={{ margin: '4px 0 0', fontSize: 12, color: C.grey500 }}>{helper}</p>}
    </div>
  )
}

// ─── BOTTOM NAV (CUSTOMER) ────────────────────────────────────────────────────
export function BottomNav({ active }) {
  const { nav } = useApp()
  const tabs = [
    { id: 'home',    label: 'Home',    icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
    { id: 'search',  label: 'Search',  icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={11} cy={11} r={8} /><line x1={21} y1={21} x2={16.65} y2={16.65} /></svg> },
    { id: 'orders',  label: 'Orders',  icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1={3} y1={6} x2={21} y2={6} /><path d="M16 10a4 4 0 01-8 0" /></svg> },
    { id: 'wallet',  label: 'Wallet',  icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={2} y={5} width={20} height={14} rx={2} /><line x1={2} y1={10} x2={22} y2={10} /></svg> },
    { id: 'profile', label: 'Profile', icon: <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx={12} cy={7} r={4} /></svg> },
  ]
  return (
    <div style={{ display: 'flex', borderTop: `1px solid ${C.grey200}`, background: C.white, paddingBottom: 20, flexShrink: 0 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => nav(t.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer', color: active === t.id ? C.blue : C.grey500 }}>
          {t.icon}
          <span style={{ fontSize: 10, fontWeight: active === t.id ? 700 : 500 }}>{t.label}</span>
        </button>
      ))}
    </div>
  )
}

// ─── VENDOR BOTTOM NAV ────────────────────────────────────────────────────────
export function VendorBottomNav({ active }) {
  const { nav } = useApp()
  const tabs = [
    { id: 'vendor-dashboard', label: 'Home',       icon: '🏠' },
    { id: 'vendor-catalog',   label: 'Products',   icon: '📦' },
    { id: 'vendor-orders',    label: 'Orders',     icon: '🔔' },
    { id: 'vendor-rep',       label: 'Reputation', icon: '🏅' },
  ]
  return (
    <div style={{ display: 'flex', borderTop: `1px solid ${C.grey200}`, background: C.white, paddingBottom: 20, flexShrink: 0 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => nav(t.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer', color: active === t.id ? C.blue : C.grey500 }}>
          <span style={{ fontSize: 20 }}>{t.icon}</span>
          <span style={{ fontSize: 10, fontWeight: active === t.id ? 700 : 500 }}>{t.label}</span>
        </button>
      ))}
    </div>
  )
}

// ─── STARS ────────────────────────────────────────────────────────────────────
export function Stars({ rating, size = 14 }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= Math.round(rating) ? C.gold : C.grey200 }}>★</span>
      ))}
    </span>
  )
}

// ─── GOOGLE SIGN-IN ───────────────────────────────────────────────────────────
export function GoogleBtn({ onClick, label }) {
  return (
    <button onClick={onClick} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '15px 20px', borderRadius: 14, border: `1.5px solid ${C.grey300}`, background: C.white, cursor: 'pointer', fontWeight: 700, fontSize: 15, color: C.dark, boxSizing: 'border-box' }}>
      <svg width={20} height={20} viewBox="0 0 48 48">
        <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.1 33.1 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8 3l6-6C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-7.9 19.7-20 0-1.3-.1-2.7-.2-4z" />
        <path fill="#34A853" d="M6.3 14.7l7 5.1C15 17 19.2 14 24 14c3.1 0 5.9 1.1 8 3l6-6C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" />
        <path fill="#FBBC04" d="M24 44c5.5 0 10.5-1.9 14.3-5l-6.6-5.4C29.7 35.3 27 36 24 36c-5.6 0-10.3-3.8-11.9-9l-7 5.4C8.8 39.2 15.9 44 24 44z" />
        <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-.9 2.4-2.5 4.4-4.7 5.8l6.6 5.4C41.8 36.3 44.5 30.6 44.5 24c0-1.3-.1-2.7-.2-4z" />
      </svg>
      {label}
    </button>
  )
}

// ─── OTP INPUT ────────────────────────────────────────────────────────────────
export function OTPInput({ onComplete }) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const refs = useRef([])
  const handle = (val, i) => {
    const n = [...otp]; n[i] = val.slice(-1); setOtp(n)
    if (val && i < 5) refs.current[i + 1]?.focus()
    if (n.every(v => v) && onComplete) onComplete(n.join(''))
  }
  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
      {otp.map((v, i) => (
        <input key={i} ref={el => refs.current[i] = el} value={v}
          onChange={e => handle(e.target.value, i)} maxLength={1} type="tel"
          style={{ width: 48, height: 56, textAlign: 'center', fontSize: 22, fontWeight: 700, borderRadius: 12, border: `2px solid ${v ? C.blue : C.grey300}`, outline: 'none', color: C.dark, background: C.white }} />
      ))}
    </div>
  )
}

// ─── PIN INPUT ────────────────────────────────────────────────────────────────
export function PINInput({ onComplete }) {
  const [pin, setPin] = useState(['', '', '', ''])
  const refs = useRef([])
  const handle = (val, i) => {
    const n = [...pin]; n[i] = val.slice(-1); setPin(n)
    if (val && i < 3) refs.current[i + 1]?.focus()
    if (n.every(v => v) && onComplete) onComplete(n.join(''))
  }
  return (
    <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
      {pin.map((v, i) => (
        <input key={i} ref={el => refs.current[i] = el} value={v}
          onChange={e => handle(e.target.value, i)} maxLength={1} type="password"
          style={{ width: 56, height: 64, textAlign: 'center', fontSize: 28, fontWeight: 800, borderRadius: 14, border: `2px solid ${v ? C.blue : C.grey300}`, outline: 'none', color: C.dark, background: C.white }} />
      ))}
    </div>
  )
}

// ─── DIVIDER ─────────────────────────────────────────────────────────────────
export function Divider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0' }}>
      <div style={{ flex: 1, height: 1, background: C.grey300 }} />
      <span style={{ fontSize: 13, color: C.grey500, fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: C.grey300 }} />
    </div>
  )
}

// ─── UPLOAD BOX ──────────────────────────────────────────────────────────────
export function UploadBox({ label, sub, uploaded, onUpload, height = 120 }) {
  return (
    <div onClick={onUpload} style={{ height, background: uploaded ? C.greenLight : C.grey100, borderRadius: 16, border: `2px dashed ${uploaded ? C.green : C.grey300}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', marginBottom: 16 }}>
      {uploaded
        ? <><svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg><p style={{ margin: 0, fontSize: 13, color: C.green, fontWeight: 700 }}>Uploaded ✓</p></>
        : <><span style={{ fontSize: 32 }}>📎</span><p style={{ margin: 0, fontSize: 13, color: C.grey500, fontWeight: 600 }}>{label}</p>{sub && <p style={{ margin: 0, fontSize: 11, color: C.grey400 }}>{sub}</p>}</>
      }
    </div>
  )
}
