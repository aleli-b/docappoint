const { Router } = require('express');
const router = Router();
const turnoController = require('../controllers/subscription.controller');
const jwtVerify = require('../middlewares/isAuth')

router.get('/turnos-ocupados', /* jwtVerify, */ turnoController.updateSubscriptions)

module.exports = router;