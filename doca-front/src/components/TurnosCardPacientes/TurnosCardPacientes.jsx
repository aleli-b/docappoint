import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { useAuth } from '../context/AuthContext';

export const TurnosCardPacientes = () => {
  const [turnos, setTurnos] = useState([]);
  
  const svHost = import.meta.env.VITE_HOST;

  const auth = useAuth();

  async function getBackendTurnos() {
    try {
      const response = await axios.post(`${svHost}/user-turnos`, {
        userId: auth.user.id
      })
      if (response.status === 200) {
        // const backendTurnos = response.data.map((turno, i) => {
        //   const formattedDate = moment(turno.date).format('DD [de] MMMM');
        //   const hour = moment(turno.date).format('HH:mm');
        //   return { id: response.data[i].id, dateTime: `${formattedDate} ${hour}`, name: response.data[i].doctor };
        // });
        setTurnos(response.data)
      } else {
        console.log('Failed to fetch occupied turnos:', response.status);
      }
    } catch (error) {
      console.error('Error fetching occupied turnos:', error);
    }
  }

  useEffect(() => {
    getBackendTurnos();
  }, [])

  return (
    <Card sx={{minHeight: '100%'}}>
      <CardContent>
        <Typography variant="h6" component="div">
          Turnos Ocupados
        </Typography>
        <List sx={{ maxHeight: '176px', overflowY: 'auto', }}>
          {turnos.length > 0 ? (
            turnos.map((turno) => (
              <ListItem key={turno.id}>
                <ListItemText primary={turno.date} secondary={turno.doctor ? `Con el Doctor: ${turno.doctor.name} ${turno.doctor.lastName}, ${turno.doctor.category}` : 'Doctor no encontrado'} />
              </ListItem>
            ))
          ) : (
            <Typography>No hay turnos</Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
}