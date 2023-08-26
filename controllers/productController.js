var productTable = require("../models/product");

const createProduct = (req, res) => {
  const { category, description, price, color, size, brand, url } = req.body;

  const product_instance = new productTable({
    category: category,
    description: description,
    price: price,
    color: color,
    size: size,
    brand: brand,
    url: url,
  });
  product_instance.save().then(() => {
    productTable.find().then((docs, err) => {
      if (!err) {
        res.render("dashboardCustomer", {
          user: req.user,
          productData: docs,
          google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
        });
      } else {
        console.log("Failed to retrieve the Product List: " + err);
      }
    });
  });
};

const changeProductTable = (req, res) => {
  const { id, category, description, price, color, size, brand, url } =
    req.body;

  if (req.body.submit == "Edit") {
    const update = {
      category: category,
      description: description,
      price: price,
      color: color,
      size: size,
      brand: brand,
      url: url,
    };
    productTable.findByIdAndUpdate(id, update, { new: true }).then(() => {
      productTable.find().then((docs, err) => {
        if (!err) {
          res.render("dashboardCustomer", {
            user: req.user,
            productData: docs,
            google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
          });
        } else {
          console.log("Failed to update the Product List: " + err);
        }
      });
    });
  } else if (req.body.submit == "Delete") {
    productTable.findByIdAndRemove(id, { new: true }).then(() => {
      productTable.find().then((docs, err) => {
        if (!err) {
          res.render("dashboardCustomer", {
            user: req.user,
            productData: docs,
            google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
          });
        } else {
          console.log("Failed to retrieve the Product List: " + err);
        }
      });
    });
  }
};

const getPriceRange = ({ min_price, max_price }) => {
  const price = {};
  if (!min_price && !max_price) return {};
  if (min_price) price.$lte = parseInt(min_price);
  if (max_price) price.$gte = parseInt(max_price);
  return { price };
};

const filterProductTable = (req, res) => {
  console.log(req.body);
  const entries = Object.entries(req.body).filter(([key, val]) => Boolean(val));
  const dataObj = Object.fromEntries(entries);
  const { min_price, max_price, ...rest } = dataObj;
  const data = {
    ...rest,
    ...getPriceRange({ min_price, max_price }),
  };

  productTable.find(data).then((docs, err) => {
    if (err) return res.status(500).end();
    return res.render("dashboardUser", {
      user: req.user,
      productData: docs,
      google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
    });
  });
};

module.exports = {
  createProduct,
  changeProductTable,
  filterProductTable,
};
