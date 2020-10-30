import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import defaultBookCover from '../img/book';
import BooksDeck from './BooksDeck';
import AddBookCard from './AddBookCard';
// import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';

export default function BooksHandler() {
  const [show, formShow] = useState(false); // показ добавления книги
  const openForm = () => formShow(true);
  const closeForm = () => formShow(false);

  const [fail, setFail] = useState({ class: '', message: '' }); // показ ошибки при неправильной обложки
  const invalidImage = () => {
    setFail({ class: 'show', message: 'Неправильный тип файла' });
    setTimeout(() => setFail({ class: '', message: null }), 5000);
  };

  const [bookCover, setBookCover] = useState(defaultBookCover);

  const [form, setForm] = useState({
    title: '',
    description: '',
    fileBook: '',
    authors: '',
    favorit: false,
  });
  const changeForm = async (event) => {
    const { id } = event.target;
    const formElement = {};
    if (event.target.files) {
      const files = event.target.files[0];
      if (!files) return; // костыль
      if (files.type.split('/')[0] !== 'image' && id === 'fileCover') {
        invalidImage();
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = () => {
        if (id === 'fileCover') {
          setBookCover(reader.result);
        } else {
          formElement[id] = reader.result;
        }
      };
    } else if (id === 'favorit') {
      formElement[id] = !!(!formElement[id] && form.favorit !== true);
    } else {
      formElement[id] = event.target.value;
    }
    setForm({
      ...form,
      ...formElement,
    });
    console.log('==== changeForm', form);
  };

  const sendForm = async (event) => {
    event.preventDefault();
    // disabelModal();
    const url = 'http://localhost:7071/api/books';
    const body = {
      fileCover: bookCover,
      ...form,
    };
    body.key = uuidv4();
    console.log('==== sendForm', body);
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(body),
    });
    // debugger;
    window.location.reload();
    // const result = await response.json();
    // console.log(result.title);
    // if (!result.id) {
    //   // enableModal();
    //   // await invalidLoginPass(result.message);
    // } else {
    //   localStorage.setItem('id', result.id);
    //   localStorage.setItem('mail', result.mail);
    //   window.location.reload();
    // }
  };
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const url = 'http://localhost:7071/api/books';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('====== data', data);
        setCards(data);
      });
  }, []);

  return (
    <BooksDeck
      show={show}
      openForm={openForm}
      closeForm={closeForm}
      AddBookCard={AddBookCard}
      bookCover={bookCover}
      // changeBookCover={changeBookCover}
      changeForm={changeForm}
      fail={fail}
      sendForm={sendForm}
      cards={cards}
    />
  );
}
