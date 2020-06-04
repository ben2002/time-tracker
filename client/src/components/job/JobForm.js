import React, { Fragment, useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

import { addJob, useJob, updateJob, clearCurrent, clearErrors } from '../../context/job/JobState';

const JobForm = () => {
	const [jobState, jobDispatch] = useJob();
	const { current, error } = jobState;

	const [title, setTitle] = useState('');

	useEffect(() => {
		if (current) {
			setTitle(current.title);
		} else {
			//setTitle('');
		}

		if (error === 'Title already exists') {
			M.toast({ html: 'Title already exists' });
			clearErrors(jobDispatch);
		}
	}, [error, current]);

	const onSubmit = (e) => {
		e.preventDefault();
		if (title !== '') {
			if (current) {
				updateJob(current.id, title, jobDispatch);
				setTitle('');
				clear();
			} else {
				addJob(title, jobDispatch);
				setTitle('');
			}
		} else {
			M.toast({ html: 'Please enter a project title' });
		}
	};

	const onChange = (e) => {
		setTitle(e.target.value);
	};

	const clear = () => {
		clearCurrent(jobDispatch);
		setTitle('');
	};

	return (
		<Fragment>
			<form onSubmit={onSubmit}>
				<div className='col s12 m4 l4'>
					<input
						onChange={onChange}
						value={title}
						placeholder='Title'
						type='text'
						className='validate'
					/>
					<div>
						<button
							className='btn btn-block btn-flat cyan darken-3 white-text margin-bottom'
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
