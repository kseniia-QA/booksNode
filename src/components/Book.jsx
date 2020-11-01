import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Book({
  props: { title, fileCover, authors, key, favorite, description },
}) {
  const btn = !favorite ? (
    <Button variant="success">Add to favorite</Button>
  ) : (
    <Button variant="secondary">Delete from favorite</Button>
  );

  const onClick = async (event) => {
    if (event.target.tagName === 'BUTTON') {
      event.preventDefault();
      const url = `http://localhost:7071/api/books/${key}`;
      if (!favorite) {
        await fetch(url, {
          method: 'POST',
          body: key,
        });
      } else {
        await fetch(url, {
          method: 'DELETE',
        });
      }
      window.location.reload();
    }
  };

  return (
    <>
      <Card
        className="btn mt-3"
        onClick={onClick}
        key={key}
        style={{
          maxWidth: '300px',
          minWidth: '150px',
          textAlign: 'center',
        }}
      >
        <Link
          style={{
            textDecoration: 'none',
            color: 'white',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
          to={{
            pathname: `book/${key}`,
            state: {
              ...{ title, description, fileCover, authors, favorite, key },
            },
          }}
        >
          <Card.Title style={{ margin: 'auto' }}>{title}</Card.Title>
          <Card.Img src={fileCover} />
          <Card.Text style={{ margin: 'auto' }}>{authors}</Card.Text>
        </Link>
        {btn}
      </Card>
    </>
  );
}

Book.propTypes = {
  props: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    fileCover: PropTypes.string.isRequired,
    fileBook: PropTypes.shape.isRequired,
    authors: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired,
  }).isRequired,
};
