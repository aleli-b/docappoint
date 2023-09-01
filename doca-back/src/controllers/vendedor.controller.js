require("dotenv").config({ path: "./.env" });
const bodyParser = require("body-parser");
const { Op, sequelize } = require("sequelize");
const { User, Vendedor } = require("../db");

async function getAssignedDoctors(req, res) {
  try {
    const id = req.body.id;

    // Obtener todos los registros de vendedores con el ID proporcionado
    const vendedores = await Vendedor.findAll({ where: { vendedorId: id } });

    if (vendedores.length === 0) {
      return res.json(null);
    }

    // Obtener los IDs de los médicos asignados
    const doctorIds = vendedores.map((vendedor) => vendedor.doctorId);

    // Consultar en la tabla User para obtener la información de los médicos asignados
    const users = await User.findAll({ where: { id: { [Op.in]: doctorIds } } });

    // Crear un objeto de mapeo para acceder más rápido a los datos de los médicos por ID
    const userMap = users.reduce((map, user) => {
      map[user.id] = user;
      return map;
    }, {});

    // Crear un arreglo de médicos con la información requerida
    const doctors = vendedores.map((vendedor) => {
      const user = userMap[vendedor.doctorId];
      return {
        doctorId: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        clabe: user.clabe,
        category: user.category,
        profilePicture: user.profile_picture_url,
      };
    });

    res.json(doctors);
  } catch (error) {
    console.error("Error en getDoctors:", error);
    res.status(500).json({ error: "Ocurrió un error al obtener los médicos" });
  }
}

async function getUnassignedDoctors(req, res) {
  try {
    const assignedDoctorIds = await Vendedor.findAll({
      attributes: ["doctorId"],
    });

    const assignedDoctorIdsValues = assignedDoctorIds.map(
      (vendedor) => vendedor.doctorId
    );

    const unassignedDoctors = await User.findAll({
      where: {
        userType: "doctor",
        id: { [Op.notIn]: assignedDoctorIdsValues },
        subscription: true,
      },
      attributes: [
        "id",
        "name",
        "lastName",
        "email",
        "phone",
        "clabe",
        "category",
        "profile_picture_url",
      ],
    });

    if (unassignedDoctors.length === 0) {
      return res.json(null);
    }

    const doctors = unassignedDoctors.map((doctor) => ({
      doctorId: doctor.id,
      name: doctor.name,
      lastName: doctor.lastName,
      email: doctor.email,
      phone: doctor.phone,
      clabe: doctor.clabe,
      category: doctor.category,
      profilePicture: doctor.profile_picture_url,
    }));

    res.json(doctors);
  } catch (error) {
    console.error("Error en getUnassignedDoctors:", error);
    res
      .status(500)
      .json({ error: "Ocurrió un error al obtener los médicos no asignados" });
  }
}



async function assignDoctors(req, res) {
    const { vendedorId, doctors } = req.body;
  
    try {
      await Promise.all(
        doctors.map(async (doctorId) => {
          await Vendedor.create({ vendedorId, doctorId });
        })
      );
        
      return res.status(200).json({ message: 'Doctores asignados correctamente' });
    } catch (error) {
      console.error('Error al asignar doctores:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

module.exports = {
  getAssignedDoctors,
  getUnassignedDoctors,
  assignDoctors
};
