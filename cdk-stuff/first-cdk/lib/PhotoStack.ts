import * as cdk from 'aws-cdk-lib'
import { Fn } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotoStack extends cdk.Stack {
    private stackSuffix: string;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        this.initializeSuffix();

        const myBucket = new Bucket(this, 'PhotosBucket2', {
            bucketName: `photosbucket-${this.stackSuffix}`
        });

       (myBucket.node.defaultChild as CfnBucket).overrideLogicalId('PhotosBucket234lo34'); 
    }

    private initializeSuffix() {
        const shortStackId = Fn.select(2, Fn.split('/', this.stackId));
        this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId));
    }

}