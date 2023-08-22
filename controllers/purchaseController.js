const moment = require('moment');
var purchaseTable = require('../models/purchase');

const buy = (req, res) => {
    const { purchaseList } = req.body;
    purchaseTable.insertMany(purchaseList).then((result) => {
        res.json(result);
    });
};

const getPurchases = (req, res) => {
    const { userId } = req.body;

    purchaseTable.aggregate([
        { "$match": { userId: userId } },
        {
          $group: { _id: "$purchaseTime",  records: { $push: "$$ROOT" } }
        }
      ]).then((result) => {
        res.json(result);
    });    
};

const deletePurchase = (req, res) => {
    const { purchaseTime } = req.body;
    const startDate = moment(purchaseTime, 'hh:mm a MMM DD YYYY').startOf('minute');
    const endDate = moment(purchaseTime, 'hh:mm a MMM DD YYYY').endOf('minute');
    purchaseTable.deleteMany({ purchaseTime: {
                                  $gte: startDate.toDate().toISOString(),
                                  $lt: endDate.toDate().toISOString(),
                              }
    }).then((result) => {
        res.json(result);
    });    
};

const purchaseSumAverage = (req, res) => {
    
    const { date_from, date_to } = req.body;

    const queryTime = new Date(date_to);
    const days = (new Date(date_to) - new Date(date_from)) / (1000 * 3600 * 24);
    var datesOfWeek = []; 
    
    for ( i = days - 1; i >= 0; i = i - 1 )
    {        
        var purchaseTime = new Date();
        purchaseTime.setDate(queryTime.getDate() - i);
        datesOfWeek.push(purchaseTime);
    }    
    
    purchaseTable.aggregate([
        {
            $bucket: {
              groupBy: "$purchaseTime",
              boundaries: datesOfWeek,
              default: queryTime.getDate() - days,
              output: {
                "count": { $sum: 1 },
                "sum" : { $sum: "$price" }
              }
            }
        }
    ]).then((result) => {
        res.json(result);
    });    
};

module.exports = {
    buy,   
    getPurchases, 
    deletePurchase,
    purchaseSumAverage,
};