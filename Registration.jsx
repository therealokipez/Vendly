import { useState } from 'react'
import { C } from '../../styles/tokens.js'
import { useApp } from '../../context/AppContext.jsx'
import { PhoneFrame, Btn, BackBtn, InputField, UploadBox, OTPInput } from '../../components/ui.jsx'

// ─── VENDOR REGISTER ─────────────────────────────────────────────────────────
export function VendorRegisterScreen() {
  const { nav } = useApp()
  const [cats, setCats] = useState([])
  const ALL_CATS = ['Electronics', 'Clothing', 'Footwear', 'Appliances', 'Accessories', 'Gadgets', 'Household', 'Stationery']
  const toggle = c => setCats(s => s.includes(c) ? s.filter(x => x !== c) : [...s, c])

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '16px 24px 0' }}>
          <BackBtn />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 24, marginBottom: 4 }}>
            <span style={{ fontSize: 28 }}>🏪</span>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: C.dark, margin: 0 }}>Vendor Registration</h2>
          </div>
          <p style={{ color: C.grey500, fontSize: 14, margin: '0 0 24px' }}>Set up your store on Vendly</p>

          <InputField label="Store Name"     placeholder="e.g. TechZone Ikeja" />
          <InputField label="Phone Number"   placeholder="+234 800 000 0000" type="tel" />
          <InputField label="Store Address"  placeholder="e.g. 12 Allen Avenue, Ikeja" />
          <InputField label="City"           placeholder="e.g. Lagos" />
          <InputField label="State"          placeholder="e.g. Lagos State" />

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.grey700, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>Store Description</label>
            <textarea placeholder="Tell customers what you sell and why they should buy from you…"
              style={{ width: '100%', height: 80, padding: '12px 16px', borderRadius: 12, border: `1.5px solid ${C.grey300}`, fontSize: 13, outline: 'none', resize: 'none', boxSizing: 'border-box', color: C.dark, background: C.white }} />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.grey700, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 10 }}>Product Categories</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ALL_CATS.map(c => (
                <button key={c} onClick={() => toggle(c)} style={{ padding: '8px 14px', borderRadius: 20, background: cats.includes(c) ? C.blue : C.grey100, color: cats.includes(c) ? C.white : C.grey700, border: `1.5px solid ${cats.includes(c) ? C.blue : C.grey300}`, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{c}</button>
              ))}
            </div>
          </div>

          <Btn full onClick={() => nav('vendor-id-submit')} disabled={cats.length === 0}>
            Continue to ID Verification →
          </Btn>
          <div style={{ height: 24 }} />
        </div>
      </div>
    </PhoneFrame>
  )
}

