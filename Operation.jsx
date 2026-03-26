import { useState } from 'react'
import { C } from '../../styles/tokens.js'
import { useApp } from '../../context/AppContext.jsx'
import { VENDORS, VENDOR_REVIEWS, REP_LEVELS } from '../../data/vendors.js'
import { PhoneFrame, ProductImage, VerifiedBadge, AvailPill, Btn, BackBtn, VendorBottomNav, Stars, InputField, UploadBox } from '../../components/ui.jsx'

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
export function VendorDashboardScreen() {
  const { nav, vendorOrders } = useApp()
  const pendingCount = vendorOrders.filter(o => o.status === 'pending').length

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 22px', background: C.white, borderBottom: `1px solid ${C.grey100}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: 0, fontSize: 12, color: C.grey500 }}>Vendor Dashboard</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.dark }}>TechZone Ikeja</h2>
                <VerifiedBadge />
              </div>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.white, fontWeight: 800, fontSize: 18 }}>T</div>
          </div>
        </div>

        <div style={{ padding: '16px 20px', flex: 1, overflowY: 'auto' }}>
          {/* Reputation mini card */}
          <div onClick={() => nav('vendor-rep')} style={{ background: 'linear-gradient(135deg, #0D1F5C, #1A3A9E)', borderRadius: 20, padding: '18px 20px', marginBottom: 20, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Reputation Score</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '4px 0' }}>
                  <span style={{ fontSize: 28, fontWeight: 800, color: C.white }}>2,840</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>pts</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14 }}>🏅</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: C.gold }}>Gold Seller</span>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: 24, fontWeight: 800, color: C.white }}>4.8 ⭐</p>
                <p style={{ margin: '2px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>142 reviews</p>
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 10 }}>
                <div style={{ width: '57%', height: '100%', background: `linear-gradient(90deg, ${C.gold}, #FFD700)`, borderRadius: 10 }} />
              </div>
              <p style={{ margin: '4px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>2,160 pts to Platinum → Tap to view</p>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
            {[
              { l: 'Products', v: 12,          i: '📦', c: C.blueLight,  t: C.blue,  a: 'vendor-catalog', badge: false },
              { l: 'Pending',  v: pendingCount, i: '🔔', c: C.amberLight, t: C.amber, a: 'vendor-orders',  badge: pendingCount > 0 },
              { l: 'Messages', v: 7,            i: '💬', c: C.greenLight, t: C.green, a: null,             badge: false },
            ].map(s => (
              <div key={s.l} onClick={() => s.a && nav(s.a)} style={{ background: s.c, borderRadius: 16, padding: '16px 12px', textAlign: 'center', cursor: s.a ? 'pointer' : 'default', position: 'relative' }}>
                {s.badge && (
                  <div style={{ position: 'absolute', top: 8, right: 8, width: 18, height: 18, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: C.white }}>!</span>
                  </div>
                )}
                <div style={{ fontSize: 24, marginBottom: 4 }}>{s.i}</div>
                <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: s.t }}>{s.v}</p>
                <p style={{ margin: '2px 0 0', fontSize: 10, color: C.grey500, fontWeight: 600 }}>{s.l}</p>
              </div>
            ))}
          </div>

          {/* Recent orders */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: C.dark }}>Recent Orders</p>
            <span onClick={() => nav('vendor-orders')} style={{ fontSize: 13, color: C.blue, fontWeight: 700, cursor: 'pointer' }}>See all →</span>
          </div>
          {vendorOrders.slice(0, 2).map(o => (
            <div key={o.id} style={{ background: C.white, borderRadius: 16, padding: '14px 16px', marginBottom: 10, border: `1px solid ${C.grey100}`, boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                  <ProductImage src={o.img} alt={o.product} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: C.dark }}>{o.product}</p>
                    <span style={{ background: o.status === 'pending' ? C.amberLight : C.greenLight, color: o.status === 'pending' ? C.amber : C.green, borderRadius: 10, padding: '3px 10px', fontSize: 10, fontWeight: 700 }}>
                      {o.status === 'pending' ? 'Pending' : 'Accepted'}
                    </span>
                  </div>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: C.grey500 }}>{o.customer} · {o.type} · {o.time}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, fontWeight: 700, color: C.blue }}>{o.amount}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Add product quick link */}
          <div onClick={() => nav('vendor-add-product')} style={{ background: C.blueLight, borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', marginTop: 8 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>➕</div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: C.blueDark }}>Add New Product</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: C.grey700 }}>List a new item in your store</p>
            </div>
            <svg style={{ marginLeft: 'auto' }} width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </div>
        </div>

        <VendorBottomNav active="vendor-dashboard" />
      </div>
    </PhoneFrame>
  )
}

