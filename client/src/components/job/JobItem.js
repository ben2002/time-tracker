import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { timeConversionBackend } from '../../utils/getTimeFormat';
import { deleteJob, setCurrent, useJob } from '../../context/job/JobState';
import { useTime, startTime, stopTime, getTimesPerJob } from '../../context/time/TimeState';

const JobItem = ({ job }) => {
	const [jobState, jobDispatch] = useJob();
	const [timeState, timeDispatch] = useTime();
	const [totalTime, setTotalTime] = useState();

	const { isRunning } = timeState;

	// UseEffect to get the total time of the job
	// use an IIFE function in useEffect
	useEffect(() => {
		(async function test() {
			try {
				let totalTimePerJob = await axios.get(`api/time/total/${job.id}`);
				console.log('front:', totalTimePerJob);
				totalTimePerJob = totalTimePerJob.data.totalTimePerJob;
				console.log('Type:', typeof totalTimePerJob);
				console.log('front:', totalTimePerJob);
				setTotalTime(timeConversionBackend(totalTimePerJob));
			} catch (error) {
				console.log('Error:', error);
			}
		})();
	}, [isRunning]);

	const onEdit = (e) => {
		e.preventDefault();
		localStorage.setItem('title', job.title);
		setCurrent(job, jobDispatch);
	};

	const onDelete = (e) => {
		e.preventDefault();
		deleteJob(job.id, jobDispatch);
	};

	const onPlay = (e) => {
		e.preventDefault();
		startTime(job.id, timeDispatch);
	};

	const onStop = (e) => {
		e.preventDefault();
		stopTime(timeDispatch);
	};

	return (
		<div className='card-panel'>
			<div>
				# {job.id} <span className='text-bold'>{job.title}</span>
				<a href='!#' onClick={onDelete} className='secondary-content'>
					<i className='material-icons grey-text'>delete</i>
				</a>
				<a href='!#' onClick={onEdit} className='secondary-content'>
					<i className='material-icons grey-text'>edit</i>
				</a>
			</div>
			<br />
			<div className='divider'></div>
			<br />
			<div>
				<span className='black-text'> total time | {totalTime}</span>
				<a href='!#' onClick={onStop} className='secondary-content'>
					<i className='inline-icon material-icons red-text'>stop</i>
				</a>
				<a href='!#' onClick={onPlay} className='secondary-content'>
					<i className='inline-icon material-icons green-text'>play_circle_outline</i>
				</a>
			</div>
			<div className='margin-top'>
				<Link to={`/${job.id}`}>
					<i className='inline-icon material-icons grey-text'>history</i>
					<span className='black-text'> show all times</span>
				</Link>
			</div>
		</div>
	);
};

export default JobItem;
