import React from 'react';

const Navbar = () => {
	return (
		<nav style={{ marginBottom: '30px' }}>
			<div className='nav-wrapper blue'>
				<a href='/'>
					<i className='fal fa-clock fa-sm'></i> TIME-TRACKER
				</a>
				<ul id='nav-mobile' className='right hide-on-med-and-down'>
					<li>
						<a href='/'>Login</a>
					</li>
					<li>
						<a href='/register'>Register</a>
					</li>
					<li>
						<a className='navItems' href='/about'>
							About
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
