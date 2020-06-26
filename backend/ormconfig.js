const dotenv = require('dotenv');

let envFile;

switch (process.env.NODE_ENV) {
  case 'dev':
    envFile = '.env.development';
    break;
  case 'test':
    envFile = '.env.test';
    break;
  default:
    envFile = '.env.production';
    break;
}

dotenv.config({
  path: envFile,
});

module.exports = {
  type: 'mongodb',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASSWORD,
  useUnifiedTopology: true,
  entities: [process.env.TYPEORM_ENTITIES],
};
