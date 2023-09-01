import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PerfilDoctores } from '../../pages/Perfil/PerfilDoctores/PerfilDoctores';
import { PerfilPacientes } from '../../pages/Perfil/PerfilPacientes/PerfilPacientes';
import { PerfilLaboratorios } from '../../pages/Perfil/PerfilLaboratorios/PerfilLaboratorios';

export const ProfileRoute = ({ children }) => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/" replace />; // Navega a la página de inicio si no hay un usuario autenticado
  }

  switch (auth.user.userType) {
    case 'doctor':
      return <PerfilDoctores />;
    case 'patient':
      return <PerfilPacientes />;
    case 'lab':
      return <PerfilLaboratorios />;
      // case 'vendedor':
      //   return <PerfilVendedores />;
    default:
      return <Navigate to="/" replace />; // Navega a la página de inicio si el tipo de usuario es desconocido
  }
};