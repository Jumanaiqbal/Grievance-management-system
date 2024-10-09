import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import AssigneeDashboard from './components/AssigneeDashboard';
import SupervisorDashboard from './components/SupervisorDashboard';
import GetStarted from './components/GetStarted';
import './styles/App.css';

const App = () => {
	// Manage login and user role state
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!localStorage.getItem('authToken')
	);
	const [userRole, setUserRole] = useState(
		localStorage.getItem('userRole') || ''
	);

	// ProtectedRoute to check login status and role
	const ProtectedRoute = ({ component: Component, role }) => {
		if (!isLoggedIn) {
			return <Navigate to='/login' />;
		}
		if (role && role !== userRole) {
			return <Navigate to='/login' />;
		}
		return <Component />;
	};

	return (
		<Router>
			<Routes>
				{/* Landing page with GetStarted component */}
				<Route path="/" element={<GetStarted />} /> {/* Set GetStarted as landing page */}

				{/* Login page, sets isLoggedIn and userRole on success */}
				<Route
					path='/login'
					element={
						<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
					}
				/>
				{/* Registration page */}
				<Route path='/register' element={<Register />} />

				{/* User dashboard, accessible only to users with 'CUSTOMER' role */}
				<Route
					path='/user-dashboard'
					element={<ProtectedRoute component={UserDashboard} role='CUSTOMER' />}
				/>

				{/* Assignee dashboard, accessible only to users with 'ASSIGNEE' role */}
				<Route
					path='/assignee-dashboard'
					element={
						<ProtectedRoute component={AssigneeDashboard} role='ASSIGNEE' />
					}
				/>

				{/* Supervisor dashboard, accessible only to users with 'SUPERVISOR' role */}
				<Route
					path='/supervisor-dashboard'
					element={
						<ProtectedRoute component={SupervisorDashboard} role='SUPERVISOR' />
					}
				/>

				{/* Redirect to appropriate dashboard if logged in */}
				<Route
					path='/dashboard'
					element={
						isLoggedIn ? (
							<Navigate to={`/${userRole.toLowerCase()}-dashboard`} />
						) : (
							<Navigate to='/login' />
						)
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
