import { useState } from 'react'
import { C } from '../../styles/tokens.js'
import { useApp } from '../../context/AppContext.jsx'
import { PhoneFrame, ProductImage, AvailPill, Btn, BackBtn, PINInput, InputField } from '../../components/ui.jsx'

// ─── REQUEST ORDER ────────────────────────────────────────────────────────────
export function RequestOrderScreen() {
  const { nav, selectedProduct: p } = useApp()
  const [method, setMethod] = useState('pickup')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '16px 22px 0' }}>
          <BackBtn />
          <h2 style={{ fontSize: 22, fontWeight: 800, color: C.dark, margin: '20px 0 20px' }}>Request Order</h2>
        </div>

        <div style={{ padding: '0 22px' }}>
          {/* Product summary */}
          <div style={{ background: C.blueLight, borderRadius: 18, padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'center', marginBottom: 24 }}>
            <div style={{ width: 60, height: 60, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
              <ProductImage src={p.img} alt={p.name} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: C.dark }}>{p.name}</p>
              <p style={{ margin: '2px 0 6px', fontSize: 16, fontWeight: 800, color: C.blue }}>{p.price}</p>
              <AvailPill status={p.status} count={p.count} />
            </div>
          </div>

          {/* Fulfilment toggle */}
          <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 800, color: C.dark, textTransform: 'uppercase', letterSpacing: 0.5 }}>Fulfilment Method</p>
          <div style={{ display: 'flex', background: C.grey100, borderRadius: 14, padding: 4, marginBottom: 20 }}>
            {['pickup', 'delivery'].map(m => (
              <button key={m} onClick={() => setMethod(m)} style={{ flex: 1, padding: '12px 0', borderRadius: 12, background: method === m ? C.white : 'transparent', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, color: method === m ? C.blue : C.grey500, boxShadow: method === m ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', transition: 'all 0.2s' }}>
                {m === 'pickup' ? '🏬 Pickup' : '🚚 Delivery'}
              </button>
            ))}
          </div>

          {method === 'pickup' && (
            <div style={{ background: C.grey100, borderRadius: 16, padding: '16px 18px', marginBottom: 20 }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: C.dark }}>Pickup from Vendor</p>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: C.grey500 }}>📍 {p.vendor} · {p.dist} away</p>
              <p style={{ margin: '6px 0 0', fontSize: 12, color: C.green, fontWeight: 600 }}>✓ No delivery fee · Confirm time with vendor</p>
            </div>
          )}

          {method === 'delivery' && (
            <div style={{ marginBottom: 20 }}>
              <InputField label="Delivery Address" placeholder="Enter your full address…" value={address} onChange={setAddress} />
              <div style={{ background: C.amberLight, borderRadius: 12, padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: C.grey700 }}>Estimated delivery fee</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: C.amber }}>₦1,500</span>
              </div>
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.grey700, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 8 }}>
              Note to vendor <span style={{ color: C.grey400, fontWeight: 400, textTransform: 'none' }}>(optional)</span>
            </label>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Size 43 please, or special instructions…"
              style={{ width: '100%', height: 80, padding: '12px 16px', borderRadius: 12, border: `1.5px solid ${C.grey300}`, fontSize: 13, outline: 'none', resize: 'none', boxSizing: 'border-box', color: C.dark, background: C.white }} />
          </div>

          <Btn full onClick={() => nav('payment')}>Continue to Payment 💳</Btn>
          <div style={{ height: 24 }} />
        </div>
      </div>
    </PhoneFrame>
  )
}

