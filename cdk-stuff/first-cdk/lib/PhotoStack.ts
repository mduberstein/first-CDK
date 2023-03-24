import * as cdk from 'aws-cdk-lib'
import { CfnOutput, Fn } from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotoStack extends cdk.Stack {
    private stackSuffix: string;
    public readonly photosBucketArn: string;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        this.initializeSuffix();

        const photosBucket = new Bucket(this, 'PhotosBucket2', {
            bucketName: `photosbucket-${this.stackSuffix}`
        });

       (photosBucket.node.defaultChild as CfnBucket).overrideLogicalId('PhotosBucket234lo34'); 
        // Clip 19
        // new CfnOutput(this, 'photosbucket', {
        //     value: photosBucket.bucketArn,
        //     exportName: 'photosbucket'
        // });
        this.photosBucketArn = photosBucket.bucketArn;
    }

    private initializeSuffix() {
        const shortStackId = Fn.select(2, Fn.split('/', this.stackId));
        this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId));
    }
}