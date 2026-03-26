# 🛍️ Vendly — Prototype v2

Hyperlocal commerce mobile prototype for the Nigerian market.
24 fully interactive screens across Customer and Vendor flows.

---

## Quick Start

```bash
npm install
npm run dev        # → http://localhost:3000
npm run build      # production build → /dist
npm run preview    # preview the build locally
```

---

## Deploy

### Netlify (recommended)
1. Push this folder to a GitHub repo
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**
3. Select your repo
4. Build settings are auto-detected from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**

### Vercel
```bash
npm i -g vercel
vercel          # follow prompts — settings auto-read from vercel.json
```

### Manual (any static host)
```bash
npm run build
# Upload the /dist folder to your host
```

---

## Project Structure

```
vendly-app/
├── index.html                        # HTML entry point
├── vite.config.js                    # Vite config
├── netlify.toml                      # Netlify deploy config
├── vercel.json                       # Vercel deploy config
└── src/
    ├── main.jsx                      # React root — mounts AppProvider + App
    ├── App.jsx                       # Screen router + prototype shell nav
    │
    ├── styles/
    │   ├── global.css                # Base styles, animations, scrollbar
    │   └── tokens.js                 # Design tokens (colours, radius, shadows)
    │
    ├── data/
    │   ├── products.js               # 8 products with real Unsplash images
    │   ├── vendors.js                # Vendor profiles + rep levels + reviews
    │   └── orders.js                 # Order history + vendor orders + wallet txns
    │
    ├── context/
    │   └── AppContext.jsx            # Global state: nav, wallet, orders, vendor ops
    │
    ├── components/
    │   └── ui.jsx                    # All shared UI components:
    │                                 #   StatusBar, PhoneFrame, ProductImage,
    │                                 #   VerifiedBadge, AvailPill, Btn, BackBtn,
    │                                 #   SearchBar, ProductCard, InputField,
    │                                 #   BottomNav, VendorBottomNav, Stars,
    │                                 #   GoogleBtn, OTPInput, PINInput,
    │                                 #   Divider, UploadBox
    │
    └── screens/
        ├── customer/
        │   ├── Onboarding.jsx        # Splash, Register, Login, Location
        │   ├── Shopping.jsx          # Home, Search, ProductDetail, VendorProfile
        │   ├── Checkout.jsx          # RequestOrder, Payment, OrderConfirm
        │   └── Account.jsx           # Wallet, Profile, OrderHistory
        └── vendor/
            ├── Registration.jsx      # Register, IDSubmit, Verify, Badge, StoreSetup
            └── Operations.jsx        # Dashboard, Catalog, AddProduct, Orders, Reputation
```

---

## Screens (24 total)

| ID  | Screen            | File                    |
|-----|-------------------|-------------------------|
| C0  | Splash            | Onboarding.jsx          |
| C1  | Register          | Onboarding.jsx          |
| C2  | Login             | Onboarding.jsx          |
| C3  | Location          | Onboarding.jsx          |
| C4  | Home              | Shopping.jsx            |
| C5  | Search            | Shopping.jsx            |
| C6  | Product Detail    | Shopping.jsx            |
| C7  | Vendor Profile    | Shopping.jsx            |
| C8  | Request Order     | Checkout.jsx            |
| C9  | Payment           | Checkout.jsx            |
| C10 | Order Confirmed   | Checkout.jsx            |
| C11 | Wallet            | Account.jsx             |
| C12 | My Profile        | Account.jsx             |
| C13 | Order History     | Account.jsx             |
| V1  | Vendor Register   | Registration.jsx        |
| V2  | ID Submission     | Registration.jsx        |
| V3  | Verification      | Registration.jsx        |
| V4  | Badge Awarded     | Registration.jsx        |
| V5  | Store Setup       | Registration.jsx        |
| V6  | Dashboard         | Operations.jsx          |
| V7  | Reputation        | Operations.jsx          |
| V8  | Catalog           | Operations.jsx          |
| V9  | Orders            | Operations.jsx          |
| V10 | Add Product       | Operations.jsx          |

---

Built with React 18 + Vite 5. No external UI libraries.
