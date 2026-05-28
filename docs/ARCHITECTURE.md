# FlipScan Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Mobile App (React Native)               │
│  - Camera/Photo Scanner                                     │
│  - Item Valuation Display                                   │
│  - Inventory Management                                     │
│  - User Authentication                                      │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ├─────────────────────────────────────────┐
                 │        REST API / GraphQL Gateway       │
                 │         (Node.js + Express)             │
                 └────────────────┬────────────────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         │                        │                        │
    ┌────▼──────┐          ┌──────▼──────┐         ┌───────▼────┐
    │ Marketplace│          │  Database  │         │   Cache    │
    │ Scrapers   │          │ (PostgreSQL)│        │ (Redis)    │
    │            │          │            │         │            │
    │ - eBay API │          │ Users      │         │ Valuations │
    │ - Mercari  │          │ Scans      │         │ Trends     │
    │ - Depop    │          │ Inventory  │         │ Listings   │
    │ - Poshmark │          │ Analytics  │         │            │
    │ - Facebook │          │            │         │            │
    └────────────┘          └────────────┘         └────────────┘
```

## Core Services

### 1. **Scanning Service**
- Image capture and processing
- Item detection (Google Vision API)
- OCR for brand/size extraction
- Duplicate detection

### 2. **Valuation Engine**
- Real-time marketplace price aggregation
- Historical price trend analysis
- Sell-through rate calculation
- Profit margin computation (accounting for fees)
- Worth Buying? meter generation

### 3. **Marketplace Integration**
- eBay: Official API (completed listings)
- Mercari: Web scraping + API
- Depop: Web scraping (official API limited)
- Poshmark: Web scraping
- Facebook Marketplace: Web scraping

### 4. **Authentication & Authorization**
- JWT-based authentication
- Subscription tier validation
- Rate limiting per tier
- API key management

### 5. **Analytics Engine**
- Trend detection and alerts
- User behavior tracking
- Portfolio performance metrics
- Market sentiment analysis

### 6. **Authenticity Detection**
- Image analysis for common fakes
- Brand-specific authentication rules
- Red flag patterns (poor condition, suspiciously low price)
- ML model integration

### 7. **Payment Processing**
- Stripe integration for subscriptions
- Free tier quota management
- Premium tier features gating

## Database Schema (Core Tables)

```sql
-- Users
users (id, email, password_hash, subscription_tier, created_at)

-- Scans
scans (id, user_id, image_url, item_name, item_category, 
       created_at, valuation_data, is_purchased)

-- Valuations
valuations (id, scan_id, marketplace, price, quantity_sold, 
            listing_date, authenticity_score)

-- Inventory
inventory (id, user_id, scan_id, purchase_price, purchase_date,
           quantity, status, notes)

-- Subscriptions
subscriptions (id, user_id, tier, start_date, end_date, 
               stripe_subscription_id, status)

-- Analytics
user_analytics (id, user_id, total_scans, total_purchases, 
                total_profit, avg_margin, updated_at)
```

## API Endpoints (Key)

```
POST   /auth/register              - User registration
POST   /auth/login                 - User login
POST   /auth/refresh               - Refresh JWT token

POST   /scans                       - Create new scan
GET    /scans/:id                   - Get scan details
GET    /scans                       - List user scans
DELETE /scans/:id                   - Delete scan

GET    /valuations/:scanId          - Get valuation data
GET    /valuations/trends/:category - Get trend data

POST   /inventory                   - Add to inventory
GET    /inventory                   - List inventory
PATCH  /inventory/:id               - Update inventory item
DELETE /inventory/:id               - Remove from inventory

GET    /analytics/dashboard         - User dashboard stats
GET    /analytics/portfolio         - Portfolio performance

POST   /subscription/upgrade        - Upgrade to premium
GET    /subscription/status         - Check subscription status
```

## Security Considerations

1. **API Keys**: Secure storage in environment variables
2. **Rate Limiting**: Per-user rate limits on premium/free tiers
3. **Image Storage**: Encrypted S3 buckets
4. **Data Privacy**: GDPR compliance, data anonymization for analytics
5. **Authentication**: JWT with short expiry + refresh tokens
6. **SQL Injection**: Parameterized queries with ORM (Sequelize/TypeORM)

## Scaling Strategy

1. **Microservices**: Separate scanning, valuation, and analytics services
2. **Caching**: Redis for marketplace data, valuation cache (5-min TTL)
3. **Database**: Read replicas for analytics queries
4. **CDN**: Image optimization and distribution
5. **Queue System**: Bull/RabbitMQ for async processing (marketplace scrapes, ML analysis)
6. **Load Balancing**: PM2 clustering or Kubernetes deployment
