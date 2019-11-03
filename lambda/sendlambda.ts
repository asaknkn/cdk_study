import * as AWS from 'aws-sdk';

export const handler = async (event: any) => {
  console.log('request:', JSON.stringify(event, undefined, 2));
  const message = JSON.stringify(event.body);
  console.log("body:", message);

  var sqs = new AWS.SQS();

  try {
    sqs.sendMessage({
      MessageBody: message,
      QueueUrl: process.env.sqsURL
    });
  } catch (err) {
    throw err;
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: `Hello, CDK! You've hit ${event.path}\n`
  };
};