// ─── PAYMENT ─────────────────────────────────────────────────────────────────
export function PaymentScreen() {
  const { nav, selectedProduct: p, walletBalance, deductWallet, addOrderToHistory } = useApp()
  const [method,     setMethod]     = useState('wallet')
  const [step,       setStep]       = useState('select') // select | pin | transfer
  const [processing, setProcessing] = useState(false)

  const deliveryFee = 1500
  const total       = p.priceNum + deliveryFee
  const fmt         = n => '₦' + n.toLocaleString()

  const processPayment = () => {
    setProcessing(true)
    setTimeout(() => {
      if (method === 'wallet') deductWallet(total)
      addOrderToHistory({
        id:      `VDL-${Math.floor(Math.random() * 9000 + 1000)}`,
        product: p.name,
        vendor:  p.vendor,
        price:   fmt(total),
        date:    new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        status:  'pending',
        img:     p.thumb || p.img,
      })
      nav('confirm')
    }, 700)
  }

  // ── PIN screen ───────────────────────────────────────────────────────────────
  if (step === 'pin') return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 22px', background: C.white, borderBottom: `1px solid ${C.grey100}` }}>
          <BackBtn />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: C.blueLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, fontSize: 36 }}>🔒</div>
          <h3 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 800, color: C.dark }}>Enter Wallet PIN</h3>
          <p style={{ margin: '0 0 32px', fontSize: 14, color: C.grey500, textAlign: 'center' }}>
            Authorise payment of <strong style={{ color: C.dark }}>{fmt(total)}</strong> from your Vendly Wallet
          </p>
          <PINInput onComplete={() => processPayment()} />
          <p style={{ marginTop: 20, fontSize: 13, color: C.grey500 }}>
            Balance after: <strong style={{ color: C.green }}>{fmt(walletBalance - total)}</strong>
          </p>
          {processing && <p style={{ marginTop: 12, color: C.grey500, fontSize: 14 }}>Processing…</p>}
          {!processing && (
            <div style={{ marginTop: 24, width: '100%' }}>
              <Btn full onClick={processPayment}>Confirm Payment</Btn>
            </div>
          )}
        </div>
      </div>
    </PhoneFrame>
  )

  // ── Transfer screen ──────────────────────────────────────────────────────────
  if (step === 'transfer') return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 22px', background: C.white, borderBottom: `1px solid ${C.grey100}` }}>
          <BackBtn />
          <h2 style={{ fontSize: 20, fontWeight: 800, color: C.dark, margin: '16px 0 0' }}>Transfer Details</h2>
        </div>
        <div style={{ padding: '24px 22px' }}>
          <div style={{ background: C.amberLight, borderRadius: 18, padding: '20px', marginBottom: 20 }}>
            <p style={{ margin: '0 0 14px', fontWeight: 800, fontSize: 14, color: C.amber }}>⏱ Account expires in 30:00</p>
            {[
              ['Bank',           'Vendly Bank (Providus)'],
              ['Account Number', '0091 2345 67'],
              ['Account Name',   'Vendly Escrow Ltd'],
              ['Amount',         fmt(total)],
            ].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: C.grey700 }}>{l}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ background: C.blueLight, borderRadius: 14, padding: '14px 16px', marginBottom: 24 }}>
            <p style={{ margin: 0, fontSize: 13, color: C.blue, fontWeight: 600 }}>
              ℹ️ Transfer exactly {fmt(total)} to avoid delays. Your order is held for 30 minutes.
            </p>
          </div>
          <Btn full onClick={processPayment}>{processing ? 'Verifying…' : "I've Sent the Transfer ✓"}</Btn>
        </div>
      </div>
    </PhoneFrame>
  )

  // ── Method selection screen ──────────────────────────────────────────────────
  const paymentMethods = [
    { id: 'wallet',   icon: '💰', label: 'Vendly Wallet',  sub: `Balance: ${fmt(walletBalance)}`,  badge: walletBalance < total ? 'Insufficient' : null },
    { id: 'transfer', icon: '🏦', label: 'Bank Transfer',   sub: 'Pay via USSD or online transfer', badge: 'Popular' },
    { id: 'card',     icon: '💳', label: 'Debit Card',      sub: 'Visa/Mastercard · Saved cards',   badge: null },
  ]

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '16px 22px', background: C.white, borderBottom: `1px solid ${C.grey100}` }}>
          <BackBtn />
          <h2 style={{ fontSize: 20, fontWeight: 800, color: C.dark, margin: '16px 0 0' }}>Payment</h2>
        </div>

        <div style={{ padding: '20px 22px' }}>
          {/* Order summary */}
          <div style={{ background: C.grey100, borderRadius: 16, padding: '16px 18px', marginBottom: 24 }}>
            <p style={{ margin: '0 0 12px', fontWeight: 800, fontSize: 12, color: C.grey700, textTransform: 'uppercase', letterSpacing: 0.4 }}>Order Summary</p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${C.grey300}` }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                <ProductImage src={p.thumb || p.img} alt={p.name} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: C.dark }}>{p.name}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: C.grey500 }}>{p.vendor}</p>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{p.price}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: C.grey700 }}>Delivery fee</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{fmt(deliveryFee)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: C.dark }}>Total</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: C.blue }}>{fmt(total)}</span>
            </div>
          </div>

          {/* Payment methods */}
          <p style={{ margin: '0 0 14px', fontSize: 12, fontWeight: 800, color: C.grey700, textTransform: 'uppercase', letterSpacing: 0.4 }}>Payment Method</p>
          {paymentMethods.map(m => (
            <div key={m.id} onClick={() => setMethod(m.id)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 16, border: `2px solid ${method === m.id ? C.blue : C.grey200}`, background: method === m.id ? C.blueLight : C.white, marginBottom: 12, cursor: 'pointer' }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{m.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: C.dark }}>{m.label}</p>
                  {m.badge && (
                    <span style={{ background: m.badge === 'Insufficient' ? C.redLight : C.greenLight, color: m.badge === 'Insufficient' ? C.red : C.green, fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 10 }}>{m.badge}</span>
                  )}
                </div>
                <p style={{ margin: '2px 0 0', fontSize: 13, color: C.grey500 }}>{m.sub}</p>
              </div>
              <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${method === m.id ? C.blue : C.grey300}`, background: method === m.id ? C.blue : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {method === m.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.white }} />}
              </div>
            </div>
          ))}

          {/* Saved card preview */}
          {method === 'card' && (
            <div style={{ background: 'linear-gradient(135deg, #1A1D24, #2D3142)', borderRadius: 16, padding: '16px 18px', marginBottom: 16 }}>
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
          )}

          <Btn
            full
            disabled={method === 'wallet' && walletBalance < total}
            onClick={() => {
              if (method === 'wallet')   setStep('pin')
              else if (method === 'transfer') setStep('transfer')
              else processPayment()
            }}
          >
            {method === 'wallet'   ? 'Continue to PIN 🔒'
             : method === 'transfer' ? 'Get Transfer Details'
             : `Pay ${fmt(total)} 💳`}
          </Btn>
          <div style={{ height: 24 }} />
        </div>
      </div>
    </PhoneFrame>
  )
}

// ─── ORDER CONFIRM ────────────────────────────────────────────────────────────
export function OrderConfirmScreen() {
  const { nav } = useApp()
  const orderId = `VDL-${Math.floor(Math.random() * 9000 + 1000)}`
  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
        <div style={{ width: 100, height: 100, borderRadius: '50%', background: C.greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <svg width={52} height={52} viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: C.dark, margin: '0 0 8px' }}>Payment Successful! 🎉</h2>
        <p style={{ color: C.grey500, fontSize: 15, margin: '0 0 20px', lineHeight: 1.6 }}>
          Your order has been placed and payment confirmed.
        </p>
        <div style={{ width: '100%', background: C.grey100, borderRadius: 16, padding: '16px 20px', marginBottom: 28, textAlign: 'left' }}>
          {[
            ['Order ID', orderId],
            ['Status',   'Awaiting vendor response'],
            ['Est. delivery', 'Within 24–48 hrs'],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: C.grey500 }}>{l}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Btn full onClick={() => {}}>💬 Message Vendor</Btn>
          <Btn full variant="ghost" onClick={() => nav('home')}>Back to Home</Btn>
        </div>
      </div>
    </PhoneFrame>
  )
}
