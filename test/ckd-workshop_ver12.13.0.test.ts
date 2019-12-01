import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import CkdWorkshopVer12130 = require('../lib/ckd-workshop_ver12.13.0-stack');

test('SQS Queue Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CkdWorkshopVer12130.CkdWorkshopVer12130Stack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(haveResource("AWS::SQS::Queue",{
      VisibilityTimeout: 300,
      ReceiveMessageWaitTimeSeconds: 20,
      QueueName: "SQS"
    }));
});

test('RestApi Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CkdWorkshopVer12130.CkdWorkshopVer12130Stack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::ApiGateway::RestApi",{
    Name: "ApiGW"
  }));
});

/** 
test('SenderLambda Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CkdWorkshopVer12130.CkdWorkshopVer12130Stack(app, 'MyTestStack');
  
  // THEN
  expectCDK(stack).to(haveResource("AWS::Lambda::Function",{
    FunctionName: "sendlambda",
    Runtime: "nodejs8.10",
    Handler: "sendlambda.handler",
    Environment: {
      sqsURL: {
        Variables: {
          sqsURL: {
            Ref: "CdkWorkshopQueue50D9D426"
          }
        }
      }
    }
  }));
});
*/