import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function IndustrialForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    companyName: "",
    status: "",
    info: "",
    department: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to login table for industrial user
      const loginResponse = await axios.post(
        "http://localhost:3001/login/create",
        {
          username: formData.username,
          password: formData.password,
          role: "industrialowner",
        }
      );

      if (loginResponse.data.message === "Login created successfully") {
        // Create industrial details
        const industryDetailsResponse = await axios.post(
          "http://localhost:3001/industry/create",
          {
            userid: loginResponse?.data?.data?.userid,
            username: formData.username,
            company: formData.companyName,
            status: formData.status,
            CompanyInfo: formData.info,
          }
        );

        if (
          industryDetailsResponse.data.message ===
          "Industry created successfully"
        ) {
          const addressResponse = await axios.post(
            `http://localhost:3001/address/create`,
            {
              industryid: industryDetailsResponse?.data?.industry?.industryid,
              street: formData.street,
              city: formData.city,
              state: formData.state,
              postalCode: formData.postalCode,
              country: formData.country,
            }
          );

          console.log(addressResponse.data, "addressResponse.data");

          setFormData({
            username: "",
            password: "",
            companyName: "",
            status: "",
            info: "",
            department: "",
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
          });

          alert("Industrial user and address created successfully");
          navigate("/");
        } else {
          alert("Error creating industrial details. Please try again.");
        }
      } else {
        alert("Error creating industrial user. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error creating industrial user. Please try again.");
    }
  };

  return (
    <div className="container">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Industrial Form
                  </p>

                  <form onSubmit={handleSubmit} class="mx-1 mx-md-4">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example1c">
                          Username:
                        </label>
                        <input
                          type="text"
                          id="form3Example1c"
                          class="form-control"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example3c">
                          Password:
                        </label>
                        <input
                          type="password"
                          id="form3Example3c"
                          class="form-control"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example3c">
                          Company Name:
                        </label>
                        <input
                          type="text"
                          id="form3Example3c"
                          class="form-control"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example3c">
                          Status
                        </label>
                        <select
                          className="form-control text-danger"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <option value="">Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example3c">
                          Additional Information:
                        </label>
                        <textarea
                          className="form-control text-warning"
                          name="info"
                          value={formData.info}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example3c">
                          Department:
                        </label>
                        <input
                          type="text"
                          id="form3Example3c"
                          class="form-control"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example3c">
                          Street:
                        </label>
                        <input
                          type="text"
                          id="form3Example3c"
                          class="form-control"
                          name="street"
                          value={formData.street}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example3c">
                          City:
                        </label>
                        <input
                          type="text"
                          id="form3Example3c"
                          class="form-control"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example3c">
                          State:
                        </label>
                        <input
                          type="text"
                          id="form3Example3c"
                          class="form-control"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example4c">
                          Postal Code:
                        </label>
                        <input
                          type="number"
                          id="form3Example4c"
                          class="form-control"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example4cd">
                          Country:
                        </label>
                        <input
                          type="text"
                          id="form3Example4cd"
                          class="form-control"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div class="d-flex">
                      <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" class="btn btn-primary btn-lg">
                          Register
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="col-md-10 col-lg-6 aa-industry col-xl-7 d-flex align-items-center order-1 order-lg-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndustrialForm;
