import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './index';

const AdminRoutes = () => {
    return (isAuthenticated() && isAuthenticated().user.role === 1) ? <Outlet /> : <Navigate to='/signin' replace={true} />;
};

export default AdminRoutes;