// ─── ID SUBMISSION ────────────────────────────────────────────────────────────
export function VendorIDSubmitScreen() {
  const { nav } = useApp()
  const [idType,   setIdType]   = useState('nin')
  const [idNum,    setIdNum]    = useState('')
  const [uploaded, setUploaded] = useState(false)
  const [selfie,   setSelfie]   = useState(false)

  const idTypes = [
    { id: 'nin',      label: 'NIN (National ID)', icon: '🪪' },
    { id: 'bvn',      label: 'BVN',               icon: '🏦' },
    { id: 'passport', label: "Int'l Passport",    icon: '📗' },
    { id: 'drivers',  label: "Driver's Licence",  icon: '🚗' },
  ]
  const placeholders = { nin: '11-digit NIN', bvn: '11-digit BVN', passport: 'Passport number', drivers: 'Licence number' }

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '16px 24px 0' }}>
          <BackBtn />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 24, marginBottom: 4 }}>
            <span style={{ fontSize: 28 }}>🔍</span>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: C.dark, margin: 0 }}>Identity Verification</h2>
          </div>
          <p style={{ color: C.grey500, fontSize: 14, margin: '0 0 20px', lineHeight: 1.6 }}>
            To become a verified vendor, we need to confirm your identity. This protects customers and builds trust.
          </p>

          {/* Why needed */}
          <div style={{ background: C.blueLight, borderRadius: 14, padding: '14px 18px', marginBottom: 24 }}>
            <p style={{ margin: '0 0 8px', fontWeight: 800, fontSize: 13, color: C.blue }}>Why we need this</p>
            {['Prevents fake vendor accounts', 'Protects customers from fraud', 'Unlocks Verified Seller badge', 'Required for withdrawing earnings'].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: i < 3 ? 4 : 0 }}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
                <span style={{ fontSize: 13, color: C.grey700 }}>{t}</span>
              </div>
            ))}
          </div>

          {/* ID type selector */}
          <label style={{ fontSize: 12, fontWeight: 700, color: C.grey700, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 10 }}>Select ID Type</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {idTypes.map(t => (
              <div key={t.id} onClick={() => setIdType(t.id)} style={{ padding: '14px', borderRadius: 14, border: `2px solid ${idType === t.id ? C.blue : C.grey300}`, background: idType === t.id ? C.blueLight : C.white, cursor: 'pointer', textAlign: 'center' }}>
                <p style={{ margin: '0 0 4px', fontSize: 26 }}>{t.icon}</p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: idType === t.id ? C.blue : C.grey700 }}>{t.label}</p>
              </div>
            ))}
          </div>

          <InputField label="ID Number" placeholder={placeholders[idType]} value={idNum} onChange={setIdNum} type="tel" />

          <label style={{ fontSize: 12, fontWeight: 700, color: C.grey700, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 8 }}>Upload Document Photo</label>
          <UploadBox label="Tap to upload front of ID" sub="JPG or PNG, max 5MB" uploaded={uploaded} onUpload={() => setUploaded(true)} />

          <label style={{ fontSize: 12, fontWeight: 700, color: C.grey700, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 8 }}>
            Selfie with ID{' '}
            <span style={{ color: C.grey400, fontWeight: 400, textTransform: 'none' }}>(optional but recommended)</span>
          </label>
          <UploadBox label="Take selfie holding your ID" sub="Helps speed up verification" uploaded={selfie} onUpload={() => setSelfie(true)} height={90} />

          <div style={{ background: '#FFF8E6', borderRadius: 12, padding: '12px 16px', marginBottom: 20 }}>
            <p style={{ margin: 0, fontSize: 12, color: C.amber, fontWeight: 600 }}>
              🔒 Your documents are encrypted and stored securely. Only used for verification.
            </p>
          </div>

          <Btn full onClick={() => nav('vendor-verify')} disabled={!uploaded || idNum.length < 5}>Submit for Verification</Btn>
          <div style={{ height: 24 }} />
        </div>
      </div>
    </PhoneFrame>
  )
}

