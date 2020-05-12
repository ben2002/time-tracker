import React, { useContext, useReducer, useEffect } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

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

// create custom hook
export const useAuth = () => {
	const { state, dispatch } = useContext(AuthContext);
	return [state, dispatch];
};

// Set Header and load a user
export const loadUser = async (dispatch) => {
	try {
		const res = await axios.get('api/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (error) {
		console.log('ich bin im error');
		dispatch({
			type: AUTH_ERROR,
			payload: error.response.data
		});
	}
};

// Register a user
export const register = async (user, dispatch) => {
	// Config for the POST
	const config = {
		headers: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Access-Control-Allow-Origin': '*'
		}
	};

	try {
		const res = await axios.post('api/user', user, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		console.log('ich bin im error');
		dispatch({
			type: REGISTER_FAIL,
			payload: error.response.data
		});
	}
};

// Login
export const login = async (user, dispatch) => {
	try {
		const res = await axios.post('api/auth', user);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: LOGIN_FAIL,
			payload: error.response.data
		});
	}
};

// Logout
export const logout = (dispatch) => {
	console.log('ausgeloggt');
	dispatch({
		type: LOGOUT
	});
};

// Clear errors
export const clearErrors = (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS
	});
};

const AuthState = (props) => {
	const initState = {
		user: null,
		token: localStorage.getItem('token'),
		isAuthenticated: false,
		error: null
	};

	const [state, dispatch] = useReducer(authReducer, initState);

	// set token on initial app loading
	setAuthToken(state.token);

	// load user on first run or refresh
	if (state.token && !state.user) {
		loadUser(dispatch);
	}

	// 'watch' state.token and set headers and local storage on any change
	useEffect(() => {
		setAuthToken(state.token);
	}, [state.token]);

	return <AuthContext.Provider value={{ state, dispatch }}>{props.children}</AuthContext.Provider>;
};

export default AuthState;
