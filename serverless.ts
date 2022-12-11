import type { AWS } from '@serverless/typescript';
import { hello } from 'src/functions';
import { readFileSync } from 'fs';
import { parse } from 'yamljs';

const config = readFileSync(`./config/${process.env.NODE_ENV}.yml`, 'utf8');

const env = parse(config);

const serverlessConfiguration: AWS = {
  service: 'typescript-lambda',
  frameworkVersion: '3',
  plugins: ['serverless-offline', 'serverless-esbuild'],
  useDotenv: true,
  custom: {
    ENV: {
      ...env,
    },
    esbuild: {
      bundle: true,
      minify: false,
      exclude: [],
      target: 'node14',
      platform: 'node',
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    iam: {
      role: env.awsRole,
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      restApiId: env.restApiId,
      restApiRootResourceId: env.restApiRootResourceId,
    },
    vpc: {
      securityGroupIds: [],
      subnetIds: [],
    },
    stage: '${opt:stage, "dev"}',
    region: env.region,
    environment: {
      ...env,
    },
  },
  functions: { hello },
  package: { individually: true },
};

module.exports = serverlessConfiguration;
