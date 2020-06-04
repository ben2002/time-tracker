import React from 'react';
import { useTime } from '../../context/time/TimeState';

import Preloader from '../layouts/Preloader';
import Jobs from '../job/Jobs';
import JobForm from '../job/JobForm';
import JobItem from '../job/JobItem';
import SelectedItem from '../job/SelectedItem';

const Home = () => {
	const [timeState] = useTime();
	const { isRunning } = timeState;

	return (
		<div className='container'>
			<div className='row'>
				<SelectedItem />
				<Jobs />
				{isRunning ? <Preloader /> : <JobForm />}
			</div>
		</div>
	);
};

export default Home;
