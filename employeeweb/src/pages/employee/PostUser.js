import React, { useState } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'; // Correct import for Form
import Button from 'react-bootstrap/Button'; // Correct import for Button
import './PostUser.css';
import { useNavigate } from 'react-router-dom';

const PostUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: ""
    });

    const handleInputChange = (Event) => {
        const { name, value } = Event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
    
        
    
        try {
            const response = await fetch("http://localhost:8080/api/employee", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, // Correct header
                body: JSON.stringify(formData)
            });
    
    
            const data = await response.json();
            console.log("Employee data posted successfully:", data); // Log the response data if needed
            window.alert("Employee data submitted successfully!");
            navigate("/"); // Redirect after submission
        } catch (error) {
            console.error("Error posting employee data:", error);
            alert(`Error posting employee data: ${error.message}`); // Show an error message to the user
        }
    }
    
    return (
        <div className="center-form"> 
            <h1>Post New Employee</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup controlId='formBasicName'>
                    <FormControl
                        type="text"
                        name="name"
                        placeholder='Enter name'
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <FormGroup controlId='formBasicEmail'>
                    <FormControl
                        type="email"
                        name="email"
                        placeholder='Enter email'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <FormGroup controlId='formBasicPhone'>
                    <FormControl
                        type="text"
                        name="phone"
                        placeholder='Enter phone'
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <FormGroup controlId='formBasicDepartment'>
                    <FormControl
                        type="text"
                        name="department"
                        placeholder='Enter department'
                        value={formData.department}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <Button variant="primary" type='submit' className='w-100'>Post Employee</Button>
            </Form>
        </div>
    );
}

export default PostUser;
