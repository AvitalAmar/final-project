const Ticket = require('../models/ticketModel');
const Purchase = require('../models/Purchase');

exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).render('tickets', { tickets: tickets });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getBuyTicket = function(req, res) {
    // Get the ticket details
    console.log("IM HERE!!!!!!!!!!")
    Ticket.findById(req.params.id, function(err, ticket) {
        if(err) {
            console.error(err);
            res.redirect('/tickets');
        } else {
            res.render('buy', { ticket: ticket });
        }
    });
};

exports.postBuyTicket = function(req, res) {
    // Create a new purchase
    const newPurchase = new Purchase({
        userId: req.user._id, // This assumes you have session management set up
        ticketId: req.params.id
    });

    newPurchase.save(function(err) {
        if(err) {
            console.error(err);
            res.redirect('/tickets');
        } else {
            res.redirect('/tickets'); // Or maybe to a "purchase successful" page
        }
    });
};
