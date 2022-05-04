import React from 'react';
import { Nav, Container, Navbar} from 'react-bootstrap';

export default function SiteNav() {
    return (
        <>
            <Navbar fixed="top" expand="lg" variant="light" bg="light">
            <Container fluid>
                <Navbar.Brand href="https://bitcoin.org.hk">Bitcoin HK</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Nav.Link  className="link" href="/">Home</Nav.Link>
                <Nav.Link className="link" href="/Org">Corporate</Nav.Link>
                <Nav.Link className="link" href="/Indiv">Individual</Nav.Link>      
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    );
  };
 

