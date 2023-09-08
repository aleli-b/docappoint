import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Button, Box } from '@mui/material';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../context/AuthContext';
import { ManualTurnoModal } from '../ManuallTurnoModal/ManualTurnoModal';

export const TurnosCardDoctores = () => {
  const [turnos, setTurnos] = useState([]);
  const [openManualTurno, setOpenManualTurno] = useState(false);
  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  const svHost = import.meta.env.VITE_HOST;

  async function getBackendTurnos() {
    setLoading(true);
    try {
      const response = await axios.post(`${svHost}/doctor-turnos`, {
        doctorId: auth.user.id
      })
      if (response.status === 200) {
        setLoading(false);
        setTurnos(response.data)
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpenManualTurno(true);
  }

  useEffect(() => {
    getBackendTurnos();
  }, []);

  return (
    <Card sx={{ minHeight: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Turnos Reservados
          </Typography>
          <Button onClick={handleOpen}>
            Agregar Turno
          </Button>
        </Box>
        {loading
          ?
          <Box sx={{ display: 'flex', justifyContent: 'center',}}>
            <CircularProgress />
          </Box>
          :
          <List sx={{ mt: 2, maxHeight: '176px', overflowY: 'auto', }}>
            {turnos.length > 0 ? (
              turnos.map((turno) => (
                <ListItem key={turno.id}>
                  <ListItemText primary={turno.date} secondary={turno.doctorId === turno.userId ? 'Turno agendado manualmente' : turno.paciente ? `Con el Paciente: ${turno.paciente.name} ${turno.paciente.lastName}` : 'Doctor no encontrado'} />
                </ListItem>
              ))
            ) : (
              <Typography>No hay turnos</Typography>
            )}
          </List>
        }
      </CardContent>
      <ManualTurnoModal openManualTurno={openManualTurno} closeManualTurno={() => setOpenManualTurno(false)} />
    </Card>
  );
}