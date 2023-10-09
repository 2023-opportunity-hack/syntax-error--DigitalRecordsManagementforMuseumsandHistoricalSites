#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SearchPreservationStack } from '../lib/search-preservation-stack';

require('dotenv').config()

const envDev = {account: process.env.AWS_ACCOUNT, region: process.env.AWS_REGION }

const app = new cdk.App();
new SearchPreservationStack(app, 'SearchPreservationStack', {
  
  env: envDev,
  description: "Opportunity Hack Search AI solution"

});