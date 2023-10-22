import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Route,Routes} from'react-router-dom'
import Homepage from './Pages/Home/HomePage';
import LoginPage from './Pages/Login/LoginPage';
import RegisterPage1 from './Pages/Register/RegisterPage';
import ProfilePage from './Pages/Profile/ProfilePage';
import ProductsPage1 from './Pages/Admin/ProductsPage';
import ProductDetailPage from './Pages/Admin/ProductDetailPage';
import DeleteProductConfirmation from './Pages/Admin/DeleteProductConfirmation';
import EdiProductDetail from './Pages/Admin/EdiProductDetail';
import AddProduct from './Pages/Admin/AddProduct';
import CartPage from './Pages/Cart/CartPage';
import Products from './Pages/User/Products';
import PruductDetail from './Pages/User/PruductDetail';
import PruductDetailCartApi from './Pages/User/ProductDetailCartApi';
import CheckoutPage from './Pages/Checkout/CheckoutPage';
import CategoryPage from './Pages/User/CategoryPage';
import Favourites from './Favourite/Favourites';
import AddCategory from './Pages/Admin/AddCategory';


function App() {
  return (
   <Routes>
    <Route path='/' element={<Homepage/>}></Route>
    <Route path='/login' element={<LoginPage/>}></Route>
    <Route path='/register' element={<RegisterPage1/>}></Route>
    <Route path='/profile' element={<ProfilePage/>}></Route>
    <Route path='/cartproducts' element={<CartPage/>}></Route>
    <Route path='/categories' element={<CategoryPage/>}></Route>
    <Route path='/products' element={<ProductsPage1/>}></Route>
    <Route path='/viewproducts' element={<Products/>}></Route>
    <Route path='/favourites' element={<Favourites/>}></Route>
    <Route path='/deleteproduct/:id' element={<DeleteProductConfirmation/>}></Route>
    <Route path='/productDetail/:id' element={<ProductDetailPage/>}></Route>
    <Route path='/productItemDetail/:id' element={<PruductDetailCartApi/>}></Route>
    <Route path='/editproduct/:id' element={<EdiProductDetail/>}></Route>
    <Route path='/addproduct' element={<AddProduct/>}></Route>
    <Route path='/addcategory' element={<AddCategory/>}></Route>
    <Route path='/checkout' element={<CheckoutPage/>}></Route>

   </Routes>
  );
}

export default App;
