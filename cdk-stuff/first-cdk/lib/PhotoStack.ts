import * as cdk from 'aws-cdk-lib'
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotoStack extends cdk.Stack {
    /**
     *
     */
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const myBucket = new Bucket(this, 'PhotosBucket2', {
            bucketName: 'photosbucket-234md34'
        });

        (myBucket.node.defaultChild as CfnBucket).overrideLogicalId('PhotosBucket234lo34');
        
    }

}