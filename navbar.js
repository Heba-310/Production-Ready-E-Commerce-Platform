import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



function Nav(){
  const navigate=useNavigate();
  

    return(

        <nav className="navbar navbar-expand-lg bg-body-tertiary wow animate__animated animate__fadeIn">
  <div className="container">
   <Link className="nav-link active" to="/">Food</Link>
    <button  className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-start" id="navbarNav">
  <ul className="navbar-nav mx-auto">
    <li className="nav-item">
      <Link className="nav-link active" to="/">Home</Link>
    </li>

    <li className="nav-item">
      <Link className="nav-link" to="/about">About</Link>
    </li>

    <li className="nav-item">
      <Link className="nav-link" to="/products">Products</Link>
    </li>
   

    
  </ul>
</div>
    <button className="btn btn-danger" onClick={()=>navigate("/contact")}>Contact us</button>
  </div>
</nav>
    )
}

export default Nav;