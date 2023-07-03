import * as CDK from 'aws-cdk-lib';
import * as EB from 'aws-cdk-lib/aws-elasticbeanstalk';
import { Construct } from 'constructs';
import * as IAM from 'aws-cdk-lib/aws-iam';

import { globalCfg } from '../config';

export class CDKNestStack extends CDK.Stack {
  constructor(scope: Construct, id: string, props?: CDK.StackProps) {
    super(scope, id, props);

    // const platform = this.node.tryGetContext('platform');

    const instanceProfileRole = new IAM.Role(this, 'InstanceProfileRole', {
      roleName: 'InstanceProfileRoleEB',
      assumedBy: new IAM.ServicePrincipal('ec2.amazonaws.com')
    });
    // Create the instance profile and associate it with the role
    const instanceProfile = new IAM.CfnInstanceProfile(this, 'InstanceProfile', {
      roles: [instanceProfileRole.roleName]
    });

    const options: EB.CfnEnvironment.OptionSettingProperty[] = [
      {
        namespace: 'aws:autoscaling:launchconfiguration',
        optionName: 'IamInstanceProfile',
        value: instanceProfile.ref,
      },
    ];

    const ebApp = new EB.CfnApplication(this, `${globalCfg.APP_NAME}-app`, {
      applicationName: globalCfg.APP_NAME,
    });

    const ebEnv = new EB.CfnEnvironment(this, `${globalCfg.APP_NAME}-env`, {
      environmentName: globalCfg.APP_STAGE_NAME,
      applicationName: ebApp.ref,
      optionSettings: options,
      solutionStackName: '64bit Amazon Linux 2 v5.8.3 running Node.js 18',
    });
    
  }
}
