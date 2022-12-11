import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult, Context } from 'aws-lambda';
import { APIGatewayProxyEventParse, ValidatedEventAPIGatewayProxyEvent } from 'src/service/types';
import createLogger from '../../service/log';
import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event: APIGatewayProxyEventParse,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const logger = createLogger(context.awsRequestId);

  logger.log({ level: 'info', message: `${context.functionName} started` });

  await new Promise((r) => setTimeout(r, 2000));

  logger.log({ level: 'info', message: `${context.functionName} ended` });

  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
  });
};

export const main = middyfy(hello);