// ─── CATALOG ──────────────────────────────────────────────────────────────────
export function VendorCatalogScreen() {
  const { nav, vendorProducts, updateVendorProductStatus } = useApp()

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 22px 14px', background: C.white, borderBottom: `1px solid ${C.grey100}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.dark }}>My Products</h2>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: C.grey500 }}>{vendorProducts.length} products listed</p>
          </div>
          <Btn small onClick={() => nav('vendor-add-product')}>+ Add</Btn>
        </div>

        <div style={{ padding: '12px 20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, flex: 1, overflowY: 'auto' }}>
          {vendorProducts.map(p => (
            <div key={p.id} style={{ background: C.white, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: `1px solid ${C.grey100}` }}>
              <div style={{ height: 120, position: 'relative' }}>
                <ProductImage src={p.img} alt={p.name} />
                <div style={{ position: 'absolute', top: 8, left: 8 }}>
                  <AvailPill status={p.status} count={p.count} />
                </div>
              </div>
              <div style={{ padding: '10px 12px 12px' }}>
                <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 700, color: C.dark, lineHeight: 1.3 }}>{p.name}</p>
                <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 800, color: C.blue }}>{p.price}</p>
                <select
                  value={p.status}
                  onChange={e => updateVendorProductStatus(p.id, e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: 10, background: C.grey100, border: `1px solid ${C.grey300}`, fontSize: 11, fontWeight: 700, color: C.grey700, cursor: 'pointer', outline: 'none' }}
                >
                  <option value="available">✅ Available</option>
                  <option value="low">⚠️ Low Stock</option>
                  <option value="out">❌ Out of Stock</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <VendorBottomNav active="vendor-catalog" />
      </div>
    </PhoneFrame>
  )
}

// ─── ADD PRODUCT ──────────────────────────────────────────────────────────────
export function AddProductScreen() {
  const { nav } = useApp()
  const [avail,    setAvail]    = useState('available')
  const [uploaded, setUploaded] = useState(false)
  const [name,     setName]     = useState('')
  const [price,    setPrice]    = useState('')
  const [stock,    setStock]    = useState('')

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '16px 24px 0' }}>
          <BackBtn />
          <h2 style={{ fontSize: 22, fontWeight: 800, color: C.dark, margin: '16px 0 20px' }}>Add New Product</h2>

          <UploadBox label="Tap to upload product photo" sub="JPG, PNG up to 10MB" uploaded={uploaded} onUpload={() => setUploaded(true)} height={140} />

          <InputField label="Product Name" placeholder="e.g. Nike Air Force 1 (Size 43)"  value={name}  onChange={setName} />
          <InputField label="Price (₦)"    placeholder="e.g. 35000" type="number"          value={price} onChange={setPrice} />
          <InputField label="Category"     placeholder="e.g. Footwear" />

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.grey700, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>Description</label>
            <textarea placeholder="Describe condition, size options, warranty, what's included…"
              style={{ width: '100%', height: 80, padding: '12px 16px', borderRadius: 12, border: `1.5px solid ${C.grey300}`, fontSize: 13, outline: 'none', resize: 'none', boxSizing: 'border-box', color: C.dark, background: C.white }} />
          </div>

          <label style={{ fontSize: 12, fontWeight: 700, color: C.grey700, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 10 }}>Availability Status</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {[{ id: 'available', l: 'Available', c: C.green }, { id: 'low', l: 'Low Stock', c: C.amber }, { id: 'out', l: 'Out of Stock', c: C.red }].map(o => (
              <button key={o.id} onClick={() => setAvail(o.id)} style={{ flex: 1, padding: '12px 0', borderRadius: 12, background: avail === o.id ? o.c : C.grey100, color: avail === o.id ? C.white : C.grey700, border: `2px solid ${avail === o.id ? o.c : C.grey300}`, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>{o.l}</button>
            ))}
          </div>

          {avail !== 'out' && (
            <div style={{ marginBottom: 20 }}>
              <InputField
                label="Stock Count" placeholder="e.g. 5" type="number"
                value={stock} onChange={setStock}
                helper="Stock ≤ 3 automatically shows 'Low Stock' badge to customers"
              />
            </div>
          )}

          <Btn full onClick={() => nav('vendor-catalog')} disabled={!name || !price}>Publish Product ✓</Btn>
          <div style={{ height: 24 }} />
        </div>
      </div>
    </PhoneFrame>
  )
}

