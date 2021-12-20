import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Top from './Top';
import './App.css';
import BookList from './BookList';
import Book from './Book';
import EditBook from './EditBook';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<Book />} />
        <Route path="/books/:id/edit" element={<EditBook />} />
      </Routes>
    </>
  );
};

export default App;
