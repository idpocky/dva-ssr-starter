import express from 'express';
// import path from 'path';
import chalk from 'chalk';

import logger from './logger';
import ssr from './middleware/ssr';

export default () => {
  const app = express();

  const env = process.env.NODE_ENV || 'development';

  if (env !== 'production') {
    // dev mode
  } else {
    // app.use(
    //   express.static(
    //     path.join(__dirname, '../dist'),
    //     { maxAge: 86400000 * 30 },
    //   ),
    // );
  }

  app.use(ssr);
  app.disable('x-powered-by');

  const server = app.listen(8080, () => {
    const { address, port } = server.address();
    logger.info('Running in %s mode!', chalk.underline(chalk.yellow(env)));
    logger.info('%s started on port %s',
      chalk.underline(chalk.blue('App Server')),
      chalk.cyan(`${address}:${port}`));
  });
};
