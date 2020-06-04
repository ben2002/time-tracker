import React, { useState, useEffect } from 'react';
import { useAuth, register, clearErrors } from '../../context/auth/AuthState';
import M from 'materialize-css/dist/js/materialize.min.js';

const Register = (props) => {
	const [authState, authDispatch] = useAuth();
	const { error, isAuthenticated } = authState;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/');
		}

		if (error === 'User already exists') {
			M.toast({ html: error });
			clearErrors(authDispatch);
		}
	}, [error, isAuthenticated, props.history]);

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
		if (user.name === '' || user.email === '' || user.password === '' || user.password2 === '') {
			M.toast({ html: 'Please fill out all fields' });
		} else if (user.password !== user.password2) {
			M.toast({ html: 'Passwords do not match' });
		} else if (user.password.length < 6) {
			M.toast({ html: 'Please enter a password with 6 or more characters' });
		} else {
			register(user, authDispatch);
		}
	};

	// clickhandler
	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<div className='container'>
			<form onSubmit={onSubmit}>
				<div className='row'>
					<div className='col s12 l4'></div>
					<div className='col s12 l4'>
						<h4 className='center-align'>
							Account <span className='cyan-text text-darken-3'> Register </span>
						</h4>
					</div>
					<div className='col s12 l4'></div>
				</div>

				<div className='row'>
					<div className='input-field col s1 m3 l4'></div>
					<div className='input-field col s10 m6 l4'>
						<input type='text' name='name' className='validate' onChange={onChange} />
						<label htmlFor='name'>Name</label>
					</div>
					<div className='input-field col s1 m3 l4'></div>
				</div>
				<div className='row'>
					<div className='input-field col s1 m3 l4'></div>
					<div className='input-field col s10 m6 l4'>
						<input type='email' name='email' onChange={onChange} />
						<label htmlFor='email'>Email</label>
					</div>
					<div className='input-field col s1 m3 l4'></div>
				</div>
				<div className='row'>
					<div className='input-field col s1 m3 l4'></div>
					<div className='input-field col s10 m6 l4'>
						<input type='password' name='password' className='validate' onChange={onChange} />
						<label htmlFor='password'>Password</label>
					</div>
					<div className='input-field col s1 m3 l4'></div>
				</div>
				<div className='row'>
					<div className='input-field col s1 m3 l4'></div>
					<div className='input-field col s10 m6 l4'>
						<input type='password' name='password2' className='validate' onChange={onChange} />
						<label htmlFor='password'>Confirm Password</label>
					</div>
					<div className='input-field col s1 m3 l4'></div>
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
