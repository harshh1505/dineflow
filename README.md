# DineFlow 🍽️

> **The modern QR menu platform for restaurants** — scan, browse, and order without the friction.

![DineFlow Banner](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ What is DineFlow?

DineFlow is a **restaurant growth platform** that replaces physical menus with a beautiful, scannable digital experience. Restaurants get a branded QR code for every table — customers scan and instantly browse a fast, mobile-first menu.

Built for the modern dining experience:
- 📱 **Customers** scan a QR code → see the full menu instantly
- 🍳 **Restaurant owners** manage their menu, tables, and branding from a clean dashboard
- 🔗 **Zero app install** required — works in any mobile browser

---

## 🖥️ Live Preview

| Landing Page | Customer Menu | Owner Dashboard |
|---|---|---|
| Premium marketing site | Mobile-first QR menu | Full management dashboard |

---

## 🚀 Features

### For Restaurants
- ✅ **Digital Menu Management** — add categories, items, prices, images, food type tags (Veg/Non-Veg/Jain)
- ✅ **QR Code Generation** — auto-generate unique QR codes per table
- ✅ **Table Management** — manage your floor layout digitally
- ✅ **Branding Settings** — custom theme colour, logo upload, restaurant profile
- ✅ **Subscription Plans** — Starter, Growth, and Pro tiers
- ✅ **Super Admin Panel** — platform-wide restaurant management

### For Customers
- ✅ **Instant QR Scan** — no app download, no login
- ✅ **Fast Mobile Menu** — category navigation, search, dietary filters
- ✅ **Cart & Ordering** — add to cart, view totals, place orders
- ✅ **Bestseller Tags** — highlighted popular items

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| State Management | [Zustand](https://zustand-demo.pmnd.rs/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Auth | JWT via [jose](https://github.com/panva/jose) + bcryptjs |
| QR Generation | [qrcode](https://github.com/soldair/node-qrcode) |
| Data Layer | In-memory mock store (frontend prototype) |

---

## 📁 Project Structure

```
qr-code/
├── app/
│   ├── (auth)/              # Login, Register, Forgot/Reset Password
│   ├── actions/             # Server actions (auth, menu, tables, admin)
│   ├── dashboard/           # Owner dashboard (menu, tables, billing, settings)
│   ├── menu/[slug]/         # Public customer-facing QR menu
│   ├── super-admin/         # Platform admin panel
│   ├── globals.css          # Global styles & design tokens
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── lib/
│   ├── auth.ts              # JWT session helpers
│   ├── storage.ts           # Local file upload utility
│   ├── store.ts             # Zustand client state (cart, UI)
│   └── supabase.ts          # In-memory mock database client
├── public/                  # Static assets & uploaded images
└── package.json
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/harshh1505/qr-code.git
cd qr-code

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and add your JWT_SECRET

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

### Environment Variables

```env
# Authentication (required)
JWT_SECRET="your-super-secret-key-here"

# Supabase Storage (optional — local /public/uploads used as fallback)
SUPABASE_URL=""
SUPABASE_ANON_KEY=""
```

---

## 🗺️ Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/login` | Restaurant owner login |
| `/register` | New restaurant registration |
| `/dashboard` | Owner overview |
| `/dashboard/menu` | Menu & category management |
| `/dashboard/tables` | Table & QR code management |
| `/dashboard/billing` | Subscription & billing |
| `/dashboard/settings` | Branding & restaurant settings |
| `/menu/[slug]` | Public customer menu (QR destination) |
| `/super-admin` | Platform admin panel |

---

## 🎨 Design System

DineFlow uses a warm, premium colour palette inspired by Stripe, Linear, and Zomato:

| Token | Value | Use |
|---|---|---|
| Primary | `#FF6B35` | CTAs, highlights, brand |
| Background | `#FFFFFF` | Page base |
| Surface | `#FAFAFA` | Dashboard background |
| Muted | `#F5F5F5` | Subtle fills |
| Border | `#EAEAEA` | Dividers, outlines |
| Text Primary | `#111827` | Headings, labels |
| Text Secondary | `#6B7280` | Subtitles, meta |

---

## 📦 Current State

This is a **frontend-only prototype** — all data is stored in-memory via a mock query builder (`lib/supabase.ts`). No real database connection is required to run the project.

> To connect a real backend, replace `lib/supabase.ts` with your actual Supabase/PostgreSQL client.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT © [harshh1505](https://github.com/harshh1505)

---

<p align="center">
  Built with ❤️ for the restaurant industry
</p>
