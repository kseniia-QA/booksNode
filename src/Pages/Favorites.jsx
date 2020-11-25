import React, { useState, useEffect } from 'react';
import { Container, CardDeck, Card } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import Book from '../components/Book';

export default function Favorites() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const url = `${process.env.REACT_APP_URL}/api/favotites/books`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCards(data);
      });
  }, []);

  const noBooks = (
    <>
      <Card
        className="btn ml-auto mr-auto mt-5 font-weight-bold text-info"
        style={{
          maxWidth: '300px',
          minWidth: '150px',
          textAlign: 'center',
          border: '3px solid black',
        }}
      >
        Please add some book to favorit on home page!
      </Card>
    </>
  );

  return (
    <Container>
      <CardDeck className="d-flex flex-wrap">
        {cards.length
          ? cards.map((elem) => <Book props={elem} key={uuidv4()} />)
          : noBooks}
      </CardDeck>
    </Container>
  );
}
