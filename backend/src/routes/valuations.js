const express = require('express');
const router = express.Router();
const axios = require('axios');

// Mock valuation data
const valuations = {
  1: {
    scan_id: 1,
    marketplaces: {
      ebay: { price: 45.99, quantity_sold: 23, sell_through_rate: 0.82 },
      mercari: { price: 42.50, quantity_sold: 15, sell_through_rate: 0.75 },
      depop: { price: 48.00, quantity_sold: 8, sell_through_rate: 0.65 },
      poshmark: { price: 50.00, quantity_sold: 5, sell_through_rate: 0.60 },
      facebook: { price: 40.00, quantity_sold: 12, sell_through_rate: 0.70 }
    },
    average_price: 45.30,
    avg_sell_through_rate: 0.70,
    estimated_fees: 9.50,
    estimated_shipping: 5.00,
    estimated_profit: 30.80,
    profit_margin: 67.9,
    recommendation: 'green',
    authenticity_score: 0.98,
    last_updated: new Date()
  }
};

// Get valuation for scan
router.get('/:scanId', (req, res) => {
  const valuation = valuations[req.params.scanId];
  if (!valuation) {
    return res.status(404).json({ error: 'Valuation not found' });
  }
  res.json(valuation);
});

// Get trends by category
router.get('/trends/:category', (req, res) => {
  const { category } = req.params;
  const trends = {
    price_trend: 'up',
    price_change_24h: 2.5,
    price_change_7d: 8.3,
    demand_score: 8.5,
    popular_size: 'M',
    color_preference: 'black'
  };
  res.json(trends);
});

module.exports = router;
