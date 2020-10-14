import React, { useState } from 'react';
import {
  Container,
  Form,
  Button,
  CardDeck,
  Card,
  Modal,
} from 'react-bootstrap';
import defaultBookCover from '../img/book';
import defaultAddBook from '../img/addBook';
// import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';

export default function BookDeck() {
  const [show, formShow] = useState(false);
  const [bookCover, setBookCover] = useState(defaultBookCover);

  const openForm = () => formShow(true);
  const closeForm = () => formShow(false);

  const changeBookCover = async (event) => {
    const files = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(files);
    reader.onload = () => setBookCover(reader.result);
  };

  return (
    <>
      <Container>
        <CardDeck className="mt-3">
          <Card style={{ maxWidth: '300px', textAlign: 'center' }}>
            <Card.Title style={{ margin: 'auto' }}>Books name</Card.Title>
            <Card.Img src="https://img-gorod.ru/26/031/2603103_detail.jpg" />
            <Card.Text style={{ margin: 'auto' }}>Autors</Card.Text>
            <Button>Delete || add to favorite</Button>
          </Card>
          <Card style={{ maxWidth: '300px', textAlign: 'center' }}>
            <Card.Title style={{ margin: 'auto' }}>Books name</Card.Title>
            <Card.Img src="https://img-gorod.ru/26/031/2603103_detail.jpg" />
            <Card.Text style={{ margin: 'auto' }}>Autors</Card.Text>
            <Button>Delete || add to favorite</Button>
          </Card>
          <Card style={{ maxWidth: '300px', textAlign: 'center' }}>
            <Card.Title style={{ margin: 'auto' }}>Books name</Card.Title>
            <Card.Img src="https://img-gorod.ru/26/031/2603103_detail.jpg" />
            <Card.Text style={{ margin: 'auto' }}>Autors</Card.Text>
            <Button>Delete || add to favorite</Button>
          </Card>
          <Card
            onClick={openForm}
            style={{ maxWidth: '300px', textAlign: 'center' }}
            className="btn p-0"
          >
            <Card.Img
              src={defaultAddBook}
              style={{ height: '70%' }}
              className="m-auto"
            />
            <Button variant="warning">Add new</Button>
          </Card>
        </CardDeck>
      </Container>
      <Modal show={show} onHide={closeForm}>
        <Modal.Header closeButton>
          <Modal.Title>Book description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              console.log();
            }}
          >
            <Form.Group controlId="formBasicText1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book title"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicText2">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter book description" />
            </Form.Group>
            <Form.Group controlId="formBasicFile1">
              <Form.Label>Cover</Form.Label>
              <div>
                <img
                  src={bookCover}
                  alt="book cover"
                  style={{ maxWidth: '100%' }}
                />
                <Form.File
                  onChange={changeBookCover}
                  // ref={ function(ref) { this.fileUpload = ref }.bind(this) }
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicFile2">
              <Form.Label>Book file</Form.Label>
              <Form.File />
            </Form.Group>
            <Form.Group controlId="formBasicText3">
              <Form.Label>Authors</Form.Label>
              <Form.Control type="text" placeholder="Enter book authors" />
            </Form.Group>
            <Form.Group>
              <Form.Check
                name="favorite"
                label="add to favorite"
                onChange={() => console.log('check!')}
                id="validationFormik106"
                feedbackTooltip
              />
            </Form.Group>
            <Button variant="dark" onClick={closeForm}>
              Cansel
            </Button>
            <Button className="ml-2" variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
