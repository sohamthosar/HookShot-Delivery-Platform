
const Delivery = require('../models/Delivery');
const mongoose = require('mongoose');

const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({
      userId: req.user.userId,
    })
      .sort({ createdAt: -1 })
      .limit(100)
      .populate('endpointId', 'url')
      .lean();

    return res.status(200).json(deliveries);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to fetch deliveries',
    });
  }
};

const getDeliveryById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid delivery ID',
      });
    }

    const delivery = await Delivery.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    })
      .populate('endpointId', 'url')
      .lean();

    if (!delivery) {
      return res.status(404).json({
        message: 'Delivery not found',
      });
    }

    return res.status(200).json(delivery);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to fetch delivery',
    });
  }
};

module.exports = { getDeliveries, getDeliveryById };