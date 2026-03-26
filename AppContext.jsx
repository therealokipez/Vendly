import { createContext, useContext, useState, useCallback } from 'react'
import { PRODUCTS } from '../data/products.js'
import { ORDER_HISTORY_SEED, VENDOR_ORDERS_SEED } from '../data/orders.js'

const AppCtx = createContext(null)

export const useApp = () => {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

export function AppProvider({ children }) {
  // ── Navigation ──────────────────────────────────────────────────────────────
  const [screen, setScreen]   = useState('splash')
  const [history, setHistory] = useState([])

  const nav = useCallback((s) => {
    setHistory(h => [...h, screen])
    setScreen(s)
  }, [screen])

  const goBack = useCallback(() => {
    setHistory(h => {
      if (h.length === 0) return h
      const prev = h[h.length - 1]
      setScreen(prev)
      return h.slice(0, -1)
    })
  }, [])

  // ── Selected entities ────────────────────────────────────────────────────────
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0])
  const [selectedVendorId, setSelectedVendorId] = useState('v2')

  const navProduct = useCallback((p) => {
    setSelectedProduct(p)
    setHistory(h => [...h, screen])
    setScreen('product')
  }, [screen])

  const navVendor = useCallback((vendorId) => {
    setSelectedVendorId(vendorId)
    setHistory(h => [...h, screen])
    setScreen('vendor')
  }, [screen])

  // ── Wallet ───────────────────────────────────────────────────────────────────
  const [walletBalance, setWalletBalance] = useState(45200)

  const deductWallet = useCallback((amt) => {
    setWalletBalance(b => Math.max(0, b - amt))
  }, [])

  const topUpWallet = useCallback((amt) => {
    setWalletBalance(b => b + amt)
  }, [])

  // ── Vendor state ─────────────────────────────────────────────────────────────
  const [vendorProducts, setVendorProducts] = useState(
    PRODUCTS.slice(0, 6).map(p => ({ ...p }))
  )
  const [vendorOrders, setVendorOrders] = useState(
    VENDOR_ORDERS_SEED.map(o => ({ ...o }))
  )

  const updateVendorProductStatus = useCallback((id, status) => {
    setVendorProducts(ps =>
      ps.map(p => {
        if (p.id !== id) return p
        const count = status === 'low' ? 3 : status === 'out' ? 0 : null
        return { ...p, status, count }
      })
    )
  }, [])

  const updateVendorOrder = useCallback((id, status) => {
    setVendorOrders(os => os.map(o => o.id === id ? { ...o, status } : o))
  }, [])

  // ── Order history ─────────────────────────────────────────────────────────────
  const [orderHistory, setOrderHistory] = useState(ORDER_HISTORY_SEED)

  const addOrderToHistory = useCallback((order) => {
    setOrderHistory(h => [order, ...h])
  }, [])

  // ── Last confirmed order (for confirm screen) ─────────────────────────────────
  const [lastOrder, setLastOrder] = useState(null)

  return (
    <AppCtx.Provider value={{
      // nav
      screen, nav, goBack, history,
      // products
      selectedProduct, setSelectedProduct, navProduct,
      selectedVendorId, navVendor,
      // wallet
      walletBalance, deductWallet, topUpWallet,
      // vendor
      vendorProducts, updateVendorProductStatus,
      vendorOrders, updateVendorOrder,
      // orders
      orderHistory, addOrderToHistory,
      lastOrder, setLastOrder,
    }}>
      {children}
    </AppCtx.Provider>
  )
}
