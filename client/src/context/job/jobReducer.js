import {
	GET_JOBS,
	ADD_JOB,
	DELETE_JOB,
	UPDATE_JOB,
	JOB_ERROR,
	SET_CURRENT,
	CLEAR_CURRENT,
	CLEAR_ERRORS,
	CLEAR_JOBS
} from '../types';

const jobReducer = (state, action) => {
	switch (action.type) {
		case GET_JOBS:
			return {
				...state,
				jobs: action.payload.jobs,
				success: action.payload.success,
				loading: false
			};
		case ADD_JOB:
			return {
				...state,
				jobs: [action.payload.job, ...state.jobs],
				success: action.payload.success,
				loading: false
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload
			};
		case CLEAR_CURRENT:
			localStorage.removeItem('title');
			return {
				...state,
				current: null
			};
		case UPDATE_JOB:
			localStorage.removeItem('title');
			return {
				...state,
				jobs: state.jobs.map((job) =>
					job.id === action.payload.job.id ? action.payload.job : job
				),
				current: null,
				success: action.payload.success,
				loading: false
			};
		case DELETE_JOB:
			return {
				...state,
				success: action.payload.success,
				jobs: state.jobs.filter((job) => {
					return job.id !== action.payload;
				}),
				loading: false
			};
		case JOB_ERROR:
			return {
				...state,
				error: action.payload.msg,
				success: action.payload.success
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		case CLEAR_JOBS:
			return {
				...state,
				jobs: null
			};
		default:
			return state;
	}
};

export default jobReducer;
