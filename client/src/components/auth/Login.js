import React, { useState, useEffect } from 'react';
import { useAuth, login } from '../../context/auth/AuthState';

const Login = (props) => {
	const [authState, authDispatch] = useAuth();

	useEffect(() => {
		if (authState.isAuthenticated) {
			props.history.push('/');
		}
	}, [authState.isAuthenticated, props.history]);

	// local state
	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	// clickhandler
	const onSubmit = (e) => {
		e.preventDefault();
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
					<div className='col offset-s4 s8'>
						<h4>
							Account <span className='cyan-text text-darken-3'> Login </span>
						</h4>
					</div>
				</div>
				<div className='row'>
					<div className='input-field col offset-s4 s4'>
						<input name='email' onChange={onChange} type='email' className='validate' />
						<label htmlFor='email'>Email</label>
					</div>
				</div>
				<div className='row'>
					<div className='input-field col offset-s4 s4'>
						<input name='password' onChange={onChange} type='password' className='validate' />
						<label htmlFor='password'>Password</label>
					</div>
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
