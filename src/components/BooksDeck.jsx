import React from 'react';
import {
  Container,
  Form,
  Button,
  CardDeck,
  Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function BooksDeck({
  show,
  openForm,
  closeForm,
  AddBookCard,
  bookCover,
  // changeBookCover,
  changeForm,
  fail,
  sendForm,
  cards,
}) {
  // console.log(bookCover);
  return (
    <>
      <Container>
        <CardDeck className="d-flex flex-wrap">
          {cards}
          <AddBookCard openForm={openForm} />
        </CardDeck>
      </Container>
      <Modal show={show} onHide={closeForm}>
        <Modal.Header closeButton>
          <Modal.Title>Book description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onChange={(event) => changeForm(event)}
            onSubmit={(event) => sendForm(event)}
          >
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book title"
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter book description" />
            </Form.Group>
            <Form.Group controlId="fileCover">
              <Form.Label>Cover</Form.Label>
              <div>
                <img
                  src={bookCover}
                  alt="book cover"
                  style={{ maxWidth: '100%' }}
                />
                <Form.File
                  feedback="хуйло!"
                  // onChange={changeBookCover}
                  // ref={ function(ref) { this.fileUpload = ref }.bind(this) }
                />
              </div>
              <div
                className={`mb-3 pl-4 text-danger font-weight-bold collapse ${fail.class}`}
              >
                {fail.message}
              </div>
            </Form.Group>
            <Form.Group controlId="fileBook">
              <Form.Label>Book file</Form.Label>
              <Form.File />
            </Form.Group>
            <Form.Group controlId="authors">
              <Form.Label>Authors</Form.Label>
              <Form.Control type="text" placeholder="Enter book authors" />
            </Form.Group>
            <Form.Group>
              <Form.Check
                name="favorite"
                label="add to favorite"
                id="favorit"
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

BooksDeck.propTypes = {
  openForm: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  AddBookCard: PropTypes.func,
  bookCover: PropTypes.string.isRequired,
  // changeBookCover: PropTypes.func.isRequired,
  changeForm: PropTypes.func.isRequired,
  fail: PropTypes.shape({
    class: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  sendForm: PropTypes.func.isRequired,
};

BooksDeck.defaultProps = {
  AddBookCard: <></>,
};
