import React, { useState, useEffect } from 'react';
import { useAuth, login, clearErrors } from '../../context/auth/AuthState';
import M from 'materialize-css/dist/js/materialize.min.js';

const Login = (props) => {
	const [authState, authDispatch] = useAuth();
	const { error, isAuthenticated } = authState;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/');
		}

		if (error === 'Invalid eMail or password') {
			M.toast({ html: error });
			clearErrors(authDispatch);
		}
	}, [error, isAuthenticated, props.history]);

	// local state
	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	// clickhandler
	const onSubmit = (e) => {
		e.preventDefault();
		if (user.name === '' || user.password === '') {
			M.toast({ html: 'Please fill out all fields' });
		}
		login(user, authDispatch);
	};

	// clickhandler
	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<div className='container'>
			<form className='col s12' onSubmit={onSubmit}>
				<div className='row'>
					<div className='col s12 l4'></div>
					<div className='col s12 l4 text-center'>
						<h4>
							Account <span className='cyan-text text-darken-3'> Login </span>
						</h4>
					</div>
					<div className='col s12 l4'></div>
				</div>

				<div className='row'>
					<div className='input-field col s1 m3 l4'></div>
					<div className='input-field col s10 m6 l4'>
						<input name='email' onChange={onChange} type='email' className='validate' />
						<label htmlFor='email'>Email</label>
					</div>
					<div className='input-field col s1 m3 l4'></div>
				</div>
				<div className='row'>
					<div className='input-field col s1 m3 l4'></div>
					<div className='input-field col s10 m6 l4'>
						<input name='password' onChange={onChange} type='password' className='validate' />
						<label htmlFor='password'>Password</label>
					</div>
					<div className='input-field col s1 m3 l4'></div>
				</div>
				<div className='row'>
					<div className='col offset-s4'>
						<button className='btn z-depth-0 waves-effect cyan darken-3 waves-light' type='submit'>
							Login
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
