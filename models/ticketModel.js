const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A ticket must have a title'],
    },
    price: {
        type: Number,
        required: [true, 'A ticket must have a price'],
    },
    date: {
        type: Date,
        required: [true, 'A ticket must have a date'],
    },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
