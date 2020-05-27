import React, { useEffect, Fragment } from 'react';

import { useJob, getJobs } from '../../context/job/JobState';
import JobItem from './JobItem';
import jobSelected from './JobSelected';
import Spinner from '../layouts/Spinner';
import JobSelected from './JobSelected';

const Jobs = () => {
	const [state, dispatch] = useJob();

	const { jobs, loading } = state;

	useEffect(() => {
		getJobs(dispatch);
	}, [dispatch]);

	if (!jobs && loading) {
		return <Spinner />;
	}

	if (jobs !== null && jobs.length === 0 && !loading) {
		return (
			<div className='col s12 m5 l5 mg-top-50'>
				<div className='center-align'>
					<span>You have no tracked times for this project...</span>
				</div>
			</div>
		);
	}

	return (
		<Fragment>
			<div className='col s12 m5 l5'>
				{jobs !== null && !loading && jobs.map((job) => <JobItem job={job} key={job.id} />)}
			</div>
		</Fragment>
	);
};

export default Jobs;
