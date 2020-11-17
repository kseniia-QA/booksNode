import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import defaultBookCover from '../img/book';
import BooksDeck from './BooksDeck';
import AddBookCard from './AddBookCard';

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
  const [bookFile, setBookFile] = useState({});

  const [form, setForm] = useState({
    title: '',
    description: '',
    authors: '',
    favorite: false,
  });
  const changeForm = async (event) => {
    const { id } = event.target;
    const formElement = {};
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
          setBookCover(reader.result);
        } else {
          const bookFileReader = { file: reader.result, fileName: files.name };
          setBookFile(bookFileReader);
        }
      };
    } else if (id === 'favorite') {
      formElement[id] = !!(!formElement[id] && form.favorite !== true);
    } else {
      formElement[id] = event.target.value;
    }
    setForm({
      ...form,
      ...formElement,
    });
  };

  const sendForm = async (event) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_URL}/api/books`;
    const body = {
      fileCover: bookCover,
      fileBook: bookFile.file,
      fileName: bookFile.fileName,
      ...form,
    };
    body.key = uuidv4();

    // const formData = new FormData();
    // formData.append('username', 'Groucho');

    const response = await fetch(url, {
      method: 'POST',
      // mode: 'no-cors',
      body: JSON.stringify(body),
      // body: formData,
    });

    if (response.ok) {
      // const result = await response.json();
      // console.log(result);
      window.location.reload();
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
