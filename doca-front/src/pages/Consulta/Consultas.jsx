import {
  Accordion,
  AccordionDetails,
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Rating,
  SvgIcon,
  TextField,
  TextareaAutosize,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../../components/context/AuthContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Valoraciones } from "../../components/Reviews/Reviews";
import { toast } from "react-toastify";
const svHost = import.meta.env.VITE_HOST;
const estudios = [
  {
    tipoEstudio: "Estudio 1",
    fecha: "01/08/2023",
    link: "https://www.ejemplo.com/estudio1.pdf",
  },
  {
    tipoEstudio: "Estudio 2",
    fecha: "05/08/2023",
    link: "https://www.ejemplo.com/estudio2.pdf",
  },
  {
    tipoEstudio: "Estudio 3",
    fecha: "10/08/2023",
    link: "https://www.ejemplo.com/estudio3.pdf",
  },
  {
    tipoEstudio: "Estudio 4",
    fecha: "15/08/2023",
    link: "https://www.ejemplo.com/estudio4.pdf",
  },
  {
    tipoEstudio: "Estudio 5",
    fecha: "20/08/2023",
    link: "https://www.ejemplo.com/estudio5.pdf",
  },
];

const labels = {
  1: "Muy mala",
  2: "Mala",
  3: "Regular",
  4: "Buena",
  5: "Excelente",
};

const handlePdf = (link) => {
  window.open(link, "_blank");
};

