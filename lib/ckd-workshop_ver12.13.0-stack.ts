import sns = require('@aws-cdk/aws-sns');
import subs = require('@aws-cdk/aws-sns-subscriptions');
import sqs = require('@aws-cdk/aws-sqs');
import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import apigw = require('@aws-cdk/aws-apigateway');
import { LambdaIntegration } from '@aws-cdk/aws-apigateway';
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources';

export class CkdWorkshopVer12130Stack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // define an AWS SQS resource
    const queue = new sqs.Queue(this, 'CdkWorkshopQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
      receiveMessageWaitTime: cdk.Duration.seconds(20),
      queueName: "SQS"
    });

    // define as API Gateway
    const restapi = new apigw.RestApi(this, "ApiGW", {
      restApiName: "ApiGW"
    })

    // define an AWS Lamda resource
    const send = new lambda.Function(this, 'SenderHnadler', {
      functionName: "sendlambda",
      runtime: lambda.Runtime.NODEJS_8_10,
      code: lambda.Code.asset('lambda'),
      handler: 'sendlambda.handler',
      environment: {
        "sqsURL": queue.queueUrl
      }
    });

    // define an AWS Lamda resource
    const recive = new lambda.Function(this, 'ReciveHnadler', {
      functionName: "recivelambda",
      runtime: lambda.Runtime.NODEJS_8_10,
      code: lambda.Code.asset('lambda'),
      handler: 'recivelambda.handler',
    });

    const integration = new LambdaIntegration(send);
    const test = restapi.root.addResource('test');
    test.addMethod('POST', integration);
    queue.grantSendMessages(send);
    recive.addEventSource(new SqsEventSource(queue, {
      batchSize: 10
    }));
  }
}
