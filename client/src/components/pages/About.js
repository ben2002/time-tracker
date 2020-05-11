import React from 'react';

const About = ({ history }) => {
	return (
		<div>
			<div className='container'>
				<h4>About this App</h4>
				<p className='my-1'>This is a full stack React app for tracking time</p>
				<p className='grey darken-4 white-text p'>
					<strong> Version: </strong>1.0.0
				</p>
				<button
					className='btn z-depth-0 grey waves-light mg-top-50'
					onClick={() => history.goBack()}>
					Back
				</button>
			</div>
		</div>
	);
};

export default About;
