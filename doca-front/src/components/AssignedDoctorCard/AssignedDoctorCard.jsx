import { Avatar, Box, Button, Card, CardContent, CircularProgress, List, ListItem, ListItemText, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';

export const AssignedDoctorCard = () => {
    const [assignedDoctors, setAssignedDoctors] = useState('');
    const [loading, setLoading] = useState(true);    

    useEffect(() => {
        getAssignedDoctors();
    }, [])

    const svHost = import.meta.env.VITE_HOST;
    const { user } = useAuth();

    const getAssignedDoctors = async () => {
        try {
            const res = await axios.post(`${svHost}/getAssignedDoctors`, { id: user.id });
            setAssignedDoctors(res.data);
            console.log(res)
            setLoading(false);
        } catch (error) {
            setAssignedDoctors('');
            setLoading(false);
        }
    }

    return (
        <Card sx={{ minHeight: '100%' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div">
                        Mis doctores asignados
                    </Typography>
                </Box>
                {loading
                    ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', }}>
                        <CircularProgress />
                    </Box>
                    :
                    <List sx={{ mt: 2 }}>
                        {assignedDoctors.length > 0 ? (
                            assignedDoctors.map((doc) => (
                                <ListItem key={doc.id} sx={{ display: 'flex', gap: 2}}>
                                    <Avatar alt={`$Dr. {doc.name} ${doc.lastName}`} src={doc.profilePicture} sx={{ minWidth: '75px', minHeight: '75px' }}/>
                                    <ListItemText primary={`Dr. ${doc.name} ${doc.lastName}`} secondary={doc.category} />
                                </ListItem>
                            ))
                        ) : (
                            <Typography>No hay doctores asignados</Typography>
                        )}
                    </List>
                }
            </CardContent>
        </Card>
    )
}
