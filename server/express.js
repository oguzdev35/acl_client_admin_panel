import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';



const CWD = process.cwd();

// Template page for Reactjs.
// From this template we serve client applications.
// This client application will be Single Page Application.
// According to our decision, this client application would be Server-Side-Rendered(SSR)
// or Client-Side-Rendered(CCR). My Thought is that CCR web application
// is very economic and and with proper configuration of bundling and building process, 
// CCR's performance can be greater than SSR.
import Template from '../template';

import { dashboard, serverInstances } from './parse_server/parse';

const app = express();

// middlewares for express application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(cors()); // we permit cross-origin requests, according to our decision this can be disabled.

// Routes for client administration dashboard
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
app.use('/', userRoutes);
app.use('/', authRoutes);

// Serve the Parse-Server instances on the /p URL prefix
serverInstances.forEach( ({mountPath, api}) => {
  app.use(mountPath, api);
});

// Serve the Dashboard on the /dashboard URL prefix
app.use('/dashboard', dashboard);

// SPA Template will be served at root path.
// We use especially HTTP status code 200, because status code 200 
// with GET method is cacheable for browsers by default.
app.get('/', (req, res) => {
  res.status(200).send(Template());
});



export default app;

