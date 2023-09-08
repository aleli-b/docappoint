const { Router } = require('express');
const router = Router();
const turnoController = require('../controllers/turno.controller');
const jwtVerify = require('../middlewares/isAuth')

router.post('/occupied-turnos', /* jwtVerify, */ turnoController.addOccupiedTurno)

router.get('/turnos-ocupados', /* jwtVerify, */ turnoController.getOccupiedTurnos)

router.post('/user-turnos', /* jwtVerify, */ turnoController.getPacienteTurno)

router.post('/doctor-turnos', /* jwtVerify, */ turnoController.getDoctorTurno)

router.post('/lab-turnos', /* jwtVerify, */ turnoController.getLabTurno)

module.exports = router;