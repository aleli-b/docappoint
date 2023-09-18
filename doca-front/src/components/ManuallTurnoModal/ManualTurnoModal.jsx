import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

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

export const ManualTurnoModal = ({ openManualTurno, closeManualTurno }) => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedHour, setSelectedHour] = useState('');
    const [selectedMinute, setSelectedMinute] = useState('');

    const { user } = useAuth();
    const svHost = import.meta.env.VITE_HOST;

    const handleMonthChange = (event) => {
        const monthValue = event.target.value;
        setSelectedMonth(monthValue);
        setSelectedDay('');
    };

    const handleHourChange = (event) => {
        setSelectedHour(event.target.value);
    };

    const handleMinuteChange = (event) => {
        setSelectedMinute(event.target.value);
    };

    const hours = Array.from({ length: 24 }, (_, index) => index.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, index) => index.toString().padStart(2, '0'));

    const handleSubmit = async () => {
        try {
            if (!selectedDay || !selectedMonth || !selectedHour || !selectedMinute) {
                toast.error('Falta información, revisa todos los campos.');
                return;
            }

            const response = await axios.post(`${svHost}/occupied-turnos`, {
                userId: user.id,
                doctorId: user.id,
                date: `${selectedDay} de ${selectedMonth} ${selectedHour}:${selectedMinute}`,
            });

            console.log(response.status)

            if (response.status === 200) {
                toast.success('Turno agregado correctamente.');
                closeManualTurno();
            } else if (response.status === 403) {
                toast.error('Ya hay un turno ocupado en este horario');
            } else {
                toast.error('Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            toast.error('Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.');
        }
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

                <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 2 }}>
                    <FormControl sx={{ minWidth: '75px' }}>
                        <InputLabel sx={{ color: selectedMonth ? '' : 'red' }}>Día</InputLabel>
                        <Select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} disabled={selectedMonth === ''} >
                            <MenuItem value="">Seleccionar día</MenuItem>
                            {[...Array(months.find(month => month.value === selectedMonth)?.days).keys()].map(day => (
                                <MenuItem key={day + 1} value={String(day + 1).padStart(2, '0')}>
                                    {String(day + 1).padStart(2, '0')}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: '120px' }}>
                        <InputLabel>Mes</InputLabel>
                        <Select value={selectedMonth} onChange={handleMonthChange}>
                            <MenuItem value="">Seleccionar mes</MenuItem>
                            {months.map(month => (
                                <MenuItem key={month.value} value={month.value}>
                                    {month.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: '120px' }}>
                        <InputLabel>Hora</InputLabel>
                        <Select value={selectedHour} onChange={handleHourChange}>
                            <MenuItem value="">Seleccionar hora</MenuItem>
                            {hours.map(hour => (
                                <MenuItem key={hour} value={hour}>
                                    {hour}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: '120px' }}>
                        <InputLabel>Minuto</InputLabel>
                        <Select value={selectedMinute} onChange={handleMinuteChange}>
                            <MenuItem value="">Seleccionar minuto</MenuItem>
                            {minutes.map(minute => (
                                <MenuItem key={minute} value={minute}>
                                    {minute}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button type='submit' onClick={handleSubmit}>Listo</Button>
                </Box>
            </Box>
        </Modal>
    );
};                 