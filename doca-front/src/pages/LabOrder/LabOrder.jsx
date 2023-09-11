import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Container, List, ListItem, Typography, useMediaQuery } from '@mui/material'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../components/context/AuthContext';
import { OrderModal } from '../../components/OrderModal/OrderModal';
import { LabtestRender } from '../../components/LabtestRender/LabtestRender';

export const LabOrder = () => {
  const [turnos, setTurnos] = useState([]);
  const [open, setOpen] = useState(false);
  const [patient, setPatient] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTurnos();
  }, [])

  const svHost = import.meta.env.VITE_HOST;
  const { user } = useAuth();

  const getTurnos = async () => {
    try {
      const backTurnos = await axios.post(`${svHost}/doctor-turnos`, { doctorId: user.id })
      setTurnos(backTurnos.data);
      setLoading(false);
    } catch (error) {
      toast.error('Ha ocurrido un error, inténtenlo de nuevo más tarde')
      setLoading(false);
    }
  }

  const isMobile = useMediaQuery("(max-width: 900px)");

  if (loading) {
    return (
      <Container>
        <Typography
          sx={{
            fontFamily: "work sans",
            fontWeight: "bold",
            color: "#145C6C",
            fontSize: isMobile ? "2.5rem" : "2rem",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Pedidos de Análisis
        </Typography>
        <Container sx={{ minHeight: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <CircularProgress />
        </Container>
      </Container>
    )
  }

  return (
    <Container sx={{ minHeight: '100dvh', }}>
      <Typography
        sx={{
          fontFamily: "work sans",
          fontWeight: "bold",
          color: "#145C6C",
          fontSize: isMobile ? "2.5rem" : "2rem",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        Pedidos de Análisis
      </Typography>
      <LabtestRender />
      <Typography variant='h4' gutterBottom sx={{ color: '#145C6C', fontWeight: 'bold', }}>Hacer un Pedido</Typography>
      <Box>
        <Typography>Seleccione un paciente:</Typography>
        {turnos.length > 0
          ?
          <List>
            {turnos.map((turno, i) => (
              <ListItem key={i} >
                <Button onClick={() => { setPatient(turno); setOpen(true) }} sx={{ '&:hover': { outline: 'solid 1px red' }, }}>
                  {turno.paciente.name} {turno.paciente.lastName}
                </Button>
              </ListItem>
            ))}
          </List>
          :
          <Typography>No tienes turnos</Typography>
        }

      </Box>
      <OrderModal open={open} onClose={() => setOpen(false)} patient={patient} />
    </Container>
  )
}
