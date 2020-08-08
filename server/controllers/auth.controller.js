import {initializeParseClient } from '../helpers/parseClient';
import { parserServerInitialDatas } from '../../config/parseServer.initialdata';
import config from '../../config/config';
const { appId, serverPath } = parserServerInitialDatas[1];


const {Parse} = initializeParseClient(appId, config.masterKey, `${config.serverRootUri}/p/${serverPath}`);

const signin = (req, res) => {
    
    const {username, password} = req.body;

    Parse.User.logIn(username, password)
        .then( user => {
            const userJSON = user.toJSON();
            userJSON.ACL = undefined;
            return res.json({user: userJSON});
        })
        .catch( err => res.json({'Error': err.message}))

};

const signout = (req, res) => {
    Parse.User.logOut()
        .then( () => res.json({'msg': 'A user logout'}))
        .catch( err => res.json({'Error': err.message
    }))
};

const requireSignin = (req, res, next) =>  {
    const user = req.profile;
    next();
};

const  hasAuthorization = (req, res) => {

};

export default {
    signin, signout, requireSignin, hasAuthorization
}

