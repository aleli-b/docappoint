import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export const TimeSlotForm = ({ onCloseTimeSlot }) => {
  const [startHour, setStartHour] = useState(8);
  const [startMinute, setStartMinute] = useState(0);
  const [endHour, setEndHour] = useState(16);
  const [endMinute, setEndMinute] = useState(0);
  const [intervalHours, setIntervalHours] = useState(1);

  const { user, token } = useAuth();

  const svHost = import.meta.env.VITE_HOST;

  const handleSaveField = async () => {
    try {
      const response = await axios.patch(
        `${svHost}/users/${user.id}`,
        {
          startTime: `${startHour.toString().padStart(2, "0")}:${startMinute
            .toString()
            .padStart(2, "0")}`,
          endTime: `${endHour.toString().padStart(2, "0")}:${endMinute
            .toString()
            .padStart(2, "0")}`,
          interval: intervalHours,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Horario cambiado con éxito");
        onCloseTimeSlot();
      } else {
        toast.error("Error al cambiar horario");
      }
    } catch (error) {
      toast.error("Error al cambiar horario");
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Grid
        item
        xs={6}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography sx={{ textAlign: "center" }}>Horario de Inicio:</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Select
            value={startHour}
            onChange={(e) => setStartHour(Number(e.target.value))}
          >
            {Array.from({ length: 24 }).map((_, index) => (
              <MenuItem key={index} value={index}>
                {index.toString().padStart(2, "0")}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={startMinute}
            onChange={(e) => setStartMinute(Number(e.target.value))}
          >
            {Array.from({ length: 60 }).map((_, index) => (
              <MenuItem key={index} value={index}>
                {index.toString().padStart(2, "0")}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Grid>

      <Grid item xs={6} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography sx={{ textAlign: "center" }}>Horario de Fin:</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Select
            value={endHour}
            onChange={(e) => setEndHour(Number(e.target.value))}
          >
            {Array.from({ length: 24 }).map((_, index) => (
              <MenuItem key={index} value={index}>
                {index.toString().padStart(2, "0")}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={endMinute}
            onChange={(e) => setEndMinute(Number(e.target.value))}
          >
            {Array.from({ length: 60 }).map((_, index) => (
              <MenuItem key={index} value={index}>
                {index.toString().padStart(2, "0")}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2}}
      >
        <Typography sx={{ textAlign: "center" }}>Intervalo (horas):</Typography>
        <TextField
          type="number"
          value={intervalHours}
          onChange={(e) => setIntervalHours(Number(e.target.value))}
          inputProps={{ min: 1, max: 3 }}
        />
      </Grid>
      <Grid item xs={12} sx={{display:"flex", flexDirection:"column", gap:2, alignItems:"center"}}>
        <Button variant="contained" onClick={handleSaveField}>
          Guardar Preferencias de Tiempo
        </Button>
        <Button variant="contained"  onClick={onCloseTimeSlot} sx={{bgcolor:"gray", width:"fit-content"}}>
          Cancelar
        </Button>
      </Grid>
    </Grid>
  );
};
