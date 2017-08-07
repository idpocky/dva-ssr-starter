import { match, createMemoryHistory } from 'dva/router';
import { renderToString } from 'react-dom/server';
import { routes } from '../../src/router';
import createApp from '../../src/createApp';

const renderFullPage = (html, initialState) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <div id="root">
      <div>
        ${html}
      </div>
    </div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
  </body>
  </html>
`;

export default (req, res) => {
  match({
    routes,
    location: req.url,
  }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`Internal Server Error ${err}`);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      let app;
      let html;
      switch (renderProps.location.pathname) {
        case '/':
          app = createApp({
            history: createMemoryHistory(),
          }, /* isServer */true);
          html = renderToString(app.start()({ renderProps }));
          res.end(renderFullPage(html, {}));
          break;
        case '/about':
          app = createApp({
            history: createMemoryHistory(),
          }, /* isServer */true);
          html = renderToString(app.start()({ renderProps }));
          res.end(renderFullPage(html, {}));
          break;
        case '/test':
          app = createApp({
            history: createMemoryHistory(),
          }, /* isServer */true);
          html = renderToString(app.start()({ renderProps }));
          res.end(renderFullPage(html, {}));
          break;
        default:
          res.status(500).end(`Uncaught pathname: ${renderProps.location.pathname}`);
          break;
      }
    } else {
      res.status(404).send('Not found');
    }
  });
};
