import React, { Fragment } from 'react';
import Moment from 'react-moment';

import { timeConversionBackend } from '../../utils/getTimeFormat';
import { useTime, deleteOneTimeSet } from '../../context/time/TimeState';

const TimeItem = ({ time }) => {
	const [timeState, timeDispatch] = useTime();

	const onTimeDelete = (e) => {
		e.preventDefault();
		deleteOneTimeSet(time.id, time.job_id, timeDispatch);
	};

	return (
		<Fragment>
			<tbody>
				<tr>
					<td>
						<Moment format='MMMM Do YYYY'>{time.from}</Moment>
					</td>
					<td>
						<Moment format='k:mm:ss'>{time.from}</Moment>
					</td>
					<td>{!time.to ? 'Is running...' : <Moment format='k:mm:ss'>{time.to}</Moment>}</td>
					<td>{timeConversionBackend(time.duration)}</td>
					<td>
						<a href='!#' onClick={onTimeDelete}>
							<i className='material-icons grey-text'>delete</i>
						</a>
					</td>
				</tr>
			</tbody>
		</Fragment>
	);
};

export default TimeItem;
