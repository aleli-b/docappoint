import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FiberManualRecord as FiberManualRecordIcon } from "@mui/icons-material";
import Box from "@mui/material/Box";
import {
  Button,
  Grid,
  Link,
  SvgIcon,
  ListItem,
  List,
  ListItemText,
  ListItemIcon,
  Container,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import Banner from "../../assets/Banner.png";
import "./Home.css"

export const Home = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  return (
    <>
      <div id="background">
        <CssBaseline />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            minWidth: '100%',
            gap: isMobile ? 7 : 10,
          }}
        >
          <Box
            className="banner"
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              width: "100%",
              aligItems: "center",
              justifyContent: 'center',
            }}
          >
            {/* <Box
              className="leftContainer"
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            ></Box> */}
            <Box
              className="rigthContainer"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Avatar
                src={Banner}
                alt={"Banner"}
                sx={{
                  borderRadius: 0,
                  height: "auto",
                  width: isMobile ? "100vw" : "50vw",
                }}
              />
              <Box
                className="buttonsContainer"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  position: "absolute",
                  alignItems: "center",
                  gap: 2,
                  bottom: isMobile ? 15 : 15,
                }}
              >
                <Button
                  href="/especialistas"
                  variant="contained"
                  sx={{
                    width: "13rem",
                    borderRadius: "0.625rem",
                    fontFamily: "work sans",
                    fontWeight: "bold",
                    bgcolor: "#FF5C00",
                  }}
                >
                  Buscar Especialista
                </Button>
                <Box
                  className="bottomButtons"
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    gap: 2,
                    width: isMobile ? "100%" : "100%",
                  }}
                >
                  <Button
                    href="/plan/doctor"
                    variant="contained"
                    sx={{
                      width: "12rem",
                      borderRadius: "0.625rem",
                      fontFamily: "work sans",
                      fontWeight: "bold",
                      bgcolor: "#FF5C00",
                    }}
                  >
                    Soy médico
                  </Button>
                  <Button
                    href="/plan/lab"
                    variant="contained"
                    sx={{
                      width: "12rem",
                      borderRadius: "0.625rem",
                      fontFamily: "work sans",
                      fontWeight: "bold",
                      bgcolor: "#FF5C00",
                    }}
                  >
                    Soy laboratorio
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              minWidth: "100%",
              bgcolor: "#145C6C",
              borderRadius: "1.25rem",
              py: 2,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: "2.5rem",
                fontWeight: "700",
                lineHeight: isMobile ? 1 : "",
                fontFamily: "work sans",
              }}
            >
              Nuestros especialistas
            </Typography>
            <Box
              className="especialistasCategories"
              sx={{
                display: "flex",
                flexDirection: isMobile ? "row" : "column",
                justifyContent: "space-evenly",
                mt: isMobile ? 3 : "",
                textAlign: isMobile ? "left" : "",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-evenly",
                  mt: isMobile ? "" : 4,
                  gap: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: isMobile ? "20px" : "20px",
                    fontFamily: "work sans",
                    fontWeight: "bold",
                  }}
                >
                  Pediatra
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: isMobile ? "20px" : "20px",
                    fontFamily: "work sans",
                    fontWeight: "bold",
                  }}
                >
                  Medicina General
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: isMobile ? "20px" : "20px",
                    fontFamily: "work sans",
                    fontWeight: "bold",
                  }}
                >
                  Nutricionista
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: isMobile ? "20px" : "20px",
                    fontFamily: "work sans",
                    fontWeight: "bold",
                  }}
                >
                  Dentista
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: isMobile ? "20px" : "20px",
                    fontFamily: "work sans",
                    fontWeight: "bold",
                  }}
                >
                  Clínico
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: isMobile ? "20px" : "20px",
                    fontFamily: "work sans",
                    fontWeight: "bold",
                  }}
                >
                  Urólogo
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-evenly",
                  gap: 5,
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: isMobile ? "20px" : "20px",
                    fontFamily: "work sans",
                    fontWeight: "bold",
                  }}
                >
                  Cardiólogo
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: isMobile ? "20px" : "20px",
                    fontFamily: "work sans",
                    fontWeight: "bold",
                  }}
                >
                  Ginecólogo
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: isMobile ? "20px" : "20px",
                    fontFamily: "work sans",
                    fontWeight: "bold",
                  }}
                >
                  Neonatal
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: isMobile ? "20px" : "20px",
                    fontFamily: "work sans",
                    fontWeight: "bold",
                  }}
                >
                  Oftalmologo
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: isMobile ? "20px" : "20px",
                    fontFamily: "work sans",
                    fontWeight: "bold",
                  }}
                >
                  Cirujano
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: isMobile ? "20px" : "20px",
                    fontFamily: "work sans",
                    fontWeight: "bold",
                  }}
                >
                  Psicólogo
                </Typography>
              </Box>
            </Box>
          </Box>
          <Typography
            sx={{
              color: "#145C6C",
              fontSize: "2.5rem",
              fontFamily: "work sans",
              fontWeight: "bold",
            }}
          >
            Beneficios
          </Typography>
          <Container
            sx={{
              // width: "100%",
              // height: isMobile ? "auto" : "23rem",
              bgcolor: "rgba(131, 131, 131, 0.33)",
              display: "flex",
              minWidth: "100%",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-around",
              alignItems: isMobile ? "center" : "",
              p: 2,
              borderRadius: 5,
              gap: isMobile ? 2 : "",
              mb: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: 'center',
                p: 4,
                bgcolor: "rgba(20, 92, 108, 0.60)",
                borderRadius: 5,
                width: isMobile ? "50%" : "20dvw",
                minHeight: "500px",
              }}
            >
              <SvgIcon
                sx={{
                  width: "70px",
                  height: "70px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  viewBox="0 0 70 70"
                  fill="none"
                >
                  <path
                    d="M21.875 18.9583C21.875 26.1946 27.7638 32.0833 35 32.0833C42.2363 32.0833 48.125 26.1946 48.125 18.9583C48.125 11.7221 42.2363 5.83331 35 5.83331C27.7638 5.83331 21.875 11.7221 21.875 18.9583ZM58.3333 61.25H61.25V58.3333C61.25 47.0779 52.0888 37.9166 40.8333 37.9166H29.1667C17.9083 37.9166 8.75 47.0779 8.75 58.3333V61.25H58.3333Z"
                    fill="#145C6C"
                  />
                </svg>
              </SvgIcon>
              <Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-star",
                    gap: 1,
                  }}
                >
                  <FiberManualRecordIcon
                    sx={{ fontSize: "0.8rem", color: "#145C6C", marginTop: 1.5, }}
                  />

                  <Typography
                    sx={{
                      fontSize: "1.6rem",
                      fontFamily: "work sans",
                      fontWeight: "bold",
                      color: "#145C6C",
                    }}
                  >
                    Encontra gran variedad de especialistas
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignContent: "center",
                    gap: 1,
                  }}
                >
                  <FiberManualRecordIcon
                    sx={{ fontSize: "0.8rem", color: "#145C6C", marginTop: 1.5, }}
                  />

                  <Typography
                    sx={{
                      fontSize: "1.6rem",
                      fontFamily: "work sans",
                      fontWeight: "bold",
                      color: "#145C6C",
                    }}
                  >
                    Atendé tu consulta sin moverte de tu casa
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 4,
                bgcolor: "rgba(20, 92, 108, 0.60)",
                borderRadius: 5,
                width: isMobile ? "50%" : "20dvw",
                minHeight: "500px",
              }}
            >
              <SvgIcon
                sx={{
                  width: "70px",
                  height: "70px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  viewBox="0 0 70 70"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.0481 48.7696C20.1683 49.3086 19.5073 50.1412 19.1818 51.1203C18.8564 52.0994 18.8875 53.1621 19.2696 54.1205C19.6517 55.0789 20.3603 55.8715 21.2701 56.3581C22.18 56.8447 23.2325 56.9941 24.2418 56.7799C25.2511 56.5657 26.1523 56.0016 26.786 55.1874C27.4197 54.3731 27.7453 53.3611 27.7052 52.3301C27.665 51.2991 27.2618 50.3154 26.5667 49.5529C25.8716 48.7904 24.9294 48.298 23.9065 48.1629C23.8518 47.9672 23.8017 47.7703 23.7563 47.5723C23.5568 46.6713 23.4011 45.7612 23.2896 44.8452C23.1691 43.9194 23.1009 42.9875 23.0854 42.054C23.0824 41.7976 23.0897 41.5412 23.1073 41.2854C23.6673 41.125 24.2302 40.9792 24.7917 40.8523C25.4348 40.7065 25.8169 41.4648 26.1246 42.0802L26.25 42.3267H43.384C43.7179 41.6938 44.4748 40.6846 45.2083 40.8523C45.99 41.0302 46.776 41.2417 47.5548 41.4837L47.5504 41.4852C47.5475 41.4823 47.5475 41.4823 47.5504 41.4881C47.5562 41.5085 47.5883 41.6048 47.6204 41.809C47.6569 42.0452 47.6817 42.3515 47.6933 42.7204C47.7137 43.4554 47.6715 44.3494 47.5854 45.2506C47.4979 46.1504 47.3681 47.021 47.2223 47.7079C47.1902 47.861 47.1581 47.9996 47.126 48.125H45.2083C44.9376 48.1251 44.6722 48.2007 44.4419 48.3431C44.2117 48.4855 44.0256 48.6893 43.9046 48.9315L42.4463 51.8481C42.3448 52.0505 42.2919 52.2737 42.2917 52.5V55.4167C42.2917 55.8034 42.4453 56.1744 42.7188 56.4479C42.9923 56.7214 43.3632 56.875 43.75 56.875H46.6667V53.9583H45.2083V52.8442L46.1096 51.0417H50.1404L51.0417 52.8442V53.9583H49.5833V56.875H52.5C52.8868 56.875 53.2577 56.7214 53.5312 56.4479C53.8047 56.1744 53.9583 55.8034 53.9583 55.4167V52.5C53.9581 52.2737 53.9052 52.0505 53.8038 51.8481L52.3454 48.9315C52.2244 48.6893 52.0383 48.4855 51.8081 48.3431C51.5778 48.2007 51.3124 48.1251 51.0417 48.125H50.1142C50.2702 47.3477 50.4 46.4406 50.4875 45.5306C50.5837 44.5477 50.6333 43.5283 50.6085 42.6388L50.6071 42.5979C56.4229 45.0552 61.25 49.0963 61.25 53.3312V61.25H8.75V53.3312C8.75 48.9096 14.0146 44.6979 20.1702 42.2815C20.1863 43.1885 20.2723 44.2138 20.3963 45.2069C20.5304 46.2788 20.7127 47.3448 20.914 48.2227C20.9577 48.4108 21.0015 48.5931 21.0481 48.7696ZM23.3333 53.9802C24.1179 53.9802 24.7917 53.3385 24.7917 52.5C24.7917 51.6629 24.1179 51.0198 23.3333 51.0198C22.5487 51.0198 21.875 51.6615 21.875 52.5C21.875 53.3371 22.5487 53.9802 23.3333 53.9802ZM35 35C38.0942 35 41.0617 33.7708 43.2496 31.5829C45.4375 29.395 46.6667 26.4275 46.6667 23.3333C46.6667 20.2391 45.4375 17.2717 43.2496 15.0838C41.0617 12.8958 38.0942 11.6667 35 11.6667C31.9058 11.6667 28.9383 12.8958 26.7504 15.0838C24.5625 17.2717 23.3333 20.2391 23.3333 23.3333C23.3333 26.4275 24.5625 29.395 26.7504 31.5829C28.9383 33.7708 31.9058 35 35 35ZM35 37.9167C43.0544 37.9167 49.5833 31.3877 49.5833 23.3333C49.5833 15.279 43.0544 8.75 35 8.75C26.9456 8.75 20.4167 15.279 20.4167 23.3333C20.4167 31.3877 26.9456 37.9167 35 37.9167Z"
                    fill="#145C6C"
                  />
                </svg>
              </SvgIcon>
              <Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    gap: 1,
                  }}
                >
                  <FiberManualRecordIcon
                    sx={{ fontSize: "0.8rem", color: "#145C6C", marginTop: 1.5, }}
                  />

                  <Typography
                    sx={{
                      fontSize: "1.6rem",
                      fontFamily: "work sans",
                      fontWeight: "bold",
                      color: "#145C6C",
                    }}
                  >
                    Facilitar el control de su agenda
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignContent: "center",
                    gap: 1,
                  }}
                >
                  <FiberManualRecordIcon
                    sx={{ fontSize: "0.8rem", color: "#145C6C", marginTop: 1.5, }}
                  />

                  <Typography
                    sx={{
                      fontSize: "1.6rem",
                      fontFamily: "work sans",
                      fontWeight: "bold",
                      color: "#145C6C",
                    }}
                  >
                    Administrar las citas con pacientes
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignContent: "center",
                    gap: 1,
                  }}
                >
                  <FiberManualRecordIcon
                    sx={{ fontSize: "0.8rem", color: "#145C6C", marginTop: 1.5, }}
                  />

                  <Typography
                    sx={{
                      fontSize: "1.6rem",
                      fontFamily: "work sans",
                      fontWeight: "bold",
                      color: "#145C6C",
                    }}
                  >
                    Tramitar de manera sencilla con nuestros laboratorios
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignContent: "center",
                    gap: 1,
                  }}
                >
                  <FiberManualRecordIcon
                    sx={{ fontSize: "0.8rem", color: "#145C6C", marginTop: 1.5, }}
                  />

                  <Typography
                    sx={{
                      fontSize: "1.6rem",
                      fontFamily: "work sans",
                      fontWeight: "bold",
                      color: "#145C6C",
                    }}
                  >
                    Recibir los pagos facilmente
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                p: 4,
                bgcolor: "rgba(20, 92, 108, 0.60)",
                borderRadius: 5,
                width: isMobile ? "50%" : "20dvw",
                minHeight: "500px",
              }}
            >
              <SvgIcon
                sx={{
                  width: "70px",
                  height: "70px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  viewBox="0 0 70 70"
                  fill="none"
                >
                  <path
                    d="M31.9376 41.9015L18.8899 34.645L20.1825 32.4911L33.2277 39.7475L31.9376 41.9015Z"
                    fill="#145C6C"
                  />
                  <path
                    d="M45.2512 46.033C49.0193 42.6059 51.4072 37.791 51.4072 32.4171C51.4072 25.796 47.7959 19.8242 42.1808 16.4702L48.4718 5.98405L47.4837 5.43561L49.0354 2.83724L44.9677 0.57605L43.4126 3.17036L42.3723 2.59186L26.9063 28.3904L28.2572 29.1411L26.3393 32.3359L29.738 34.2257L31.6567 31.0294L33.0058 31.7801L39.5094 20.934C41.5145 22.1646 43.1653 23.8618 44.3095 25.8689C45.4537 27.876 46.0544 30.1283 46.0561 32.4179C46.0561 39.9254 39.7094 46.0338 31.9123 46.0338H20.5166V51.1891H52.5943V46.0338H45.2528L45.2512 46.033ZM16.7763 6.3903V2.29774H17.2994L17.2918 1.31624H12.5255L12.5331 2.29774H13.095V6.3903H9.53859V2.29774H10.06L10.0541 1.31624H5.28356L5.29284 2.29774H5.85478V6.3903H0.632812V26.8905H21.9535V6.3903H16.778H16.7763ZM20.1479 25.155H2.43591V8.1258H5.85394V21.2233C5.85394 22.2145 6.69516 23.0197 7.71019 23.0197C8.72691 23.0157 9.53775 22.2129 9.53775 21.2233V8.1258H13.0942V21.2233C13.0942 22.2145 13.9362 23.0197 14.9512 23.0197C15.968 23.0157 16.7788 22.2129 16.7771 21.2233V8.1258H20.1479V25.155Z"
                    fill="#145C6C"
                  />
                </svg>
              </SvgIcon>
              <Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignContent: "center",
                    gap: 1,
                  }}
                >
                  <FiberManualRecordIcon
                    sx={{ fontSize: "0.8rem", color: "#145C6C", marginTop: 1.5, }}
                  />

                  <Typography
                    sx={{
                      fontSize: "1.6rem",
                      fontFamily: "work sans",
                      fontWeight: "bold",
                      color: "#145C6C",
                    }}
                  >
                    Gestionar los pedidos medicos
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignContent: "center",
                    gap: 1,
                  }}
                >
                  <FiberManualRecordIcon
                    sx={{ fontSize: "0.8rem", color: "#145C6C", marginTop: 1.5, }}
                  />

                  <Typography
                    sx={{
                      fontSize: "1.6rem",
                      fontFamily: "work sans",
                      fontWeight: "bold",
                      color: "#145C6C",
                    }}
                  >
                    Cargar los estudios de manera sencilla
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignContent: "center",
                    gap: 1,
                  }}
                >
                  <FiberManualRecordIcon
                    sx={{ fontSize: "0.8rem", color: "#145C6C", marginTop: 1.5, }}
                  />

                  <Typography
                    sx={{
                      fontSize: "1.6rem",
                      fontFamily: "work sans",
                      fontWeight: "bold",
                      color: "#145C6C",
                    }}
                  >
                    Recibir los pagos facilmente
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Container>
          <Box
            className="laboratorios"
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
              gap: 4,
              // display: "none",
            }}
          >
            <Typography
              sx={{
                color: "#145C6C",
                fontSize: "2.5rem",
                fontFamily: "work sans",
                fontWeight: "bold",
                textAlign: 'center',
              }}
            >
              Nuestros laboratorios
            </Typography>
            <Container
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                gap: 4,
                pb: 4,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#838383",
                    width: "8.5rem",
                    height: "8.5rem",
                    borderRadius: 5,
                  }}
                ></Box>
                <Box
                  sx={{
                    bgcolor: "#838383",
                    width: "8.5rem",
                    height: "8.5rem",
                    borderRadius: 5,
                  }}
                ></Box>
                <Box
                  sx={{
                    bgcolor: "#838383",
                    width: "8.5rem",
                    height: "8.5rem",
                    borderRadius: 5,
                  }}
                ></Box>
                <Box
                  sx={{
                    bgcolor: "#838383",
                    width: "8.5rem",
                    height: "8.5rem",
                    borderRadius: 5,
                  }}
                ></Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#838383",
                    width: "8.5rem",
                    height: "8.5rem",
                    borderRadius: 5,
                  }}
                ></Box>
                <Box
                  sx={{
                    bgcolor: "#838383",
                    width: "8.5rem",
                    height: "8.5rem",
                    borderRadius: 5,
                  }}
                ></Box>
                <Box
                  sx={{
                    bgcolor: "#838383",
                    width: "8.5rem",
                    height: "8.5rem",
                    borderRadius: 5,
                  }}
                ></Box>
                <Box
                  sx={{
                    bgcolor: "#838383",
                    width: "8.5rem",
                    height: "8.5rem",
                    borderRadius: 5,
                  }}
                ></Box>
              </Box>
            </Container>
          </Box>
        </Container>
      </div>
    </>
  );
};
