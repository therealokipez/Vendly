import { useApp } from './context/AppContext.jsx'

// Customer — Onboarding
import { SplashScreen, RegisterScreen, LoginScreen, LocationScreen } from './screens/customer/Onboarding.jsx'

// Customer — Shopping
import { HomeScreen, SearchScreen, ProductDetailScreen, VendorProfileScreen } from './screens/customer/Shopping.jsx'

// Customer — Checkout
import { RequestOrderScreen, PaymentScreen, OrderConfirmScreen } from './screens/customer/Checkout.jsx'

// Customer — Account
import { WalletScreen, ProfileScreen, OrderHistoryScreen } from './screens/customer/Account.jsx'

// Vendor — Registration
import { VendorRegisterScreen, VendorIDSubmitScreen, VendorVerifyScreen, VendorBadgeScreen, VendorStoreSetupScreen } from './screens/vendor/Registration.jsx'

// Vendor — Operations
import { VendorDashboardScreen, VendorCatalogScreen, AddProductScreen, VendorOrdersScreen, VendorRepScreen } from './screens/vendor/Operations.jsx'

// ─── SCREEN MAP ───────────────────────────────────────────────────────────────
const SCREENS = {
  // Customer flow
  splash:               SplashScreen,
  register:             RegisterScreen,
  login:                LoginScreen,
  location:             LocationScreen,
  home:                 HomeScreen,
  search:               SearchScreen,
  product:              ProductDetailScreen,
  vendor:               VendorProfileScreen,
  order:                RequestOrderScreen,
  payment:              PaymentScreen,
  confirm:              OrderConfirmScreen,
  wallet:               WalletScreen,
  profile:              ProfileScreen,
  orders:               OrderHistoryScreen,

  // Vendor flow
  'vendor-register':    VendorRegisterScreen,
  'vendor-id-submit':   VendorIDSubmitScreen,
  'vendor-verify':      VendorVerifyScreen,
  'vendor-badge':       VendorBadgeScreen,
  'vendor-store-setup': VendorStoreSetupScreen,
  'vendor-dashboard':   VendorDashboardScreen,
  'vendor-catalog':     VendorCatalogScreen,
  'vendor-add-product': AddProductScreen,
  'vendor-orders':      VendorOrdersScreen,
  'vendor-rep':         VendorRepScreen,
}

// ─── SCREEN META (for the shell navigator) ────────────────────────────────────
export const SCREEN_META = {
  splash:               { label: 'C0 · Splash',          flow: 'customer' },
  register:             { label: 'C1 · Register',         flow: 'customer' },
  login:                { label: 'C2 · Login',            flow: 'customer' },
  location:             { label: 'C3 · Location',         flow: 'customer' },
  home:                 { label: 'C4 · Home',             flow: 'customer' },
  search:               { label: 'C5 · Search',           flow: 'customer' },
  product:              { label: 'C6 · Product Detail',   flow: 'customer' },
  vendor:               { label: 'C7 · Vendor Profile',   flow: 'customer' },
  order:                { label: 'C8 · Request Order',    flow: 'customer' },
  payment:              { label: 'C9 · Payment',          flow: 'customer' },
  confirm:              { label: 'C10 · Confirmed',       flow: 'customer' },
  wallet:               { label: 'C11 · Wallet',          flow: 'customer' },
  profile:              { label: 'C12 · My Profile',      flow: 'customer' },
  orders:               { label: 'C13 · Order History',   flow: 'customer' },
  'vendor-register':    { label: 'V1 · Register',         flow: 'vendor'   },
  'vendor-id-submit':   { label: 'V2 · ID Submission',   flow: 'vendor'   },
  'vendor-verify':      { label: 'V3 · Verification',    flow: 'vendor'   },
  'vendor-badge':       { label: 'V4 · Badge Awarded',   flow: 'vendor'   },
  'vendor-store-setup': { label: 'V5 · Store Setup',     flow: 'vendor'   },
  'vendor-dashboard':   { label: 'V6 · Dashboard',       flow: 'vendor'   },
  'vendor-catalog':     { label: 'V8 · Catalog',         flow: 'vendor'   },
  'vendor-add-product': { label: 'V10 · Add Product',    flow: 'vendor'   },
  'vendor-orders':      { label: 'V9 · Orders',          flow: 'vendor'   },
  'vendor-rep':         { label: 'V7 · Reputation',      flow: 'vendor'   },
}

