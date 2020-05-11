import React from 'react';
import { useTime } from '../../context/time/TimeState';

import Preloader from '../layouts/Preloader';
import SideNav from '../layouts/SideNav';
import Jobs from '../job/Jobs';
import JobForm from '../job/JobForm';

const Home = () => {
	const [timeState] = useTime();
	const { isRunning } = timeState;

	return (
		<div className='container'>
			<div className='row'>
				<SideNav />
				<Jobs />
				{isRunning ? <Preloader /> : <JobForm />}
			</div>
		</div>
	);
};

export default Home;
