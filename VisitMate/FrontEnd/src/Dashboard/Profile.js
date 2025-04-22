import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../Slice/userSlice';
import profilebg from "../public/Images/loginbg.webp"; // Import the background image

const Profiledata = () => {
  // Use useSelector to access userData from Redux store
  const userData = useSelector(selectUserData);
   console.log(userData , "userData");
  return (
    <div className="background" style={{
      backgroundImage: `url(${profilebg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'right',
      height: '100vh', // Ensure the background covers the full height of the viewport
      overflowY: 'auto', // Add overflow for scrolling if content exceeds viewport height
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm p-4" style={{ borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.8)', marginTop: '-110px'}}>
              <h2 className="text-center mb-4"style={{ color: 'black', fontFamily: 'Algerian' }}>Admin Profile</h2>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Admin ID:</strong> {userData?.userData?.adminId}</p>
                  <p><strong>Username:</strong> {userData?.userData?.username}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Name:</strong> {userData?.userData?.name}</p>
                  <p><strong>Email:</strong> {userData?.userData?.emailID}</p>
                  <p><strong>Phone:</strong> {userData?.userData?.Phno}</p>

                  {/* it does not showing ph no */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiledata;
