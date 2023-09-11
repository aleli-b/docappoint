import React, { useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Grid, Input, InputLabel, List, SvgIcon, Typography } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UploadTestModal } from '../../components/UploadTestModel/UploadTestModel';
import { useState } from 'react';
import { useAuth } from '../../components/context/AuthContext';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from 'axios';

export const LabtestRender = () => {
    const [users, setUsers] = useState([]);
    const [labtests, setLabtests] = useState([]);

    const svHost = import.meta.env.VITE_HOST;
    const { user } = useAuth();

    useEffect(() => {
        getUsers();
        getLabtests();
    }, []);

    const getUsers = async () => {
        const dbUsers = await axios.get(`${svHost}/users`);
        setUsers(dbUsers.data);
    };

    const getLabtests = async () => {
        const dbLabtests = await axios.get(`${svHost}/labtests?doctorId=${user.id}`);
        setLabtests(dbLabtests.data);
    };

    return (
        <Grid container direction={'column'}>
            <Grid item>
                <Typography variant='h4' gutterBottom sx={{ color: '#145C6C', fontWeight: 'bold', }}>Estudios</Typography>
            </Grid>
            <Grid item>
                <Box>
                    <List>
                        {
                            labtests.map((labtest, i) =>
                                <React.Fragment key={i}>
                                    <Accordion
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            margin: 2,
                                            borderRadius: "10px!important",
                                        }}
                                    >

                                        <AccordionSummary
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            sx={{
                                                backgroundColor: "#838383",
                                                padding: 4,
                                                borderRadius: "10px",
                                            }}
                                        >
                                            <Container
                                                id="bardero"
                                                maxWidth={"100%"}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: 'space-around'
                                                }}
                                            >
                                                <SvgIcon component={AddIcon} />
                                                <Typography sx={{}}>
                                                    Analisis {i + 1}
                                                </Typography>
                                                <Typography>
                                                    {labtest.labtestPatient.name} {labtest.labtestPatient.lastName}
                                                </Typography>
                                                <Typography>
                                                    {labtest.labtestLab.name} {labtest.labtestLab.lastName}
                                                </Typography>
                                                <SvgIcon component={ExpandMoreIcon} inheritViewBox />
                                            </Container>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                                                {labtest.lab_test_url
                                                    ?
                                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                                        <Typography>Fecha de subida: {labtest.createdAt.split('T')[0]}</Typography>
                                                        <Typography>Hora: {labtest.createdAt.split('T')[1].split('.')[0].slice(0, -3)}</Typography>
                                                    </Box>
                                                    :
                                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                                        <Typography>Fecha de orden: {labtest.createdAt.split('T')[0]}</Typography>
                                                        <Typography>Hora: {labtest.createdAt.split('T')[1].split('.')[0].slice(0, -3)}</Typography>
                                                    </Box>
                                                }
                                                <Box sx={{ display: 'flex', gap: 2 }}>
                                                    <Typography>Paciente: {labtest.labtestPatient.name} {labtest.labtestPatient.lastName}</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', gap: 2 }}>
                                                    <Typography>Laboratorio: {labtest.labtestLab.name} {labtest.labtestLab.lastName}</Typography>
                                                    <Typography>{labtest.labtestLab.category}</Typography>
                                                </Box>
                                                <Box>
                                                {labtest.lab_test_url 
                                                ?
                                                    <a href={labtest.lab_test_url} style={{ textDecoration: 'none' }}>
                                                        <Box sx={{ display: 'flex', gap: 1, }}>
                                                            <PictureAsPdfIcon sx={{ color: 'red', }} />
                                                            <Typography sx={{ textDecoration: 'none', "&:hover": { color: 'red', fontWeight: 'bold', transition: '20px 2s', }, }}>Vea su analisis</Typography>
                                                        </Box>
                                                    </a>
                                                :
                                                <Typography>Análisis pendiente</Typography>
                                                }
                                                </Box>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                </React.Fragment>
                            )
                        }
                    </List>
                </Box>
            </Grid>
        </Grid>
    )
}
