import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  name: 'hello',
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'hello',
        cors: false,
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
