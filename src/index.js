import { browserHistory } from 'dva/router';

import createApp from './createApp';

/* --- Single page app --- */

/* 1. createApp */
const app = createApp({
  history: browserHistory,
  initialState: window.__INITIAL_STATE__,
});
delete window.__INITIAL_STATE__;

/* 2. start */
app.start('#root');
