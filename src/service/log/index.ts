import winston, { Logger } from 'winston';

export default (requestId: string): Logger => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
    defaultMeta: { requestId: requestId },
  });
};
