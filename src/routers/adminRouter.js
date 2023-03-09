const router = require('express').Router();
const adminController = require('../controllers/adminController');
const validetorMiddleware = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

/*get*/   
router.get('/', authMiddleware.oturumAcilmis, adminController.showHomePage);

router.post('/firmaekle', authMiddleware.oturumAcilmis,adminController.CompanyAdd)
router.post('/kullaniciEkle', authMiddleware.oturumAcilmis,adminController.UserAdd)
module.exports = router;