import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useMessageContext } from "../context/MessageContext";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export const Mensajeria = () => {
  const [open, setOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [labs, setLabs] = useState([]);
  const [showDoctors, setShowDoctors] = useState(true);
  const [showLabs, setShowLabs] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const { user } = useAuth();
  const { sendMessage, getMessages, joinConversation, conversations } =
    useMessageContext();

  const svHost = import.meta.env.VITE_HOST;

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    conversations.forEach((conversation) => {
      joinConversation(conversation.id);
    });
  }, [conversations]);

  const getLabs = async () => {
    const labData = await axios.get(`${svHost}/labs`);
    setLabs(labData.data);
  };

  const getTurnos = async () => {
    let turnoData;
    if (user.userType === 'doctor'){
      turnoData = await axios.post(`${svHost}/doctor-turnos`, { doctorId: user.id });
    } else if (user.userType === 'patient'){
      turnoData = await axios.post(`${svHost}/user-turnos`, { userId: user.id });
    } else {
      turnoData = await axios.get(`${svHost}/doctors`);
    }
    if (user.userType === 'doctor'){
      setUsers(turnoData.data);
    } else {
      setDoctors(turnoData.data)
    }
  };

  useEffect(() => {
    getTurnos();
  }, []);

  const handleSubmit = async () => {
    setMessageContent("");
    if (selectedValue === "") {
      toast.error("Selecciona un usuario a mensajear");
    } else {
      await sendMessage(messageContent, selectedValue);
      getMessages();
      toast.success("Mensaje enviado con exito");
    }
  };

  const handleClickOpen = () => {
    setShowDoctors(true);
    setShowLabs(false);
    setOpen(true);
  };

  const handleClickOpenLab = () => {
    setShowDoctors(false);
    setShowLabs(true);
    getLabs();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (user.userType === "doctor") {
    return (
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: 'center',
          gap: 2,
          width: "100%",
          p: 2,
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          textAlign={"center"}
          sx={{ mb: 2 }}
        >
          Mensajeria
        </Typography>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          color="inherit"
        >
          <Box sx={{ display: "flex", gap: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Chat con Pacientes
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpenLab}
            >
              Chat con Laboratorios
            </Button>
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Mensaje</DialogTitle>
            <DialogContent>
              <FormControl
                variant="outlined"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <DialogContentText id="select-label">
                  Selecciona un nombre
                </DialogContentText>
                <Select
                  labelId="select-label"
                  id="select"
                  value={selectedValue}
                  onChange={handleChange}
                  label="asdasd"
                >
                  {showLabs
                    ? labs.map((lab) => (
                      <MenuItem key={lab.id} value={lab.id}>
                        {`${lab.name} ${lab.lastName}`}
                      </MenuItem>
                    ))
                    : users ?
                      users
                        .filter((user) => user.userType !== "lab")
                        .map((user, i) => (
                          <MenuItem key={user.paciente.id} value={user.paciente.id}>
                            {user.paciente.userType === "doctor" && "Dr. "}
                            {`${user.paciente.name} ${user.paciente.lastName}`}
                          </MenuItem>))
                      :
                      (<MenuItem disabled>
                        <Typography>No tienes pacientes con turno</Typography>
                      </MenuItem>)
                  }
                </Select>
                <TextField
                  label="Type your message"
                  variant="outlined"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                />
                <Button variant="contained" onClick={handleSubmit}>
                  Enviar
                </Button>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
            </DialogActions>
          </Dialog>
        </Link>
      </Card>
    );
  }

  return (
    <Card sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      width: "100%",
      p: 2,
    }}>

      <Typography variant="h6" component="div">
        Mensajeria
      </Typography>

      <Link
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        color="inherit"
      >
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            Chat con Doctores
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Mensaje</DialogTitle>
            <DialogContent>
              <FormControl
                variant="outlined"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <DialogContentText id="select-label">
                  Selecciona un nombre
                </DialogContentText>
                <Select
                  labelId="select-label"
                  id="select"
                  value={selectedValue}
                  onChange={handleChange}
                  label="asdasd"
                >
                  {
                    doctors.length > 0 ?
                    doctors.map((doctor) => (
                    <MenuItem
                      key={user.userType === 'lab' ? doctor.id : doctor.doctor.id}
                      value={user.userType === 'lab' ? doctor.id : doctor.doctor.id}
                    >{`Dr. ${user.userType === 'lab' ? doctor.name : doctor.doctor.name} ${user.userType === 'lab' ? doctor.lastName : doctor.doctor.lastName}`}</MenuItem>
                  ))
                  :
                  <MenuItem disabled>
                    <Typography>No tienes turno con doctores</Typography>
                  </MenuItem>}
                </Select>
                <TextField
                  label="Type your message"
                  variant="outlined"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                />
                <Button variant="contained" onClick={handleSubmit}>
                  Enviar
                </Button>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Link>


    </Card>
  );
};
