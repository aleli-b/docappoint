import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import { DoctorCard } from "../../components/DoctorCard/DoctorCard";
import { FilterSideBar } from "../../components/FilterSideBar/FilterSideBar";
import moment from "moment-timezone";
import "./Especialistas.css";

export const Especialistas = () => {
  const [doctors, setDoctors] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [occupiedTurnos, setOccupiedTurnos] = React.useState([]);

  const svHost = import.meta.env.VITE_HOST;

  React.useEffect(() => {
    fetchOccupiedTurnos();
    getDoctors();
  }, []);

  const getDoctors = async () => {
    const userData = await axios.get(`${svHost}/doctors`);
    setDoctors(userData.data);
  };



  // const generateDates = () => {
  //   const today = moment();
  //   const daysOfWeekSpanish = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  //   const generatedDates = [];
  //   let days = [];

  //   const timeSlots = [];
  //   const startTime = moment('08:00', 'HH:mm');
  //   const endTime = moment('13:00', 'HH:mm');
  //   const interval = moment.duration(1, 'hours');
  //   let isPast;
  //   let i = 0;

  //   const userLocalTime = moment().format('HH:mm');

  //   const timer = [];

  //   while (startTime <= endTime) {
  //     timer.push(startTime.format('HH:mm'));

  //     isPast = String(userLocalTime) > timer[i] ? true : false;

  //     const timeSlotObj = {
  //       time: timer[i],
  //       isPast: isPast,
  //     }

  //     timeSlots.push(timeSlotObj);
  //     startTime.add(interval);
  //     i++
  //   }

  //   for (let i = 0; i < 30; i++) {
  //     const date = today.clone().add(i, 'days');
  //     const formattedDate = date.format('DD [de] MMMM');
  //     const dayOfWeek = daysOfWeekSpanish[date.day()];
  //     // days.push({day: formattedDate});
  //     // isPast = date.isBefore(moment()); // Compare entire date and time

  //     let label;
  //     if (i === 0) {
  //       label = 'Hoy';
  //     } else if (i === 1) {
  //       label = 'Mañana';
  //     } else {
  //       label = dayOfWeek;
  //     }

  //     generatedDates.push({ label, day: formattedDate, time: timeSlots, });
  //   }
  //   days = generatedDates.map(date => moment(date.day, 'DD [de] MMMM'));
  //   const isDayPast = days.map(day => day.isBefore(moment()));

  //   generatedDates.forEach((date, index) => {
  //     date.isDayPast = isDayPast[index];
  //   });

  //   return generatedDates;
  // };

  // const dates = generateDates();

  const handleCategoryChange = async (category, province) => {
    try {
      setLoading(true);
      if (category === "" && province === '') {
        getDoctors();
      } else {
        const response = await axios.get(
          `${svHost}/users/filter`,
          { params: { category, province } }
      );
        setDoctors(response.data);
      }
    } catch (error) {
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOccupiedTurnos = async () => {
    try {
      const response = await axios.get(`${svHost}/turnos-ocupados`);
      if (response.status === 200) {
        //   const backendOccupiedDates = response.data.map((turno) => {
        //       const formattedDate = moment(turno.date).format('DD [de] MMMM');
        //       const hour = moment(turno.date).format('HH:mm');
        //       return { dateTime: `${formattedDate} ${hour}`, doctorId: turno.doctorId };
        //     });
        setOccupiedTurnos(response.data);
      } else {
        console.log("Failed to fetch occupied turnos:", response.status);
      }
    } catch (error) {
      console.error("Error fetching occupied turnos:", error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid
        container
        sx={{
          display: "flex",
          minHeight: "100vh",
          padding: 4,
          justifyContent: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
        spacing={2}
      >
        <Grid item xs={12} md={2}>
          <FilterSideBar handleCategoryChange={handleCategoryChange} />
        </Grid>
        <Grid item sx={{}} id="doctor-container" xs={12} md={10}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 2,
                borderRadius: "12px",
              }}
            >
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    turnos={occupiedTurnos}
                    
                  />
                ))
              ) : (
                <Typography variant="body1">
                  No se encontraron doctores en esta categoría.
                </Typography>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};