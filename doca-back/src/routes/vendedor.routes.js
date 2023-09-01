const { Router } = require('express');
const router = Router();
const vendedorController = require('../controllers/vendedor.controller');
const jwtVerify = require('../middlewares/isAuth')

router.post('/getAssignedDoctors', vendedorController.getAssignedDoctors)

router.get('/getUnassignedDoctors/', vendedorController.getUnassignedDoctors)

router.post('/assignDoctors/', vendedorController.assignDoctors)



module.exports = router;