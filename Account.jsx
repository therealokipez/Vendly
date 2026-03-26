import { useState } from 'react'
import { C } from '../../styles/tokens.js'
import { useApp } from '../../context/AppContext.jsx'
import { WALLET_TRANSACTIONS } from '../../data/orders.js'
import { PhoneFrame, ProductImage, Btn, BackBtn, BottomNav } from '../../components/ui.jsx'

// ─── WALLET ───────────────────────────────────────────────────────────────────
export function WalletScreen() {
  const { nav, walletBalance, topUpWallet } = useApp()
  const [showAdd, setShowAdd] = useState(false)
  const [addAmt,  setAddAmt]  = useState('')
  const fmt = n => '₦' + n.toLocaleString()

  const handleTopUp = () => {
    const amt = parseInt(addAmt, 10)
    if (amt > 0) { topUpWallet(amt); setAddAmt(''); setShowAdd(false) }
  }

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Wallet hero */}
        <div style={{ background: 'linear-gradient(135deg, #0D2E8A 0%, #1A5CFF 60%, #2979FF 100%)', padding: '24px 24px 32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', right: 40, bottom: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Vendly Wallet</p>
          <h1 style={{ margin: '8px 0 4px', fontSize: 36, fontWeight: 800, color: C.white, letterSpacing: -1 }}>{fmt(walletBalance)}</h1>
          <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Available balance</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            {[{ l: 'Add Money', i: '+' }, { l: 'Send', i: '↗' }, { l: 'Withdraw', i: '↙' }].map(a => (
              <div key={a.l} onClick={() => a.l === 'Add Money' && setShowAdd(true)} style={{ flex: 1, background: 'rgba(255,255,255,0.14)', borderRadius: 12, padding: '12px 0', textAlign: 'center', cursor: 'pointer' }}>
                <p style={{ margin: 0, fontSize: 20, color: C.white, fontWeight: 700 }}>{a.i}</p>
                <p style={{ margin: '4px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{a.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Add money panel */}
        {showAdd && (
          <div style={{ padding: '16px 22px', background: C.blueLight, borderBottom: `1px solid ${C.grey200}` }}>
            <p style={{ margin: '0 0 10px', fontWeight: 800, fontSize: 14, color: C.blue }}>Add Money to Wallet</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={addAmt} onChange={e => setAddAmt(e.target.value)} placeholder="Enter amount (₦)" type="number" min="100"
                style={{ flex: 1, padding: '12px 14px', borderRadius: 12, border: `1.5px solid ${C.grey300}`, fontSize: 14, outline: 'none', background: C.white }} />
              <button onClick={handleTopUp} style={{ padding: '12px 20px', borderRadius: 12, background: C.blue, color: C.white, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Add</button>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              {[5000, 10000, 20000, 50000].map(a => (
                <button key={a} onClick={() => setAddAmt(String(a))} style={{ flex: 1, padding: '8px 0', borderRadius: 10, background: C.white, border: `1.5px solid ${C.grey300}`, fontSize: 11, fontWeight: 700, color: C.grey700, cursor: 'pointer' }}>₦{(a / 1000).toFixed(0)}k</button>
              ))}
            </div>
          </div>
        )}

        {/* Saved cards */}
        <div style={{ padding: '20px 22px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: C.dark }}>Saved Cards</p>
            <span style={{ fontSize: 13, color: C.blue, fontWeight: 700, cursor: 'pointer' }}>+ Add Card</span>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #1A1D24, #2D3142)', borderRadius: 16, padding: '16px 18px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, textTransform: 'uppercase' }}>Debit Card</p>
                <p style={{ margin: '6px 0 0', fontSize: 16, letterSpacing: 3, color: C.white, fontWeight: 600 }}>•••• •••• •••• 4821</p>
              </div>
              <svg width={42} height={28} viewBox="0 0 42 28">
                <circle cx={15} cy={14} r={14} fill="#EB001B" opacity={0.9} />
                <circle cx={27} cy={14} r={14} fill="#F79E1B" opacity={0.9} />
              </svg>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Okikijesu Ezekiel</p>
              <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>08/27</p>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div style={{ padding: '16px 22px 0', flex: 1, overflowY: 'auto' }}>
          <p style={{ margin: '0 0 14px', fontWeight: 800, fontSize: 15, color: C.dark }}>Recent Transactions</p>
          {WALLET_TRANSACTIONS.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 14, marginBottom: 14, borderBottom: i < WALLET_TRANSACTIONS.length - 1 ? `1px solid ${C.grey100}` : 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: t.type === 'credit' ? C.greenLight : C.redLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                {t.type === 'credit' ? '↓' : '↑'}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: C.dark }}>{t.desc}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: C.grey500 }}>{t.date}</p>
              </div>
              <span style={{ fontSize: 15, fontWeight: 800, color: t.type === 'credit' ? C.green : C.red }}>{t.amount}</span>
            </div>
          ))}
        </div>

        <BottomNav active="wallet" />
      </div>
    </PhoneFrame>
  )
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
export function ProfileScreen() {
  const { nav } = useApp()
  const settings = [
    { icon: '📦', label: 'Order History',      action: () => nav('orders') },
    { icon: '📍', label: 'Saved Addresses',    action: () => nav('profile') },
    { icon: '💳', label: 'Payment Methods',    action: () => nav('wallet') },
    { icon: '🔔', label: 'Notifications',      action: null },
    { icon: '🔒', label: 'Privacy & Security', action: null },
    { icon: '🤝', label: 'Refer a Friend',     action: null },
    { icon: '❓', label: 'Help & Support',     action: null },
  ]
  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {/* Hero */}
        <div style={{ background: `linear-gradient(135deg, ${C.dark} 0%, ${C.grey900} 100%)`, padding: '24px 22px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 68, height: 68, borderRadius: '50%', background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 800, color: C.white, border: '3px solid rgba(255,255,255,0.2)', flexShrink: 0 }}>O</div>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.white }}>Okikijesu Ezekiel</h2>
              <p style={{ margin: '3px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>+234 812 345 6789</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>okipez@gmail.com</p>
            </div>
            <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 10, padding: '8px 14px', color: C.white, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Edit</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 20 }}>
            {[{ l: 'Orders', v: '12' }, { l: 'Reviews', v: '8' }, { l: 'Saved', v: '24' }].map(s => (
              <div key={s.l} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 0', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: C.white }}>{s.v}</p>
                <p style={{ margin: '2px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Home address */}
        <div style={{ padding: '18px 22px 0' }}>
          <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 800, color: C.grey500, textTransform: 'uppercase', letterSpacing: 0.5 }}>Home Address</p>
          <div style={{ background: C.grey100, borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>🏠</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: C.dark }}>24 Bode Thomas Street</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: C.grey500 }}>Surulere, Lagos Island, Lagos</p>
            </div>
            <span style={{ fontSize: 12, color: C.blue, fontWeight: 700, cursor: 'pointer' }}>Edit</span>
          </div>
        </div>

        {/* Settings list */}
        <div style={{ padding: '18px 22px 8px' }}>
          <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 800, color: C.grey500, textTransform: 'uppercase', letterSpacing: 0.5 }}>Account</p>
          <div style={{ background: C.white, borderRadius: 16, overflow: 'hidden', border: `1px solid ${C.grey100}` }}>
            {settings.map((s, i) => (
              <div key={s.label} onClick={s.action || undefined} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderBottom: i < settings.length - 1 ? `1px solid ${C.grey100}` : 'none', cursor: s.action ? 'pointer' : 'default' }}>
                <span style={{ fontSize: 20, width: 28, textAlign: 'center' }}>{s.icon}</span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: C.dark }}>{s.label}</span>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={C.grey400} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '8px 22px 0' }}>
          <button onClick={() => nav('splash')} style={{ width: '100%', padding: '14px', borderRadius: 14, border: `1.5px solid ${C.redLight}`, background: C.redLight, color: C.red, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            Log Out
          </button>
        </div>
        <BottomNav active="profile" />
      </div>
    </PhoneFrame>
  )
}

// ─── ORDER HISTORY ────────────────────────────────────────────────────────────
export function OrderHistoryScreen() {
  const { orderHistory } = useApp()
  const [filter, setFilter] = useState('all')

  const statusMap = {
    delivered:  { label: 'Delivered',  color: C.green, bg: C.greenLight },
    in_transit: { label: 'In Transit', color: C.blue,  bg: C.blueLight },
    cancelled:  { label: 'Cancelled',  color: C.red,   bg: C.redLight },
    pending:    { label: 'Pending',    color: C.amber, bg: C.amberLight },
  }
  const filters = [{ id: 'all', l: 'All' }, { id: 'delivered', l: 'Delivered' }, { id: 'in_transit', l: 'In Transit' }, { id: 'cancelled', l: 'Cancelled' }, { id: 'pending', l: 'Pending' }]
  const shown = filter === 'all' ? orderHistory : orderHistory.filter(o => o.status === filter)

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 22px 14px', background: C.white }}>
          <BackBtn />
          <h2 style={{ margin: '16px 0 0', fontSize: 22, fontWeight: 800, color: C.dark }}>Order History</h2>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, overflowX: 'auto', paddingBottom: 4 }}>
            {filters.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: '8px 16px', borderRadius: 20, background: filter === f.id ? C.dark : C.grey100, color: filter === f.id ? C.white : C.grey700, border: 'none', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer' }}>{f.l}</button>
            ))}
          </div>
        </div>

        {shown.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 40, textAlign: 'center' }}>
            <span style={{ fontSize: 52 }}>📦</span>
            <p style={{ margin: 0, fontSize: 15, color: C.grey500 }}>No orders in this category</p>
          </div>
        ) : (
          <div style={{ padding: '12px 20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>
            {shown.map(o => {
              const s = statusMap[o.status] || statusMap.pending
              return (
                <div key={o.id} style={{ background: C.white, borderRadius: 18, padding: '16px 18px', border: `1px solid ${C.grey100}`, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 60, height: 60, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                      <ProductImage src={o.img} alt={o.product} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <p style={{ margin: 0, fontWeight: 800, fontSize: 13, color: C.dark, flex: 1, paddingRight: 8 }}>{o.product}</p>
                        <span style={{ background: s.bg, color: s.color, fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>{s.label}</span>
                      </div>
                      <p style={{ margin: '3px 0 0', fontSize: 12, color: C.grey500 }}>{o.vendor}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: C.blue }}>{o.price}</span>
                        <span style={{ fontSize: 11, color: C.grey500 }}>{o.date}</span>
                      </div>
                    </div>
                  </div>

                  {o.status === 'delivered' && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.grey100}` }}>
                      <Btn small variant="secondary" style={{ flex: 1, fontSize: 12 }} onClick={() => {}}>Reorder</Btn>
                      <Btn small variant="ghost" style={{ flex: 1, fontSize: 12 }} onClick={() => {}}>Leave Review</Btn>
                    </div>
                  )}
                  {o.status === 'in_transit' && (
                    <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.grey100}` }}>
                      <Btn small full variant="secondary" style={{ fontSize: 12 }} onClick={() => {}}>Track Order 📍</Btn>
                    </div>
                  )}
                  <p style={{ margin: '8px 0 0', fontSize: 11, color: C.grey400 }}>Order #{o.id}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </PhoneFrame>
  )
}
