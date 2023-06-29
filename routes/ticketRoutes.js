const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

router
    .route('/')
    .get(ticketController.getAllTickets);

router.get('/buy/:id', ticketController.getBuyTicket);
router.post('/buy/:id', ticketController.postBuyTicket);

module.exports = router;
