import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { Avatar, Box, SvgIcon } from "@mui/material";
import { SacarTurnoCard } from "../SacarTurnoCard/SacarTurnoCard";
import { Valoraciones } from "../Reviews/Reviews";
import { ReseñasCard } from "../ReseñasCard/ReseñasCard";
import moment from "moment-timezone";

export const DoctorCard = ({ doctor, turnos }) => {
  const doc = doctor;

  const generateDates = () => {
    const today = moment();
    const daysOfWeekSpanish = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const generatedDates = [];
    let days = [];

    const timeSlots = [];
    const startTime = moment(
      doctor.startTime ? doctor.startTime : "08:00",
      "HH:mm"
    );
    const endTime = moment(doctor.endTime ? doctor.endTime : "13:00", "HH:mm");
    const interval = moment.duration(
      doctor.interval ? doctor.interval : 1,
      "hours"
    );
    let isPast;
    let i = 0;

    const userLocalTime = moment().format("HH:mm");

    const timer = [];

    while (startTime <= endTime) {
      timer.push(startTime.format("HH:mm"));

      isPast = String(userLocalTime) > timer[i] ? true : false;

      const timeSlotObj = {
        time: timer[i],
        isPast: isPast,
      };

      timeSlots.push(timeSlotObj);
      startTime.add(interval);
      i++;
    }


    for (let i = 0; i < 30; i++) {
      const date = today.clone().add(i, "days");
      const formattedDate = date.format("DD [de] MMMM");
      const dayOfWeek = daysOfWeekSpanish[date.day()];

      let label = dayOfWeek;
      let dayOff = [];
      
      if (label === doctor.dayOff) {
        dayOff = true
      }

      if (i === 0) {
        label = "Hoy";
      } else if (i === 1) {
        label = "Mañana";
      }


      generatedDates.push({ label, day: formattedDate, time: timeSlots, dayOff });
    }

    days = generatedDates.map((date) => moment(date.day, "DD [de] MMMM"));
    const isDayPast = days.map((day) => day.isBefore(moment()));

    generatedDates.forEach((date, index) => {
      date.isDayPast = isDayPast[index];
    });

    return generatedDates;
  };

  const dates = generateDates();

  return (
    <Card
      sx={{
        display: doc.subscription ? "flex" : "none",
        flexDirection: { xs: "column", md: "row" },
        flexGrow: 1,
        flexWrap: "noWrap",
      }}
    >
      <CardContent
        sx={{
          width: { xs: "inherit", md: 1 / 2 },
          marginLeft: { xs: "none", md: 2 },
          display: "flex",
          flexDirection: "column",
          gap: 1,
          borderRight: { sx: "none", md: "solid 1px gray" },
          borderBottom: { xs: "solid 1px gray", md: "none" },
        }}
      >
        <Box sx={{ display: "flex", gap: 3 }}>
          <Avatar
            src={doc.profile_picture_url}
            sx={{ height: 100, width: 100 }}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h5" component="div">
              {doc.name + " " + doc.lastName}
            </Typography>
            {doctor.cedulaVerified && (
              <Box sx={{ display: "flex", flexDirection: "row", gap: 1, alignItems: "center" }}>
                <Typography variant="body2" sx={{ color: "#34c759" }}>
                  Verificado por Docappoint
                </Typography>
                <SvgIcon sx={{ fontSize: "1rem" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={2}
                    height="5"
                    viewBox="0 0 18 16"
                    fill="none"
                  >
                    <path
                      d="M6.05882 8.20588L7.88777 10.0589C8.10199 10.2759 8.45896 10.2524 8.64301 10.0092C9.19516 9.27984 10.2923 7.83354 11.1176 6.76471M17 8C17 11.866 13.4183 15 9 15C4.58172 15 1 11.866 1 8C1 4.13401 4.58172 1 9 1C13.4183 1 17 4.13401 17 8Z"
                      stroke="#34C759"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </SvgIcon>
              </Box>
            )}
            <Typography variant="body2" color="text.secondary">
              {doc.category}
            </Typography>
            {/* <Rating name="read-only" value={5} readOnly /> */}
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5">Dirección/es</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <AddLocationIcon />
            <Typography>{doc.adress ? `${doc.adress}` : `${doc.state}, ${doc.country}`} </Typography>
            {/* <Typography>
              {doc.addres? doc.addres : "(No se proporcionó una direccion)"}
            </Typography> */}
          </Box>
          <Valoraciones doctorId={doctor.id} />
          <ReseñasCard doctorId={doctor.id} />
        </Box>
      </CardContent>
      <CardContent
        id="horarios"
        sx={{
          width: { xs: "inherit", md: 1 / 2 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <SacarTurnoCard doc={doc} turnos={turnos} dates={dates} />
        <Box className="horarioNotification">
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", width: "100%" }}
          >
            {`Los horarios corresponden a la hora local de ${doctor.state} `}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
