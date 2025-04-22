import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AdminDashbordbg from "../public/Images/loginbg.webp"; // Import the background image


const AdminDashboard = () => {
const navigate = useNavigate();
  const handlelogout=()=>{
    navigate("/");
  }
  return (
    <div id="wrapper">
      
 {/* Navbar */}
 <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <span className="navbar-brand ">Admin Dashboard</span>
          <div className="navbar-nav ms-auto">
            <a className="nav-link" onClick={handlelogout}>Logout</a>
          </div>
        </div>
      </nav>

    {/* Sidebar */}
<div class="container-fluid" style={{
            backgroundImage: `url(${AdminDashbordbg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right'
          }}>
    <div class="row flex-nowrap">
        <div class="col-auto col-md-2 px-sm-2 px-0 bg-black">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Menu</span>
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li>
                            <a href="#" class="nav-link px-0 align-middle">
                                
                                  {/* Link to the profile page */}
                          <Link to="/Profile" className="nav-link"><i class="fs-4 bi-person"></i>
                          Profile</Link> </a>           
                    </li>
                    <li>
                        <a href="#" class="nav-link px-0 align-middle">

                        <Link to="/Industrydata" className="nav-link"><i class="fs-4 bi-building"></i>
                        Industry Data</Link> </a>   
                        
                    </li>
                    <li>
                        <a href="#" class="nav-link px-0 align-middle">
                        <Link to="/Studentdata" className="nav-link"><i class="fs-4 bi-people"></i>
                        Student Data</Link>
                        </a>
                    </li>
                </ul>
                <hr/>
            </div>
        </div>
        <div class="col py-3 text-white">
          <h2 style={{ color: 'white', fontFamily: 'Elephant' }}>Welcome to the Admin Dashboard !</h2> 
        </div>
    </div>
</div>
</div>
    
    
  );
}

export default AdminDashboard;
