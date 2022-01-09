const databaseName = 'my-app';
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

const config = {
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' +
      (process.env.IP || 'localhost') +
      ':' +
      (process.env.MONGO_PORT || '27017') +
      '/' +
      databaseName,
  jwtSecret: process.env.JWT_SECRET || 'my-secret',
  fileBucket: 'files',
  databaseName,
  baseUrl,
  filesUrl: baseUrl + '/api/upload/files/',
};

export default config;
