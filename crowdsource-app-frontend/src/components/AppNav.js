import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import routes from '../routes'

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
                <Nav.Link href={route.path}>
                  {route.name}
                </Nav.Link> 
              )
            }
            {/* <Nav.Link href='/'>
              Home
            </Nav.Link>
            
            <NavDropdown title='Data Menu'>
              <NavDropdown.Item href='/view-data'>
                View Collected Data
              </NavDropdown.Item>
              <NavDropdown.Item href='/submit-data'>
                Submit Data
              </NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link href='/creator-menu'>
              Creator Menu
            </Nav.Link>

            <Nav.Link href='/connect-wallet'>
              Connect Wallet
            </Nav.Link> */}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNav;