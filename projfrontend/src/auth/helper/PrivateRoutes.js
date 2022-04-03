import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './index';

const PrivateRoutes = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to='/signin' replace={true} />;
};

export default PrivateRoutes;