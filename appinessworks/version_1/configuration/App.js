/*********************************************
  Importing Area
**********************************************/
import NavigationConfig from './NavigationConfig';

import React from 'react';

import { 
    Provider 
} from 'react-redux';

import configureStore from './Store';



/*********************************************
  Functional Area
**********************************************/
const store = configureStore()

const App = () => (
    <Provider store={store}>
        <NavigationConfig />
    </Provider>
)



/*********************************************
  Exporting Area
**********************************************/
export default App;