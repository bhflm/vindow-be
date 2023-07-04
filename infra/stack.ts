import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import * as CDK from 'aws-cdk-lib';
import * as EB from 'aws-cdk-lib/aws-elasticbeanstalk';
import { Construct } from 'constructs';
import * as IAM from 'aws-cdk-lib/aws-iam';

import { globalCfg } from '../config';

const appName = globalCfg.APP_NAME;

export class CDKNestStack extends CDK.Stack {
  constructor(scope: Construct, id: string, props?: CDK.StackProps) {
    super(scope, id, props);
  
  const webAppZipArchive = new Asset(this, `${appName}-deploy`, {
    path: `${__dirname}/../../${appName}-deploy.zip`,
  });

  const app = new EB.CfnApplication(this, 'Application', {
    applicationName: appName
  });

  const appVersionProps = new EB.CfnApplicationVersion(this, 'AppVersion', {
  applicationName: appName,
  sourceBundle: {
      s3Bucket: webAppZipArchive.s3BucketName,
      s3Key: webAppZipArchive.s3ObjectKey,
  },
  description: 'cdk-eb-appdeploy',
  }); // end appVersionProps

  appVersionProps.addDependency(app);


  const ec2Role = new IAM.Role(this, `${appName}-aws-elasticbeanstalk-ec2-role`, {
    assumedBy: new IAM.ServicePrincipal('ec2.amazonaws.com'),
  });

  const managedPolicy = IAM.ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkWebTier')
  ec2Role.addManagedPolicy(managedPolicy);
  const myProfileName = `${appName}-InstanceProfile`;

  const instanceProfile = new IAM.CfnInstanceProfile(this, myProfileName, {
    instanceProfileName: myProfileName,
    roles: [
      ec2Role.roleName
    ]
  });

  const optionSettingProperties: EB.CfnEnvironment.OptionSettingProperty[] = [
    {
      namespace: 'aws:autoscaling:launchconfiguration',
      optionName: 'IamInstanceProfile',
      value: myProfileName,
  },
  {
      namespace: 'aws:autoscaling:asg',
      optionName: 'MinSize',
      value: '1',
  },
  {
      namespace: 'aws:autoscaling:asg',
      optionName: 'MaxSize',
      value: '1',
  },
  {
      namespace: 'aws:ec2:instances',
      optionName: 'InstanceTypes',
      value: 't2.micro',
  },
  {
    namespace: 'aws:elasticbeanstalk:application:environment',
    optionName: 'HEALTH_CHECK_URL',
    value: '/health',
  }
  ];

  const elbEnv = new EB.CfnEnvironment(this, 'Environment', {
    environmentName: `${appName}-NodeAppEnvironment`,
    applicationName: app.applicationName,
    solutionStackName: '64bit Amazon Linux 2 v5.8.3 running Node.js 18',
    optionSettings: optionSettingProperties,
    versionLabel: appVersionProps.ref,
  });

  }
}
