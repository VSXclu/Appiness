/*********************************************
 * Importing Area
**********************************************/
import {
	VALIDATE_LOGIN
 } from '../actions/loginAction';



/*********************************************
 * Constants Area
**********************************************/
const joLoginCredentials = {
    username:"hruday@gmail.com",
    password :"hruday123"
}



/*********************************************
 * Initial State Area
**********************************************/
const initialState = {
	loginCredentials: joLoginCredentials
}



/*********************************************
 * Functional Area
**********************************************/
const loginReducer = (state = initialState, action) => {
	switch(action.type) {
		case VALIDATE_LOGIN:
			return {
				...state,
			};
		default:
			return state;
	}
}



/*********************************************
 * Exporting Area
**********************************************/
export default loginReducer;