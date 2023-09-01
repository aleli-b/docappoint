import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Typography,
  Modal,
  Avatar,
  CircularProgress,
  Divider,
  SvgIcon,
  useMediaQuery,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { Table } from "./Table";
import { toast } from "react-toastify";
const svHost = import.meta.env.VITE_HOST;

export const AdminTable = ({
  users,
  handleUserBanState,
  handleUserVerifyState,
}) => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [turnos, setTurnos] = React.useState([]);
  const [openAD, setOpenAD] = React.useState(false);
  const [openUD, setOpenUD] = React.useState(false);
  const [modalData, setModalData] = React.useState([]);
  const [isLoadingAD, setIsLoadingAD] = React.useState(false);
  const [isLoadingUD, setIsLoadingUD] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [doctorList, setDoctorList] = React.useState([]);

  async function getTurnos() {
    try {
      const response = await axios.get(`${svHost}/turnos-ocupados`);
      setTurnos(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getTurnos();
  }, []);

  //Funciones

  const assignDoctor = async (vendedorId) => {
    try {
      const response = await axios.post(`${svHost}/assignDoctors`, {
        vendedorId,
        doctors: doctorList,
      });

      if (response.status === 200) {
        setOpenUD(false);
        toast.success("Doctores asignados correctamente");
      } else {
        toast.error("Error al asignar doctores");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleClick = (index, data) => {
    const selectedDoctorId = data.doctorId;

    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
      setDoctorList(doctorList.filter((item) => item !== selectedDoctorId));
    } else {
      setSelectedItems([...selectedItems, index]);
      setDoctorList([...doctorList, selectedDoctorId]);
    }
  };

  const handleClose = () => {
    setOpenAD(false);
    setOpenUD(false);
    setDoctorList([]);
    setSelectedItems([]);
  };

  const showAssignedDoctors = async (vendedorId) => {
    setIsLoadingAD(true);
    try {
      // Realizar la solicitud POST utilizando Axios
      const response = await axios.post(`${svHost}/getAssignedDoctors/`, {
        id: vendedorId,
      });

      // Manipular los datos recibidos en la respuesta
      const data = response.data;

      // Abrir el modal y pasar los datos
      setIsLoadingAD(false);
      setModalData(data);
      setOpenAD(true);
    } catch (error) {
      // Manejar cualquier error que ocurra durante la solicitud
      console.error("Error en la solicitud:", error);
    }
  };

  const showUnassignedDoctors = async () => {
    setIsLoadingUD(true);
    try {
      const response = await axios.get(`${svHost}/getUnassignedDoctors/`);
      setIsLoadingUD(false);

      setModalData(response.data);
      setOpenUD(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Columnas y filas
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
      field: "cedula",
      headerName: "Cédula",
      width: 200,
      renderCell: (params) => (
        <Box>
          {params.row.userType === "Doctor" ? (
            params.row.cedula ? (
              <a
                href={params.row.cedula}
                target="blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography
                  sx={{ "&:hover": { color: "red" }, fontSize: "1em" }}
                >
                  Ver Cedula
                </Typography>
              </a>
            ) : (
              "Sin Cédula"
            )
          ) : (
            "-"
          )}
        </Box>
      ),
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
        ) : (
          "-"
        ),
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
    verificacion:
      user.userType === "doctor"
        ? user.cedulaVerified === false
          ? "No Verificada"
          : "Verificada"
        : "-",
    admin: user.admin,
    userType: user.userType[0].toUpperCase() + user.userType.substring(1),
    category: user.userType === "doctor" ? user.category : "-",
    actions: () => handleUserBanState(user.id),
  }));

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

  const rowsVendedores = users
    .filter((user) => user.userType === "vendedor")
    .map((user) => ({
      vendedorName: `${user.name} ${user.lastName}`,
      cantDoctores: `${user.cant}`,
      id: user.id,
    }));

  const columnsVendedores = [
    
    { field: "vendedorName", headerName: "Nombre", width: 200 },
    {
      field: "cantDoctores",
      headerName: "Doctores a cargo",
      width: 200,
      renderCell: (params) => (
        <Box>
          {!isLoadingAD ? (
            <Button
              variant="outlined"
              color="success"
              onClick={() => showAssignedDoctors(params.row.id)}
            >
              Ver
            </Button>
          ) : (
            <CircularProgress />
          )}
          <Modal
            open={openAD}
            onClose={handleClose}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              className="modalBox"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: isMobile? "95%":"50rem",
                gap: 5,
                bgcolor: "white",
                borderRadius: 1.5,
                p: 2,
              }}
            >
              <Box className="title">
                <Typography
                  color={"black"}
                  variant={isMobile? "h6":"h5"}
                  fontFamily={"work sans"}
                  fontWeight={"bold"}
                >{`Doctores a cargo de ${params.row.vendedorName}`}</Typography>
              </Box>
              <Box
                className="modalData"
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 3,
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "auto",
                  maxHeight: "15rem",
                }}
              >
                {modalData && modalData !== null ? (
                  modalData.map((data, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        border: "solid",
                        gap: 2,
                        justifyContent: "left",
                        width: "fit-content",
                      }}
                    >
                      <Avatar
                        src={data.profilePicture ? data.profilePicture : null}
                        alt={data.name}
                      />
                      <Typography color={"black"}>
                        {data.name} {data.lastName}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography color={"black"}>
                    No hay doctores asignados
                  </Typography>
                )}
              </Box>
              {modalData !== null ? (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: isMobile? "center":"left",
                    pl: 2,
                  }}
                >
                  <Typography color={"black"} fontWeight={"500"}>
                    {modalData !== null
                      ? `Total de doctores asignados: ${modalData.length}`
                      : `Total de doctores asignados: 0`}
                  </Typography>
                </Box>
              ) : (
                ""
              )}
              <Box className="closeButton" sx={{justifyContent:"center", display:"flex"}}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClose}
                  sx={{ width: "20%" }}
                >
                  Cerrar
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      ),
    },
    {
      field: "assignDoctor",
      headerName: "Acción",
      width: 400,
      renderCell: (params) => (
        <Box>
          {!isLoadingUD ? (
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => showUnassignedDoctors()}
            >
              Asignar Doctores
            </Button>
          ) : (
            <CircularProgress />
          )}
          <Modal
            open={openUD}
            onClose={handleClose}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              className="modalBox"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: isMobile? "95%":"50rem",
                gap: 5,
                bgcolor: "white",
                borderRadius: 1.5,
                p: 2,
              }}
            >
              <Box className="title">
                <Typography
                  color={"black"}
                  variant="h5"
                  fontFamily={"work sans"}
                  fontWeight={"bold"}
                >{`Doctores sin asignar`}</Typography>
              </Box>
              <Box
                className="modalData"
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 3,
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "auto",
                  maxHeight: "15rem",
                }}
              >
                {modalData && modalData !== null ? (
                  modalData.map((data, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        border: selectedItems.includes(index)
                          ? "2px solid green"
                          : "solid",
                        gap: 2,
                        justifyContent: "left",
                        width: "fit-content",
                        borderRadius: 2,
                        cursor: "pointer",
                        p: 1,
                      }}
                      onClick={() => handleClick(index, data)}
                    >
                      <Avatar
                        src={data.profilePicture ? data.profilePicture : null}
                        alt={data.name}
                      />
                      <Typography color={"black"}>
                        {data.name} {data.lastName}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography color={"black"}>
                    No hay doctores que no hayan sido asignados
                  </Typography>
                )}
              </Box>

              {modalData !== null ? (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "left",
                    pl: 2,
                  }}
                >
                  {selectedItems.length === 0 ? (
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1, justifyContent: isMobile? "center":"left", width:"100%"}}>
                      <SvgIcon component={InfoIcon} sx={{ color: "black" }} />
                      <Typography color={"black"} fontWeight={"500"}>
                        Selecciona los medicos a asignar
                      </Typography>
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>
              ) : (
                ""
              )}
              <Box
                className="buttons"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClose}
                  sx={{ width: "fit-content" }}
                >
                  Cerrar
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => assignDoctor(params.row.id)}
                  disabled={selectedItems.length > 0 ? false : true}
                  sx={{
                    width: "fit-content",
                    display: selectedItems.length > 0 ? "" : "none",
                  }}
                >
                  Asignar
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      ),
    },
    { field: "id", headerName: "ID", width: 400 },
  ];

  return (
    <Box>
      <Table row={rows} column={columns} title={"Usuarios"} />
      <Table row={rowsTurnos} column={columnsTurnos} title={"Turnos"} />
      <Table
        row={rowsVendedores}
        column={columnsVendedores}
        title={"Vendedores"}
      />
    </Box>
  );
};
