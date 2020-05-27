import React from 'react';
import { useTime } from '../../context/time/TimeState';

import Preloader from '../layouts/Preloader';
import Jobs from '../job/Jobs';
import JobForm from '../job/JobForm';
import JobSelected from '../job/JobSelected';

const Home = () => {
	const [timeState] = useTime();
	const { isRunning } = timeState;

	return (
		<div className='container'>
			<div className='row'>
				<JobSelected />
				<Jobs />
				{isRunning ? <Preloader /> : <JobForm />}
			</div>
		</div>
	);
};

export default Home;
