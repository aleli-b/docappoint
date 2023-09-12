require("dotenv").config({ path: "./.env" });
const moment = require("moment-timezone");
const cron = require("node-cron");
const { Turno, User } = require("../db");
const { Op } = require("sequelize");

async function getOccupiedTurnos(req, res) {
  try {
    const turnoDB = await Turno.findAll({
      include: ["paciente", "doctor"]
    });
    return res.status(200).json(turnoDB);
  } catch (error) {
    console.log(error);
    res.status(400).send("Ha habido un error.");
  }
}

async function addTurno(userData) {
  const { date, userId, doctorId, labId, type } = userData;  
  console.log(date, userId, doctorId, labId, type)
  try {
    const pacienteHasTurno = await Turno.findOne({
      where: { userId },
      include: "paciente",
    });
    if (doctorId) {
      const doctorCheck = await Turno.findOne({
        where: { doctorId },
        include: "doctor",
      });
      if (doctorCheck && date === doctorCheck.date) {
        console.log("The Doctor already has a turno");
        return ("The Doctor already has a turno");
      }
    } else {
      const labCheck = await Turno.findOne({
        where: { labId },
        include: "lab",
      });


      if (labCheck && date === labCheck.date) {
        console.log("The Lab already has a turno");
        return ("The Lab already has a turno");
      }
    }

    // if (pacienteHasTurno) {
    //   console.log("The User already has a turno");
    //   return ("The User already has a turno");
    // }

    const turno = await Turno.create({ date, userId, doctorId, labId, type });
    return (turno.id);
  } catch (error) {
    console.error(error);
    return ("Error creating turno");
  }
}

async function addOccupiedTurno(req, res) {
  const { date, userId, doctorId } = req.body;
  try {

    const doctorCheck = await Turno.findOne({
      where: { doctorId },
    });

    if (doctorCheck && date === doctorCheck.date) {
      return res.status(403).send("El doctor ya tiene turno para este horario.");
    }

    const turno = await Turno.create({ date, userId, doctorId });
    return res.status(200).send(turno.id);

  } catch (error) {
    return res.status(400).send("Error creating turno");
  }
}

async function getPacienteTurno(req, res) {
  try {
    const { userId } = req.body;
    const turno = await Turno.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: "doctor",
          attributes: { exclude: ["password"] },
        },
        {
          model: User,
          as: "lab",
          attributes: { exclude: ["password"] },
        },
      ],      
    });

    if (!turno) return res.status(404).send("chpalabola");
    return res.status(200).send(turno);
  } catch (error) {
    console.log(error);
    res.status(400).send("Ha habido un error");
  }
}

async function getDoctorTurno(req, res) {
  try {
    const { doctorId } = req.body;
    const turno = await Turno.findAll({
      where: { doctorId },
      include: [
        {
          model: User,
          as: "paciente",
          attributes: { exclude: ["password"] },
        },
      ],
    });

    if (!turno) return res.status(404).send("chpalabola");
    return res.status(200).send(turno);
  } catch (error) {
    console.log(error);
    res.status(400).send("Ha habido un error");
  }
}

async function getLabTurno(req, res) {
  try {
    const { labId } = req.body;
    console.log('labId: ',labId)
    const turno = await Turno.findAll({
      where: { labId: labId, },
      include: [
        {
          model: User,
          as: "paciente",
          attributes: { exclude: ["password"] },
        },
      ],
    });

    if (!turno) return res.status(404).send("chpalabola");
    console.log('turno: ', turno)
    return res.status(200).send(turno);
  } catch (error) {
    console.log(error);
    res.status(400).send("Ha habido un error");
  }
}

async function deletePastTurnos(dateString) {
  try {
    const currentDateUTC = moment.utc(dateString, "YYYY-MM-DD HH:mm").toDate();

    const deletedTurnos = await Turno.destroy({
      where: {
        date: {
          [Op.lt]: currentDateUTC,
        },
      },
    });

    console.log(`Deleted ${deletedTurnos} past turnos at ${currentDateUTC}`);
  } catch (error) {
    console.error(error);
  }
}
cron.schedule("0 0 * * *", deletePastTurnos);

module.exports = {
  getOccupiedTurnos,
  addTurno,
  addOccupiedTurno,
  getPacienteTurno,
  getDoctorTurno,
  getLabTurno,
};