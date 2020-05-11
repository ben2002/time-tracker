import React from 'react';

const SideNav = () => {
	return (
		<div>
			<div className='col s12 m3 l3'>
				<div className='mg-top-50'>
					<div>
						<a href='!#'>
							<i className='far fa-chart-bar'></i>{' '}
							<span style={{ color: 'black' }}>statistics</span>
						</a>
					</div>
					<br />

					<div>
						<a href='!#'>
							<i className='fab fa-github'></i> <span style={{ color: 'black' }}>github </span>
						</a>
						<div className='margin-bottom'>
							<a href='!#'>
								<i className='fab fa-twitter'></i> <span style={{ color: 'black' }}>twitter</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SideNav;