// ─── ROUTER ───────────────────────────────────────────────────────────────────
function ScreenRouter() {
  const { screen } = useApp()
  const Component = SCREENS[screen] || SplashScreen
  return <Component key={screen} />
}

// ─── SHELL — prototype navigator (remove for production app) ──────────────────
function Shell() {
  const { screen, nav } = useApp()
  const allScreens = Object.keys(SCREEN_META)
  const idx  = allScreens.indexOf(screen)
  const meta = SCREEN_META[screen] || { label: screen, flow: 'customer' }

  const customerScreens = allScreens.filter(s => SCREEN_META[s].flow === 'customer')
  const vendorScreens   = allScreens.filter(s => SCREEN_META[s].flow === 'vendor')

  return (
    <div style={{ minHeight: '100vh', background: '#080A0F', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 24px 80px', fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 700, marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, color: '#fff', fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>
            🛍️ Vendly <span style={{ color: '#1A5CFF', fontSize: 16, fontWeight: 600 }}>Prototype v2</span>
          </h1>
          <p style={{ margin: 0, color: '#555', fontSize: 13 }}>{allScreens.length} screens · Customer + Vendor · All interactive</p>
        </div>
        <div style={{ background: '#111', borderRadius: 12, padding: '8px 14px', border: '1px solid #222' }}>
          <span style={{ color: meta.flow === 'vendor' ? '#00B96B' : '#1A5CFF', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {meta.flow === 'vendor' ? '🏪 Vendor' : '👤 Customer'}
          </span>
        </div>
      </div>

      {/* ── Nav controls ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <button
          onClick={() => idx > 0 && nav(allScreens[idx - 1])}
          disabled={idx === 0}
          style={{ background: '#1a1a1a', color: '#fff', border: '1px solid #333', borderRadius: 10, padding: '9px 16px', cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.3 : 1, fontWeight: 700, fontSize: 14 }}
        >←</button>

        <div style={{ background: '#111', border: '1px solid #222', borderRadius: 20, padding: '10px 22px', minWidth: 220, textAlign: 'center' }}>
          <span style={{ color: meta.flow === 'vendor' ? '#00B96B' : '#1A5CFF', fontWeight: 800, fontSize: 13 }}>{idx + 1}/{allScreens.length}</span>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}> · {meta.label}</span>
        </div>

        <button
          onClick={() => idx < allScreens.length - 1 && nav(allScreens[idx + 1])}
          disabled={idx === allScreens.length - 1}
          style={{ background: '#1a1a1a', color: '#fff', border: '1px solid #333', borderRadius: 10, padding: '9px 16px', cursor: idx === allScreens.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === allScreens.length - 1 ? 0.3 : 1, fontWeight: 700, fontSize: 14 }}
        >→</button>
      </div>

      {/* ── Active screen ── */}
      <ScreenRouter />

      {/* ── Jump grid ── */}
      <div style={{ marginTop: 32, maxWidth: 700, width: '100%' }}>
        {[{ label: '👤 CUSTOMER FLOW', screens: customerScreens }, { label: '🏪 VENDOR FLOW', screens: vendorScreens }].map(group => (
          <div key={group.label} style={{ marginBottom: 18 }}>
            <p style={{ color: '#444', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>{group.label}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {group.screens.map(s => {
                const active = screen === s
                const isVendor = SCREEN_META[s].flow === 'vendor'
                return (
                  <button key={s} onClick={() => nav(s)} style={{
                    padding: '7px 12px', borderRadius: 10,
                    background: active ? (isVendor ? '#00B96B' : '#1A5CFF') : '#111',
                    color: active ? '#fff' : '#666',
                    border: `1px solid ${active ? (isVendor ? '#00B96B' : '#1A5CFF') : '#222'}`,
                    fontSize: 11, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
                  }}>
                    {SCREEN_META[s].label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  return <Shell />
}
