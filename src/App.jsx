// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Root from './routs/Root';
import Home from './pages/Home/Component/Home';
import Login from './pages/LogIn/component/Login';
import Profile from './pages/Profile/Component/Profile';
import Notfound from './pages/Notfound/Notfound';
import Cart from './pages/Cart/component/Cart';
import Product from './pages/Product/component/Product';
import Categories from './pages/catogry/component/Categories';
import About from './pages/About/compenent/About';
import SignIn from './pages/SignIn/component/SignIn';
import Signup from './pages/SignUP/component/Signup';
import ProtectedRoute from './auto/ProtectedRoute';
import { useState } from 'react';
import UserContextProvider from './context/User';
import CategoriesProduct from './pages/catogry/component/CategoriesProduct';
import ForgetPassword from './pages/Forgetpass/ForgetPassword';
import SendCode from './pages/Forgetpass/SendCode';
import getProduct from './pages/Product/component/GetProduct';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductSideBar from './component/ProductTest/ProductSideBar';
import GetProduct from './pages/Product/component/GetProduct';




export default function App() {
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children:[

    {
      path:'/',
      element:<Home/>,
    },
    
    {
      path:'/about',
      element:<About/>,
    },
    {
      path:'/cart',
      element:<Cart/>,
    },
   {
    path:'/product/:id',
    element:
      <Product/>
   },
   {
    path:'/GetProduct/:id',
    element:<GetProduct/>
   },
   {
    path:'/CategoriesProduct/:id',
    element:<CategoriesProduct/>
   },
  {
    path:'/categories',
    element:<Categories/>
   },
   {
    path:'/Profile/',
    element:<Profile/>
   },
   {
    path:'/signin',
    element: <SignIn/>,
  },
  {
    path:'/ProductSideBar',
    element:<ProductSideBar/>
  },
  {
    path:'/ForgetPassword',
    element: <ForgetPassword/>,
  },
  {
    path:'/Sendcode/',
    element: <SendCode/>,
  },
  {
    path:'/signup',
    element:<Signup/>,
  },
   { 
      path:'*',
      element:<Notfound/>
    }


    ],
  },
]);
  return (
    <>

<UserContextProvider>
<RouterProvider router={router} />

</UserContextProvider>

      </>
  )
}
  
  


