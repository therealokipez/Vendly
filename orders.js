
// ─── ORDERS DATA ──────────────────────────────────────────────────────────────

export const ORDER_HISTORY_SEED = [
  {
    id: 'VDL-2891',
    product: "Nike Air Force 1",
    vendor: 'SoleKing Lagos',
    price: '₦35,000',
    date: 'Mar 20, 2025',
    status: 'delivered',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&auto=format',
  },
  {
    id: 'VDL-2744',
    product: 'iPhone 14 Pro 256GB',
    vendor: 'iMart Nigeria',
    price: '₦980,000',
    date: 'Mar 12, 2025',
    status: 'delivered',
    img: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=200&h=200&fit=crop&auto=format',
  },
  {
    id: 'VDL-2601',
    product: 'Samsung 65" QLED TV',
    vendor: 'TechZone Ikeja',
    price: '₦420,000',
    date: 'Feb 28, 2025',
    status: 'in_transit',
    img: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=200&h=200&fit=crop&auto=format',
  },
  {
    id: 'VDL-2540',
    product: 'Ankara Maxi Dress',
    vendor: 'FabricQueen',
    price: '₦12,000',
    date: 'Feb 14, 2025',
    status: 'cancelled',
    img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&h=200&fit=crop&auto=format',
  },
  {
    id: 'VDL-2490',
    product: 'PS5 Console',
    vendor: 'GamingHub NG',
    price: '₦750,000',
    date: 'Jan 30, 2025',
    status: 'delivered',
    img: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=200&h=200&fit=crop&auto=format',
  },
]

export const VENDOR_ORDERS_SEED = [
  {
    id: 'VDL-001',
    product: "Nike Air Force 1",
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop&auto=format',
    customer: 'Adaeze O.',
    type: 'Delivery',
    time: '2 mins ago',
    status: 'pending',
    amount: '₦35,000',
  },
  {
    id: 'VDL-002',
    product: 'Samsung 65" QLED TV',
    img: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=120&h=120&fit=crop&auto=format',
    customer: 'Emeka J.',
    type: 'Pickup',
    time: '14 mins ago',
    status: 'pending',
    amount: '₦420,000',
  },
  {
    id: 'VDL-003',
    product: 'Binatone Blender',
    img: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=120&h=120&fit=crop&auto=format',
    customer: 'Funmi A.',
    type: 'Delivery',
    time: '1 hr ago',
    status: 'accepted',
    amount: '₦18,500',
  },
  {
    id: 'VDL-004',
    product: 'PS5 Console',
    img: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=120&h=120&fit=crop&auto=format',
    customer: 'Tunde B.',
    type: 'Pickup',
    time: '3 hrs ago',
    status: 'accepted',
    amount: '₦750,000',
  },
]

export const WALLET_TRANSACTIONS = [
  { type: 'credit', desc: 'Wallet top-up',        amount: '+₦50,000',  date: 'Mar 22' },
  { type: 'debit',  desc: "Nike Air Force 1",      amount: '-₦35,000',  date: 'Mar 20' },
  { type: 'debit',  desc: 'iPhone 14 Pro',         amount: '-₦980,000', date: 'Mar 12' },
  { type: 'credit', desc: 'Refund: Ankara Dress',  amount: '+₦12,000',  date: 'Feb 15' },
  { type: 'debit',  desc: 'PS5 Console',           amount: '-₦750,000', date: 'Jan 30' },
  { type: 'credit', desc: 'Wallet top-up',         amount: '+₦200,000', date: 'Jan 20' },
]
