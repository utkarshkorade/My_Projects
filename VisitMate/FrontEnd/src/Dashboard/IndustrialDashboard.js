import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserData } from '../Slice/userSlice';

const IndustrialDashboard = () => {
  const userData = useSelector(selectUserData);

  const [isEditing, setIsEditing] = useState(false);
  const [editedIndustry, setEditedIndustry] = useState({
    userid: '',
    username: '',
    company: '',
    status: '',
    CompanyInfo: ''
  });

  useEffect(() => {
    // Fetch industry data
    axios.get(`http://localhost:3001/industry/${userData?.userData?.industryid}`)
      .then(response => setEditedIndustry(response.data))
      .catch(error => console.error('Error fetching industry:', error));
  }, [userData]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:3001/industry/${userData?.userData?.industryid}`, editedIndustry);
      setIsEditing(false);
      alert("updated succesfully");
    } catch (error) {
      console.error('Error updating industry:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedIndustry(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div id="wrapper">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">Industry Dashboard</span>
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="#">Logout</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8 py-3">
            <h2 className="text-center text-white mb-4">Welcome to the Industrial Dashboard!</h2>

            {/* Profile Card */}
            <div className="card text-black  mb-3">
              <div className="card-header">Industry Information</div>
              <div className="card-body">
                <p className="card-text"><strong>User Id:</strong> {userData?.userData?.userid}</p>
                <p className="card-text"><strong>UserName:</strong> {userData?.userData?.username}</p>
                <p className="card-text"><strong>CompanyName:</strong> {editedIndustry.company}</p>
                <p className="card-text"><strong>CompanyInfo:</strong> {isEditing ? (
                        <textarea
                          name="CompanyInfo"
                          value={editedIndustry.CompanyInfo}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      ) : (
                        editedIndustry.CompanyInfo
                      )}</p>
              </div>
              <div className="card-footer text-center">
                {isEditing ? (
                  <div>
                    <button type="button" className="btn btn-primary" onClick={handleSaveClick}>Save</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancelClick}>Cancel</button>
                  </div>
                ) : (
                  <button type="button" className="btn btn-white" onClick={handleEditClick}><b>Edit Information</b></button>
                )}
              </div>
            </div>
            {/* End of Profile Card */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndustrialDashboard;
