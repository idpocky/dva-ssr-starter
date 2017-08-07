import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'dva/router';
import Index from './routes/index';
import About from './routes/about';

const routes = (
  <div>
    <Route path="/" component={Index} />
    <Route path="/about" component={About} />
  </div>
);

const getRouters = ({ history }) => (
  <Router history={history}>
    { routes }
  </Router>
);

getRouters.propTypes = {
  history: PropTypes.object.isRequired,
};

export {
  routes,
  getRouters,
};
