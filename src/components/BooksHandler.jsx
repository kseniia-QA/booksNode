import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import defaultBookCover from '../img/book';
import BooksDeck from './BooksDeck';
import AddBookCard from './AddBookCard';

export default function BooksHandler() {
  const [show, formShow] = useState(false); // показ добавления книги
  const openForm = () => formShow(true);
  const closeForm = () => formShow(false);

  const [fail, setFail] = useState({ class: '', message: '' }); // показ ошибки при неправильной обложке
  const invalidImage = () => {
    setFail({ class: 'show', message: 'Неправильный тип файла' });
    setTimeout(() => setFail({ class: '', message: null }), 5000);
  };

  const [bookCover, setBookCover] = useState(defaultBookCover);

  const formData = new FormData();
  formData.append('title', '');
  formData.append('description', '');
  formData.append('authors', '');
  formData.append('favorite', '');
  formData.append('fileCover', bookCover);

  const [form] = useState(formData);
  const changeForm = async (event) => {
    const { id } = event.target;
    if (event.target.files) {
      const files = event.target.files[0];
      if (!files) return;

      const filesType = files.type.split('/')[0];

      if (filesType !== 'image' && id === 'fileCover') {
        invalidImage();
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = () => {
        if (id === 'fileCover') {
          form.set('fileCover', reader.result);
          setBookCover(reader.result);
        } else {
          form.set('fileBook', reader.result);
          form.set('fileName', files.name);
        }
      };
    } else if (id === 'favorite') {
      if (form.get('favorite')) {
        form.set('favorite', '');
      } else {
        form.set('favorite', true);
      }
    } else {
      form.set(`${id}`, `${event.target.value}`);
    }
  };

  const sendForm = async (event) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_URL}/api/books`;
    form.set('key', uuidv4());

    const response = await fetch(url, {
      method: 'POST',
      body: form,
    });

    if (response.ok) {
      // window.location.reload();
    } else {
      throw Error(response.statusText);
    }
  };
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const url = `${process.env.REACT_APP_URL}/api/books`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
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
      changeForm={changeForm}
      fail={fail}
      sendForm={sendForm}
      cards={cards}
    />
  );
}
