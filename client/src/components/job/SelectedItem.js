import React, { useEffect, Fragment } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

import { useJob, getJobs, getSelectedJob } from '../../context/job/JobState';

const SelectedItem = () => {
	const [jobState, jobDispatch] = useJob();
	const { loading } = jobState;

	const { jobs } = jobState;

	useEffect(() => {
		// init Material JS
		M.AutoInit();
	});

	useEffect(() => {
		getJobs(jobDispatch);
	}, [jobDispatch]);

	const onChange = (e) => {
		const title = e.target.value;
		if (title !== 'Choose a project') {
			getSelectedJob(title, jobDispatch);
		}
	};

	if (jobs !== null && jobs.length === 0) {
		return (
			<Fragment>
				<div className='input-field col s12 m3 l3'>
					<select onChange={onChange}>
						<option>Add a project first</option>
					</select>
				</div>
			</Fragment>
		);
	}

	return (
		<Fragment>
			<div className='input-field col s12 m3 l3'>
				<select onChange={onChange}>
					<option>Choose a project</option>
					{jobs !== null &&
						!loading &&
						jobs.map((job) => <option key={job.id}>{job.title}</option>)}
				</select>
			</div>
		</Fragment>
	);
};

export default SelectedItem;
