import { useState } from 'react'
import { C } from '../../styles/tokens.js'
import { useApp } from '../../context/AppContext.jsx'
import { PRODUCTS, CATEGORIES } from '../../data/products.js'
import { VENDORS } from '../../data/vendors.js'
import { PhoneFrame, ProductCard, ProductImage, SearchBar, VerifiedBadge, AvailPill, Btn, BackBtn, BottomNav, Stars } from '../../components/ui.jsx'

// ─── HOME ────────────────────────────────────────────────────────────────────
export function HomeScreen() {
  const { nav, navProduct } = useApp()
  const [sort, setSort]   = useState('Nearest')
  const [cat,  setCat]    = useState('All')

  const filtered = PRODUCTS.filter(p => cat === 'All' || p.cat === cat)
  const sorted   = [...filtered].sort((a, b) => {
    if (sort === 'Nearest')      return a.distNum - b.distNum
    if (sort === 'Price ↑')      return a.priceNum - b.priceNum
    if (sort === 'Price ↓')      return b.priceNum - a.priceNum
    if (sort === 'Availability') return (a.status === 'out' ? 1 : 0) - (b.status === 'out' ? 1 : 0)
    return 0
  })

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '12px 20px 0', background: C.white }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <p style={{ margin: 0, fontSize: 12, color: C.grey500 }}>📍 Lagos Island, Lagos</p>
              <h2 style={{ margin: '2px 0 0', fontSize: 20, fontWeight: 800, color: C.dark }}>Hi, Oki 👋</h2>
            </div>
            <div onClick={() => nav('profile')} style={{ width: 42, height: 42, borderRadius: '50%', background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.white, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>O</div>
          </div>

          <SearchBar placeholder="Search sneakers, blender, TV…" onClick={() => nav('search')} />

          {/* Sort row */}
          <div style={{ display: 'flex', gap: 8, marginTop: 14, paddingBottom: 14, overflowX: 'auto' }}>
            {['Nearest', 'Price ↑', 'Price ↓', 'Availability'].map(f => (
              <button key={f} onClick={() => setSort(f)} style={{ padding: '8px 16px', borderRadius: 20, border: `1.5px solid ${sort === f ? C.blue : C.grey300}`, background: sort === f ? C.blueLight : C.white, color: sort === f ? C.blue : C.grey700, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {f === 'Nearest' ? '📍 Nearest' : f}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 8, padding: '12px 20px', overflowX: 'auto', background: C.white, borderBottom: `1px solid ${C.grey100}` }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: '6px 14px', borderRadius: 20, background: cat === c ? C.dark : C.grey100, color: cat === c ? C.white : C.grey700, border: 'none', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer' }}>{c}</button>
          ))}
        </div>

        <div style={{ padding: '14px 20px 4px' }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: C.grey500, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            📍 {sort === 'Nearest' ? 'Closest to you' : `Sorted by ${sort}`} · {sorted.length} products
          </p>
        </div>

        {/* Grid */}
        <div style={{ padding: '8px 20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {sorted.map(p => <ProductCard key={p.id} product={p} onClick={() => navProduct(p)} />)}
        </div>

        <BottomNav active="home" />
      </div>
    </PhoneFrame>
  )
}

// ─── SEARCH ──────────────────────────────────────────────────────────────────
export function SearchScreen() {
  const { navProduct } = useApp()
  const [query, setQuery] = useState('')
  const [sort,  setSort]  = useState('distance')

  const results = query.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.cat.toLowerCase().includes(query.toLowerCase()) ||
        p.vendor.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS

  const sorted = [...results].sort((a, b) => {
    if (sort === 'distance')  return a.distNum - b.distNum
    if (sort === 'price_asc') return a.priceNum - b.priceNum
    if (sort === 'available') return (a.status === 'out' ? 1 : 0) - (b.status === 'out' ? 1 : 0)
    return 0
  })

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 20px', background: C.white, position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <BackBtn />
            <div style={{ flex: 1 }}>
              <SearchBar placeholder="Search products, vendors…" value={query} onChange={setQuery} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto', paddingBottom: 2 }}>
            {[{ id: 'distance', l: '📍 Nearest' }, { id: 'available', l: '✅ Available' }, { id: 'price_asc', l: '₦ Price ↑' }].map(f => (
              <button key={f.id} onClick={() => setSort(f.id)} style={{ padding: '8px 16px', borderRadius: 20, background: sort === f.id ? C.blue : C.white, color: sort === f.id ? C.white : C.grey700, border: `1.5px solid ${sort === f.id ? C.blue : C.grey300}`, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer' }}>{f.l}</button>
            ))}
          </div>
        </div>

        {sorted.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 40, textAlign: 'center' }}>
            <span style={{ fontSize: 52 }}>🔍</span>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: C.dark }}>No products found near you</h3>
            <p style={{ margin: 0, fontSize: 14, color: C.grey500 }}>Try a different search or expand your radius</p>
            <Btn variant="secondary" small onClick={() => setQuery('')}>Clear search</Btn>
          </div>
        ) : (
          <>
            <div style={{ padding: '12px 20px 4px' }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: C.grey500, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                📍 Closest results · {sorted.length} found
              </p>
            </div>
            <div style={{ padding: '8px 20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {sorted.map(p => <ProductCard key={p.id} product={p} onClick={() => navProduct(p)} />)}
            </div>
          </>
        )}
      </div>
    </PhoneFrame>
  )
}

// ─── PRODUCT DETAIL ───────────────────────────────────────────────────────────
export function ProductDetailScreen() {
  const { nav, navVendor, selectedProduct: p } = useApp()
  const vendor = VENDORS[p.vendorId] || VENDORS['v2']

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Hero image */}
        <div style={{ height: 290, position: 'relative', flexShrink: 0 }}>
          <ProductImage src={p.img} alt={p.name} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 45%)' }} />
          <button onClick={() => nav('home')} style={{ position: 'absolute', top: 16, left: 16, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          </button>
          {/* Pill overlaid on hero */}
          <div style={{ position: 'absolute', bottom: 14, left: 18 }}>
            <AvailPill status={p.status} count={p.count} />
          </div>
        </div>

        <div style={{ flex: 1, padding: '20px 22px', overflowY: 'auto' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 800, color: C.dark }}>{p.name}</h2>
          <p style={{ margin: '0 0 10px', fontSize: 26, fontWeight: 800, color: C.blue }}>{p.price}</p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: C.grey500 }}>📍 {p.dist} away</span>
            <span style={{ fontSize: 13, color: C.grey500 }}>🏷 {p.cat}</span>
            {p.status === 'low' && <span style={{ fontSize: 13, color: C.amber, fontWeight: 700 }}>⚠ Only {p.count} left!</span>}
          </div>

          <p style={{ margin: '0 0 20px', fontSize: 14, color: C.grey700, lineHeight: 1.7 }}>{p.desc}</p>

          {/* Vendor card */}
          <div onClick={() => navVendor(p.vendorId)} style={{ background: C.grey100, borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', marginBottom: 20 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.white, fontWeight: 800, fontSize: 18, flexShrink: 0 }}>
              {vendor.name.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 800, fontSize: 14, color: C.dark }}>{vendor.name}</span>
                <VerifiedBadge />
              </div>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: C.grey500 }}>⭐ {vendor.rating} · {vendor.reviews} reviews · {p.dist}</p>
              <p style={{ margin: '2px 0 0', fontSize: 11, color: C.green, fontWeight: 600 }}>⚡ Typically responds in ~5 mins</p>
            </div>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={C.grey400} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Btn full onClick={() => nav('order')} disabled={p.status === 'out'}>
              {p.status === 'out' ? 'Out of Stock' : '🛒 Request to Order'}
            </Btn>
            <div style={{ display: 'flex', gap: 10 }}>
              <Btn full variant="secondary" style={{ flex: 1 }} onClick={() => {}}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                Message
              </Btn>
              <Btn full variant="ghost" style={{ flex: 1 }} onClick={() => {}}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63 19.79 19.79 0 01.5 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.09A16 16 0 0016 16.09l.41-.41a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
                Call
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}

