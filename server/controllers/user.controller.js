import extend from 'lodash/extend';

import {initializeParseClient } from '../helpers/parseClient';
import { parserServerInitialDatas } from '../../config/parseServer.initialdata';
import config from '../../config/config';
const { appId, serverPath } = parserServerInitialDatas[1];


const {Parse} = initializeParseClient(appId, config.masterKey, `${config.serverRootUri}/p/${serverPath}`);

const create = (req, res) => {

    const {username, password, email, phone} = req.body;

    const user = new Parse.User();
    user.setUsername(username);
    user.setPassword(password);
    user.setEmail(email);
    user.set('phone', phone);

    user.signUp()
        .then(() => res.status(200).json({'msg': 'A user created.'}))
        .catch( err => res.status(406).json({'Error': `${err.code} ${err.message}`}));

};



const list = (req, res) => {
    const queryUser = new Parse.Query(Parse.User);

    queryUser.find()
        .then( (users) => {
            const newUsers = users.map( user => {
                const userJSON = user.toJSON();
                userJSON.ACL = undefined;
                return userJSON;
            })
            return res.status(200).json({'users':  newUsers});
        })
        .catch( err => res.status(404).json({'Error': `${err.code} ${err.message}`}));
};


const userByID = (req, res, next, id) => {
    const queryUser = new Parse.Query(Parse.User);

    queryUser.get(id)
        .then( user => {
            if(!user){
                return res.status(400).json({
                    'msg': 'User not found'
                });
            }
            user.getACL()
            req.profile = user;
            next();

        })
        .catch( err => res.status(400).json({'Error': `${err.code} ${err.message}`}));
};


const read = (req, res) => {

    const user = req.profile.toJSON();
    user.ACL = undefined;

    return res.status(200).json({'user': user})
};
const update = (req, res) => {
    const user = req.profile;
    const {username, password, email, phone} = req.body;

    if(username)
        user.setUsername(username);
    if(password)
        user.setPassword(password);
    if(email)
        user.setEmail(email);
    if(phone)
        user.set('phone', phone);

    // user.setACL(new Parse.ACL(Parse.User.current()));

    user.save()
        .then( () => res.status(200).json({'msg': 'A user updated.'}))
        .catch( err => res.status(404).json({'Error': `${err.code} ${err.message}`}));
};


const remove = (req, res, next) => {
    const user = req.profile;

    user.destroy()
        .then(() => res.status(200).json({'msg': 'A user deleted.'}))
        .catch( err => res.status(406).json({'Error': `${err.code} ${err.message}`}));
};


export default {
    create, list, userByID, read, update, remove
}