const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    purchaseTime: {
        type: Date,
        required: true,
    },
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

const purchaseTable = mongoose.model("purchases", PurchaseSchema);

module.exports = purchaseTable;