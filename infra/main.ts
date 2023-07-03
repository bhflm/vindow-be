#!/usr/bin/env node
import { config } from 'dotenv';
config();
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CDKNestStack } from './stack';

const app = new cdk.App();
new CDKNestStack(app, 'Nest-EB-Deploy', {});

app.synth();