import {
    Routes,
    Route,
    NavLink,
    Navigate,
    useNavigate,
} from 'react-router-dom';
  
type Props = {
    children: string | JSX.Element | JSX.Element[] 
  }
import React from 'react'
import useAuth from '@/Hooks/useAuth';

export default function ProtectRouter( {children}:Props) {
    const { token } = useAuth();
  
    if (!token) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
}
