import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, IconButton, Link, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const AnalisisCard = () => {
  const [labtests, setLabtests] = useState('');

  const { user } = useAuth();
  const svHost = import.meta.env.VITE_HOST;

  useEffect(() => {
    getLabtests();
  }, [])

  const getLabtests = async () => {
    const backLabtests = await axios.get(`${svHost}/labtests?userId=${user.id}`)
    setLabtests(backLabtests.data);
  }


  return (
    <Card sx={{ minHeight: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Mis Analisis
        </Typography>
        <List sx={{ mt: 2 }}>
          {labtests.length > 0
            ?
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}>
              {labtests.map((labtest, i) => (
                <ListItem key={i} sx={{ '&:hover': { outline: 'solid 1px red'}}}>
                  <ListItemText primary={`${labtest.labtestLab.name} ${labtest.labtestLab.lastName} (${labtest.labtestLab.lab_category})`} secondary={labtest.labtestDoctor ? `A pedido de: Dr. ${labtest.labtestDoctor.name} ${labtest.labtestDoctor.lastName}, ${labtest.labtestDoctor.category}` : 'Doctor no encontrado'} />
                  <ListItemText primary={labtest.lab_test_url ? 'Estudio Subido' : 'Pendiente'} />
                </ListItem>
              ))}
            </Box>
            :
            <Box>
              <Typography sx={{}}>No tienes analisis pendientes</Typography>
            </Box>
          }
        </List>
      </CardContent>
    </Card>
  );
}
