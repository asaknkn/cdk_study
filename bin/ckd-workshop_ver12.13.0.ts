#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { CkdWorkshopVer12130Stack } from '../lib/ckd-workshop_ver12.13.0-stack';

const app = new cdk.App();
new CkdWorkshopVer12130Stack(app, 'CkdWorkshopVer12130Stack');