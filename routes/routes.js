const express = require('express');
const {registerView, loginView, registerUser, loginUser } = require('../controllers/loginController');
const router = express.Router();
const { protectRoute } = require("../auth/protect");
const { dashboardView } = require("../controllers/dashboardController");
const { createProduct, changeProductTable, filterColorProductTable, filterBrandProductTable, filterPriceProductTable, filterThreeParams } = require("../controllers/productController");
const { buy, getPurchases, deletePurchase, purchaseSumAverage } = require("../controllers/purchaseController");
const { getAllUsers } = require("../controllers/adminController");
const { getCurrency } = require("../controllers/webserviceController");
const { playVideo } = require("../controllers/videoController");
const { addBranch, getBranches, deleteBranch } = require("../controllers/branchController");
const { createFBPosting} = require("../controllers/facebookController");

router.get('/', registerView);
router.get('/register', registerView);
router.get('/login', loginView);
router.get("/dashboard", protectRoute, dashboardView);
router.get("/logout", loginView);

router.get("/clearFilters", protectRoute, dashboardView);

router.get('/video', playVideo);


router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/getAllUsers", getAllUsers);

router.post("/createProduct", createProduct);
router.post("/changeProductTable", changeProductTable);
router.post("/filterColorProductTable", filterColorProductTable);
router.post("/filterBrandProductTable", filterBrandProductTable);
router.post("/filterPriceProductTable", filterPriceProductTable);
router.post("/filterThreeParams", filterThreeParams);

router.post("/buy", buy);
router.post("/getPurchases", getPurchases);
router.post("/deletePurchase", deletePurchase);
router.post("/purchaseSumAverage", purchaseSumAverage);

router.post("/getCurrency", getCurrency);

router.post("/addBranch", addBranch);
router.post("/getBranches", getBranches);
router.post("/deleteBranch", deleteBranch);

router.post("/createFBPosting", createFBPosting);

module.exports = router;
