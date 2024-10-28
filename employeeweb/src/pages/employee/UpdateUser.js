import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import './UpdateUser.css'

const UpdateUser = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/employee/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }
        const data = await response.json();
        setEmployee(data); // Correctly set the employee data
      } catch (error) {
        console.error("Error fetching employee data:", error);
        alert(`Error fetching employee data: ${error.message}`);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee), // Send updated employee data to backend
      });
      if (!response.ok) {
        throw new Error("Failed to update employee");
      }
      alert("Employee updated successfully!");
      navigate('/'); // Navigate back to dashboard
    } catch (error) {
      console.error("Error updating employee:", error);
      alert(`Error updating employee: ${error.message}`);
    }
  };

  return (
    <Container className='mt-5'>
      <h1 className='text-center'>Update Employee</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">Update</Button>
      </Form>
    </Container>
  );
};

export default UpdateUser;
