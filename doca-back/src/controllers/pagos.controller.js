require("dotenv").config({ path: "./.env" });
const bodyParser = require("body-parser");
const { Pago, User, Turno, Labtest } = require("../db");
const transporter = require('../utils/mailer');
const axios = require("axios");

async function setPago(userData, turnoId) {
  const { paymentId } = userData;
  try {
    const pago = await Pago.create({ paymentId, turnoId: turnoId });
    return;
  } catch (error) {
    return;
  }
}

async function getPago(req, res) {
  const pagoId = req.params.pagoId;
  try {
    const pago = await Pago.findAll({
      where: {
        id: pagoId,
      },
      include: [
        {
          model: Turno,
          as: "turnoPay",
          include: [
            {
              model: User,
              as: "paciente",
            },
          ],
        },
      ],
    });
    return res.status(200).send(pago);
  } catch (error) {
    console.error(error);
  }
}

async function getConsultas(req, res) {
  const userId = req.params.userId;
  try {
    const pagos = await Pago.findAll({
      include: [
        {
          model: Turno,
          as: "turnoPay",
          where: { userId },
          include: [
            {
              model: User,
              as: "doctor",
              attributes: [
                "name",
                "lastName",
                "userType",
                "category",
                "lab_category",
              ],
            },
            {
              model: Labtest,
              attributes: [
                "lab_test_url",
                "labId",
              ],
            },
          ],
        },
      ],
    });
    return res.status(200).send(pagos);
  } catch (error) {
    console.error("Error al obtener los pagos:", error);
    throw error;
  }
}

function sendEmailNotification(userData) {
  const mailOptions = {
    from: process.env.MAILER_MAIL,
    to: userData.doctorEmail,
    subject: 'Nuevo turno registrado',
    text: `Se registró un nuevo turno para el día ${userData.date}hs.\nID del pago: ${userData.paymentId}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Correo electrónico de notificación enviado a:' + ' ' + userData.doctorEmail);
    }
  });
}

module.exports = {
  setPago,
  getPago,
  getConsultas,
  sendEmailNotification,
};
