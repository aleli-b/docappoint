import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  TextField,
  FormControl,
  Button,
  Container,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../../components/context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { TurnoCheckOut } from "../../components/SacarTurnoCard/TurnoCheckOut";

export const Turnos = ({ location }) => {
  const [doctor, setDoctor] = useState([]);
  const [turno, setTurno] = useState([]);
  const [type, setType] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get("doctor");
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [preferenceId, setPreferenceId] = useState(null);
  const svHost = import.meta.env.VITE_HOST;

  initMercadoPago("TEST-2433162c-f145-4f69-990f-a4d97d50f2bc");

  const createPreference = async (price) => {
    try {
      const response = await axios.post(
        `${svHost}/mpcheckout/`,
        {
          price: price,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      const { id } = response.data;

      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async (price) => {
    const id = await createPreference(price);
    if (id) {
      console.log(id);
      setPreferenceId(id);
    }
  };

  const getDoctor = async () => {
    try {
      const doctorId = sessionStorage.getItem('doctorId') || sessionStorage.getItem('labId');
      const turno = sessionStorage.getItem('turno');
      const type = sessionStorage.getItem('type');

      if (!doctorId || !turno) {
        console.error("Doctor ID or turno is missing");
        return;
      }

      const response = await axios.get(`${svHost}/user/${doctorId}`);
      setDoctor(response.data);
      setTurno(turno);
      setType(type);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);

  return (
    <>
      <TurnoCheckOut doctor={doctor} turno={turno} type={type} />
    </>
  );
};
