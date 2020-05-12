import React, { useContext, useReducer } from 'react';
import JobContext from './jobContext';
import jobReducer from './jobReducer';
import axios from 'axios';

import {
	GET_JOBS,
	ADD_JOB,
	DELETE_JOB,
	UPDATE_JOB,
	JOB_FINISHED,
	JOB_ERROR,
	SET_CURRENT,
	CLEAR_CURRENT,
	CLEAR_ERRORS
} from '../types';

// create custom hook
export const useJob = () => {
	const { state, dispatch } = useContext(JobContext);
	return [state, dispatch];
};

// Get jobs
export const getJobs = async (dispatch) => {
	try {
		const res = await axios.get('api/job');
		dispatch({
			type: GET_JOBS,
			payload: res.data
		});
	} catch (error) {
		console.log('Error:', error);
		dispatch({
			type: JOB_ERROR,
			payload: error.response.data
		});
	}
};

// Add jobs
export const addJob = async (title, dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		};

		const jobTitle = {
			title
		};

		const res = await axios.post('api/job', jobTitle, config);
		dispatch({
			type: ADD_JOB,
			payload: res.data
		});
	} catch (error) {
		console.log('Error:', error.response.data);
		dispatch({
			type: JOB_ERROR,
			payload: error.response.data
		});
	}
};

// Update job (Finish job) --> @todo: update title
export const updateJob = async (id, title, dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		};
		const jobTitle = {
			title
		};

		const res = await axios.put(`api/job/${id}`, jobTitle, config);
		dispatch({
			type: UPDATE_JOB,
			payload: res.data
		});
		getJobs(dispatch);
	} catch (error) {
		console.log('Error:', error.response.data);
		dispatch({
			type: JOB_ERROR,
			payload: error.response.data
		});
	}
};

// Delete jobs
export const deleteJob = async (id, dispatch) => {
	try {
		await axios.delete(`api/job/${id}`);
		dispatch({
			type: DELETE_JOB,
			payload: id
		});
	} catch (error) {
		console.log('Error:', error.response.data);
		dispatch({
			type: JOB_ERROR,
			payload: error.response.data
		});
	}
};

// Set current
export const setCurrent = (job, dispatch) => {
	dispatch({
		type: SET_CURRENT,
		payload: job
	});
};

// Clear current
export const clearCurrent = (dispatch) => {
	dispatch({
		type: CLEAR_CURRENT
	});
};

// Clear errors
export const clearErrors = (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS
	});
};

const JobState = (props) => {
	const initState = {
		jobs: null,
		loading: true,
		current: null,
		error: null,
		success: true
	};

	const [state, dispatch] = useReducer(jobReducer, initState);

	return <JobContext.Provider value={{ state, dispatch }}>{props.children}</JobContext.Provider>;
};

export default JobState;
