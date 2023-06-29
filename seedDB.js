const mongoose = require('mongoose');
const Ticket = require('./models/ticketModel');

const data = [
    {
        title: 'Concert 1',
        price: 50,
        date: new Date('2023-07-01T20:00:00')
    },
    {
        title: 'Concert 2',
        price: 75,
        date: new Date('2023-07-15T19:00:00')
    },
    {
        title: 'Concert 3',
        price: 100,
        date: new Date('2023-08-01T21:00:00')
    },
    // Add more tickets as needed
];

mongoose.connect('mongodb+srv://shovalfruchter:Ss12345678@cluster0.0qye94h.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB connection open!');
        // return mongoose.connection.db.dropDatabase();
    })
    .then(() => {
        return Ticket.insertMany(data);
    })
    .then((tickets) => {
        console.log('Tickets seeded:', tickets);
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.error('Seed error:', err);
    });
