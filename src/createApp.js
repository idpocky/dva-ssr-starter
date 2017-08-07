import React from 'react';
import dva from 'dva';
import { RouterContext } from 'dva/router';

const routerConfig = require('./router');

export default (opts, isServer) => {
  // 1. Initialize
  const app = dva(opts);

  // 2. Model
  // Remove the comment and define your model.
  // app.model({});

  // 3. Router
  if (isServer) {
    app.router(({ renderProps }) => (
      <RouterContext {...renderProps} />
    ));
  } else {
    app.router(routerConfig.getRouters);
  }
  return app;
};
