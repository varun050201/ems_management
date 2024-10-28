import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Dashboard.css';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        alert(`Error fetching employee data: ${error.message}`); // Show an error message to the user
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the employee");
      }

      // Update state to remove the deleted employee
      setEmployees(employees.filter(employee => employee.id !== employeeId));

      console.log(`Employee with Id ${employeeId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting employee", error);
      alert(`Error deleting employee: ${error.message}`);
    }
  };

  const handleUpdate = (employeeId) => {
    navigate(`/updateuser/${employeeId}`); // This should match the route in App.js
  };
  

  return (
    <Container className='mt-5'>
      <Row>
        <Col>
          <h1 className='text-center'>Employees</h1>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.department}</td>
                  <td>
                    <Button variant="outline-secondary" onClick={() => handleUpdate(employee.id)}>Update</Button>
                    <Button variant="outline-danger" onClick={() => handleDelete(employee.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
