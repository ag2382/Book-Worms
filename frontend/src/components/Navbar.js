import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Navbar.scss"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function BookWormsNavbar() {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

    return (
        <Navbar collapseOnSelect expand="lg" className="bookworms-nav">
          <Container>
            <Navbar.Brand href="/" id="brand">
                BookWorms
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link id="link" href="/create">Create</Nav.Link>
                <Nav.Link id="link" href="/join">Join</Nav.Link>
              </Nav>
              <Nav>
              {isAuthenticated ? (
                        <>
                            <NavDropdown title={user.name} id="link">
                                <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => logout({ returnTo: window.location.origin })}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) : (
                        <Nav.Link onClick={() => loginWithRedirect({ returnTo: window.location.origin })} id="link">Login</Nav.Link>
                        )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}
