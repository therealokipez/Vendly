import { useState } from 'react'
import { C } from '../../styles/tokens.js'
import { useApp } from '../../context/AppContext.jsx'
import { PhoneFrame, Btn, BackBtn, GoogleBtn, OTPInput, Divider, InputField } from '../../components/ui.jsx'

// ─── SPLASH ──────────────────────────────────────────────────────────────────
export function SplashScreen() {
  const { nav } = useApp()
  return (
    <PhoneFrame bg={C.blue} lightStatus>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
        <div style={{ width: 90, height: 90, borderRadius: 28, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', marginBottom: 28 }}>
          <img
            src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&h=200&fit=crop&auto=format"
            alt="Vendly market"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <h1 style={{ color: C.white, fontSize: 40, fontWeight: 800, letterSpacing: -1, margin: 0 }}>Vendly</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, margin: '10px 0 0', textAlign: 'center', lineHeight: 1.5 }}>
          Find products near you instantly
        </p>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, margin: '8px 0 52px', textAlign: 'center' }}>
          Shop from verified local vendors around you
        </p>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Btn full onClick={() => nav('register')} style={{ background: C.white, color: C.blue }}>Get Started</Btn>
          <Btn full onClick={() => nav('login')} style={{ background: 'rgba(255,255,255,0.15)', color: C.white, border: '1.5px solid rgba(255,255,255,0.3)' }}>
            I already have an account
          </Btn>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 20, cursor: 'pointer' }} onClick={() => nav('vendor-register')}>
          🏪 Register as a Vendor instead
        </p>
      </div>
    </PhoneFrame>
  )
}

