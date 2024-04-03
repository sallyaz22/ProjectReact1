import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../context/User";
import { Container } from "react-bootstrap";
// import Getproduct from '../pages/Product/component/GetProduct';
// import SendCode from './../pages/Forgetpass/SendCode';
import SignIn from './../pages/SignIn/component/SignIn';
import logo from "../img/logo.jpg";


export default function Navbar() {
  const [cartQuantity, setCartQuantity] = useState(0)
  const { userName , setUserToken, setUserName} = useContext(UserContext);
  const navigate = useNavigate()
  const logout =()=>{
    localStorage.removeItem('userToken')
    setUserToken(null);
    setUserName(null);
    navigate ('/')
  }
  return (
    <Container className="container-nav">
    <nav className="navbar navbar-expand-lg ">
      <div className="containerimg">
        <img className="navbar-brand fw-bold fs-4 img" src={logo}/>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product/1">
                Product
              </NavLink>
            </li> 
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/Getproduct/">
                GetProduct
              </NavLink>
            </li> */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/SendCode/">
                GETProduct
              </NavLink>
            </li> */}
             <li className="nav-item">
              <NavLink className="nav-link" to="/categories/">
                Categories
              </NavLink>
            </li>

            {userName ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/cart">
                    Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup/">
                    
                    Welcom {userName}
                  </NavLink>
                  <li className="nav-item">
                    <button onClick={logout} className="nav-link" to="/cart">
                      LogOut
                    </button>
                  </li>
                </li>
              </>
            ) : (
              <>
              </>
            )}

        
          </ul>
        </div>
    
      <div className="right">
    <span className="qty">{cartQuantity}</span>
      <NavLink className="nav-link-cart" to="/cart">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>
</NavLink>
       </div>
       <div className="nav-link-user">
  <li className="nav-item dropdown">
  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

  </a>
  <ul className="dropdown-menu">
    <li><NavLink className="dropdown-item" to="/signin">SignIn</NavLink></li>
    <li><NavLink className="dropdown-item"  to="/signup">SignUp</NavLink></li>
    <li><NavLink className="dropdown-item"  to="/Profile/">Profile</NavLink></li>

    <li><hr className="dropdown-divider" /></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
  </ul>
</li>
</div>
                </div>
    </nav>
    </Container>
  );
}
