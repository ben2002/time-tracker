import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthState';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const [authState] = useAuth();

	const { isAuthenticated } = authState;

	return (
		<Route
			{...rest}
			render={(props) => (!isAuthenticated ? <Redirect to='login' /> : <Component {...props} />)}
		/>
	);
};

export default PrivateRoute;
