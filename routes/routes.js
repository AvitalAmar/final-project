
const express = require('express');
const {registerView, loginView, registerUser, loginUser } = require('../controllers/loginController');
const router = express.Router();
const { protectRoute } = require("../auth/protect");
const { dashboardView } = require("../controllers/dashboardController");

router.get('/', registerView);
router.get('/register', registerView);
router.get('/login', loginView);
router.get("/dashboard", protectRoute, dashboardView);
router.get("/logout", loginView);

router.get("/dashboard", protectRoute, dashboardView);
router.get("/clearFilters", protectRoute, dashboardView);
router.post("/filterColorProductTable", filterColorProductTable);
router.post("/filterBrandProductTable", filterBrandProductTable);
router.post("/filterPriceProductTable", filterPriceProductTable);
router.post("/filterThreeParams", filterThreeParams);

router.post("/buy", buy);
router.post("/getPurchases", getPurchases);
router.post("/deletePurchase", deletePurchase);
module.exports = router;

