import * as cdk from 'aws-cdk-lib';
import { aws_s3 as s3, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FirstCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new s3.Bucket(this, 'someBucket', {
      lifecycleRules: [
        {
          expiration: Duration.days(5)
        }
      ]
    });

    // example resource
    // const queue = new sqs.Queue(this, 'FirstCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
