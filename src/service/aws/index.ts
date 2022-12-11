import AWS from 'aws-sdk';

const Route53 = new AWS.Route53();

export function changeRecordsRoute53(params: any) {
  return Route53.changeResourceRecordSets(params).promise();
}
