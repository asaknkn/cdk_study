import sns = require('@aws-cdk/aws-sns');
import subs = require('@aws-cdk/aws-sns-subscriptions');
import sqs = require('@aws-cdk/aws-sqs');
import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');
import apigw = require('@aws-cdk/aws-apigateway');
import { LambdaIntegration } from '@aws-cdk/aws-apigateway';

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // define an AWS SQS resource
    const queue = new sqs.Queue(this, 'CdkWorkshopQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
      receiveMessageWaitTime: cdk.Duration.seconds(20)
    });

    /*
    // define an API Gateway REST API resource backed by our "hello" function
    const api = new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: hello,
      proxy: false
    });
    */

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

    const integration = new LambdaIntegration(send);

    const test = restapi.root.addResource('test');
    test.addMethod('POST', integration);

    queue.grantSendMessages(send);


  }
}
