package com.rs.employee.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rs.employee.entity.Employee;
import com.rs.employee.repository.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;

@Service

public class EmployeeService {
	
	private final EmployeeRepository employeeRepository;
	
	
	public EmployeeService(EmployeeRepository employeeRepository) {
		this.employeeRepository = employeeRepository;
	}


	public Employee postEmployee(Employee employee) {
		return employeeRepository.save(employee);
	}
	
	public List<Employee>getAllEmployee(){
		return employeeRepository.findAll();
	}
	
	public void deleteEmployee(Long id) {
	    // Check if the employee exists by ID
	    if (!employeeRepository.existsById(id)) {
	        throw new EntityNotFoundException("Employee not found with id " + id);
	    }
	    // If exists, delete the employee by ID
	    employeeRepository.deleteById(id);
	}
public Employee getEmployeeById(Long id) {
	return employeeRepository.findById(id).orElse(null);
}
public boolean updateEmployee(Long id, Employee employeeDetails) {
    // Check if the employee exists
    if (employeeRepository.existsById(id)) {
        Employee existingEmployee = employeeRepository.findById(id).get(); // Fetch the employee
        // Update employee details
        existingEmployee.setName(employeeDetails.getName());
        existingEmployee.setEmail(employeeDetails.getEmail());
        existingEmployee.setPhone(employeeDetails.getPhone());
        existingEmployee.setDepartment(employeeDetails.getDepartment());

        // Save updated employee
        employeeRepository.save(existingEmployee);
        return true; // Return true indicating successful update
    } else {
        // If employee doesn't exist, return false
        return false;
    }
}
}
