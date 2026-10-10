const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const { getEndpoints, createEndpoints, updateEndpoints, deleteEndpoints } = require('../controllers/endpointControllers')

const router = express.Router();

router.post('/', authMiddleware, createEndpoints);
router.get('/', authMiddleware, getEndpoints);
router.patch('/:id', authMiddleware, updateEndpoints);
router.delete('/:id', authMiddleware, deleteEndpoints);

module.exports = router;