import React from 'react';
import { Box, Button, Container, Typography, useMediaQuery } from '@mui/material'
import axios from 'axios';

export const LabOrder = () => {
  const svHost = import.meta.env.VITE_HOST;

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
      <Button onClick={handleClick}>Añadir pedido</Button>

      </Box>
    </Container>
  )
}
