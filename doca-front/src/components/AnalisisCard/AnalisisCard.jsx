import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, IconButton, Link, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LabTurnoModal } from '../LabTurnoModal/LabTurnoModal';

export const AnalisisCard = () => {
  const [labtests, setLabtests] = useState('');
  const [open, setOpen] = useState(false);
  const [lab, setLab] = useState([]);
  const [labLoaded, setLabLoaded] = useState(false);


  const { user } = useAuth();
  const svHost = import.meta.env.VITE_HOST;

  useEffect(() => {
    getLabtests();
  }, [])

  const getLabtests = async () => {
    const backLabtests = await axios.get(`${svHost}/labtests?userId=${user.id}`)
    setLabtests(backLabtests.data);
  }

  console.log(labtests)

  const handleOpen = () => {
    setLabLoaded(true);
    setOpen(true);
  }

  return (
    <Card sx={{ minHeight: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Mis Analisis
        </Typography>
        <List sx={{ maxHeight: '176px', overflowY: 'auto', }}>
          {labtests.length > 0
            ?
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}>
              {labtests.map((labtest, i) => (
                labtest.lab_test_url ? (
                  <ListItem key={i} sx={{ '&:hover': { outline: 'solid 1px red', outlineOffset: '-1px' } }}>
                    <ListItemText primary={`${labtest.labtestLab.name} ${labtest.labtestLab.lastName} (${labtest.labtestLab.lab_category})`} secondary={labtest.labtestDoctor ? `A pedido de: Dr. ${labtest.labtestDoctor.name} ${labtest.labtestDoctor.lastName}, ${labtest.labtestDoctor.category}` : 'Doctor no encontrado'} />
                    <ListItemText primary={'Estudio Subido'} />
                  </ListItem>
                ) : labtest.labtestLab.labTurno && labtest.labtestLab.labTurno.some(turno => turno.userId === user.id) ? (
                  <ListItem key={i} sx={{ '&:hover': { outline: 'solid 1px red', outlineOffset: '-1px' } }}>
                    <ListItemText primary={`${labtest.labtestLab.name} ${labtest.labtestLab.lastName} (${labtest.labtestLab.lab_category})`} secondary={labtest.labtestDoctor ? `A pedido de: Dr. ${labtest.labtestDoctor.name} ${labtest.labtestDoctor.lastName}, ${labtest.labtestDoctor.category}` : 'Doctor no encontrado'} />
                    <ListItemText primary={'Pendiente de Subida'} />
                  </ListItem>
                ) : (
                  <Link key={i} onClick={() => { handleOpen(); setLab(labtest.labtestLab) }} sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                    <ListItem sx={{ '&:hover': { outline: 'solid 1px red', outlineOffset: '-1px' } }}>
                      <ListItemText primary={`${labtest.labtestLab.name} ${labtest.labtestLab.lastName} (${labtest.labtestLab.lab_category})`} secondary={labtest.labtestDoctor ? `A pedido de: Dr. ${labtest.labtestDoctor.name} ${labtest.labtestDoctor.lastName}, ${labtest.labtestDoctor.category}` : 'Doctor no encontrado'} />
                      <ListItemText primary={'Selección de turno'} />
                    </ListItem>
                  </Link>
                )
              ))}

            </Box>
            :
            <Box>
              <Typography sx={{}}>No tienes analisis pendientes</Typography>
            </Box>
          }
        </List>
      </CardContent>
      <LabTurnoModal labLoaded={labLoaded} open={open} onClose={() => setOpen(false)} lab={lab} />
    </Card>
  );
}