// ─── REGISTER ────────────────────────────────────────────────────────────────
export function RegisterScreen() {
  const { nav } = useApp()
  const [step, setStep] = useState('phone')
  const [phone, setPhone] = useState('')

  return (
    <PhoneFrame>
      <div style={{ padding: '16px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <BackBtn />
        <div style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: C.dark, margin: '0 0 4px' }}>Create Account</h2>
          <p style={{ color: C.grey500, fontSize: 14, margin: '0 0 24px' }}>Enter your phone number to get started</p>

          {step === 'phone' && (
            <>
              <GoogleBtn onClick={() => nav('location')} label="Continue with Google" />
              <Divider label="or use phone number" />
              <label style={{ fontSize: 12, fontWeight: 700, color: C.grey700, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 8 }}>
                Phone Number
              </label>
              <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
                <div style={{ padding: '14px', background: C.grey100, borderRadius: 12, fontSize: 14, fontWeight: 700, color: C.dark, border: `1.5px solid ${C.grey300}`, whiteSpace: 'nowrap' }}>
                  🇳🇬 +234
                </div>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="800 000 0000" type="tel"
                  style={{ flex: 1, padding: '14px 16px', borderRadius: 12, border: `1.5px solid ${C.grey300}`, fontSize: 15, outline: 'none', color: C.dark }} />
              </div>
              <Btn full onClick={() => phone.length >= 7 && setStep('otp')} disabled={phone.length < 7}>Continue</Btn>
              <p style={{ textAlign: 'center', color: C.grey500, fontSize: 13, marginTop: 20 }}>
                Already have an account?{' '}
                <span onClick={() => nav('login')} style={{ color: C.blue, cursor: 'pointer', fontWeight: 700 }}>Log in</span>
              </p>
            </>
          )}

          {step === 'otp' && (
            <>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: C.dark, margin: '0 0 4px' }}>Verify Number</h2>
              <p style={{ color: C.grey500, fontSize: 14, margin: '0 0 28px' }}>OTP sent to +234 {phone}</p>
              <OTPInput onComplete={() => nav('location')} />
              <p style={{ textAlign: 'center', color: C.grey500, fontSize: 13, marginTop: 20 }}>
                Didn't get it? <span style={{ color: C.blue, fontWeight: 700, cursor: 'pointer' }}>Resend OTP</span>
              </p>
              <div style={{ marginTop: 28 }}>
                <Btn full onClick={() => nav('location')}>Verify & Continue</Btn>
              </div>
            </>
          )}
        </div>
      </div>
    </PhoneFrame>
  )
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
export function LoginScreen() {
  const { nav } = useApp()
  const [step, setStep] = useState('phone')
  const [phone, setPhone] = useState('')

  return (
    <PhoneFrame>
      <div style={{ padding: '16px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <BackBtn />
        <div style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: C.dark, margin: '0 0 4px' }}>Welcome back</h2>
          <p style={{ color: C.grey500, fontSize: 14, margin: '0 0 24px' }}>Log in to your Vendly account</p>

          {step === 'phone' && (
            <>
              <GoogleBtn onClick={() => nav('location')} label="Sign in with Google" />
              <Divider label="or phone number" />
              <label style={{ fontSize: 12, fontWeight: 700, color: C.grey700, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 8 }}>
                Phone Number
              </label>
              <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
                <div style={{ padding: '14px', background: C.grey100, borderRadius: 12, fontSize: 14, fontWeight: 700, color: C.dark, border: `1.5px solid ${C.grey300}`, whiteSpace: 'nowrap' }}>
                  🇳🇬 +234
                </div>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="800 000 0000" type="tel"
                  style={{ flex: 1, padding: '14px 16px', borderRadius: 12, border: `1.5px solid ${C.grey300}`, fontSize: 15, outline: 'none' }} />
              </div>
              <Btn full onClick={() => phone.length >= 7 && setStep('otp')} disabled={phone.length < 7}>Send OTP</Btn>
            </>
          )}

          {step === 'otp' && (
            <>
              <p style={{ color: C.grey500, fontSize: 14, margin: '0 0 28px' }}>Code sent to +234 {phone}</p>
              <OTPInput onComplete={() => nav('location')} />
              <p style={{ textAlign: 'center', color: C.grey500, fontSize: 13, marginTop: 20 }}>
                Didn't get it? <span style={{ color: C.blue, fontWeight: 700, cursor: 'pointer' }}>Resend OTP</span>
              </p>
              <div style={{ marginTop: 28 }}>
                <Btn full onClick={() => nav('location')}>Log In</Btn>
              </div>
            </>
          )}

          <div style={{ marginTop: 24, background: C.blueLight, borderRadius: 14, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 22 }}>🏪</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.blueDark }}>Are you a vendor?</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: C.grey700 }}>Manage your store on Vendly</p>
            </div>
            <span onClick={() => nav('vendor-register')} style={{ fontSize: 12, fontWeight: 700, color: C.blue, cursor: 'pointer' }}>Go →</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}

// ─── LOCATION ────────────────────────────────────────────────────────────────
export function LocationScreen() {
  const { nav } = useApp()
  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
        <div style={{ width: 110, height: 110, borderRadius: '50%', background: C.blueLight, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28, fontSize: 52 }}>📍</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: C.dark, margin: '0 0 10px' }}>Enable Location</h2>
        <p style={{ color: C.grey500, fontSize: 15, margin: '0 0 28px', lineHeight: 1.6 }}>
          Vendly uses your location to show products from the nearest vendors first.
        </p>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {[
            ['⚡', 'Instant nearby product results'],
            ['📏', 'See exact distance to every vendor'],
            ['🔒', 'Location only used while app is open'],
          ].map(([icon, text], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, background: C.grey100, borderRadius: 14, padding: '14px 18px' }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <span style={{ fontSize: 14, color: C.grey700, fontWeight: 500 }}>{text}</span>
            </div>
          ))}
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Btn full onClick={() => nav('home')}>Allow Location Access</Btn>
          <Btn full variant="ghost" onClick={() => nav('home')}>Not now</Btn>
        </div>
      </div>
    </PhoneFrame>
  )
}
