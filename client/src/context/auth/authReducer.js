import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';

const authReducer = (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: action.payload.success
			};
		case USER_LOADED:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
			localStorage.removeItem('token');
			console.log(action.payload.msg);
			return {
				...state,
				isAuthenticated: action.payload.success,
				error: action.payload.msg,
				token: null,
				user: null
			};
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				isAuthenticated: false,
				error: null,
				token: null,
				user: null
			};

		default:
			return state;
	}
};

export default authReducer;
