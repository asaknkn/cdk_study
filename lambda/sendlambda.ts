//import * as AWSXRay from 'aws-xray-sdk';
//var AWS = AWSXRay.captureAWS(require('aws-sdk'));
import * as AWS from "aws-sdk"

export const handler = async (event: any) => {
  console.log('request:', JSON.stringify(event, undefined, 2));
  console.log("body:", event.body);

  var sqs = new AWS.SQS();

  try {
    await sqs.sendMessage({
      MessageBody: event.body,
      QueueUrl: process.env.sqsURL,
      DelaySeconds: 0
    }).promise();
  } catch(e) {
    throw e;
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: `put message to SQS\n`
  };
};
