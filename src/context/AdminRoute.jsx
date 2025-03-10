import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user.id != process.env.REACT_APP_ADMIN_ID) {
    return <Navigate to="/account" />;
  }

  return children;
};

export default AdminRoute;