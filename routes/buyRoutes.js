const express = require('express');
const ticketsController = require('./controllers/ticketsController');

const router = express.Router();

// Existing routes here

router.get('/tickets/buy/:id', ticketsController.getBuyTicket);
router.post('/tickets/buy/:id', ticketsController.postBuyTicket);

module.exports = router;