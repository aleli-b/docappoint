import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] =
    useState(JSON.parse(localStorage.getItem("user"))) || {};
  const [token, setToken] =
    useState(JSON.parse(localStorage.getItem("token"))) || {};

  const svHost = import.meta.env.VITE_HOST;

  const register = async (data) => {
    try {
      await axios.post(`${svHost}/users`, data);
      const loginData = {
        email: data.email,
        password: data.password,
        userType: data.userType,
      };
      toast.success("Creacion de usuario exitosa!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      login(loginData, true);

    } catch (error) {
      const status = error.response ? error.response.status : null;
      if (error.tokenInvalid) logout();
      if (status === 401) {        
        toast.error("Mail en uso...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Ha habido un error, por favor intente mas tarde...", {
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
    }
  };

  const login = async (data, register) => {
    if (register === true) {
      try {
        const loginData = await axios.post(`${svHost}/login`, data);
        localStorage.setItem("token", JSON.stringify(loginData.data.token));
        localStorage.setItem("user", JSON.stringify(loginData.data.user));
        toast.success("Redirigiendo a Planes.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        if (data.userType === 'patient') {
          window.location.href = `/`;
        } else {
          setTimeout(() => {
            window.location.href = `/plan/${data.userType}`;
            setUser(loginData.data.user);
            setToken(loginData.data.token);
          }, 2000);
        }
      } catch (error) {
        const status = error.response ? error.response.status : null;
        if (error.tokenInvalid) logout();
        if (status === 404) {
          toast.error("Usuario o contraseña incorrectos.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Ha habido un error.", {
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
      }
    } else {
      try {
        const loginData = await axios.post(`${svHost}/login`, data);
        localStorage.setItem("token", JSON.stringify(loginData.data.token));
        localStorage.setItem("user", JSON.stringify(loginData.data.user));
        toast.success("Ingreso exitoso! Redirigiendo...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.href = "/";
          setUser(loginData.data.user);
          setToken(loginData.data.token);
        }, 2000);
      } catch (error) {
        const status = error.response ? error.response.status : null;
        if (error.tokenInvalid) logout();
        if (status === 404) {
          toast.error("Usuario o contraseña incorrectos.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Ha habido un error.", {
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
      }
    }
  };

  const editUser = async (data) => {
    try {
      await axios.patch(`${svHost}/users/${user.id}`, data, {
        headers: {
          authorization: token,
        },
      });
      toast.success(
        "Usuario editado con éxito, los cambios se efectuarán la próxima vez que inicie sesión",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      const updatedUser = await axios.get(`${svHost}/user/${user.id}`);
      setUser(updatedUser.data)
    } catch (error) {
      console.error(error);
      toast.error("Ha habido un error.", {
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

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post(`${svHost}/forgot-password`, { email });
      return response.data.message; // Return the response message (e.g., 'Password reset email sent.')
    } catch (error) {
      console.error(error);
      throw new Error("Failed to send reset password email."); // You can handle the error as needed
    }
  };

  const logout = () => {
    window.location.href = "/";
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const auth = {
    register,
    login,
    editUser,
    logout,
    forgotPassword,
    user,
    token,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
