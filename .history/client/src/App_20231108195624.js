import React from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Route,Routes} from'react-router-dom'
import Homepage from './Pages/Home/HomePage';
import LoginPage from './Pages/Login/LoginPage';
import RegisterPage1 from './Pages/Register/RegisterPage';
import ProfilePage from './Pages/Profile/ProfilePage';
import AdminProductsPage from './Pages/Admin/AdminProductsPage';
import ProductDetailPage from './Pages/Admin/ProductDetailPage';
import DeleteProductConfirmation from './Pages/Admin/DeleteProductConfirmation';
import EdiProductDetail from './Pages/Admin/EdiProductDetail';
import AddProduct from './Pages/Admin/AddProduct';
import CartPage from './Pages/Cart/CartPage';
import UserProductsPage from './Pages/User/UserProductsPage';
import PruductDetail from './Pages/User/PruductDetail';
import PruductDetailCartApi from './Pages/User/ProductDetailCartApi';
import CheckoutPage from './Pages/Checkout/CheckoutPage';
import CategoryPage from './Pages/User/CategoryPage';
import Favourites from './Favourite/Favourites';
import AddCategory from './Pages/Admin/AddCategory';
import Header from './Components/Header/Header';
import { useState } from 'react';
import PlacedOrder from './Pages/Checkout/PlacedOrder';
import { useNavigate } from 'react-router-dom';


function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();




  return (
    <BrowserRouter>
    <Header onSearch={setSearchTerm}/>
   <Routes>
    <Route path='/' element={<Homepage/> searchTerm?useNavigate()}></Route>
    <Route path='/login' element={<LoginPage/>}></Route>
    <Route path='/register' element={<RegisterPage1/>}></Route>
    <Route path='/profile' element={<ProfilePage/>}></Route>
    <Route path='/cartproducts' element={<CartPage/>}></Route>
    <Route path='/categories' element={<CategoryPage/>}></Route>
    <Route path='/adminproducts' element={<AdminProductsPage/>}></Route>
    <Route path='/viewproducts' element={<UserProductsPage  searchTerm={searchTerm} />  }></Route>
    <Route path='/favourites' element={<Favourites/>}></Route>
    <Route path='/deleteproduct/:id' element={<DeleteProductConfirmation/>}></Route>
    <Route path='/productDetail/:id' element={<ProductDetailPage/>}></Route>
    <Route path='/productItemDetail/:id' element={<PruductDetailCartApi/>}></Route>
    <Route path='/editproduct/:id' element={<EdiProductDetail/>}></Route>
    <Route path='/addproduct' element={<AddProduct/>}></Route>
    <Route path='/addcategory' element={<AddCategory/>}></Route>
    <Route path='/checkout' element={<CheckoutPage/>}></Route>
    <Route path='/placeorder' element={<PlacedOrder/>}></Route>

   </Routes>
   </BrowserRouter>
  );
}

export default App;
