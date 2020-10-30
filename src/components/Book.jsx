import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import AboutBook from './../Pages/AboutBook';

export default function Book({
  title,
  description,
  fileCover,
  fileBook,
  authors,
  key,
  favorit,
}) {
  const btn = !favorit ? (
    <Button variant="success">Add to favorite</Button>
  ) : (
    <Button variant="secondary">Delete from favorite</Button>
  );

  const onClick = async (event) => {
    if (event.target.tagName === 'BUTTON') {
      event.preventDefault();
      const url = `http://localhost:7071/api/books/${key}`;
      if (!favorit) {
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
    } else {
      // tort()
    }
  };

  return (
    <>
      <Card
        href="example.com"
        id="card"
        className="btn mt-3"
        onClick={onClick}
        key={key}
        style={{
          maxWidth: '300px',
          minWidth: '150px',
          textAlign: 'center',
        }}
      >
        {/* <Link
          // style={{ textDecoration: 'none', color: 'white' }}
          to={{
            pathname: 'book/23',
            state: {
              ...{ title, description, fileCover, authors, favorit, key },
            },
          }}
        /> */}
        <Card.Title style={{ margin: 'auto' }}>{title}</Card.Title>
        <Card.Img src={fileCover} />
        <Card.Text style={{ margin: 'auto' }}>{authors}</Card.Text>
        {btn}
      </Card>
    </>
  );
}

Book.propTypes = {
  // item: PropTypes.instanceOf(PurchaseModel).isRequired,
  title: PropTypes.string.isRequired,
  fileCover: PropTypes.string.isRequired,
  fileBook: PropTypes.string.isRequired,
  authors: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  favorit: PropTypes.bool.isRequired,
};
