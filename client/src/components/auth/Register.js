import React, { useState } from 'react';

const Login = () => {
	return (
		<div className='container'>
			<div className='row'>
				<div className='input-field col offset-s3 s6'>
					<h4>
						Account <span className='blue-text'> Register </span>
					</h4>
				</div>
			</div>
			<div className='row'>
				<div className='input-field col offset-s3 s6'>
					<input type='email' className='validate' />
					<label htmlFor='email'>Email</label>
				</div>
			</div>
			<div className='row'>
				<div className='input-field col offset-s3 s6'>
					<input type='password' className='validate' />
					<label htmlFor='password'>Password</label>
				</div>
			</div>
			<div className='row'>
				<div className='input-field col offset-s3 s6'>
					<input type='password' className='validate' />
					<label htmlFor='password'>Confirm Password</label>
				</div>
			</div>
		</div>
	);
};

export default Login;
