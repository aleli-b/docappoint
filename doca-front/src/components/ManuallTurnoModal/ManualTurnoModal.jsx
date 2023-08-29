import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Select,
    MenuItem,
    Button,
} from '@mui/material';

const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;

const months = [
    { value: 'Enero', label: 'Enero', days: 31 },
    { value: 'Febrero', label: 'Febrero', days: 28 },
    { value: 'Marzo', label: 'Marzo', days: 31 },
    { value: 'Abril', label: 'Abril', days: 30 },
    { value: 'Mayo', label: 'Mayo', days: 31 },
    { value: 'Junio', label: 'Junio', days: 30 },
    { value: 'Julio', label: 'Julio', days: 31 },
    { value: 'Agosto', label: 'Agosto', days: 31 },
    { value: 'Septiembre', label: 'Septiembre', days: 30 },
    { value: 'Octubre', label: 'Octubre', days: 31 },
    { value: 'Noviembre', label: 'Noviembre', days: 30 },
    { value: 'Diciembre', label: 'Diciembre', days: 31 },
  ];
  

const years = [currentYear, nextYear];

export const ManualTurnoModal = ({ openManualTurno, closeManualTurno }) => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const handleMonthChange = (event) => {
        const monthValue = event.target.value;
        setSelectedMonth(monthValue);
        setSelectedDay('');
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleSubmit = () => {
      console.log(`Fecha: ${selectedDay} de ${selectedMonth} ${selectedYear} `);  
    };

    return (
        <Modal open={openManualTurno} onClose={closeManualTurno}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    minWidth: 400,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography>Agregue manualmente los días que tenga ocupados.</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
                    <Select value={selectedMonth} onChange={handleMonthChange}>
                        <MenuItem value="">Seleccionar mes</MenuItem>
                        {months.map(month => (
                            <MenuItem key={month.value} value={month.value}>
                                {month.label}
                            </MenuItem>
                        ))}
                    </Select>

                    {selectedMonth && (
                        <Select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                            <MenuItem value="">Seleccionar día</MenuItem>
                            {[...Array(months.find(month => month.value === selectedMonth)?.days).keys()].map(day => (
                                <MenuItem key={day + 1} value={day + 1}>
                                    {day + 1}
                                </MenuItem>
                            ))}
                        </Select>
                    )}

                    <Select value={selectedYear} onChange={handleYearChange}>
                        <MenuItem value="">Seleccionar año</MenuItem>
                        {years.map(year => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>

                    <Button type='submit' onClick={handleSubmit}>Listo</Button>
                </Box>
            </Box>
        </Modal>
    );
};                 