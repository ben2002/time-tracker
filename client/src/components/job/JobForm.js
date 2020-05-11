import React, { Fragment, useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

import { addJob, useJob, updateJob, clearCurrent } from '../../context/job/JobState';

const JobForm = () => {
	const [jobState, jobDispatch] = useJob();
	const { current } = jobState;

	const [title, setTitle] = useState('');

	useEffect(() => {
		if (current) {
			setTitle(current.title);
		} else {
			setTitle('');
		}
	}, [current]);

	const onSubmit = (e) => {
		e.preventDefault();
		if (title !== '') {
			if (current) {
				updateJob(current.id, title, jobDispatch);
			} else {
				addJob(title, jobDispatch);
			}
			setTitle('');
			clear();
		} else {
			M.toast({ html: 'Please enter a project title' });
		}
	};

	const onChange = (e) => {
		setTitle(e.target.value);
	};

	const clear = () => {
		clearCurrent(jobDispatch);
	};

	return (
		<Fragment>
			<form onSubmit={onSubmit}>
				<div className='col s12 m4 l4'>
					{/* {!current ? (
						<h5 className='grey-text center-align'>Add a new Project</h5>
					) : (
						<h5 className='grey-text center-align'>Edit a Project</h5>
					)} */}
					<input
						onChange={onChange}
						value={title}
						placeholder='Title'
						type='text'
						className='validate'
					/>
					<div>
						<button
							className='btn btn-block btn-flat grey lighten-3 black-text margin-bottom'
							type='submit'>
							{!current ? 'Add Project' : 'Edit Project'}
						</button>
					</div>
					{current && (
						<div>
							<button className='btn btn-block btn-flat grey lighten-3 black-text' onClick={clear}>
								Clear
							</button>
						</div>
					)}
				</div>
			</form>
		</Fragment>
	);
};

export default JobForm;
