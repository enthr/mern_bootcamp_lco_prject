import { API } from "../../backend";


//^ Category Calls

export const createCategory = (userId, token, categoryName) => {
    return (
        fetch(`${API}/category/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(categoryName)
        }).then((res) => {
            return res.json();
        }).catch((err) => { console.log(err); })
    );
};

export const getAllCategories = () => {
    return (
        fetch(`${API}/categories`, {
            method: 'GET'
        }).then((res) => {
            return res.json();
        }).catch((err) => { console.log(err); })
    );
};

export const getCategory = (categoryId) => {
    return (
        fetch(`${API}/category/${categoryId}`, {
            method: 'GET'
        }).then((res) => {
            return res.json();
        }).catch((err) => { console.log(err); })
    );
};

export const updateCategory = (userId, token, category, categoryId) => {
    return (
        fetch(`${API}/category/${categoryId}/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        }).then((res) => {
            return res.json();
        }).catch((err) => { console.log(err); })
    );
};

export const deleteCategory = (userId, token, categoryId) => {
    return (
        fetch(`${API}/category/${categoryId}/${userId}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            return res.json();
        }).catch((err) => { console.log(err); })
    );
};



//^ Product Calls

export const createProduct = (userId, token, product) => {
    return (
        fetch(`${API}/product/create/${userId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: product
        }).then((res) => {
            return res.json();
        }).catch((err) => { console.log(err); })
    );
};

export const getAllProducts = () => {
    return (
        fetch(`${API}/products`, {
            method: 'GET'
        }).then((res) => {
            return res.json();
        }).catch((err) => { console.log(err); })
    );
};

export const getProduct = (productId) => {
    return (
        fetch(`${API}/product/${productId}`, {
            method: 'GET'
        }).then((res) => {
            return res.json();
        }).catch((err) => { console.log(err); })
    );
};

export const updateProduct = (userId, token, product, productId) => {
    return (
        fetch(`${API}/product/${productId}/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: product
        }).then((res) => {
            return res.json();
        }).catch((err) => { console.log(err); })
    );
};

export const deleteProduct = (userId, token, productId) => {
    return (
        fetch(`${API}/product/${productId}/${userId}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            return res.json();
        }).catch((err) => { console.log(err); })
    );
};