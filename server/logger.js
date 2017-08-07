import winston from 'winston';

let level = 'info';
let logger = new winston.transports.Console({ colorize: true, level });

switch (process.env.NODE_ENV) {
  default:
  case 'development':
    level = 'debug';
    break;
  case 'test':
    level = 'test';
    break;
  case 'production':
    level = 'info';
    logger = new (winston.transports.File)({ filename: 'rs.winston.log' });
    break;
}

export default new winston.Logger({
  transports: [logger],
});
