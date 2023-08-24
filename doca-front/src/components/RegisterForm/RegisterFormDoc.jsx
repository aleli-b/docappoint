import * as React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useAuth } from "../context/AuthContext";
import { provincesOfMexico } from "./ProvincesofMexico";
import {
  FormControl,
  Typography,
  Container,
  InputLabel,
  MenuItem,
  Select,
  SvgIcon,
  Box,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export const RegisterFormDoc = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [ageError, setAgeError] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordMatchError, setPasswordMatchError] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const auth = useAuth();
  const [type, setType] = React.useState("text");

  const handleType = () => {
    setType("date");
  };

  const getPasswordStrength = (value) => {
    if (value.length < 8) {
      return "Débil";
    } else if (value.length < 12) {
      return "Media";
    } else {
      return "Segura";
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /.+@.+\..+/;
    setEmail(value);
    setEmailError(!emailRegex.test(value));
  };

  const validateAge = (value) => {
    setAge(value);
  };

  const validatePassword = (value) => {
    setPassword(value);
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    setPasswordError(!passwordRegex.test(value));
  };

  const validateConfirmPassword = (value) => {
    setConfirmPassword(value);
    setPasswordMatchError(value !== password);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!emailError && !passwordError) {
      const formData = new FormData(event.currentTarget);
      const data = {
        name: formData.get("firstName"),
        lastName: formData.get("lastName"),
        age: formData.get("age"),
        email: formData.get("email"),
        country: "Mexico",
        state: province,
        password: formData.get("password"),
        userType: "doctor",
        category: category,
      };
      auth.register(data);
    }
  };

  const options = [
    "Anestesiología",
    "Cardiología",
    "Cirugía",
    "Dermatología",
    "Endocrinología",
    "Gastroenterología",
    "Gineco obstetricia",
    "Infectología",
    "Medicina Familiar",
    "Medicina General",
    "Medicina Intensiva",
    "Medicina del Estilo de Vida",
    "Medicina física y rehabilitación",
    "Médicina Interna",
    "Neumología",
    "Neurología",
    "Nefrología",
    "Oftalmología",
    "Oncología",
    "Ortopédico",
    "Otorrinolaringología",
    "Odontología",
    "Patología",
    "Pediatría",
    "Psiquiatría",
    "Radiología",
    "Urología",
  ];

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ minHeight: "100dvh", display: "flex", alignItems: "center" }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "#5F5F5F",
            fontWeight: "700",
            fontSize: "20px",
            pt: isMobile ? 4 : 6,
          }}
        >
          Registrarse como Doctor
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Especialidad</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              label="Especialidad"
              onChange={handleCategoryChange}
              sx={{ bgcolor: "rgba(131, 131, 131, 0.22)" }}
            >
              {options.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            margin="normal"
            required
            fullWidth
            id="firstName"
            placeholder="Nombre"
            name="firstName"
            autoComplete="given-name"
            autoFocus
            sx={{ bgcolor: "rgba(131, 131, 131, 0.22)" }}
          />
          <TextField
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            margin="normal"
            required
            fullWidth
            id="lastName"
            placeholder="Apellido"
            name="lastName"
            autoComplete="family-name"
            sx={{ bgcolor: "rgba(131, 131, 131, 0.22)" }}
          />
          <TextField
            onChange={(e) => validateAge(e.target.value)}
            value={age}
            margin="normal"
            isRequired
            fullWidth
            id="age"
            name="age"
            type={type}
            placeholder="Fecha de nacimiento"
            onFocus={() => handleType()}
            autoComplete="family-name"
            sx={{
              bgcolor: "rgba(131, 131, 131, 0.22)",
              mb: 3,
            }}
          />
          <FormControl
            fullWidth
            sx={{ bgcolor: "rgba(131, 131, 131, 0.22)", mb: 3 }}
          >
            <InputLabel htmlFor="countrySelect">País</InputLabel>
            <Select
              value="Mexico"
              disabled
              labelId="countrySelect"
              id="country-select"
            >
              <MenuItem value="Mexico">México</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ bgcolor: "rgba(131, 131, 131, 0.22)" }}>
            <InputLabel htmlFor="provinceSelect">Estado</InputLabel>
            <Select
              labelId="provinceSelect"
              id="province-select"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              <MenuItem value="" disabled>
                Seleccione su estado
              </MenuItem>
              {provincesOfMexico.map((provinceName) => (
                <MenuItem key={provinceName} value={provinceName}>
                  {provinceName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            onChange={(e) => validateEmail(e.target.value)}
            value={email}
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="Correo electrónico"
            name="email"
            autoComplete="email"
            error={emailError}
            helperText={
              emailError ? "Dirección de correo electrónico inválida" : ""
            }
            sx={{ bgcolor: "rgba(131, 131, 131, 0.22)" }}
          />
          <TextField
            onChange={(e) => validatePassword(e.target.value)}
            value={password}
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="Contraseña"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            error={passwordError}
            helperText={
              passwordError
                ? "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número."
                : ""
            }
            sx={{ bgcolor: "rgba(131, 131, 131, 0.22)" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="body2" gutterBottom color="text.secondary">
            Seguridad de la contraseña: {getPasswordStrength(password)}
          </Typography>
          <TextField
            onChange={(e) => validateConfirmPassword(e.target.value)}
            value={confirmPassword}
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            placeholder="Confirmar Contraseña"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            sx={{ bgcolor: "rgba(131, 131, 131, 0.22)" }}
            error={passwordMatchError}
            helperText={
              passwordMatchError ? "Las contraseñas no coinciden." : ""
            }
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "6rem",
                height: "2.5rem",
                borderRadius: "20px",
                bgcolor: "#145C6C",
                "&:hover": { bgcolor: "#145C6C" },
              }}
            >
              <SvgIcon component={ArrowForwardIosIcon}></SvgIcon>
            </Button>
          </Box>
          <Box
            sx={{
              pt: 2,
              pb: 2,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography>Tienes cuenta?</Typography>
            <Link
              href="/login"
              variant="body2"
              color={"#5F5F5F"}
              underline="none"
              fontWeight={"700"}
            >
              Iniciar Sesión
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
