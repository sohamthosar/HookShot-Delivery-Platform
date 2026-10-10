
const axios = require('axios');
const Delivery = require('../models/Delivery');

const dispatchDelivery = async (deliveryId, endpointUrl, payload) => {
  const startedAt = Date.now();

  try {
    const response = await axios.post(endpointUrl, payload, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'X-HookShot-Delivery': String(deliveryId),
        'X-HookShot-Event': payload.type,
      },
      maxRedirects: 0,
    });

    const success =
      response.status >= 200 && response.status < 300;

    await Delivery.findByIdAndUpdate(deliveryId, {
      status: success ? 'success' : 'failed',
      httpStatus: response.status,
      responseTimeMs: Date.now() - startedAt,
      responseBody:
        typeof response.data === 'string'
          ? response.data.slice(0, 5000)
          : JSON.stringify(response.data).slice(0, 5000),
      errorMessage: success ? null : `HTTP ${response.status}`,
      deliveredAt: success ? new Date() : null,
    });
  } catch (error) {
    const response = error.response;

    let responseBody = null;

    if (response?.data !== undefined) {
      responseBody =
        typeof response.data === 'string'
          ? response.data.slice(0, 5000)
          : JSON.stringify(response.data).slice(0, 5000);
    }

    try {
      await Delivery.findByIdAndUpdate(deliveryId, {
        status: 'failed',
        httpStatus: response?.status ?? null,
        responseTimeMs: Date.now() - startedAt,
        responseBody,
        errorMessage: response
          ? `HTTP ${response.status}`
          : error.code === 'ECONNABORTED'
            ? 'Request timed out'
            : (error.message || 'Delivery failed').slice(0, 500),
        deliveredAt: null,
      });
    } catch (dbError) {
      console.error('Could not save delivery result:', dbError.message);
    }
  }
};

module.exports = { dispatchDelivery };