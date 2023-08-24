import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { Avatar, Box } from "@mui/material";
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
      // days.push({day: formattedDate});
      // isPast = date.isBefore(moment()); // Compare entire date and time

      let label;
      if (i === 0) {
        label = "Hoy";
      } else if (i === 1) {
        label = "Mañana";
      } else {
        label = dayOfWeek;
      }

      generatedDates.push({ label, day: formattedDate, time: timeSlots });
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
            <Typography>{`${doc.state}, ${doc.country}`} </Typography>
            <Typography>
              {doc.adress
                ? doc.addres
                : "(Aún no se ha agregado una dirección)"}
            </Typography>
          </Box>
          <Valoraciones doctorId={doctor.id} />
          <ReseñasCard doctorId={doctor.id} />
        </Box>
      </CardContent>
      <CardContent id="horarios" sx={{ width: { xs: "inherit", md: 1 / 2 }, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
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
