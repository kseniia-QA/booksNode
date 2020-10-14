import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookDeck from './components/BookDeck';
import Header from './components/Header';

export default function App() {
  return (
    <>
      <Header />
      <BookDeck />
    </>
  );
}
