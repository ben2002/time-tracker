import React, { useState, useEffect } from 'react';

import { timeConversionFrontend } from '../../utils/getTimeFormat';

const Timer = () => {
	const [counter, setCounter] = useState(0);
	const [time, setTime] = useState(0);

	useEffect(() => {
		if (localStorage.getItem('ellapsedTime')) {
			setCounter(Number(localStorage.getItem('ellapsedTime')));
		}
	}, []);

	useEffect(() => {
		const timer = setInterval(() => setCounter(counter + 1), 1000);
		setTime(timeConversionFrontend(counter));

		// Set local storage to get the ellapsed time after reload
		localStorage.setItem('ellapsedTime', counter);

		return () => clearInterval(timer);
	}, [counter]);

	return (
		<div>
			Past Time: <span className='text-bold'>{time}</span>
		</div>
	);
};

export default Timer;
