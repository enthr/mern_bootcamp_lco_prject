import React, { Fragment } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth/helper';


const currentTab = ({ isActive }) => {
    return { color: isActive ? '#198754' : '#ffffff', backgroundColor: (isActive && '#212529') };
};

const Menu = () => {

    const navigate = useNavigate();

    return (
        <div className='sticky-top bg-dark'>
            <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                    <NavLink style={currentTab} className='nav-link' to='/' >Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink style={currentTab} className='nav-link' to='/cart' >Cart</NavLink>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <NavLink style={currentTab} className='nav-link' to='/user/dashboard' >User Dashboard</NavLink>
                    </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <NavLink style={currentTab} className='nav-link' to='/admin/dashboard' >Admin Dashboard</NavLink>
                    </li>
                )}
                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <NavLink style={currentTab} className='nav-link' to='/signup' >Sign Up</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={currentTab} className='nav-link' to='/signin' >Sign In</NavLink>
                        </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-item">
                        <button className='nav-link text-warning' onClick={() => {
                            return signout(() => {
                                return navigate('/', { replace: true });
                            });
                        }} >Sign Out</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Menu;
