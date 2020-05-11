import React from 'react';

import Timer from './Timer';
import { useTime } from '../../context/time/TimeState';

const Preloader = () => {
	const [timeState, timeDispatch] = useTime();
	const { isRunningJobId } = timeState;

	return (
		<div className='col s12 m4 l3'>
			<p>
				Time is running on project <span className='text-bold'># {isRunningJobId}</span>
			</p>
			<div className='progress green lighten-4'>
				<div className='indeterminate green'></div>
				<br />
			</div>
			<Timer />
		</div>
	);
};

export default Preloader;
