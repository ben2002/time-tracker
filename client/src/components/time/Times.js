import React, { useEffect, Fragment } from 'react';

import TimeItem from './TimeItem';
import Spinner from '../layouts/Spinner';

import { useTime, getTimesPerJob, clearTimes } from '../../context/time/TimeState';

const Times = ({ match, history }) => {
	const [timeState, timeDispatch] = useTime();
	const { times, loading } = timeState;

	useEffect(() => {
		getTimesPerJob(match.params.id, timeDispatch);
	}, [timeDispatch]);

	const goBack = () => {
		clearTimes(timeDispatch);
		history.goBack();
	};

	if (loading) {
		return <Spinner />;
	}

	if (times !== null && times.length === 0 && !loading) {
		return (
			<div className='container'>
				<div className='row'>
					<div className='mg-top-100 center-align'>
						<span>You have no tracked times for this project...</span>
					</div>
					<button
						className='btn waves-effect z-depth-0 cyan darken-3 waves-light mg-top-50'
						onClick={() => history.goBack()}>
						Back
					</button>
				</div>
			</div>
		);
	} else {
		return (
			<Fragment>
				{times !== null && !loading && (
					<div className='container'>
						<table className='highlight'>
							<thead>
								<tr>
									<th>Date</th>
									<th>Start</th>
									<th>Finish</th>
									<th>Duration</th>
									<th>Delete</th>
								</tr>
							</thead>
							{times !== null && times.map((time) => <TimeItem time={time} key={time.id} />)}
						</table>
						<div>
							<button className='btn z-depth-0 grey waves-light mg-top-50' onClick={goBack}>
								Back
							</button>
						</div>
					</div>
				)}
			</Fragment>
		);
	}
};

export default Times;
