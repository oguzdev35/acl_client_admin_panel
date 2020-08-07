// utilities
import { parseServersInitialization } from './utilities/ps';
import { dashboardConstructor } from './utilities/pd';

// initial parse-server and parse-dashboard related datas
import { apps, users } from '../../config/parseDashboard.initialdata';
import { parserServerInitialDatas } from '../../config/parseServer.initialdata';

// Dashboard initialization
export const dashboard  = dashboardConstructor(apps, users).dashboard;

// Parse-Server Instances initialization
export const serverInstances = parseServersInitialization(...parserServerInitialDatas).serverInstances;

