package com.rs.employee.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rs.employee.entity.Employee;
import com.rs.employee.service.EmployeeService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EmployeeController {

	private final EmployeeService employeeService;
	
	
	public EmployeeController(EmployeeService employeeService) {
		
		this.employeeService = employeeService;
	}


	@PostMapping("/employee")
	public Employee postEmployee(@RequestBody Employee employee) {
		return employeeService.postEmployee(employee);
		
	}
	@GetMapping("/employees")
	public List<Employee> getAllEmployees(){
		return employeeService.getAllEmployee();
	}
	@DeleteMapping("/employee/{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
		try{
			employeeService.deleteEmployee(id);
			return new ResponseEntity<>("employee with id" + id+ "deleted successfuly",HttpStatus.OK);
		}catch(EntityNotFoundException e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	@GetMapping("/employee/{id}")
    public ResponseEntity<?> updateEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        if(employee==null)return ResponseEntity.notFound().build();
        return ResponseEntity.ok(employee);
    }
	@PutMapping("/employee/{id}")
    public ResponseEntity<String> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        // Use service to update employee
        boolean isUpdated = employeeService.updateEmployee(id, employeeDetails);

        // Check if the update was successful
        if (isUpdated) {
            return ResponseEntity.ok("Employee updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found with id: " + id);
        }
    }
}

