import * as cdk from 'aws-cdk-lib'
import { Fn } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime} from 'aws-cdk-lib/aws-lambda';


interface PhotoHandlerStackProps extends cdk.StackProps {
    targetBucketArn: string
}
export class PhotoHandlerStack extends cdk.Stack {
      
    constructor(scope: Construct, id: string, props: PhotoHandlerStackProps) {
        super(scope, id, props);

        // Clip 19
        // const targetBucket = Fn.importValue ('photosbucket');

        new LambdaFunction(this, 'PhotosHandler', {
            runtime: Runtime.NODEJS_16_X,
            handler: 'index.handler',
            code: Code.fromInline(`
            exports.handler = async (event) => {
              console.log("hello!zxzxc: " + process.env.TARGET_BUCKET);
              return {'return value': event.key1}
            };
          `),
            environment: {
                // Clip 19
                // TARGET_BUCKET: targetBucket
                TARGET_BUCKET: props.targetBucketArn
            },
        });
    }
}