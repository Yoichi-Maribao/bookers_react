import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Book = () => {
  const params = useParams();
  const initialState = {
    id: null,
    title: '',
    body: '',
  };

  const [currentBook, setCurrentBook] = useState(initialState);

  const getBook = (id) => {
    axios
      .get(`/api/v1/books/${id}`)
      .then((res) => {
        setCurrentBook(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBook(params.id);
  }, [params.id]);

  return (
    <>
      <p>
        <strong>Title:</strong>
        {currentBook.title}
      </p>
      <p>
        <strong>Body:</strong>
        {currentBook.body}
      </p>
      <Link to={`/books/${params.id}/edit`}>Edit</Link>
      {' | '}
      <Link to="/books">Back</Link>
    </>
  );
};

export default Book;
