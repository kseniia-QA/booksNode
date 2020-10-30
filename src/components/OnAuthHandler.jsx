/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './Header';
import Home from '../Pages/Home';
import AboutBook from './../Pages/AboutBook';
import Test from './../Pages/Test';

export default function OnAuthHandler() {
  const form = {
    mail: '',
    pass: '',
  };
  const changeForm = (event) => {
    form[event.target.id] = event.target.value;
    // setForm(form);
    // console.log('СHANGE', form);
  };

  const [switchStatus, setStatus] = useState(false);
  const disabelModal = () => setStatus(true);
  const enableModal = () => setStatus(false);

  const [valid, setValid] = useState({ class: '', message: null });
  const invalidLoginPass = (textMessage) => {
    setValid({ class: 'show', message: textMessage });
    setTimeout(() => setValid({ class: '', message: null }), 5000);
  };

  const sendForm = async (event) => {
    event.preventDefault();
    disabelModal();
    const url = 'http://localhost:7071/api/user/login';

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(form),
    });

    const result = await response.json();
    if (!result.id) {
      enableModal();
      await invalidLoginPass(result.message);
    } else {
      localStorage.setItem('id', result.id);
      localStorage.setItem('mail', result.mail);
      window.location.reload();
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let logBtn;
  if (localStorage.mail) {
    const localInfo = ` ${localStorage.getItem('mail')}`;
    logBtn = (
      <>
        <span className="pt-2">Добро пожаловать{localInfo}</span>
        <Button
          variant="primary"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="ml-2"
        >
          Log out
        </Button>
      </>
    );
  } else {
    logBtn = (
      <>
        <Button variant="warning" onClick={handleShow} className="ml-2">
          Log in
        </Button>
      </>
    );
  }

  return (
    <>
      <Header
        sendForm={sendForm}
        changeForm={changeForm}
        switchStatus={switchStatus}
        valid={valid}
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        logBtn={logBtn}
      />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/book/:bookId" component={AboutBook} />
          <Route exact path="/test" component={Test} />
        </Switch>
      </Router>
    </>
  );
}

// const response = await fetch(url);
// const result = await response;
// console.log(result.message);

// await fetch(url)
//   .then(async (response) => console.log(await response.text()))
//   .catch((error) => { throw new Error(error.message) });

// const xhr = new XMLHttpRequest();
// xhr.open('GET', url, true);
// // event listener here
// xhr.send();

// event.preventDefault();
// const test = event;

// console.log(test.target.value);

// console.log(Array.from(subscribeForm.elements));

// const queryString = Array.from(test)
//   .filter(({ name }) => name)
//   .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
//   .join('&');
// const url = `http://localhost:7070/?${queryString}`;
// const xhr = new XMLHttpRequest();
// xhr.open('GET', url, true);
// // event listener here
// xhr.send();
