import { Modal, TextField, Button, Box, Typography, FormHelperText, Select, InputLabel, MenuItem, Grid, IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";

export const LabTurnoModal = ({ open, onClose, lab }) => {
    const [startIndex, setStartIndex] = useState(0);
    const [numColumns, setNumColumns] = useState(4);
    const [turnos, setTurnos] = useState([]);


    useEffect(() => {
        getTurnos();
    }, [])

    const svHost = import.meta.env.VITE_HOST;
    const { user } = useAuth();

    const laboratorio = lab;
    const navigate = useNavigate();

    const getTurnos = async () => {
        const backTurnos = await axios.post(`${svHost}/lab-turnos`, { labId: laboratorio.id });
        setTurnos(backTurnos.data);
    }

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
        const startTime = moment("08:00", "HH:mm"
        );
        const endTime = moment("13:00", "HH:mm",);
        const interval = moment.duration(1, "hours");
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


        for (let i = 0; i < 7; i++) {
            const date = today.clone().add(i, "days");
            const formattedDate = date.format("DD [de] MMMM");
            const dayOfWeek = daysOfWeekSpanish[date.day()];

            let label = dayOfWeek;
            let dayOff = [];

            // if (label === doctor.dayOff) {
            //     dayOff = true
            // }

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

    const endIndex = Math.min(startIndex + numColumns, dates.length);

    const handlePrevClick = () => {
        setStartIndex(Math.max(startIndex - 1, 0));
    };

    const handleNextClick = () => {
        setStartIndex(Math.min(startIndex + 1, dates.length - 4));
    };

    const isTurnoOccupied = (dateTime) => {
        const occupied = turnos.find((turno) => {
            return turno.date === dateTime && turno.doctorId === doctor.id;
        });
        return occupied ? true : false;
    };

    const handleClickTurno = (dateTime) => {
        sessionStorage.setItem("labId", laboratorio.id);
        sessionStorage.setItem('type', 'lab');
        sessionStorage.setItem("turno", dateTime);

        navigate("/turnos");
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    minWidth: 400,

                }}
            >
                <Typography sx={{
                    fontFamily: "work sans",
                    fontWeight: "bold",
                    color: "#145C6C",
                    fontSize: "1.5rem",
                    textAlign: "left",
                }}>
                    Seleccione su turno c/ {laboratorio.name} {laboratorio.lastName}:
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 3,
                    mt: 3
                }}>
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
                            sx={{ display: "flex", flexDirection: "column", }}
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
                                    sx={{ display: "flex", flexDirection: "column", gap: 2, maxHeight: "39vh", overflowY: "auto" }}
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
                                                (time.isPast && date.isDayPast || date.dayOff === true)
                                            }
                                            sx={{
                                                textDecoration:
                                                    isTurnoOccupied(`${date.day} ${time.time}`) ||
                                                        (time.isPast && date.isDayPast || date.dayOff === true)
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
                </Box>
            </Box>
        </Modal>
    );
};
