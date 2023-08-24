import * as React from "react";
import AppBar from "@mui/material/AppBar";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import docca from "../../assets/Ic2.svg";
import "./Footer.css";
import {
  Button,
  Container,
  SvgIcon,
  TextField,
  useMediaQuery,
} from "@mui/material";

export const Footer = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");
  return (
    <AppBar
      position="static"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-beetwen",
        top: "auto",
        bottom: 0,
        width: "100%",
        margin: "0 auto",
        bgcolor: "#145C6C!important",
        pl: isMobile? 0:3,
        pr: isMobile? 0:3
      }}
      id="footerNav"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-beetwen",
          width: "100%",
        }}
      >
        <Box
          className="column-1"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: 2,
            width: isMobile ? "auto" : "50%",
            textAlign: "start",
          }}
        >
          <Box
            className="socialIconsContainer"
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography>Redes sociales: </Typography>
            <Button href="https://instagram.com/docappoint?igshid=MzRlODBiNWFlZA==" sx={{minWidth:0}} >
              <SvgIcon component={InstagramIcon} sx={{ color: "white" }} />
            </Button>
            <Button href="https://www.facebook.com/profile.php?id=100094118102798" sx={{minWidth:0}}>
              <SvgIcon component={FacebookIcon} sx={{ color: "white" }} />
            </Button>
          </Box>
          <Typography>{"Tel: +52 1 662 229 7062"}</Typography>
          <Typography>{"Contacto: somosdocappoint@gmail.com"}</Typography>
          
        </Box>
        <Box
          className="column-2"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: 2,
            width: isMobile ? "auto" : "50%",
            textAlign: "end",
            alignItems: isMobile ? "start" : "end",
          }}
        >
          <Typography sx={{ width: "14.5rem" }}>
            Subscribete a nuestro newseller
          </Typography>
          <Box>
            <input
              type="email"
              placeholder="Email"
              style={{
                border: "0",
                borderBottom: "0.2rem solid white",
                borderRadius: "0.2rem",
                backgroundColor: "#145C6C",
                width: "14.5rem",
                outline: "none",
                color: "white",
              }}
            ></input>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
};
