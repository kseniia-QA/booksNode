import React, { useState } from 'react';
import { Navbar, Container, Nav, Form, Button, Modal } from 'react-bootstrap';
// import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import logo from '../img/books_image.png';
import onAuthHandler from './onAuthHandler';

export default function Header() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar
        style={{
          backgroundColor: 'rgb(124, 25, 218)',
          color: 'white',
        }}
      >
        <Container>
          <Navbar.Brand href="/" className="text-light">
            <img
              src={logo}
              height="40"
              width="40"
              className="d-inline-block align-top"
              alt="Logo"
            />
            <span className="ml-2">Books list</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Button variant="warning" onClick={handleShow}>
                Log in
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={onAuthHandler}
            // onChange={(event) => {
            //   this.prop = { [event.target]: event.target.value };
            //   // console.log(event.target.value, this.prop);
            // }}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Your Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
              <Form.Text className="text-muted">have fun!</Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Your password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                required
              />
            </Form.Group>
            <Button variant="dark" onClick={handleClose}>
              Cansel
            </Button>
            <Button
              className="ml-2"
              variant="success"
              type="submit"
              // onClick={() => alert('отправлено')}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
