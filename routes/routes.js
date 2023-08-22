router.get("/dashboard", protectRoute, dashboardView);
router.get("/clearFilters", protectRoute, dashboardView);
router.post("/filterColorProductTable", filterColorProductTable);
router.post("/filterBrandProductTable", filterBrandProductTable);
router.post("/filterPriceProductTable", filterPriceProductTable);
router.post("/filterThreeParams", filterThreeParams);

router.post("/buy", buy);
router.post("/getPurchases", getPurchases);
router.post("/deletePurchase", deletePurchase);