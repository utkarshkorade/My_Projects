import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectUserData } from '../Slice/userSlice';
import "../Style/industrypage.css";

const Industrypage = () => {
  const userData = useSelector(selectUserData);
  const [industryData, setIndustryData] = useState(null);
  const industryId = userData?.userData?.industryid;

  useEffect(() => {
    const fetchIndustryData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/industry/${industryId}`);
        setIndustryData(response.data);
      } catch (error) {
        console.error('Error fetching industry data:', error);
      }
    };

    if (industryId) {
      fetchIndustryData();
    }
  }, [industryId]);

  return (
    <div id="wrapper">
      {/* Main Content */}
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8 py-3">
            <h2 className="text-center text-white mb-4">
              <span className="nav-item nav-link" style={{ color: 'white', fontFamily: 'Algerian' }}>{userData?.userData?.name} Your Industry To Visit</span>
            </h2>
            {industryData ? (
              <div className="card industry-card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <b>Industry ID:</b>
                    </div>
                    <div className="col-md-6">
                      <p>{industryData.industryid}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <b>Industry Name:</b>
                    </div>
                    <div className="col-md-6">
                      <p>{industryData.company}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <b>Industry Visit Details:</b>
                    </div>
                    <div className="col-md-6">
                      <p>{industryData.CompanyInfo}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white ">Industry Is Not Assigned Yet!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Industrypage;
