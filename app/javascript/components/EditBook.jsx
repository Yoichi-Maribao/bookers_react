import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Field = styled.div`
  margin-bottom: 10px;
`;

const EditBook = () => {
  const params = useParams();
  const navigate = useNavigate();
  const initialState = {
    id: null,
    title: '',
    body: '',
  };

  const [currentBook, setCurrentBook] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

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

  const notice = () => {
    toast.success('Successfully updated book🎉', {
      position: 'top-center',
      hideProgressBar: true,
    });
  };

  const error = () => {
    toast.error('Failed to update book...😢', {
      position: 'top-center',
      hideProgressBar: true,
    });
  };

  const updateBook = () => {
    let data = {
      title: currentBook.title,
      body: currentBook.body,
    };

    axios
      .patch(`/api/v1/books/${params.id}`, data)
      .then((res) => {
        notice();
        navigate(`/books/${params.id}`);
      })
      .catch((e) => {
        console.log(e);
        error();
      });
  };

  useEffect(() => {
    getBook(params.id);
  }, [params.id]);

  return (
    <>
      <h1>Editing Book</h1>
      <Field>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          name="title"
          value={currentBook.title}
          onChange={handleInputChange}
        />
      </Field>
      <Field>
        <label htmlFor="body">Body</label>
        <br />
        <textarea
          name="body"
          value={currentBook.body}
          onChange={handleInputChange}
        />
      </Field>
      <input type="submit" onClick={updateBook} value="Create Book" />
    </>
  );
};

export default EditBook;
