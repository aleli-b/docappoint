import { Modal, TextField, Button, Box, Typography, FormHelperText, Select, InputLabel, MenuItem } from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const OrderModal = ({ open, onClose, patient }) => {
    const [labs, setLabs] = useState([]);
    const [lab, setLab] = useState([]);

    useEffect(() => {
        getLabs();
    }, [])

    const svHost = import.meta.env.VITE_HOST;
    const { user } = useAuth();

    const handleChange = (event) => {
        setLab(event.target.value);
    };

    const getLabs = async () => {
        const backLabs = await axios.get(`${svHost}/labs`);
        setLabs(backLabs.data);
    }

    let pat = patient.paciente || 'error';

    const handleClick = async () => {
        try {
            await axios.post(`${svHost}/labtests`, { doctorId: user.id, userId: pat.id, labId: lab, });
            toast.success('Pedido hecho exitosamente.')
            onClose()
        } catch (error) {
            toast.error('Ha ocurrido un error')
        }
    }


    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    minWidth: 400,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography sx={{ mb: 1 }}>
                    {pat.name} {pat.lastName}
                </Typography>
                <InputLabel htmlFor="select-lab">Laboratorio</InputLabel>
                <Select
                    value={lab}
                    onChange={handleChange}
                    label="Select Option"
                    id="select-lab"
                >
                    <MenuItem value="">
                        <em>Ninguna</em>
                    </MenuItem>
                    {labs.map((lab, i) => (
                        <MenuItem key={i} value={lab.id}>
                            {lab.name} {lab.lastName}
                        </MenuItem>
                    ))}
                </Select>
                <Button onClick={() => handleClick()}>Añadir pedido</Button>
            </Box>
        </Modal>
    );
};
