import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import Navbar from './components/layouts/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import About from './components/pages/About';
import AuthState from './context/auth/AuthState';
import JobState from './context/job/JobState';
import TimeState from './context/time/TimeState';
import Home from './components/pages/Home';
import Times from './components/time/Times';
import PrivateRoute from './components/routing/PrivateRoute';

const App = () => {
	useEffect(() => {
		// init Material JS
		M.AutoInit();
	});

	return (
		<AuthState>
			<JobState>
				<TimeState>
					<Router>
						<Fragment>
							<Navbar />
							<Switch>
								<PrivateRoute exact path='/' component={Home} />
								<Route exact path='/login' component={Login} />
								<Route exact path='/about' component={About} />
								<Route exact path='/register' component={Register} />
								<Route exact path='/:id' component={Times} />
							</Switch>
						</Fragment>
					</Router>
				</TimeState>
			</JobState>
		</AuthState>
	);
};

export default App;

// @todo
// add picture
// stay selected after refresh