// ─── ORDERS ───────────────────────────────────────────────────────────────────
export function VendorOrdersScreen() {
  const { vendorOrders, updateVendorOrder } = useApp()

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 22px 14px', background: C.white, borderBottom: `1px solid ${C.grey100}` }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.dark }}>Order Requests</h2>
          <p style={{ margin: '2px 0 0', fontSize: 13, color: C.grey500 }}>
            {vendorOrders.filter(o => o.status === 'pending').length} pending ·{' '}
            {vendorOrders.filter(o => o.status === 'accepted').length} accepted
          </p>
        </div>

        <div style={{ padding: '12px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>
          {vendorOrders.map(o => (
            <div key={o.id} style={{ background: C.white, borderRadius: 18, padding: '16px 18px', border: `1.5px solid ${o.status === 'pending' ? C.amber : o.status === 'accepted' ? C.green : C.red}`, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                  <ProductImage src={o.img} alt={o.product} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: C.dark }}>{o.product}</p>
                    {o.status === 'pending'  && <span style={{ background: C.amberLight, color: C.amber, padding: '4px 10px', borderRadius: 10, fontSize: 10, fontWeight: 800 }}>🔴 NEW</span>}
                    {o.status === 'accepted' && <span style={{ background: C.greenLight, color: C.green, padding: '4px 10px', borderRadius: 10, fontSize: 10, fontWeight: 800 }}>✅ Accepted</span>}
                    {o.status === 'rejected' && <span style={{ background: C.redLight,   color: C.red,   padding: '4px 10px', borderRadius: 10, fontSize: 10, fontWeight: 800 }}>✗ Rejected</span>}
                  </div>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: C.grey500 }}>👤 {o.customer} · {o.time}</p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <span style={{ background: C.blueLight, color: C.blue, padding: '3px 10px', borderRadius: 10, fontSize: 11, fontWeight: 700 }}>
                      {o.type === 'Delivery' ? '🚚 Delivery' : '🏬 Pickup'}
                    </span>
                    <span style={{ background: C.greenLight, color: C.green, padding: '3px 10px', borderRadius: 10, fontSize: 11, fontWeight: 700 }}>{o.amount}</span>
                  </div>
                </div>
              </div>

              {o.status === 'pending' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <Btn small variant="green" style={{ flex: 1 }} onClick={() => updateVendorOrder(o.id, 'accepted')}>✓ Accept</Btn>
                  <Btn small variant="danger" style={{ flex: 1 }} onClick={() => updateVendorOrder(o.id, 'rejected')}>✗ Reject</Btn>
                  <Btn small variant="ghost" onClick={() => {}} style={{ paddingLeft: 14, paddingRight: 14 }}>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                  </Btn>
                </div>
              )}
              {o.status === 'accepted' && (
                <Btn small full variant="secondary" style={{ fontSize: 12 }} onClick={() => {}}>
                  💬 Message {o.customer.split(' ')[0]}
                </Btn>
              )}
              <p style={{ margin: '10px 0 0', fontSize: 11, color: C.grey400 }}>#{o.id}</p>
            </div>
          ))}
        </div>

        <VendorBottomNav active="vendor-orders" />
      </div>
    </PhoneFrame>
  )
}