export const Consultas = () => {
  const { user } = useAuth();
  const [consultas, setConsultas] = useState([]);
  const [valorated, setValorated] = useState("");
  const [reseña, setReseña] = useState("");
  const getConsultas = async () => {
    try {
      const response = await axios.get(`${svHost}/getConsultas/${user.id}`);
      const pagos = response.data;
      setConsultas(pagos);
    } catch (error) {
      console.error("Error al obtener los pagos:", error);
    }
  };
  async function submitRate() {
    try {
      const valoration = await axios.post(`${svHost}/setValoration/`, {
        turnoId: consultas[0].turnoId,
        valoracion: valorated ? valorated : 0,
        reseña: reseña ? reseña : null,
        userId: user.id,
        doctorId: consultas[0].turnoPay.doctorId,
      });

      if (valoration.status === 200) {
        toast.success("La reseña se envió correctamente");
      } else {
        toast.error("No se pudo enviar la reseña");
      }

      return valoration;
    } catch (error) {
      console.log(error);
    }
  }

  const handleReseñaChange = (event) => {
    setReseña(event.target.value);
  };

  const handleRatingChange = (e) => {
    console.log("Valor seleccionado:", e.target.value);
    setValorated(e.target.value);
  };

  useEffect(() => {
    getConsultas();
  }, []);

  const isMobile = useMediaQuery("(max-width: 900px)");
  
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        gap: 2,
        p: 4,
      }}
    >
      <Box
        className="cabecera"
        sx={{
          width: "90dvw",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "work sans",
            fontWeight: "bold",
            color: "#145C6C",
            fontSize: isMobile ? "2.5rem" : "2rem",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Mis Consultas
        </Typography>
        <Button
          variant="contained"
          href="/"
          sx={{ width: isMobile ? "50dvw" : "20dvw", bgcolor: "#145C6C" }}
        >
          Nueva consulta
        </Button>
      </Box>

      <Box>
        <List sx={{ pt: "2rem", width: isMobile ? "80dvw" : "90dvw" }}>
          {consultas.map((consulta, index) => (
            <React.Fragment key={consulta.id}>
              <Accordion
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: 2,
                  borderRadius: "10px!important",
                }}
              >
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    backgroundColor: "#838383",
                    padding: 4,
                    borderRadius: "10px",
                    maxHeight: "2rem"
                  }}
                >
                  {isMobile ? (
                    <Container
                      id="bardero"
                      className="Mobile"
                      maxWidth={"100%"}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <SvgIcon component={AddIcon} />
                      <Typography>{`Consulta ${index + 1}`}</Typography>

                      <SvgIcon component={ExpandMoreIcon} inheritViewBox />
                    </Container>
                  ) : (
                    <Container
                      id="bardero"
                      className="Desktop"
                      maxWidth={"100%"}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "left",
                          flexBasis: "10%",
                        }}
                      >
                        <SvgIcon component={AddIcon} />
                      </Box>
                      <Typography sx={{ flexBasis: "20%" }}>
                        {`Consulta ${index + 1}`}
                      </Typography>
                      <Typography sx={{ flexBasis: "20%" }}>
                        {moment(consulta.createdAt).format("DD/MM/YYYY")}
                      </Typography>
                      <Typography sx={{ flexBasis: "50%" }}>
                        {consulta.turnoPay.doctor.category}
                      </Typography>

                      <SvgIcon component={ExpandMoreIcon} inheritViewBox />
                    </Container>
                  )}
                </AccordionSummary>

                <AccordionDetails>
                  <Box
                    className="top"
                    sx={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      p: 2,
                      gap: isMobile ? 2 : 2,
                    }}
                  >
                    <Box
                      className="boxLeft"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: isMobile ? 2 : 2,
                        width: isMobile ? "100%" : "50%",
                        p: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          width: "100%",
                          fontFamily: "work sans",
                          fontWeight: "bold",
                          color: "#145C6C",
                          fontSize: isMobile ? "1.4rem" : "2rem",
                          textAlign: isMobile ? "center" : "left",
                        }}
                      >
                        Información del turno
                      </Typography>
                      <Box
                        className="especialistaCategoria"
                        sx={{
                          display: "flex",
                          flexDirection: isMobile ? "column" : "column",
                          gap: isMobile ? "" : 1,
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography>{`Fecha: ${consulta.turnoPay.date}hs `}</Typography>
                        <Typography>{`Especialista: ${consulta.turnoPay.doctor.name} ${consulta.turnoPay.doctor.lastName}`}</Typography>
                        <Typography>{`Médico: ${consulta.turnoPay.doctor.category}`}</Typography>
                      </Box>
                    </Box>
                    <Box
                      className="boxRigth"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: isMobile ? 2 : 2,
                        width: isMobile ? "100%" : "50%",
                        alignItems: "center",
                        p: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          width: "100%",
                          fontFamily: "work sans",
                          fontWeight: "bold",
                          color: "#145C6C",
                          fontSize: isMobile ? "1.2rem" : "2rem",
                          textAlign: "center",
                        }}
                      >
                        Valora tu consulta
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Rating
                          name="hover-feedback"
                          value={valorated}
                          onChange={(e) => {
                            handleRatingChange(e);
                          }}
                        />
                        <Box sx={{ ml: 2 }}>{labels[valorated]}</Box>
                      </Box>

                      <TextField
                        multiline
                        maxRows={3}
                        placeholder="Deja tu reseña..."
                        value={reseña}
                        onChange={handleReseñaChange}
                        sx={{ width: "100%" }}
                      />
                      <Button sx={{ color: "#145C6C" }} onClick={submitRate}>
                        Enviar reseña
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 4,
                        justifyContent: "flex-start",
                      }}
                    ></Box>
                  </Box>
                  <Divider />
                  <Box
                    className="bottom"
                    sx={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      width: "100%",
                      p: 2,
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        bgcolor: "rgba(131, 131, 131, 0.22)",
                        width: isMobile ? "100%" : "50%",
                        gap: 1,
                        p: 2,
                        borderRadius: "0.5rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "work sans",
                          fontWeight: "bold",
                          color: "#145C6C",
                          fontSize: isMobile ? "1.4rem" : "2rem",
                          textAlign: isMobile ? "center" : "left",
                        }}
                      >
                        {" "}
                        Indicaciones Medicas
                      </Typography>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", gap: 2 }}
                      >
                        <Typography>Diagnostico:</Typography>
                        <Typography>
                          {consulta.diagnostico
                            ? consulta.diagnostico
                            : "No se proporcionó diagnostico"}
                        </Typography>
                      </Box>
                      <Typography>Observaciones:</Typography>

                      <Typography
                        sx={{
                          bgcolor: "white",
                          borderRadius: "0.5rem",
                          p: 0.8,
                        }}
                      >
                        {consulta.observaciones
                          ? consulta.observaciones
                          : "No se proporcionaron observaciones"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        bgcolor: "rgba(131, 131, 131, 0.22)",
                        width: isMobile ? "100%" : "50%",
                        gap: 1,
                        p: 2,
                        borderRadius: "0.5rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "work sans",
                          fontWeight: "bold",
                          color: "#145C6C",
                          fontSize: isMobile ? "1.4rem" : "2rem",
                          textAlign: isMobile ? "center" : "left",
                        }}
                      >
                        Estudios Laboratorio
                      </Typography>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: "white",
                            width: "100%",
                            borderRadius: isMobile ? "0.5rem" : "5rem",
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: isMobile ? 1 : 0,
                            p: 1.5,
                          }}
                        >
                          <Typography>{estudios[index].fecha}</Typography>
                          <Typography>{estudios[index].tipoEstudio}</Typography>
                          <Button
                            variant="contained"
                            sx={{ bgcolor: "#145C6C", borderRadius: "5rem" }}
                            onClick={() => handlePdf(estudios[index].link)}
                          >
                            Ver
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
};
