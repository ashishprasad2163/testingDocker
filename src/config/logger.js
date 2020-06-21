import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  transports: [
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: format.json(),
    }),
  ],
});

module.exports = logger;
