import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Container, Typography } from "@mui/material";
import axios from "axios";
const svHost = import.meta.env.VITE_HOST;

export const AdminTable = ({ users, handleUserBanState, handleUserVerifyState }) => {
  const [turnos, setTurnos] = React.useState([]);

  async function getTurnos() {
    try {
      const response = await axios.get(`${svHost}/turnos-ocupados`);
      setTurnos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      return console.error(error);
    }
  }

  React.useEffect(() => {
    getTurnos();
  }, []);

  const columns = [
    {
      field: "fullName",
      headerName: "Nombre Completo",
      description: "Ésta columna no es ordenable.",
      sortable: false,
      width: 200,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "age",
      headerName: "Fecha de nacimiento",
      width: 200,
    },

    { field: "admin", headerName: "Administrador", width: 200 },
    { field: "userType", headerName: "Tipo de Usuario", width: 200 },
    { field: "category", headerName: "Especialidad", width: 200 },
    { field: "clabeBancaria", headerName: "Clabe bancaria", width: 200 },
    {
      field: "cedula", headerName: "Cédula", width: 200, renderCell: (params) => (
        <Box>
          {params.row.userType === 'Doctor'
            ?
            params.row.cedula
              ?
              <a href={params.row.cedula} target="blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white', }}>
                <Typography sx={{ '&:hover': { color: 'red' }, fontSize: '1em', }}>Ver Cedula</Typography>
              </a>
              :
              'Sin Cédula'
            :
            "-"
          }
        </Box>
      )
    },
    { field: "verificacion", headerName: "Verificación", width: 200 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) =>
        params.row.userType === "Doctor" ? (
          params.row.verificacion === "Verificada" ? (
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                handleUserVerifyState(params.row.id);
              }}
            >
              Inhabilitar
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="success"
              onClick={() => handleUserVerifyState(params.row.id)}
            >
              Verificar
            </Button>
          )
        ) : "-",
    },
  ];

  const rows = users.map((user, i) => ({
    id: user.id,
    num: i + 1,
    lastName: user.lastName,
    firstName: user.name,
    age: user.age,
    clabeBancaria: user.userType === "doctor" ? user.clabe : "-",
    cedula: user.cedula_url,
    verificacion: user.userType === "doctor"
      ? user.cedulaVerified === false
        ? "No Verificada"
        : "Verificada"
      : "-",
    admin: user.admin,
    userType: user.userType[0].toUpperCase() + user.userType.substring(1),
    category: user.userType === "doctor"
      ?
      user.category
      :
      "-"
    ,
    actions: () => handleUserBanState(user.id),
  }));

  // Columnas y filas de los todos los turnos existentes
  const columnsTurnos = [
    { field: "turnoDate", headerName: "Fecha turno", width: 200 },
    { field: "patientName", headerName: "Paciente", width: 200 },
    { field: "doctorName", headerName: "Doctor", width: 200 },
    { field: "id", headerName: "ID Turno", width: 400 },
  ];
  const rowsTurnos = turnos.map((data, i) => ({
    turnoDate: data.date,
    patientName: `${data.paciente.name} ${data.paciente.lastName}`,
    doctorName: `${data.doctor.name} ${data.doctor.lastName}`,
    id: data.id,
  }));

  return (
    <Box>
      <Box
        className="tittle"
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Typography variant="h3" sx={{ fontFamily: "work sans" }}>
          Usuarios
        </Typography>
      </Box>
      <Box
        className="gridUsers"
        sx={{ width: "100%", padding: 2 }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Box>
      <Box
        className="tittle"
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Typography variant="h3" sx={{ fontFamily: "work sans" }}>
          Turnos
        </Typography>
      </Box>
      {turnos !== null ? (
        <Box
          className="gridTurnos"
          sx={{ width: "100%", padding: 2 }}
        >
          <DataGrid
            rows={rowsTurnos}
            columns={columnsTurnos}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </Box>
      ) : (
        <Typography variant="h5">No hay turnos</Typography>
      )}
    </Box>
  );
};
