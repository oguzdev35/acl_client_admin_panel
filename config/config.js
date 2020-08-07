import { config } from 'dotenv';

// load variables at .env file to process.env
config();

// Server infrastructure related global variables
const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'development';
const jwtSecret = process.env.JWT_SECRET || 'Your Jwt Secret';
const masterKey = process.env.PARSE_SERVER_MASTERKEY;
const mongodbRootUri = process.env.DATABASE_ROOT_URI || 'mongodb://localhost:27017';
const serverRootUri = process.env.SERVER_ROOT_URI || 'http://localhost:2000';
const cloudMainPath = process.env.PARSE_SERVER_CLOUD_CODE_MAIN ||  './server/parse_server/cloud/main.js';

// Some constants which will be used a lot in this project
const DOOR = process.env.PARSE_SERVER_DOOR_CLASSNAME;
const PERSON = process.env.PARSE_SERVER_PERSON_CLASSNAME;

export default {
  port, env, jwtSecret,mongodbRootUri, cloudMainPath,
  serverRootUri, masterKey, DOOR, PERSON 
};