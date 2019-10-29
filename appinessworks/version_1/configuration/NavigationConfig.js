/*********************************************
  Importing Area
**********************************************/
import React, {
	Component
} from 'react';

import {
	createStackNavigator
} from 'react-navigation-stack';

import {
	createAppContainer
} from 'react-navigation';

/**
 * Import all paths of the component 
 * pages to get navigate
 */
import SplashPage from '../workspace/components/SplashPage';
import LoginPage from '../workspace/components/LoginPage';
import DashboardPage from '../workspace/components/DashboardPage';



/*********************************************
  Functional Area
**********************************************/

/**
 * Add all pages name here to route 
 * on navigation
 */
const RootStack = createStackNavigator(
	{
		SplashPage: 	{ screen: SplashPage },
		DashboardPage: 	{ screen: DashboardPage },
		LoginPage: 		{ screen: LoginPage },
	},
	{
		initialRouteName: 'SplashPage',
	}
);

/**
 * All collected root stack and 
 * attach on app container
 */
const PageNavigationConfig = createAppContainer(RootStack);

class PageNavigation extends Component {
	render() {
		return (
			<PageNavigationConfig />
		)
	}
}



/*********************************************
  Exporting Area
**********************************************/
export default PageNavigation
