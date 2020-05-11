import React, { useState, useEffect } from 'react';
import { useAuth, register } from '../../context/auth/AuthState';

const Register = (props) => {
	const [authState, authDispatch] = useAuth();

	useEffect(() => {
		if (authState.isAuthenticated) {
			props.history.push('/');
		}
	}, [authState.isAuthenticated, props.history]);

	// local state
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	// clickhandler
	const onSubmit = (e) => {
		e.preventDefault();
		register(user, authDispatch);
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
							Account <span className='cyan-text text-darken-3'> Register </span>
						</h4>
					</div>
				</div>
				<div className='row'>
					<div className='input-field col offset-s4 s4'>
						<input type='text' name='name' className='validate' onChange={onChange} />
						<label htmlFor='name'>Name</label>
					</div>
				</div>
				<div className='row'>
					<div className='input-field col offset-s4 s4'>
						<input type='email' name='email' className='validate' onChange={onChange} />
						<label htmlFor='email'>Email</label>
					</div>
				</div>
				<div className='row'>
					<div className='input-field col offset-s4 s4'>
						<input type='password' name='password' className='validate' onChange={onChange} />
						<label htmlFor='password'>Password</label>
					</div>
				</div>
				<div className='row'>
					<div className='input-field col offset-s4 s4'>
						<input type='password' name='password2' className='validate' onChange={onChange} />
						<label htmlFor='password'>Confirm Password</label>
					</div>
				</div>
				<div className='row'>
					<div className='col offset-s4'>
						<button className='btn z-depth-0 waves-effect cyan darken-3 waves-light' type='submit'>
							Register
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Register;
