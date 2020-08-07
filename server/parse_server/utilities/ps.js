// Parse-Server related utilities
import config from '../../../config/config';
import { ParseServer } from 'parse-server';

const parseServerConstructor = (databaseCollectionName, appId, serverPath ) => {
  return {
      ParseServer: ParseServer,
      api: new ParseServer({
              databaseURI: `${config.mongodbRootUri}/${databaseCollectionName}`,
              cloud: config.cloudMainPath,
              appId: appId,
              masterKey: config.masterKey,
              serverURL: `${config.serverRootUri}/p/${serverPath}`,
          }),
      mountPath: '/p/' + serverPath,
      appId: appId
  };
};

export const parseServersInitialization = (...serverInitializationDatas) => {

  let serverInstances = [];

  serverInitializationDatas.forEach( ({databaseCollectionName, appId, serverPath}) => {
      serverInstances.push(parseServerConstructor(databaseCollectionName, appId, serverPath));
  });

  return {serverInstances};

};


