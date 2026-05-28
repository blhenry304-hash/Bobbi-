const express = require('express');
const router = express.Router();

const inventory = {};
let inventoryIdCounter = 1;

// Add to inventory
router.post('/', (req, res) => {
  try {
    const { scan_id, purchase_price, quantity, notes } = req.body;
    const item_id = inventoryIdCounter++;
    
    const item = {
      id: item_id,
      scan_id,
      purchase_price,
      purchase_date: new Date(),
      quantity,
      status: 'pending',
      notes
    };
    
    inventory[item_id] = item;
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get inventory
router.get('/', (req, res) => {
  res.json(Object.values(inventory));
});

// Update inventory item
router.patch('/:id', (req, res) => {
  if (!inventory[req.params.id]) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  inventory[req.params.id] = { ...inventory[req.params.id], ...req.body };
  res.json(inventory[req.params.id]);
});

// Delete from inventory
router.delete('/:id', (req, res) => {
  if (!inventory[req.params.id]) {
    return res.status(404).json({ error: 'Item not found' });
  }
  delete inventory[req.params.id];
  res.json({ message: 'Item removed from inventory' });
});

module.exports = router;
