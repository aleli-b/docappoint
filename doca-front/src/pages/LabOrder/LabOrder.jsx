import React, { useEffect, useState } from 'react';
import { Box, Button, Container, List, ListItem, Typography, useMediaQuery } from '@mui/material'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../components/context/AuthContext';
import { OrderModal } from '../../components/OrderModal/OrderModal';

export const LabOrder = () => {
  const [turnos, setTurnos] = useState([]);
  const [open, setOpen] = useState(false);
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    getTurnos();
  }, [])

  const svHost = import.meta.env.VITE_HOST;
  const { user } = useAuth();

  const getTurnos = async () => {
    try {
      const backTurnos = await axios.post(`${svHost}/doctor-turnos`, { doctorId: user.id })
      setTurnos(backTurnos.data);
      console.log(turnos)
    } catch (error) {
      toast.error('Ha ocurrido un error, inténtenlo de nuevo más tarde')
    }
  }

  const handleClick = async () => {
    const userId = '2f66b085-1b03-4848-a99e-c7bea08805db';
    const doctorId = '1d52abf0-8449-43ba-8871-aea4b353fa55';
    const labId = 'c2ed4885-9031-413a-bddd-f2ddef87a4f6';
    await axios.post(`${svHost}/labtests`, { userId: userId, doctorId: doctorId, labId: labId, })
  }

  const isMobile = useMediaQuery("(max-width: 900px)");

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
      <Box>
        <Typography>Seleccione un paciente:</Typography>
        {turnos.length > 0
          ?
          <List>
            {turnos.map((turno, i) => (
              <ListItem key={i} >
                <Button onClick={() => {setOpen(true); setPatient(turno)}} sx={{ '&:hover': { outline: 'solid 1px red' }, }}>
                  {turno.paciente.name} {turno.paciente.lastName}
                </Button>
              </ListItem>
            ))}
          </List>
          :
          <Typography>No tienes turnos</Typography>
        }
        {/* <Button onClick={handleClick}>Añadir pedido</Button> */}

      </Box>
      <OrderModal open={open} onClose={() => setOpen(false)} patient={patient} />
    </Container>
  )
}
