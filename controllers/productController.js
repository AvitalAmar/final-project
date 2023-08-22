var productTable = require('../models/product');

const createProduct = (req, res) => {
    const { category, description, price, color, size, brand, url } = req.body;

    const product_instance = new productTable({ category: category, description: description, price:price, color:color, size:size, brand:brand, url: url });
      product_instance.save().then(() => {
      productTable.find().then((docs, err) => {
        if (!err) {
          res.render("dashboardCustomer", {
            user: req.user, 
            productData: docs,
            google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
          });
        } else {
            console.log('Failed to retrieve the Product List: ' + err);
        }
      });   
    }); 
};

const changeProductTable = (req, res) => {
    
    const { id, category, description, price, color, size, brand, url } = req.body;
    
    if ( req.body.submit == "Edit")
    {
        const update = { category: category, description: description, price: price, color: color, size: size, brand: brand, url: url };
        productTable.findByIdAndUpdate(id, update, {new: true}).then(() => {
            productTable.find().then((docs, err) => {
              if (!err) {
                res.render("dashboardCustomer", {
                  user: req.user, 
                  productData: docs,
                  google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
                });
              } else {
                  console.log('Failed to update the Product List: ' + err);
              }               
            });            
        }); 
    }
    else if ( req.body.submit == "Delete")
    {
        productTable.findByIdAndRemove(id, {new: true}).then(() => {
            productTable.find().then((docs, err) => {
              if (!err) {
                res.render("dashboardCustomer", {
                  user: req.user, 
                  productData: docs,
                  google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
                });
              } else {
                  console.log('Failed to retrieve the Product List: ' + err);
              }
            });   
        }); 
    }
}

const filterColorProductTable = (req, res) => {
    const { filter_color } = req.body;
  
    productTable.find({color: filter_color}).then((docs, err) => {
        if (!err) {
          res.render("dashboardUser", {
            user: req.user, productData: docs, google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
          });
        } else {
            console.log('Failed to retrieve the Product List: ' + err);
        }
    });
};

const filterBrandProductTable = (req, res) => {
    const { filter_brand } = req.body;
  
    productTable.find({brand: filter_brand}).then((docs, err) => {
        if (!err) {
          res.render("dashboardUser", {
            user: req.user, productData: docs, google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
          });
        } else {
            console.log('Failed to retrieve the Product List: ' + err);
        }
    });
};

const filterPriceProductTable = (req, res) => {
    const { price_from, price_to } = req.body;
  
    productTable.find({ price: { $lte: parseInt(price_to), $gte: parseInt(price_from) } }).then((docs, err) => {
        if (!err) {
          res.render("dashboardUser", {
            user: req.user, productData: docs, google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
          });
        } else {
            console.log('Failed to retrieve the Product List: ' + err);
        }
    });
};

const filterThreeParams = (req, res) => {
  const { brand, size, color } = req.body;

  productTable.find({ brand: brand, size: size, color: color }).then((docs, err) => {
    if (!err) {
      res.json(docs);
    } else {
        console.log('Failed to retrieve the Product List: ' + err);
        console.log('check');
    }
  });
};

module.exports = {
    createProduct,
    changeProductTable,
    filterColorProductTable,
    filterBrandProductTable,
    filterPriceProductTable,
    filterThreeParams,
};