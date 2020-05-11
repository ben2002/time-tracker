import {
	GET_TIMES,
	START_TIME,
	STOP_TIME,
	DELETE_TIME,
	CLEAR_TIMES,
	TIME_ERROR,
	CLEAR_ERRORS
} from '../types';

const timeReducer = (state, action) => {
	switch (action.type) {
		case GET_TIMES:
			return {
				...state,
				times: action.payload.times,
				success: action.payload.success,
				loading: false
			};
		case START_TIME:
			localStorage.setItem('isRunning', true);
			localStorage.setItem('isRunningJobId', action.payload.isRunningJobId);
			return {
				...state,
				isRunning: action.payload.isRunning,
				isRunningJobId: action.payload.isRunningJobId,
				success: action.payload.success,
				loading: false
			};
		case STOP_TIME:
			localStorage.removeItem('isRunning');
			localStorage.removeItem('ellapsedTime');
			localStorage.removeItem('isRunningJobId');
			return {
				...state,
				isRunning: false,
				isRunningJobId: null,
				lastTime: action.payload.currentTime,
				success: action.payload.success,
				loading: false
			};
		case TIME_ERROR:
			return {
				...state,
				isRunning: false,
				isRunningJobId: null,
				success: action.payload.success,
				loading: false
			};
		case CLEAR_TIMES:
			return {
				...state,
				times: null
			};

		default:
			return state;
	}
};

export default timeReducer;
