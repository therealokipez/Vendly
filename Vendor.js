// ─── VENDORS DATA ─────────────────────────────────────────────────────────────

export const VENDORS = {
  v1: { name: 'SoleKing Lagos',    rating: 4.7, reviews: 98,  dist: '0.4 km', since: '2020', level: 'Silver',   points: 1200, productIds: [1],       fulfillment: 92, response: 95, accuracy: 90 },
  v2: { name: 'TechZone Ikeja',   rating: 4.8, reviews: 142, dist: '0.7 km', since: '2019', level: 'Gold',     points: 2840, productIds: [2, 5, 7], fulfillment: 96, response: 98, accuracy: 94 },
  v3: { name: 'HomeEssentials NG',rating: 4.5, reviews: 63,  dist: '0.9 km', since: '2021', level: 'Bronze',   points: 480,  productIds: [3],       fulfillment: 88, response: 82, accuracy: 86 },
  v4: { name: 'NaijaBespoke',     rating: 4.9, reviews: 210, dist: '1.2 km', since: '2018', level: 'Gold',     points: 3100, productIds: [4],       fulfillment: 98, response: 97, accuracy: 99 },
  v5: { name: 'iMart Nigeria',    rating: 4.6, reviews: 77,  dist: '1.5 km', since: '2022', level: 'Silver',   points: 900,  productIds: [5],       fulfillment: 91, response: 88, accuracy: 93 },
  v6: { name: 'FabricQueen',      rating: 4.4, reviews: 45,  dist: '1.8 km', since: '2021', level: 'Bronze',   points: 350,  productIds: [6],       fulfillment: 85, response: 80, accuracy: 84 },
  v7: { name: 'GamingHub NG',     rating: 4.7, reviews: 112, dist: '2.1 km', since: '2020', level: 'Gold',     points: 2200, productIds: [7],       fulfillment: 94, response: 96, accuracy: 92 },
  v8: { name: 'LuxeCarry',        rating: 4.8, reviews: 88,  dist: '2.3 km', since: '2021', level: 'Silver',   points: 1450, productIds: [8],       fulfillment: 93, response: 90, accuracy: 95 },
}

export const VENDOR_REVIEWS = [
  { name: 'Adaeze O.',   rating: 5, text: 'Very fast response, product was exactly as described. Highly recommend!', date: 'Mar 20', product: 'Samsung TV' },
  { name: 'Emeka J.',    rating: 5, text: 'Great seller, item was in perfect condition. Would buy again.',             date: 'Mar 15', product: 'iPhone 14 Pro' },
  { name: 'Chiamaka N.', rating: 4, text: 'Good product but delivery took a bit longer than expected.',               date: 'Mar 10', product: 'PS5 Console' },
  { name: 'Bolu A.',     rating: 5, text: 'Packaging was excellent, product was sealed and authentic.',               date: 'Mar 5',  product: 'Samsung TV' },
  { name: 'Kemi F.',     rating: 3, text: 'Product ok, but vendor took too long to respond initially.',               date: 'Feb 28', product: 'Blender' },
]

export const REP_LEVELS = [
  { name: 'Bronze',   min: 0,    max: 500,   color: '#CD7F32', icon: '🥉', perks: ['Listed on Vendly', 'Basic analytics'] },
  { name: 'Silver',   min: 500,  max: 1500,  color: '#A8A9AD', icon: '🥈', perks: ['Priority listing', 'Email support', 'Monthly insights'] },
  { name: 'Gold',     min: 1500, max: 5000,  color: '#F5A623', icon: '🏅', perks: ['Featured placement', 'Dedicated support', 'Advanced analytics', 'Gold badge'] },
  { name: 'Platinum', min: 5000, max: 10000, color: '#72B5E8', icon: '💎', perks: ['Top-of-feed priority', 'Account manager', 'Zero commission days', 'Platinum badge'] },
]
