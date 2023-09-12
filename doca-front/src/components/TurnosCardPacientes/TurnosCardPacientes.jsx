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
    <Card sx={{ minHeight: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Turnos Ocupados
        </Typography>
        <List sx={{ maxHeight: '176px', overflowY: 'auto', }}>
          {turnos.length > 0 ? (
            turnos.map((turno) => 
              turno.type === 'doctor'
                ?
                (<ListItem key={turno.id}>
                  <ListItemText primary={turno.date} secondary={turno.doctor ? `Con el Doctor: ${turno.doctor.name} ${turno.doctor.lastName}, ${turno.doctor.category}` : 'Doctor no encontrado'} />
                </ListItem>)
                :
                (<ListItem key={turno.id}>
                  <ListItemText primary={turno.date} secondary={turno.lab ? `Con el Laboratorio: ${turno.lab.name} ${turno.lab.lastName}, ${turno.lab.lab_category}` : 'Laboratorio no encontrado'} />
                </ListItem>)            
            )
          ) : (
            <Typography>No hay turnos</Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
}