import React, { useContext, useReducer, useEffect } from 'react';
import TimeContext from './timeContext';
import timeReducer from './timeReducer';
import axios from 'axios';

import {
	GET_TIMES,
	START_TIME,
	STOP_TIME,
	DELETE_TIME,
	TIME_ERROR,
	CLEAR_TIMES,
	CLEAR_ERRORS
} from '../types';

// create custom hook
export const useTime = () => {
	const { state, dispatch } = useContext(TimeContext);
	return [state, dispatch];
};

// Get all job times
export const getTimesPerJob = async (jobId, dispatch) => {
	try {
		const res = await axios.get(`api/time/${jobId}`);
		dispatch({
			type: GET_TIMES,
			payload: res.data
		});
	} catch (error) {
		console.log('Error:', error.response.data);
		dispatch({
			type: TIME_ERROR,
			payload: error.response.data
		});
	}
};

// Start time
export const startTime = async (jobId, dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		};
		const res = await axios.post(`api/time/${jobId}`, config);
		dispatch({
			type: START_TIME,
			payload: {
				isRunningJobId: jobId,
				isRunning: res.data.success,
				success: res.data.success
			}
		});
	} catch (error) {
		console.log('Error:', error.response.data);
		dispatch({
			type: TIME_ERROR,
			payload: error.response.data
		});
	}
};

// Stop time
export const stopTime = async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		};
		const res = await axios.put('api/time', config);
		dispatch({
			type: STOP_TIME,
			payload: res.data
		});
	} catch (error) {
		console.log('Error:', error.response.data);
		dispatch({
			type: TIME_ERROR,
			payload: error.response.data
		});
	}
};

// Delete a single time dataset
export const deleteOneTimeSet = async (timeId, jobId, dispatch) => {
	try {
		await axios.delete(`api/time/${timeId}`);
		getTimesPerJob(jobId, dispatch);
	} catch (error) {
		console.log('Error:', error);
	}
};

export const clearTimes = (dispatch) => {
	dispatch({
		type: CLEAR_TIMES
	});
};

const TimeState = (props) => {
	const initState = {
		times: null,
		isRunning: false,
		isRunningJobId: null,
		lastTime: null,
		success: null,
		loading: true,
		error: null
	};

	const [state, dispatch] = useReducer(timeReducer, initState);

	useEffect(() => {
		if (localStorage.getItem('isRunning')) {
			state.isRunning = true;
			state.isRunningJobId = localStorage.getItem('isRunningJobId');
		}
	}, [state.isRunning, state.isRunningJobId]);

	return <TimeContext.Provider value={{ state, dispatch }}>{props.children}</TimeContext.Provider>;
};

export default TimeState;