// ─── VERIFY PENDING ───────────────────────────────────────────────────────────
export function VendorVerifyScreen() {
  const { nav } = useApp()
  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: C.amberLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, fontSize: 38 }}>⏳</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.dark, margin: '0 0 8px' }}>Verification Pending</h2>
        <p style={{ color: C.grey500, fontSize: 14, lineHeight: 1.6, margin: '0 0 28px' }}>We're reviewing your documents. This usually takes 24–48 hours.</p>

        <div style={{ width: '100%', background: C.white, borderRadius: 16, padding: '16px 18px', marginBottom: 24, textAlign: 'left', border: `1px solid ${C.grey100}` }}>
          {[{ l: 'OTP Verification', d: true }, { l: 'ID Submitted', d: true }, { l: 'Document Review', d: false }, { l: 'Verification Badge', d: false }].map(s => (
            <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: s.d ? C.green : C.grey200, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${s.d ? C.green : C.grey300}`, flexShrink: 0 }}>
                {s.d
                  ? <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  : <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.grey300 }} />
                }
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: s.d ? C.dark : C.grey500 }}>{s.l}</span>
            </div>
          ))}
        </div>

        <Btn full onClick={() => nav('vendor-badge')} style={{ marginBottom: 12 }}>Simulate Approval →</Btn>
        <Btn full variant="ghost" onClick={() => nav('vendor-dashboard')}>Continue to Dashboard (Pending)</Btn>
      </div>
    </PhoneFrame>
  )
}

// ─── BADGE AWARDED ────────────────────────────────────────────────────────────
export function VendorBadgeScreen() {
  const { nav } = useApp()
  return (
    <PhoneFrame bg={C.blue} lightStatus>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
        <div style={{ width: 110, height: 110, borderRadius: '50%', background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 10px 40px rgba(0,0,0,0.25)' }}>
          <svg width={62} height={62} viewBox="0 0 24 24" fill="none">
            <path d="M12 2L14.4 4.8L18 4.2L18.5 7.8L22 10L18.5 12.2L18 15.8L14.4 15.2L12 18L9.6 15.2L6 15.8L5.5 12.2L2 10L5.5 7.8L6 4.2L9.6 4.8L12 2Z" fill={C.green} />
            <path d="M8 10L10.5 12.5L16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: C.white, margin: '0 0 10px' }}>You're Verified! 🎉</h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.6, margin: '0 0 28px' }}>
          Your store is now verified. Customers will see your badge on all products and search results.
        </p>
        <div style={{ width: '100%', background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: '16px 20px', marginBottom: 16, textAlign: 'left' }}>
          {[['🏅', 'Verified Vendor Badge awarded'], ['📈', 'Starting Reputation Score: 0 pts'], ['👁️', 'Products are now discoverable'], ['💸', 'Earnings withdrawal unlocked']].map(([icon, text], i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: i < 3 ? 10 : 0 }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span style={{ fontSize: 13, color: C.white, fontWeight: 600 }}>{text}</span>
            </div>
          ))}
        </div>
        <Btn full onClick={() => nav('vendor-store-setup')} style={{ background: C.white, color: C.blue }}>Set Up My Store →</Btn>
      </div>
    </PhoneFrame>
  )
}

// ─── STORE SETUP ──────────────────────────────────────────────────────────────
export function VendorStoreSetupScreen() {
  const { nav } = useApp()
  const [logo,         setLogo]         = useState(false)
  const [banner,       setBanner]       = useState(false)
  const [returnPolicy, setReturnPolicy] = useState('7 days')

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '16px 22px 0' }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: C.dark }}>Set Up Your Store</h2>
          <p style={{ margin: '0 0 20px', fontSize: 14, color: C.grey500 }}>Make a great first impression on customers</p>

          {/* Banner */}
          <div onClick={() => setBanner(true)} style={{ height: 140, borderRadius: 16, background: banner ? `linear-gradient(135deg, ${C.blue}, ${C.blueDark})` : C.grey100, border: `2px dashed ${banner ? C.blue : C.grey300}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', marginBottom: 16, overflow: 'hidden' }}>
            {banner
              ? <><p style={{ margin: 0, fontSize: 14, color: C.white, fontWeight: 700 }}>✓ Banner uploaded</p><p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Tap to change</p></>
              : <><span style={{ fontSize: 28 }}>🖼️</span><p style={{ margin: 0, fontSize: 13, color: C.grey500, fontWeight: 600 }}>Upload Store Banner</p><p style={{ margin: 0, fontSize: 11, color: C.grey400 }}>Recommended: 1200 × 400px</p></>
            }
          </div>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 20 }}>
            <div onClick={() => setLogo(true)} style={{ width: 80, height: 80, borderRadius: 20, background: logo ? C.blue : C.grey100, border: `2px dashed ${logo ? C.blue : C.grey300}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              {logo ? <span style={{ fontSize: 28, color: C.white, fontWeight: 800 }}>T</span> : <span style={{ fontSize: 28 }}>📷</span>}
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: C.dark }}>Store Logo</p>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: C.grey500 }}>Square image, min 200×200px</p>
              {!logo && <p onClick={() => setLogo(true)} style={{ margin: '6px 0 0', fontSize: 12, color: C.blue, fontWeight: 700, cursor: 'pointer' }}>Upload logo →</p>}
            </div>
          </div>

          <InputField label="Store Tagline"                placeholder="e.g. Your go-to for genuine gadgets in Ikeja" />
          <InputField label="WhatsApp Business Number"     placeholder="+234 800 000 0000" type="tel" />
          <InputField label="Instagram Handle (optional)"  placeholder="@yourstore" />
          <InputField label="Operating Hours"              placeholder="e.g. Mon–Sat, 9am–7pm" />

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.grey700, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 10 }}>Return Policy</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['No returns', '3 days', '7 days', '14 days'].map(p => (
                <button key={p} onClick={() => setReturnPolicy(p)} style={{ flex: 1, padding: '10px 0', borderRadius: 10, background: returnPolicy === p ? C.dark : C.grey100, color: returnPolicy === p ? C.white : C.grey700, border: 'none', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>{p}</button>
              ))}
            </div>
          </div>

          <Btn full onClick={() => nav('vendor-dashboard')}>Complete Store Setup 🚀</Btn>
          <div style={{ height: 24 }} />
        </div>
      </div>
    </PhoneFrame>
  )
}
