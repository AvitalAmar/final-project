var productTable = require("../models/product");

const dashboardView = (req, res) => {
  if (req.user.role == "admin") {
    res.render("dashboardAdmin", {
      user: req.user,
      google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
    });
  } else if (req.user.role == "customer") {
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
  } else if (req.user.role == "user") {
    productTable.find().then((docs, err) => {
      if (!err) {
        res.render("dashboardUser", {
          user: req.user,
          productData: docs,
          google_maps_api_key: process.env.GOOGLE_MAPS_KEY,
        });
      } else {
        console.log("Failed to retrieve the Product List: " + err);
      }
    });
  }
};

const about = (req, res) => {
  res.render("about");
};

const policy = (req, res) => {
  res.render("policy");
};

module.exports = {
  dashboardView,
  about,
  policy,
};
