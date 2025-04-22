import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Industrybg from "../public/Images/loginbg.webp"; // Import the background image

const IndustryData = () => {
  const [industries, setIndustries] = useState([]);
  
  useEffect(() => {
    // Fetch industries data
    axios.get('http://localhost:3001/industry/get')
      .then(response => setIndustries(response.data))
      .catch(error => console.error('Error fetching industries:', error));
  }, []);

  return (
    <div className="background" style={{
        backgroundImage: `url(${Industrybg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right',
        height: '100vh', // Ensure the background covers the full height of the viewport
        overflowY: 'auto', // Add overflow for scrolling if content exceeds viewport height
      }}>
      {/* industry info */}
      <div className="container">
        <div className="table-responsive " >
          <h3 style={{ color: 'white', fontFamily: 'Algerian' }}>Industry Information</h3>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Industry ID</th>
                <th>Company</th>
                <th>Status</th>
                <th>User ID</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {industries.map((industry) => (
                <tr key={industry.industryid}>
                  <td>{industry.industryid}</td>
                  <td>{industry.company}</td>
                  <td>{industry.status}</td>
                  <td>{industry.userid}</td>
                  <td>{industry.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default IndustryData;
