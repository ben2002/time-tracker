import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import Navbar from './components/layouts/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import About from './components/layouts/About';

const App = () => {
	useEffect(() => {
		// init Material JS
		M.AutoInit();
	});
	return (
		<Router>
			<Fragment>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Login} />
					<Route exact path='/about' component={About} />
					<Route exact path='/register' component={Register} />
				</Switch>
			</Fragment>
		</Router>
	);
};

export default App;