// ─── VENDOR PROFILE ───────────────────────────────────────────────────────────
export function VendorProfileScreen() {
  const { navProduct, nav, selectedVendorId } = useApp()
  const vendor = VENDORS[selectedVendorId] || VENDORS['v2']
  const vendorProducts = PRODUCTS.filter(p => vendor.productIds.includes(p.id))
  const levelColors = { Bronze: '#CD7F32', Silver: '#A8A9AD', Gold: C.gold, Platinum: '#72B5E8' }

  return (
    <PhoneFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${C.blue} 0%, ${C.blueDark} 100%)`, padding: '16px 22px 28px' }}>
          <BackBtn light />
          <div style={{ marginTop: 16, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 800, color: C.blue, flexShrink: 0 }}>
              {vendor.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: C.white }}>{vendor.name}</h2>
                <VerifiedBadge />
              </div>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>📍 {vendor.dist} · Since {vendor.since}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 12px', marginTop: 8 }}>
                <span style={{ fontSize: 14 }}>🏅</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: levelColors[vendor.level] || C.gold }}>{vendor.level} Seller</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>· {vendor.points.toLocaleString()} pts</span>
              </div>
            </div>
          </div>

          {/* Score grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginTop: 20 }}>
            {[
              { l: 'Rating',   v: `${vendor.rating}⭐` },
              { l: 'Reviews',  v: vendor.reviews },
              { l: 'Response', v: `${vendor.response}%` },
              { l: 'Accuracy', v: `${vendor.accuracy}%` },
            ].map(s => (
              <div key={s.l} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px 8px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: C.white }}>{s.v}</p>
                <p style={{ margin: '2px 0 0', fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{s.l}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <Btn small style={{ flex: 1, background: C.white, color: C.blue }} onClick={() => {}}>💬 Message</Btn>
            <Btn small style={{ flex: 1, background: 'rgba(255,255,255,0.15)', color: C.white, border: '1.5px solid rgba(255,255,255,0.3)' }} onClick={() => {}}>📞 Call</Btn>
          </div>
        </div>

        {/* Products */}
        <div style={{ padding: '16px 20px 6px' }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: C.dark }}>Products ({vendorProducts.length})</p>
        </div>
        <div style={{ padding: '8px 20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, flex: 1, overflowY: 'auto' }}>
          {vendorProducts.map(p => <ProductCard key={p.id} product={p} onClick={() => navProduct(p)} />)}
        </div>

        <BottomNav active="search" />
      </div>
    </PhoneFrame>
  )
}
