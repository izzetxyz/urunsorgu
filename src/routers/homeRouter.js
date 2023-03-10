const router = require('express').Router();
const homeController = require('../controllers/homeController');


//GET

router.get('/', homeController.homeShow);

router.post('/dbEkle',homeController.dbekle)
router.post('/api/getBarcode',homeController.getBarcode)

router.post('/api/getBarcodev2',homeController.getBarcode_v2)
router.post('/api/login',homeController.loginPost)
router.post('/api/getOthers',homeController.getOthers)
module.exports = router;