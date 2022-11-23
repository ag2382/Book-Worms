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
        <Navbar collapseOnSelect expand="lg">
          <Container>
            <Navbar.Brand href="/">
                BookWorms
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/create">Create</Nav.Link>
                <Nav.Link href="/join">Join</Nav.Link>
                <NavDropdown title="Clubs" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/create">Create</NavDropdown.Item>
                  <NavDropdown.Item href="/join">
                    Join
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
              {isAuthenticated ? (
                        <>
                            <NavDropdown title={user.name} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => logout()}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) : (
                        <Nav.Link onClick={() => loginWithRedirect({ returnTo: window.location.origin })}>Login</Nav.Link>
                        )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}
