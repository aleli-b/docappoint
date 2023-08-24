import React, { useState } from 'react'
import { Avatar, Box, Button, Card, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material'
import { RedesSocialesCard } from '../../../components/RedesSocialesCard/RedesSocialesCard';
import { TurnosCardDoctores } from '../../../components/TurnosCardDoctores/TurnosCardDoctores';
import { useAuth } from '../../../components/context/AuthContext';
import { EditModal } from '../../../components/EditModal/EditModal';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './styles.css'
import { Mensajeria } from '../../../components/Mensajeria/Mensajeria';
import { UploadImage } from '../../UploadImage/UploadImage';
import { UploadCed } from '../../../components/Upload/UploadCed/UploadCed';
import { TimeSlotForm } from '../../../components/TimeSlotForm/TimeSlotForm';

export const PerfilDoctores = () => {
    const { user, editUser } = useAuth();
    const [editing, setEditing] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState('');
    const [newValue, setNewValue] = useState('');

    user.fullName = user.name + " " + user.lastName;
    user.userType = user.userType[0].toUpperCase() + user.userType.substring(1);

    const handleSaveField = (field, value) => {
        try {
            editUser({ [field]: value });
        } catch (error) {
            console.error('Ha habido un error')
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center', paddingX: '20px', margin: 3.2, minHeight: '77.5dvh' }}>
            <Grid container spacing={2} sx={{ margin: '' }}>
                <Grid item md={4} xs={12} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Card sx={{}}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            <CardMedia
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    width: '100%',
                                    borderRadius: '2px',
                                    padding: 2,
                                    position: 'relative',
                                    gap: 2,
                                }}
                            >
                                <Avatar alt={user.fullName} src={user.profile_picture_url} sx={{ width: 180, height: 180 }} />
                                <UploadImage />
                            </CardMedia>

                            <Box className='text2' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                <Typography variant="h5" component="div" text-align="center">
                                    {user.fullName}
                                </Typography>
                                {/* <Rating
                                    name="simple-controlled"
                                    value={5}
                                /> */}
                                {user.description ? <Typography> {user.description} </Typography> : (
                                    <Button
                                        onClick={() => {
                                            setFieldToEdit('description');
                                            setNewValue(user.description || '');
                                            setEditing(true);
                                        }}
                                    >
                                        Añade una breve descripción
                                    </Button>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                    <Mensajeria />
                </Grid>
                <Grid item md={8} xs={12}>
                    <Card sx={{ minHeight: '100%', paddingTop: 4 }}>
                        <CardContent >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid gray 1px', padding: '18.7px' }}>
                                <Typography>Verificado:</Typography>
                                <Typography>{user.cedulaVerified ? <CheckCircleIcon /> : user.cedula_url ? "Pendiente" : <Box sx={{ display: 'flex', alignItems: 'center', }}><Typography>Subir cédula:</Typography> <UploadCed/></Box>}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid gray 1px', padding: '18.7px' }}>
                                <Typography>Nombre:</Typography>
                                <Typography>{user.name}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid gray 1px', padding: '18.7px' }}>
                                <Typography>Apellido:</Typography>
                                <Typography>{user.lastName}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid gray 1px', padding: '18.7px' }}>
                                <Typography>Correo:</Typography>
                                <Typography>{user.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid gray 1px', padding: '18.7px' }}>
                                <Typography>Tipo de Usuario:</Typography>
                                <Typography>{user.userType}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid gray 1px', padding: '18.7px' }}>
                                <Typography>Especialidad:</Typography>
                                <Typography>{user.category}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid gray 1px', padding: '18.7px' }}>
                                <Typography>Teléfono:</Typography>
                                <Box>
                                    {user.phone || 'No has añadido un teléfono'}
                                    <Button onClick={() => {
                                        setFieldToEdit('phone');
                                        setNewValue(user.phone || '');
                                        setEditing(true);
                                    }}>
                                        <EditIcon />
                                    </Button>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid gray 1px', padding: '18.7px' }}>
                                <Typography>Precio de consulta:</Typography>
                                <Box>
                                    {user.price ? '$' + user.price : 'No has añadido un precio aún'}
                                    <Button onClick={() => {
                                        setFieldToEdit('price');
                                        setNewValue(user.price || '');
                                        setEditing(true);
                                    }}>
                                        <EditIcon />
                                    </Button>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'solid gray 1px', padding: '18.7px' }}>
                                <Typography>CLABE interbancaria:</Typography>
                                <Box>
                                    {user.clabe ? user.clabe : 'No has añadido una CLABE aún'}
                                    <Button onClick={() => {
                                        setFieldToEdit('clabe');
                                        setNewValue(user.clabe || '');
                                        setEditing(true);
                                    }}>
                                        <EditIcon />
                                    </Button>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '18.7px' }}>
                                <Typography>Nombre del banco:</Typography>
                                <Box>
                                    {user.bank ? user.bank : 'No has añadido un banco aún'}
                                    <Button onClick={() => {
                                        setFieldToEdit('bank');
                                        setNewValue(user.bank || '');
                                        setEditing(true);
                                    }}>
                                        <EditIcon />
                                    </Button>
                                </Box>
                            </Box>
                            <TimeSlotForm />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                    <RedesSocialesCard />
                </Grid>
                {/* <Grid item md={4} xs={12}>
                    <ReseñasCard />
                </Grid> */}
                <Grid item md={8} xs={12}>
                        <TurnosCardDoctores />                        
                </Grid>
            </Grid>
            <EditModal
                field={fieldToEdit}
                open={editing}
                newValue={newValue}
                setNewValue={setNewValue}
                onClose={() => setEditing(false)}
                onSave={handleSaveField}
            />
        </Box>
    )
}
