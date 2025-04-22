import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentDatabg from "../public/Images/loginbg.webp"; // Import the background image

const StudentData = () => {
  const [students, setStudents] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({
    userid: '',
    username: '',
    name: '',
    gender: '',
    email: '',
    Phno: '',
    address: '',
    department: '',
    industryid: '',
    status: '',
    industryinfo: ''
  });

  useEffect(() => {
    // Fetch students data
    axios.get('http://localhost:3001/student/get')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  const handleEditClick = (studentId) => {
    setEditingStudentId(studentId);
    const studentToEdit = students.find((student) => student.studentid === studentId);
    setEditedStudent({ ...studentToEdit });
  };

  const handleCancelClick = () => {
    setEditingStudentId(null);
    setEditedStudent({
      userid: '',
      username: '',
      name: '',
      gender: '',
      email: '',
      Phno: '',
      address: '',
      department: '',
      industryid: '',
      status: '',
      industryinfo: ''
    });
  };

  const handleSaveClick = async () => {
    try {
      // Update only the industryid while keeping other information as it is
      await axios.put(`http://localhost:3001/student/${editingStudentId}`, {
        industryid: editedStudent.industryid
        // Add other fields here as needed
      });
      // Refresh the student data after updating
      axios.get('http://localhost:3001/student/get')
        .then(response => setStudents(response.data))
        .catch(error => console.error('Error fetching students:', error));
      handleCancelClick();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    
    <div className="table-responsive"
    style={{
        backgroundImage: `url(${StudentDatabg})`, // Use the StudentDatabg image
        backgroundSize: 'cover',
        backgroundPosition: 'right'
      }}>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Department</th>
                    <th>Industry ID</th>
                    <th>Industry Info</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.studentid}>
                      <td>{student.studentid}</td>
                      <td>
                        {editingStudentId === student.studentid ? (
                          <input type="text" name="name" disabled value={editedStudent.name} onChange={handleInputChange} />
                        ) : (
                          student.name
                        )}
                      </td>
                      <td>
                        {editingStudentId === student.studentid ? (
                          <input type="text" name="gender" disabled value={editedStudent.gender} onChange={handleInputChange} />
                        ) : (
                          student.gender
                        )}
                      </td>
                      <td>
                        {editingStudentId === student.studentid ? (
                          <input type="text" name="email" disabled value={editedStudent.email} onChange={handleInputChange} />
                        ) : (
                          student.email
                        )}
                      </td>
                      <td>
                        {editingStudentId === student.studentid ? (
                          <input type="text" name="Phno" disabled value={editedStudent.Phno} onChange={handleInputChange} />
                        ) : (
                          student.Phno
                        )}
                      </td>
                      <td>
                        {editingStudentId === student.studentid ? (
                          <input type="text" name="address" disabled value={editedStudent.address} onChange={handleInputChange} />
                        ) : (
                          student.address
                        )}
                      </td>
                      <td>
                        {editingStudentId === student.studentid ? (
                          <input type="text" name="department" disabled value={editedStudent.department} onChange={handleInputChange} />
                        ) : (
                          student.department
                        )}
                      </td>
                      <td>
                        {editingStudentId === student.studentid ? (
                          <input type="text" name="industryid" value={editedStudent.industryid} onChange={handleInputChange} />
                        ) : (
                          student.industryid
                        )}
                      </td>
                      <td>
                        {editingStudentId === student.studentid ? (
                          <input type="text" name="industryinfo" disabled value={editedStudent.industryinfo} onChange={handleInputChange} />
                        ) : (
                          student.industryinfo
                        )}
                      </td>
                      <td>{editedStudent.status}</td>
                      <td>
                        {editingStudentId === student.studentid ? (
                          <>
                            <button onClick={handleSaveClick}>Save</button>
                            <button onClick={handleCancelClick}>Cancel</button>
                          </>
                        ) : (
                          <button onClick={() => handleEditClick(student.studentid)}style={{ backgroundColor: 'black', color: 'white' }}>Edit</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
    </div>

  );
}

export default StudentData;
