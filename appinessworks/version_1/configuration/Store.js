/*********************************************
  Importing Area
**********************************************/
import { 
    createStore, 
    combineReducers 
} from 'redux';

import dashboardReducer from '../workspace/reducers/dashboardReducer';

import loginReducer from '../workspace/reducers/loginReducer';



/*********************************************
  Functional Area
**********************************************/
const rootReducer = combineReducers({
  dashboardListRedu: dashboardReducer,
  loginCredentialsRedu: loginReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}



/*********************************************
  Exporting Area
**********************************************/
export default configureStore;