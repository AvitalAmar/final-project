const express = require('express');
const mongoose = require('mongoose');
const ticketRouter = require('./routes/ticketRoutes');
const app = express();
const path =require('path')
app.use(express.json());

app.set('view engine', 'ejs');
mongoose.connect('mongodb+srv://shovalfruchter:Ss12345678@cluster0.0qye94h.mongodb.net/test')
app.use('/tickets', ticketRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
   
}); 
    
app.listen(3000, () => console.log('Server is running on port 3000'));

module.exports = app;
