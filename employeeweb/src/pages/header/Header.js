import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import './Header.css';

const Header = () => {
  return (
    <div>
      <Navbar bg="primary" variant='dark'>
      <Container>
        <Navbar.Brand to="/"><strong>Employee System</strong></Navbar.Brand>
        <Nav className='ml-auto'>
<Nav.Link as={Link} to="/" className="nav-link">Employees</Nav.Link>
<Nav.Link as={Link} to="/employee" className="nav-link">Post Employees</Nav.Link>
        </Nav>
      </Container>
      </Navbar>
    </div>
  )
}

export default Header
