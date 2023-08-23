const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {     
     type: String,  
     required: true,     
    }, 
    size: {     
      type: String,       
      required: true,  
    }, 
    brand: {     
      type: String,       
      required: true,
    },  
    url: 
    {     
      type: String,       
      required: false,
      default: "",
    },  
});

const productTable = mongoose.model("products", ProductSchema);

module.exports = productTable;