const express = require('express');
const {registerView, loginView, registerUser, loginUser } = require('../controllers/loginController');
const router = express.Router();
const { protectRoute } = require("../auth/protect");


router.get('/', registerView);
router.get('/register', registerView);
router.get('/login', loginView);
router.get("/dashboard", protectRoute, dashboardView);
router.get("/logout", loginView);

module.exports = router;
