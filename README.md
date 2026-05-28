# FlipScan - Thrift Store Resale Intelligence

FlipScan is a modern mobile app that empowers resellers and TikTok entrepreneurs to instantly evaluate thrift store items before purchase. Scan or photograph items and get real-time resale value data from multiple marketplaces, profit projections, and an intuitive buying recommendation meter.

## 🎯 Core Features

### Real-Time Valuation
- **Multi-Marketplace Scanning**: Aggregates sold listings from:
  - eBay
  - Mercari
  - Depop
  - Facebook Marketplace
  - Poshmark

### Financial Intelligence
- Estimated resale value
- Profit projections (accounting for fees)
- Shipping cost estimates
- Sell-through rate analysis
- Marketplace fee calculations

### Visual Decision Making
- **Worth Buying? Meter** - Color-coded recommendations:
  - 🟢 **Green**: Strong buy (high profit margin, good sell-through)
  - 🟡 **Yellow**: Consider (moderate margins, niche market)
  - 🔴 **Red**: Skip (low margins, slow moving, risky)

### Advanced Features
- 📊 Trend alerts and market movement tracking
- ⚠️ Fake item detection and authenticity warnings
- 📦 Inventory tracking and management
- 💎 Premium subscription for unlimited scans and advanced analytics

## 🎨 Design Philosophy

- **Dark Mode First**: Optimized for low-light retail environments
- **Beginner-Friendly**: Intuitive UI requiring minimal learning curve
- **TikTok Culture**: Engaging, shareable insights and trends
- **Mobile-Optimized**: Fast, responsive, touch-friendly interface

## 💳 Monetization

**Freemium Model:**
- Free Tier: 5 scans/day, basic valuation data
- Premium Subscription: Unlimited scans, advanced analytics, trend alerts, inventory management

## 🛠️ Tech Stack

- **Frontend**: React Native / Expo (iOS & Android)
- **Backend**: Node.js + Express or Firebase
- **Database**: PostgreSQL + Redis cache
- **APIs**: eBay API, Mercari API, Depop integration, Facebook/Poshmark web scraping
- **Image Recognition**: Computer Vision API for item detection

## 📁 Project Structure

```
flipscan/
├── mobile/              # React Native app
├── backend/             # API server
├── scrapers/            # Marketplace data collection
├── ml-models/           # Authenticity detection models
├── docs/                # Documentation
└── config/              # Configuration files
```

## 🚀 Development Roadmap

- **Phase 1**: MVP with eBay + Mercari integration
- **Phase 2**: Add Depop, Poshmark, Facebook Marketplace
- **Phase 3**: AI-powered fake detection
- **Phase 4**: Advanced analytics and trends
- **Phase 5**: Premium subscription rollout

## 📄 License

MIT

---

**Built for modern resellers. Designed for profit.**
