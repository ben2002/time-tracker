import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../../context/auth/AuthState';
import { useTime, stopTime } from '../../context/time/TimeState';
import { useJob, clearJobs } from '../../context/job/JobState';

const Navbar = () => {
	const [authState, authDispatch] = useAuth();
	const [timeState, timeDispatch] = useTime();
	const [JobState, jobDispatch] = useJob();

	const { isAuthenticated, user } = authState;
	const { isRunning } = timeState;

	const onLogout = () => {
		if (isRunning) {
			stopTime(timeDispatch);
		}
		// @todo: clear jobs on logout --done
		clearJobs(jobDispatch);
		logout(authDispatch);
	};

	const authLinks = (
		<Fragment>
			<li>Hallo {user && user.name}</li>
			<li>
				<a onClick={onLogout} href='#!'>
					<i className='fas fa-sign-out-alt fa-sm'></i> Logout
				</a>
			</li>
			<li>
				<div className='navItems'>
					<Link to='/about'>About</Link>
				</div>
			</li>
		</Fragment>
	);

	const authMobile = (
		<ul className='sidenav' id='mobile'>
			<li>
				<a onClick={onLogout} href='#!'>
					<i className='fas fa-sign-out-alt fa-sm'></i>Logout
				</a>
			</li>
			<li>
				<Link to='/about'>
					<i className='fas fa-info'></i>About
				</Link>
			</li>
		</ul>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<div className='navItems'>
					<Link to='/login'>
						<i className='fas fa-user fa-sm'></i> Login
					</Link>
				</div>
			</li>
			<li>
				<div className='navItems'>
					<Link to='/register'>
						<i className='fas fa-user-plus fa-sm'></i> Register
					</Link>
				</div>
			</li>
			<li>
				<div className='navItems'>
					<Link to='/about'>About</Link>
				</div>
			</li>
		</Fragment>
	);

	const guestMobile = (
		<ul className='sidenav' id='mobile'>
			<li>
				<Link to='/login'>
					<i className='fas fa-user fa-sm'></i> Login
				</Link>
			</li>
			<li>
				<Link to='/register'>
					<i className='fas fa-user-plus fa-sm'></i> Register
				</Link>
			</li>
			<li>
				<Link to='/about'>
					<i className='fas fa-info'></i>About
				</Link>
			</li>
		</ul>
	);

	return (
		<Fragment>
			<nav style={{ marginBottom: '30px', padding: '0 15px' }} className='cyan darken-3'>
				<div className='nav-wrapper cyan darken-3'>
					<Link to='/'>
						<i style={{ padding: '0 15px 0 30px' }} className='fal fa-clock fa'></i>{' '}
						<span style={{ fontSize: '1.5rem' }}>TIME-TRACKER</span>
					</Link>
					<a href='!#' data-target='mobile' className='sidenav-trigger'>
						<i className='material-icons'>menu</i>
					</a>
					<ul id='nav-mobile' className='right hide-on-med-and-down'>
						{isAuthenticated ? authLinks : guestLinks}
					</ul>
				</div>
			</nav>
			{isAuthenticated ? authMobile : guestMobile}
		</Fragment>
	);
};

export default Navbar;
