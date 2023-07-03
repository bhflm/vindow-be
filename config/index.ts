const APP_NAME = 'Vindow-Nestjs'
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/';

export const globalCfg = {
  APP_NAME: APP_NAME,
  APP_STAGE_NAME: process.env.STAGE || 'develop',
  db: { MONGODB_URL }
};