import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { toast } from "react-toastify";

export const Plan = () => {
  const { user } = useAuth();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const { userType } = useParams();
  const svHost = import.meta.env.VITE_HOST;
  const mpKey = import.meta.env.VITE_MP_KEY;
  initMercadoPago(mpKey);

  const createPreference = async (price, time) => {
    if (user) {
      axios
        .post(`${svHost}/mpcheckoutSubscription`, { user: user, price: price, time: time})
        .then(
          (response) =>
            (window.location.href = response.data.response.body.init_point)
        )
        .catch((error) => {
          console.error(error);
        });
      console.log(user);
    } else {
      toast.warning("Debes iniciar sesión", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        marginTop: 5,
        alignItems: "center",
        gap: 5,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}>
        <Typography
          sx={{
            color: "#145C6C",
            fontFamily: "work sans",
            fontWeight: "bold",
            textAlign: "center",
          }}
          variant={isMobile ? "h3" : "h2"}
        >
          {`Conviértete en un`}
          {isMobile === true ? <br /> : ""}
          {`${
            userType === "doctor" ? " especialista" : " laboratorio"
          } en línea!`}
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            color: "#145C6C",
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "work sans",
          }}
          variant={isMobile ? "h5" : "h4"}
        >
          Nuestra plataforma permite operar facilmente con los
        </Typography>
        <Typography
          sx={{
            color: "#145C6C",
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "work sans",
          }}
          variant={isMobile ? "h5" : "h4"}
        >
          {" "}
          pacientes y recibir tus honorarios de manera rápida.
        </Typography>
      </Box>
      <Box
        className="Box-Container"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 5,
          pb: isMobile ? 5 : "",
          mb: isMobile ? "" : 5,
        }}
      >
        <Box
          className="Box-1"
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          <Box
            sx={{
              p: 2,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                bgcolor: "#FF0909",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.25rem",
                height: "2rem",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                fontFamily: "work sans",
                width: "auto",
                pl: 2,
                pr: 2,
              }}
            >
              SÓLO POR SEPTIEMBRE
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#c2c2c2",
              borderRadius: "0.625rem",
              width: isMobile ? "90vw" : "19rem",
              height: "19rem",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                color: "#145C6C",
                fontWeight: "bold",
                fontSize: "2rem",
                mt: 2,
                fontFamily: "work sans",
              }}
              variant="body1"
            >
              PLAN I
            </Typography>
            <Typography
              sx={{
                color: "#145C6C",
                fontWeight: "bold",
                fontFamily: "work sans",
                fontSize: "1.5rem",
                textAlign: "center",
              }}
              variant="body1"
            >
              {"12 MESES + MES DE "}
              {<br />}
              {"SEPTIEMBRE GRATIS"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#145C6C",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  fontFamily: "work sans",
                }}
                variant="body1"
              >
                {"PRECIO FINAL: "}
                {<br />}
                {"10.000 MXN"}
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => createPreference(10000,13)}
              sx={{
                marginTop: 1,
                minWidth: "100%",
                maxWidth: "100%",
                height: "2.5rem",
                fontFamily: "work sans",
                fontWeight: "bold",
                borderRadius: "0.625rem",
              }}
            >
              Asociarme
            </Button>
          </Box>
        </Box>
        <Box
          className="Box-2"
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          <Box
            sx={{
              p: 2,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                bgcolor: "#FF0909",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.25rem",
                width: "auto",
                height: "2rem",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                fontFamily: "work sans",
                pl: 2,
                pr: 2,
              }}
            >
              SÓLO POR SEPTIEMBRE
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#c2c2c2",
              borderRadius: "0.625rem",
              width: isMobile ? "90vw" : "19rem",
              height: "19rem",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                color: "#145C6C",
                fontWeight: "bold",
                fontSize: "2rem",
                mt: 2,
                fontFamily: "work sans",
              }}
              variant="body1"
            >
              PLAN II
            </Typography>
            <Typography
              sx={{
                color: "#145C6C",
                fontWeight: "bold",
                fontFamily: "work sans",
                fontSize: "1.4rem",
                textAlign: "center",
              }}
              variant="body1"
            >
              {"OCTUBRE + NOVIEMBRE "}
              {<br />}
              {"+ MES DE SEPTIEMBRE GRATIS"}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#145C6C",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  fontFamily: "work sans",
                }}
                variant="body1"
              >
                {"PRECIO FINAL: "}
                {<br />}
                {"1.499 MXN"}
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => createPreference(1499,3)}
              sx={{
                marginTop: 1,
                minWidth: "100%",
                maxWidth: "100%",
                height: "2.5rem",
                fontFamily: "work sans",
                fontWeight: "bold",
                borderRadius: "0.625rem",
              }}
            >
              Asociarme
            </Button>
          </Box>
        </Box>
        <Box
          className="Box-3"
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          <Box
            sx={{
              p: 2,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                visibility: "hidden",
                bgcolor: "#FF0909",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.25rem",
                height: "2rem",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                width: "auto",
                pl: 2,
                pr: 2,
              }}
            >
              SÓLO POR SEPTIEMBRE
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#c2c2c2",
              borderRadius: "0.625rem",
              width: isMobile ? "90vw" : "19rem",
              height: "19rem",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                color: "#145C6C",
                fontWeight: "bold",
                fontFamily: "work sans",
                fontSize: "2rem",
                mt: 2,
              }}
              variant="body1"
            >
              PLAN III
            </Typography>
            <Typography
              sx={{
                color: "#145C6C",
                fontWeight: "bold",
                fontFamily: "work sans",
                fontSize: "1.5rem",
              }}
              variant="body1"
            >
              1 MES
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#145C6C",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  fontFamily: "work sans",
                }}
                variant="body1"
              >
                {"PRECIO FINAL: "}
                {<br />}
                {"999 MXN"}
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => createPreference(999,1)}
              sx={{
                marginTop: 1,
                minWidth: "100%",
                maxWidth: "100%",
                height: "2.5rem",
                fontFamily: "work sans",
                fontWeight: "bold",
                borderRadius: "0.625rem",
              }}
            >
              Asociarme
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
