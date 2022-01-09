import * as document from 'document-ts';
import app from './app';
import config from './config';

async function start() {
  console.log(`mongoUri: ${config.mongoUri}`);

  try {
    await document.connect(config.mongoUri, config.isProduction);
    console.log('Connected to database!');
  } catch (err) {
    console.log(`Couldn't connect to database: ${err}`);
  }

  app.listen(config.port, async () => {
    console.log(`Server listening on port ${config.port}...`);
    await createIndexes();
    console.log('Done.');
  });
}

async function createIndexes() {
  console.log('Creating indexes...');
}

start();
