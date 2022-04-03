import React from 'react';
import { BrowserRouter, Routes as ROUTES, Route } from 'react-router-dom';
import AdminRoutes from './auth/helper/AdminRoutes';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/Cart';



const Routes = () => {
    return (
        <BrowserRouter>
            <ROUTES>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/signup' element={<Signup />} />
                <Route exact path='/signin' element={<Signin />} />
                <Route exact path='/cart' element={<Cart />} />
                <Route exact path='/user/dashboard' element={<PrivateRoutes />}>
                    <Route exact path='/user/dashboard' element={<UserDashBoard />} />
                </Route>
                <Route exact path='/admin' element={<AdminRoutes />}>
                    <Route exact path='/admin/dashboard' element={<AdminDashBoard />} />
                    <Route exact path='/admin/create/category' element={<AddCategory />} />
                    <Route exact path='/admin/create/product' element={<AddProduct />} />
                    <Route exact path='/admin/categories' element={<ManageCategories />} />
                    <Route exact path='/admin/products' element={<ManageProducts />} />
                    <Route exact path='/admin/products/update/:productId' element={<UpdateProduct />} />
                    <Route exact path='/admin/categories/update/:categoryId' element={<UpdateCategory />} />
                </Route>
            </ROUTES>
        </BrowserRouter>
    );
};

export default Routes;
