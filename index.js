/*********************************************
  Importing Area
**********************************************/
import { 
	AppRegistry 
} from 'react-native';

import { 
	name as appName 
} from './app.json';

/** 
 * Gateway to main project, 
 * You can switch your projects to your 
 * required version folders 
*/
import App from './appinessworks/version_1/configuration/App';



/*********************************************
  Exporting Area
**********************************************/
AppRegistry.registerComponent(appName, () => App);
