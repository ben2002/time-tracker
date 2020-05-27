import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { timeConversionBackend } from '../../utils/getTimeFormat';
import { deleteJob, setCurrent, useJob } from '../../context/job/JobState';
import { useTime, startTime, stopTime, getTimesPerJob } from '../../context/time/TimeState';

const JobItem = ({ job }) => {
	const { title, id } = job;

	const [jobState, jobDispatch] = useJob();
	const [timeState, timeDispatch] = useTime();
	const [totalTime, setTotalTime] = useState();

	const { isRunning } = timeState;

	// UseEffect to get the total time of the job
	// use an IIFE function in useEffect
	useEffect(() => {
		(async function test() {
			try {
				let totalTimePerJob = await axios.get(`api/time/total/${id}`);
				console.log('front:', totalTimePerJob);
				totalTimePerJob = totalTimePerJob.data.totalTimePerJob;
				setTotalTime(timeConversionBackend(totalTimePerJob));
			} catch (error) {
				console.log('Error:', error);
			}
		})();
	}, [isRunning, id]);

	const onEdit = (e) => {
		e.preventDefault();
		localStorage.setItem('title', job.title);
		setCurrent(job, jobDispatch);
	};

	const onDelete = (e) => {
		e.preventDefault();
		deleteJob(id, jobDispatch);
	};

	const onPlay = (e) => {
		e.preventDefault();
		startTime(id, timeDispatch);
	};

	const onStop = (e) => {
		e.preventDefault();
		stopTime(timeDispatch);
	};

	return (
		<div className='card-panel'>
			<div>
				# {id} <span className='text-bold'>{title}</span>
				<a href='!#' onClick={onDelete} className='secondary-content'>
					<i className='material-icons grey-text'>delete</i>
				</a>
				<a href='!#' onClick={onEdit} className='secondary-content'>
					<i className='material-icons grey-text'>edit</i>
				</a>
				<Link to={`/${id}`} className='secondary-content'>
					<i className='material-icons grey-text'>history</i>
				</Link>
			</div>
			<br />
			<div className='divider'></div>
			<br />
			<div>
				<i className='inline-icon material-icons grey-text'>access_time</i>
				<span className='black-text'> total time | {totalTime}</span>
				<a href='!#' onClick={onStop} className='secondary-content'>
					<i className='inline-icon material-icons red-text'>stop</i>
				</a>
				<a href='!#' onClick={onPlay} className='secondary-content'>
					<i className='inline-icon material-icons green-text'>play_circle_outline</i>
				</a>
			</div>
		</div>
	);
};

export default JobItem;
