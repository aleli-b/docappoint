import React, { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    Container,
    Grid,
    Paper,
    Typography,
    styled,
    useMediaQuery,
} from "@mui/material";
import { useAuth } from "../../../components/context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import { EditModal } from "../../../components/EditModal/EditModal";
import { UploadImage } from "../../UploadImage/UploadImage";
import { AssignedDoctorCard } from "../../../components/AssignedDoctorCard/AssignedDoctorCard";

export const PerfilVendedores = () => {
    const { user, editUser } = useAuth();
    const [editing, setEditing] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState("");
    const [newValue, setNewValue] = useState("");
    const isMobile = useMediaQuery("(max-width: 900px)");

    user.fullName = user.name + " " + user.lastName;

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#D5DBDB  ",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    const handleSaveField = (field, value) => {
        try {
            editUser({ [field]: value });
        } catch (error) {
            console.error("Ha habido un error");
        }
    };

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingX: "20px",
                gap: 2,
                minHeight: "100dvh",
                marginY: 2,
            }}
        >
            <Box item sx={{ width: "100%", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", gap: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column", width: isMobile ? "100%" : "30%", gap: 3 }}>
                    <Card
                        className="patientCard"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                            width: "100%",
                            p: 2,
                        }}
                    >
                        <Avatar
                            alt={user.fullName}
                            src={user.profile_picture_url}
                            sx={{ width: 180, height: 180 }}
                        />
                        <UploadImage />
                        <Typography variant="h5" component="div" text-align="center">
                            {user.fullName}
                        </Typography>
                        {user.description ? (
                            <Typography> {user.description} </Typography>
                        ) : (
                            <Button
                                onClick={() => {
                                    setFieldToEdit("description");
                                    setNewValue(user.description || "");
                                    setEditing(true);
                                }}
                            >
                                Añade una breve descripción
                            </Button>
                        )}
                    </Card>
                </Box>

                <Card
                    className="patientData"
                    sx={{
                        width: isMobile ? "100%" : "70%",
                        minHeight: "100%",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderBottom: 'solid gray 1px',
                            p: 1,
                            alignItems: "center"
                        }}
                    >
                        <Typography>Nombre:</Typography>
                        <Item>{user.name}</Item>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderBottom: 'solid gray 1px',
                            p: 1,
                            alignItems: "center"
                        }}
                    >
                        <Typography>Apellido:</Typography>
                        <Item>{user.lastName}</Item>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderBottom: 'solid gray 1px',
                            p: 1,
                            alignItems: "center"
                        }}
                    >
                        <Typography>Correo:</Typography>
                        <Item>{user.email}</Item>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderBottom: 'solid gray 1px',
                            p: 1,
                            alignItems: "center"
                        }}
                    >
                        <Typography>Tipo de Usuario:</Typography>
                        <Item>{user.userType === "vendedor" && "Vendedor"}</Item>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderBottom: 'solid gray 1px',
                            p: 1,
                            alignItems: "center"
                        }}
                    >
                        <Typography>Telefono:</Typography>
                        <Item>
                            {user.phone || "No has añadido un teléfono"}
                            <Button
                                onClick={() => {
                                    setFieldToEdit("phone");
                                    setNewValue(user.phone || "");
                                    setEditing(true);
                                }}
                            >
                                <EditIcon />
                            </Button>
                        </Item>
                    </Box>
                </Card>
            </Box>

            <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                    {/* <TurnosCardPacientes /> */}
                    <AssignedDoctorCard />
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
        </Container>
    );
};
