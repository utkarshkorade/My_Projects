import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../Slice/userSlice';
import StudentDashbordbg from "../public/Images/studentdashboard.webp"; // Import the background image

const StudentDashboard = () => {
  const userData = useSelector(selectUserData);

  return (
    <div id="wrapper">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">Student Dashboard</span>
          <div className="navbar-nav ms-auto">
          
                    {/* Link to the Industry page */}
                    <Link to="/Industrypage" className="nav-link"><i class="fs-17 bi-building"></i>
                      Industry Visit
                    </Link>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <div className="container-fluid" style={{
        backgroundImage: `url(${StudentDashbordbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right',
        height: '100vh', // Ensure the background covers the full height of the viewport
        
        
      }}>

        <div className="row justify-content-center">
          <div className="col-md-8 py-3">
            <h2 className=" text-white "style={{ color: 'white', fontFamily: 'Algerian' }}>Welcome {userData?.name} to the Student Dashboard!</h2>
            <div className="card shadow-sm p-4" style={{ borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
              <div className="card-body">
                <p><strong >Student ID:  </strong>{userData?.userData?.studentid}</p>
                <p><strong>Name:  </strong>{userData?.userData?.name}</p>
                <p><strong>Gender:  </strong> {userData?.userData?.gender}</p>
                <p><strong>Email:  </strong> {userData?.userData?.email}</p>
                <p><strong>Phone:  </strong> {userData?.userData?.Phno}</p>
                <p><strong>Address:  </strong> {userData?.userData?.address}</p>
                <p><strong>Department: </strong> {userData?.userData?.department}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
