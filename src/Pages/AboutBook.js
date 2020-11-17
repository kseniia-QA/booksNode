import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Col, Row } from 'react-bootstrap';

export default function AboutBook({
  location: {
    state: { title, description, fileCover, fileBook, authors, key },
  },
}) {
  console.log(fileBook);

  const downloadHandler = (e) => {
    e.preventDefault();
    window.open(`${process.env.REACT_APP_URL}/api/books/${key}`);
  };

  const dowloadBtn = !localStorage.mail ? null : (
    <Button onClick={downloadHandler}>Dowload book</Button>
  );

  return (
    <Container className="mt-3">
      <Row>
        <Col md={5}>
          <img src={fileCover} alt="book cover" style={{ maxWidth: '100%' }} />
        </Col>
        <Col md={7}>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{authors}</p>
          {dowloadBtn}
        </Col>
      </Row>
    </Container>
  );
}

AboutBook.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      fileCover: PropTypes.string.isRequired,
      fileBook: PropTypes.shape.isRequired,
      authors: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      favorite: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};