// ─── REPUTATION ───────────────────────────────────────────────────────────────
export function VendorRepScreen() {
  const vendor = VENDORS['v2']
  const points = vendor.points
  const currentLevel = REP_LEVELS.find(l => points >= l.min && points < l.max) || REP_LEVELS[REP_LEVELS.length - 1]
  const nextLevel    = REP_LEVELS[REP_LEVELS.indexOf(currentLevel) + 1]
  const pct          = nextLevel ? Math.round(((points - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100) : 100

  const breakdown = [
    { l: 'Order Fulfillment', v: vendor.fulfillment, c: C.green },
    { l: 'Response Rate',     v: vendor.response,    c: C.blue  },
    { l: 'Product Accuracy',  v: vendor.accuracy,    c: C.amber },
    { l: 'Customer Ratings',  v: 96,                 c: C.green },
  ]

  const howToEarn = [
    { a: 'Complete an order',             p: '+50 pts' },
    { a: 'Receive a 5-star review',       p: '+30 pts' },
    { a: 'Respond within 5 minutes',      p: '+10 pts' },
    { a: '7-day active streak',           p: '+100 pts' },
    { a: 'Zero cancellations (monthly)',  p: '+80 pts' },
    { a: 'Verify ID documents',           p: '+200 pts' },
  ]

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #0D1F5C, #1A3A9E)', padding: '20px 22px 28px' }}>
          <BackBtn light />
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Reputation Score</p>
            <h1 style={{ margin: '8px 0 0', fontSize: 52, fontWeight: 800, color: C.white, letterSpacing: -1 }}>{vendor.rating}</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, margin: '6px 0' }}>
              <Stars rating={vendor.rating} size={22} />
            </div>
            <p style={{ margin: 0, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>Based on {vendor.reviews} reviews</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', borderRadius: 20, padding: '6px 16px', marginTop: 10 }}>
              <span style={{ fontSize: 18 }}>{currentLevel.icon}</span>
              <span style={{ fontWeight: 800, fontSize: 14, color: currentLevel.color }}>{currentLevel.name} Seller</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>· {points.toLocaleString()} pts</span>
            </div>
          </div>
          {nextLevel && (
            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Progress to {nextLevel.name}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>{pct}% · {(nextLevel.min - points).toLocaleString()} pts to go</span>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${currentLevel.color}, #FFD700)`, borderRadius: 10 }} />
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '20px 22px' }}>
          {/* Score breakdown */}
          <p style={{ margin: '0 0 14px', fontWeight: 800, fontSize: 15, color: C.dark }}>Score Breakdown</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            {breakdown.map(s => (
              <div key={s.l} style={{ background: C.white, borderRadius: 14, padding: '14px 16px', border: `1px solid ${C.grey100}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: C.grey500, fontWeight: 600 }}>{s.l}</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: s.c }}>{s.v}%</span>
                </div>
                <div style={{ height: 5, background: C.grey100, borderRadius: 10 }}>
                  <div style={{ width: `${s.v}%`, height: '100%', background: s.c, borderRadius: 10 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Seller levels */}
          <p style={{ margin: '0 0 14px', fontWeight: 800, fontSize: 15, color: C.dark }}>Seller Levels</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {REP_LEVELS.map(l => {
              const active = l.name === currentLevel.name
              return (
                <div key={l.name} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', borderRadius: 16, background: active ? `${l.color}18` : C.white, border: `1.5px solid ${active ? l.color : C.grey200}` }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{l.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: active ? l.color : C.dark }}>{l.name}</p>
                      {active && <span style={{ background: l.color, color: C.white, fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 10 }}>Current</span>}
                      <span style={{ fontSize: 11, color: C.grey500, marginLeft: 'auto' }}>{l.min.toLocaleString()}–{l.max.toLocaleString()} pts</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {l.perks.map(pk => <span key={pk} style={{ fontSize: 10, color: C.grey600, background: C.grey100, padding: '2px 8px', borderRadius: 8, fontWeight: 600 }}>✓ {pk}</span>)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* How to earn */}
          <p style={{ margin: '0 0 14px', fontWeight: 800, fontSize: 15, color: C.dark }}>How to Earn Points</p>
          <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.grey100}`, overflow: 'hidden', marginBottom: 24 }}>
            {howToEarn.map((x, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: i < howToEarn.length - 1 ? `1px solid ${C.grey100}` : 'none' }}>
                <span style={{ fontSize: 13, color: C.grey700 }}>{x.a}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: C.green }}>{x.p}</span>
              </div>
            ))}
          </div>

          {/* Recent reviews */}
          <p style={{ margin: '0 0 14px', fontWeight: 800, fontSize: 15, color: C.dark }}>Recent Reviews</p>
          {VENDOR_REVIEWS.map((r, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 16, padding: '16px 18px', marginBottom: 12, border: `1px solid ${C.grey100}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: C.dark }}>{r.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 11, color: C.grey500 }}>{r.product} · {r.date}</p>
                </div>
                <Stars rating={r.rating} size={14} />
              </div>
              <p style={{ margin: 0, fontSize: 13, color: C.grey700, lineHeight: 1.6 }}>{r.text}</p>
            </div>
          ))}
        </div>

        <VendorBottomNav active="vendor-rep" />
      </div>
    </PhoneFrame>
  )
}
