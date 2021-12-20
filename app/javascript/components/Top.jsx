import React from 'react';
import { Link } from 'react-router-dom';

const Top = () => {
  return (
    <>
      <h1>
        ようこそ<strong>Bookers</strong>へ！
      </h1>
      <p>
        <strong>Bookers</strong>では、さまざまな書籍に関するあなたの意見や
      </p>
      <p>印象を共有し交換することができます</p>

      <p>
        <Link to="/books">start</Link>
      </p>
    </>
  );
};

export default Top;
