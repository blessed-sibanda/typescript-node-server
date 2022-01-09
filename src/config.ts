import dotenv from 'dotenv';
dotenv.config();

const config = {
  mongoUri: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET || 'my-super-secret',
  fileBucket: 'files',
  filesUrl: process.env.BASE_URL + '/api/upload/files/',
  isProduction: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
};

export default config;
