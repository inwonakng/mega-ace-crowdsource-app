import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {routes} from '..'
import { Link } from 'react-router-dom';

function AppNav() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/"><b>Crowdsourcing on Algorand</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {
              routes.map(route => 
                <Nav.Link 
                  to={route.path}
                  key = {route.name}
                  as={Link}
                >
                  {route.name}
                </Nav.Link> 
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNav;