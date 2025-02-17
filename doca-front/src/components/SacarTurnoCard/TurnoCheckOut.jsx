import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  TextField,
  FormControl,
  Button,
  Container,
  Avatar,
  SvgIcon,
  Rating,
  Icon,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Valoraciones } from "../Reviews/Reviews";

export function TurnoCheckOut({ doctor, turno, type, }) {
  const doctorVerified = doctor.cedulaVerified;
  const queryParams = new URLSearchParams(location.search);
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const svHost = import.meta.env.VITE_HOST;
  const mpKey = import.meta.env.VITE_MP_KEY;
  initMercadoPago(mpKey);

  let doctorId = doctor.id;
  let userId = user.id;

  const createPreference = async () => {
    axios
      .post(
        `${svHost}/turno`,
        { doctorId, userId, turno, type, },
        { headers: { authorization: token } }
      )
      .catch((error) => {
        console.error(error);
      });
  };

  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <Container sx={{ width: "100%", minHeight: "100dvh", pb: isMobile? 2:0 }}>
      <Typography
        variant="h1"
        sx={{
          color: "#145C6C",
          textAlign: isMobile ? "center" : "left",
          fontFamily: "Work Sans",
          fontSize: "2.5rem",
          fontWeight: "700",
          mt: 4,
        }}
      >
        Abonar consulta
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "rgba(131, 131, 131, 0.22)",
          p: 4,
          width: "100%",
          borderRadius: 5,
          gap: 4,
          mb: 4,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#5F5F5F",
            textAlign: isMobile ? "center" : "left",
            fontFamily: "Work Sans",
            fontSize: "1.75rem",
            fontWeight: "bold",
          }}
        >
          Detalle de la consulta
        </Typography>
        <Box
          className="boxContainer"
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 2 : "",
            justifyContent: "space-evenly",
            width: isMobile ? "100%" : "90%",
          }}
        >
          <Box
            className="boxLeft"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              textAlign: "center",
              gap: 2,
              width: isMobile ? "100%" : "40dvw",
              alignItems: "center",
            }}
          >
            <Box
              className="imgProfile"
              sx={{

                maxWidth: isMobile ? "80%" : "50%",
                maxHeight: isMobile ? "100%" : "100%",
                display: "flex",
                justifyContent: isMobile ? "flex-start" : "center",
                alignItems: "center",
                overflow: "hidden",
                
              }}
            >
              {doctor.profile_picture_url ? (
                <CardMedia
                  component="img"
                  alt="img"
                  sx={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: "1.5rem",
                  }}
                  image={doctor.profile_picture_url}
                />
              ) : (
                <Avatar sx={{ width: "100%", height: "100%", aspectRatio:"1" }} />
              )}
            </Box>
            {!isMobile ? (
              <Typography
                variant="h1"
                sx={{
                  color: "#fff",
                  textAlign: "center",
                  fontFamily: "Work Sans",
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  bgcolor: "#838383",
                  p: 2,
                  borderRadius: 5,
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  width: isMobile ? "100%" : "50%",
                }}
              >
                {turno ? `${turno}hs` : ""}
              </Typography>
            ) : (
              ""
            )}
          </Box>

          <Box
            className="boxRight"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              gap: 1,
              width: isMobile ? "100%" : "38dvw",
              pt: isMobile ? "" : doctor.profile_picture_url ? "5dvh" : "",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: isMobile ? "center" : "flex-start",
                gap: 2,
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: "#5F5F5F",
                  textAlign: isMobile ? "center" : "left",
                  fontFamily: "Work Sans",
                  fontSize: isMobile ? "1.5rem" : "1.75rem",
                  fontWeight: "700",
                }}
              >
                {`Dr/Dra ${doctor.name} ${doctor.lastName}`}
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  color: "#5F5F5F",
                  textAlign: isMobile ? "center" : "left",
                  fontFamily: "Work Sans",
                  fontSize: isMobile ? "1.2rem" : "1.25rem",
                  fontWeight: "700",
                }}
              >
                {doctor.category}
                {doctorVerified && (
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                    >
                      <path
                        d="M6.05882 8.20588L7.88777 10.0589C8.10199 10.2759 8.45896 10.2524 8.64301 10.0092C9.19516 9.27984 10.2923 7.83354 11.1176 6.76471M17 8C17 11.866 13.4183 15 9 15C4.58172 15 1 11.866 1 8C1 4.13401 4.58172 1 9 1C13.4183 1 17 4.13401 17 8Z"
                        stroke="#34C759"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </SvgIcon>
                )}
              </Typography>
              <Box
                sx={{
                  width: isMobile ? "100%" : "auto",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Valoraciones doctorId={doctor.id} />
              </Box>
            </Box>

            {/*
            ---------- Luego utilizar esto para ingresar correo y método de pago --------
            <Box sx={{display:"flex", flexDirection:"column"}}>

            </Box>*/}
          </Box>
        </Box>
        {isMobile ? (
          <Typography
            variant="h1"
            sx={{
              color: "#fff",
              textAlign: "center",
              fontFamily: "Work Sans",
              fontSize: "1.25rem",
              fontWeight: "700",
              bgcolor: "#838383",
              p: 2,
              borderRadius: 5,
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              width: isMobile ? "100%" : "50%",
            }}
          >
            {turno ? `${turno}hs` : ""}
          </Typography>
        ) : (
          ""
        )}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: isMobile ? "center" : "flex-end",
            alignItems: isMobile ? "center" : "center",
            gap: 4,
          }}
        >
          <Typography
            sx={{
              color: "#5F5F5F",
              textAlign: isMobile ? "center" : "right",
              fontFamily: "Work Sans",
              fontSize: "1.75rem",
              fontWeight: "Bold",
            }}
          >
            {doctor.price
              ? `Total a pagar $${doctor.price} MXN`
              : "No se ha determinado un precio aún"}
          </Typography>
          <Button
            sx={{
              borderRadius: "0.625rem",
              fontFamily: "work sans",
              fontWeight: "bold",
              width: "9.2rem",
              height: "2.4rem",
              bgcolor: "#007e20",
              "&:hover": { bgcolor: "#007e20" },
            }}
            type="button"
            variant="contained"
            color="primary"
            onClick={() => createPreference()}
            disabled={!doctor.price}
          >
            <Typography
              variant="h6"
              sx={{ fontFamily: "work sans", fontWeight: "bold" }}
            >
              Pagar
            </Typography>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
