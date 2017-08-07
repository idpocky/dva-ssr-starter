import React from 'react';
import { Link } from 'dva/router';

export default () => (
  <div>
    <h2>Hello Dva SSr.</h2>
    <Link to="/about">About</Link>
  </div>
);
