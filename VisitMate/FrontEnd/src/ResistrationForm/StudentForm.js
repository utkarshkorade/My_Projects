import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    studentName: "",
    gender: "",
    email: "",
    phno: "",
    address: "",
    department: "",
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
      const loginResponse = await axios.post(
        "http://localhost:3001/login/create",
        {
          username: formData.username,
          password: formData.password,
          role: "student",
        }
      );

      if (loginResponse.data.message === "Login created successfully") {
        const studentResponse = await axios.post(
          "http://localhost:3001/student/create",
          {
            userid: loginResponse?.data?.data?.userid,
            username: loginResponse?.data?.data?.username,
            name: formData.studentName,
            gender: formData.gender,
            email: formData.email,
            Phno: formData.phno,
            address: formData.address,
            department: formData.department,
          }
        );

        console.log(studentResponse.data, "studentResponse.data");

        setFormData({
          username: "",
          password: "",
          studentName: "",
          gender: "",
          email: "",
          phno: "",
          address: "",
          department: "",
        });

        alert("Student created successfully");
        navigate("/");
      } else {
        alert("Error creating login. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error creating student. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black">
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Student Form
                  </p>

                  <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                    {/* Username */}
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="form3Example1c">
                          Username:
                        </label>
                        <input
                          type="text"
                          id="form3Example1c"
                          className="form-control"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="form3Example3c">
                          Password:
                        </label>
                        <input
                          type="password"
                          id="form3Example3c"
                          className="form-control"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Student Name */}
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="form3Example4c">
                          Student Name:
                        </label>
                        <input
                          type="text"
                          id="form3Example4c"
                          className="form-control"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="form3Example4cd">
                          Gender:
                        </label>
                        <select
                          className="form-control"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="form3Example4cd">
                          Email:
                        </label>
                        <input
                          type="email"
                          id="form3Example4cd"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="form3Example4cd">
                          Phone Number:
                        </label>
                        <input
                          type="tel"
                          id="form3Example4cd"
                          className="form-control"
                          name="phno"
                          value={formData.phno}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-map-marker-alt fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="form3Example4cd">
                          Address:
                        </label>
                        <input
                          type="text"
                          id="form3Example4cd"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Department */}
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-building fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="form3Example4cd">
                          Department:
                        </label>
                        <input
                          type="text"
                          id="form3Example4cd"
                          className="form-control"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" className="btn btn-primary btn-lg">
                        Register
                      </button>
                    </div>
                  </form>
                </div>

                {/* Optional Image Section */}
                <div className="col-md-10 col-lg-6 col-xl-7 aa-student d-flex align-items-center order-1 order-lg-2">
                  {/* <img
                    src="./assets/images/registerImage.jpg"
                    className="img-fluid register_image"
                    alt="Sample"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentForm;
