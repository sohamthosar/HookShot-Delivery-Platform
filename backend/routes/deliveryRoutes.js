const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const {
  getDeliveries,
  getDeliveryById,
} = require('../controllers/deliveryControllers');

const router = express.Router();

router.get('/', authMiddleware, getDeliveries);
router.get('/:id', authMiddleware, getDeliveryById);

module.exports = router;