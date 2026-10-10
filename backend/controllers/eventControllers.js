
const Event = require('../models/Event');
const Delivery = require('../models/Delivery');
const { getActiveEndpoints } = require('../utils/endpointUtils');
const { dispatchDelivery } = require('../utils/deliveryUtils');

const saveEvent = async (req, res) => {
  try {
    const { type, data } = req.body;
    const userId = req.user.userId;
    const idempotencyKey = req.headers['idempotency-key'].trim();

    if(typeof idempotencyKey !== 'string' || !idempotencyKey.trim()){
      return res.status(400).json({
        message: 'Idempotency-Key header is required',
      });
    }

    if (typeof type !== 'string' || !type.trim()) {
      return res.status(400).json({
        message: 'Event type is required',
      });
    }

    const activeEndpoints = await getActiveEndpoints(userId);

    console.log('Active endpoints found:', activeEndpoints.length);
    console.log('Active endpoint IDs:', activeEndpoints.map(e => String(e._id)));

    const event = new Event({
      userId,
      type: type.trim(),
      data,
      idempotencyKey: idempotencyKey.trim(),
      endpointIds: activeEndpoints.map((endpoint) => endpoint._id),
    });

    await event.save();

    console.log('Event saved:', String(event._id));

    const deliveries = await Delivery.insertMany(
      activeEndpoints.map((endpoint) => ({
        userId,
        eventId: event._id,
        endpointId: endpoint._id,
        event: event.type,
        status: 'pending',
        requestPayload: {
          id: String(event._id),
          type: event.type,
          data: event.data,
          createdAt: event.createdAt,
        },
      }))
    );

    for (let i = 0; i < deliveries.length; i++) {
      const delivery = deliveries[i];
      const endpoint = activeEndpoints[i];

      setImmediate(() => {
        dispatchDelivery(
          delivery._id,
          endpoint.url,
          delivery.requestPayload
        ).catch((error) => {
          console.error('Unexpected dispatch error:', error.message);
        });
      });
    }

    return res.status(201).json({
      message: 'Event created successfully',
      event,
      deliveriesCreated: deliveries.length,
    });
  } catch (error) {
    if (error.code === 11000) {
      try {
        const existingEvent = await Event.findOne({
          userId: req.user.userId,
          idempotencyKey: req.headers['idempotency-key'],
        });

        return res.status(200).json({
          message: 'Event already exists',
          existingEvent,
        });
      } catch (lookupError) {
        console.error(lookupError);
      }
    }

    console.error('Event creation failed:', error);

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const getEvent = async (req, res) => {
  try {
    const events = await Event.find({
      userId: req.user.userId,
    })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json(events);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = { saveEvent, getEvent };