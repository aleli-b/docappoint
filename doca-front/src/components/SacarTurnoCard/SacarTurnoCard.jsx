import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useAuth } from "../context/AuthContext";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

moment.updateLocale("es", {
  months: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthsShort: [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ],
});

export const SacarTurnoCard = React.memo(({ doc, turnos, dates }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [numColumns, setNumColumns] = useState(4);

  const auth = useAuth();
  const doctor = doc;
  const occupiedTurnos = turnos;

  const navigate = useNavigate();

  const updateNumColumns = () => {
    if (window.innerWidth < 600) {
      setNumColumns(1);
    } else if (window.innerWidth < 960) {
      setNumColumns(2);
    } else {
      setNumColumns(4);
    }
  };

  useEffect(() => {
    updateNumColumns();
    window.addEventListener("resize", updateNumColumns);
    return () => {
      window.removeEventListener("resize", updateNumColumns);
    };
  }, []);

  const endIndex = Math.min(startIndex + numColumns, dates.length);

  const handlePrevClick = () => {
    setStartIndex(Math.max(startIndex - 1, 0));
  };

  const handleNextClick = () => {
    setStartIndex(Math.min(startIndex + 1, dates.length - 4));
  };

  const isTurnoOccupied = (dateTime) => {
    const occupied = occupiedTurnos.find((turno) => {
      return turno.date === dateTime && turno.doctorId === doctor.id;
    });
    return occupied ? true : false;
  };

  const handleClickTurno = (dateTime) => {
    if (!auth.user) {
      toast.error("Debes iniciar sesion", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // Almacenar los parámetros en sessionStorage
      sessionStorage.setItem("doctorId", doctor.id);
      sessionStorage.setItem("turno", dateTime);
      // Navegar a la página de turnos
      navigate("/turnos");
    }
  };

  return (
    <div>
      <Box
        className="Container"
        sx={{ display: "flex", flexDirection: "column", width: "100%"}}
      >
        <Box className="gridTurnos">
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexWrap: "nowrap" }}
          >
            <IconButton
              onClick={handlePrevClick}
              disabled={startIndex === 0}
              sx={{ height: "50px", width: "50px", marginTop: 1 }}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            {dates.slice(startIndex, endIndex).map((date, i) => (
              <Grid
                item
                xs={12}
                md={3}
                key={i}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography component="div">{date.label}</Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  color="text.secondary"
                  component="div"
                >
                  {date.day}
                </Typography>
                {date.time.length > 0 && (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {date.time.map((time, j) => (
                      <Button
                        key={j}
                        variant="outlined"
                        onClick={() =>
                          handleClickTurno(`${date.day} ${time.time}`)
                        }
                        disabled={
                          isTurnoOccupied(`${date.day} ${time.time}`) ||
                          (time.isPast && date.isDayPast)
                        }
                        sx={{
                          textDecoration:
                            isTurnoOccupied(`${date.day} ${time.time}`) ||
                            (time.isPast && date.isDayPast)
                              ? "line-through"
                              : "none",
                        }}
                      >
                        {time.time}
                      </Button>
                    ))}
                  </Box>
                )}
              </Grid>
            ))}
            <IconButton
              onClick={handleNextClick}
              disabled={endIndex >= dates.length}
              sx={{ height: "50px", width: "50px", marginTop: 1 }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Grid>
        </Box>

      </Box>
    </div>
  );
});
