import Parse from 'parse/node';

export const initializeParseClient = (appId,  masterKey, serverURL) => {
  Parse.initialize(appId, null, masterKey);
  Parse.serverURL = serverURL;

  return {Parse};
};