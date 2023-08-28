require("dotenv").config({ path: "./.env" });
const moment = require("moment-timezone");
const cron = require("node-cron");
const { User, Subscriptions } = require("../db");
const { Op } = require("sequelize");

async function updateSubscriptions() {
  try {
    const fechaActual = moment().startOf("day");
    const users = await User.findAll({
      where: {
        subscription: true,
      },
    });

    let usuariosActualizados = 0; // Contador de usuarios actualizados

    for (const user of users) {
      const { id: userId } = user;
      const suscripcion = await Subscriptions.findOne({
        where: {
          userId,
        },
      });

      if (suscripcion) {
        const fechaBaja = moment(suscripcion.fechaBaja, "DD/MM/YYYY");

        if (fechaBaja.isSameOrBefore(fechaActual)) {
          const [rowsUpdated, updatedUsers] = await User.update(
            { subscription: false },
            { where: { id: userId }, returning: true }
          );
          if (rowsUpdated > 0) {
            usuariosActualizados += rowsUpdated;
            console.log(
              `Estado de suscripción actualizado para el usuario con ID ${userId}`
            );
          }
        }
      }
    }

    console.log(
      `Estado de suscripciones actualizado. Usuarios actualizados: ${usuariosActualizados}`
    );
  } catch (error) {
    console.error("Error al actualizar las suscripciones:", error);
  }
}

cron.schedule("0 0 * * *", async () => {
  await updateSubscriptions();
});

async function setSubscriptions(time, userId) {
  try {
    const fechaActual = moment().startOf("day");
    const fechaBaja = fechaActual
      .clone()
      .add(time, "months")
      .format("DD/MM/YYYY");

    await User.update({ subscription: true }, { where: { id: userId } });

    await Subscriptions.create({
      userId,
      fechaAlta: fechaActual.format("DD/MM/YYYY"),
      fechaBaja,
    });

    console.log(`Suscripción creada para el usuario con ID ${userId}`);
  } catch (error) {
    console.error("Error al establecer las suscripciones:", error);
  }
}

module.exports = {
  updateSubscriptions,
  setSubscriptions,
};
