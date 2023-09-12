import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Input,
    InputLabel,
    MenuItem,
    Typography,
} from '@mui/material';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const UploadTestModal = ({ open, onClose, users, labtests, getLabtests }) => {
    const [selectedLabtest, setSelectedLabtest] = useState('');    
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const svHost = import.meta.env.VITE_HOST;
    const { user } = useAuth();

    const handleClose = () => {
        onClose();
    };

    async function convertBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        })
    }

    async function handleUpload(event) {
        try {
            const file = event.target.files[0];
            setLoading(true);
            const base64 = await convertBase64(file)
            const response = await axios.patch(`${svHost}/labtests`, { file: base64, filename: 'test.pdf', id: selectedLabtest, })
                .then(() => {
                    toast.success('PDF subido con exito, los cambios se efectuarán la próxima vez que inicie sesión.');
                })
                .then(() => setLoading(false))
                .catch(console.log)

            getLabtests();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error uploading file:', error);
        }
    }

    const handleSelectLabtestChange = (event) => {
        setSelectedLabtest(event.target.value);
    };    

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Sube tus estudios</DialogTitle>
            <DialogContent>
                <InputLabel id="user-label">Selecciona un analisis</InputLabel>
                <Select
                    labelId="user-label"
                    id="user-select"
                    value={selectedLabtest}
                    onChange={handleSelectLabtestChange}
                    label="Selecciona un usuario"
                    style={{ minWidth: '200px' }}
                >
                    {labtests.map((test, i) => (                        
                        <MenuItem key={test.id} value={test.id}>
                            Analisis {i + 1}: Dr. {test.labtestDoctor.name} {test.labtestDoctor.lastName}, paciente: {test.labtestPatient.name} {test.labtestPatient.lastName}
                        </MenuItem>
                    ))}
                </Select>                
                <input
                type="file"
                style={{ display: 'none' }}
                id="fileInput"
                onChange={handleUpload}
                accept="application/pdf"
            />
            <label htmlFor="fileInput" >
                <Button
                    component='span'
                    disabled={loading}
                    sx={{ color: "black", "&:hover": { bgcolor: "white" } }}
                >
                SUBIR PDF
                </Button>
            </label>
            {loading && <Typography variant="body1">Subiendo...</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleUpload} color="primary">
                    Subir
                </Button>
            </DialogActions>
        </Dialog>
    );
};