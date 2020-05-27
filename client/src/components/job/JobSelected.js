import React, { useEffect, Fragment } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

import { useJob, getJobs } from '../../context/job/JobState';

const JobSelected = ({ job }) => {
	const [jobState, jobDispatch] = useJob();

	const { jobs, loading, getSelectedJob } = jobState;

	useEffect(() => {
		// init Material JS
		M.AutoInit();
	});

	const selectJob = () => {
		console.log('geklicked');
		getSelectedJob(job.id, jobDispatch);
	};

	return (
		<Fragment>
			<div className='input-field col s12 m3 l3'>
				<select defaultValue='Option 1' onChange={selectJob}>
					<option>Choose a project</option>
					{jobs !== null &&
						!loading &&
						jobs.map((job) => <option key={job.id}>{job.title}</option>)}
				</select>
			</div>
		</Fragment>
	);
};

export default JobSelected;
