import * as cdk from 'aws-cdk-lib';
import { aws_s3 as s3, CfnOutput, CfnParameter, Duration } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number ) {
    super(scope, id);
    new Bucket(scope, 'L3Bucket', {
      lifecycleRules: [
        {
          expiration: Duration.days(expiration)
        }
      ]
    })
  }
}
export class FirstCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // 3 buckets


    new CfnBucket(this, 'MyL1Bucket', {
      lifecycleConfiguration: {
        rules: [{
          expirationInDays: 1,
          status: 'Enabled'
        }]
      }
    });

    const duration = new CfnParameter(this, 'duration', {
      default: 6, 
      minValue: 1,
      maxValue: 10,
      type: 'Number'
    })

    const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
      lifecycleRules: [
        {
          expiration: Duration.days(duration.valueAsNumber)
        }
      ]
    });

    new L3Bucket(this, 'MyL3Bucket', 3);

    new CfnOutput(this, 'MyL2BucketName', {
      value: myL2Bucket.bucketName
    });

    // before 2023-03-23_BEGIN
    // const myBucket = new s3.Bucket(this, 'someBucket', {
    //   lifecycleRules: [
    //     {
    //       expiration: Duration.days(2)
    //     }
    //   ]
    // });

    // new CfnOutput(this, 'mybucket', {
    //   value: myBucket.bucketName
    // })
    // before 2023-03-23_END

    // example resource
    // const queue = new sqs.Queue(this, 'FirstCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
