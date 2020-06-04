import React, { useEffect, Fragment } from 'react';

import { useJob, getJobs } from '../../context/job/JobState';
import JobItem from './JobItem';
import Spinner from '../layouts/Spinner';

const Jobs = () => {
	const [jobState, jobDispatch] = useJob();

	const { selected, loading } = jobState;

	if (!selected && loading) {
		return <Spinner />;
	}

	return (
		<Fragment>
			<div className='col s12 m5 l5'>
				{selected !== null && !loading && <JobItem job={selected} key={selected.id} />}
			</div>
		</Fragment>
	);
};

export default Jobs;
