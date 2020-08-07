import config from './config';
export const apps = [
    {
      "serverURL": "http://localhost:2000/p/master",
      "appId": "master44444",
      "masterKey": config.masterKey,
      "appName": "Master"
    },
    {
      "serverURL": "http://localhost:2000/p/ins01",
      "appId": "ins01",
      "masterKey": config.masterKey,
      "appName": "Ins01"
    }
];
  
export const users = [
    {
      "user": "admin",
      "pass": "admin"
    }
];
