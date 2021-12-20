import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const Field = styled.div`
  margin-bottom: 10px;
`;

const TableCell = styled.td`
  padding: 0 5px 7px;
`;

toast.configure();

const BookList = () => {
  const navigate = useNavigate();
  const initialBookState = {
    id: null,
    title: '',
    body: '',
  };

  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(initialBookState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const getBooks = () => {
    axios
      .get('/api/v1/books.json')
      .then((res) => {
        setBooks(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBooks();
  }, []);

  const notice = () => {
    toast.success('Successfully created book🎉', {
      position: 'top-center',
      hideProgressBar: true,
    });
  };

  const error = () => {
    toast.error('Failed to create book...😢', {
      position: 'top-center',
      hideProgressBar: true,
    });
  };

  const saveBook = () => {
    let data = {
      title: book.title,
      body: book.body,
    };

    axios
      .post('/api/v1/books', data)
      .then((res) => {
        setBook({
          id: res.data.id,
          title: res.data.title,
          body: res.data.body,
        });
        notice();
        navigate(`/books/${res.data.id}`);
      })
      .catch((e) => {
        console.log(e);
        error();
      });
  };

  const destroyBook = (id) => {
    axios
      .delete(`/api/v1/books/${id}`)
      .then((res) => {
        console.log(res.data);
        getBooks();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <h1>Books</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {books.map((val, key) => {
            return (
              <tr key={key}>
                <TableCell>{val.title}</TableCell>
                <TableCell>{val.body}</TableCell>
                <TableCell>
                  <Link to={`/books/${val.id}`}>Show</Link>
                </TableCell>
                <TableCell>
                  <Link to={`/books/${val.id}/edit`}>Edit</Link>
                </TableCell>
                <TableCell>
                  <a
                    href="javascript:void(0)"
                    onClick={() => destroyBook(val.id)}
                  >
                    Destroy
                  </a>
                </TableCell>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <h2>New book</h2>
        <Field>
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleInputChange}
          />
        </Field>
        <Field>
          <label htmlFor="body">Body</label>
          <br />
          <textarea
            name="body"
            value={book.body}
            onChange={handleInputChange}
          />
        </Field>
        <input type="submit" onClick={saveBook} value="Create Book" />
      </div>
    </>
  );
};

export default BookList;
