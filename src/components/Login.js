import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsLoggedIn, setUserRole }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'http://localhost:8080/api/v1/user/login',
				{
					username,
					password,
					role,
				}
			);

			if (response.status === 200) {
				localStorage.setItem(
					'userData',
					JSON.stringify({ username, password })
				);

				localStorage.setItem('userRole', role); // Save role to localStorage
				setIsLoggedIn(true);
				setUserRole(role); // Set the role in state
				navigateBasedOnRole(role); // Redirect to the correct dashboard
			}
		} catch (error) {
			setErrorMessage('Invalid credentials or role not selected');
		}
	};

	const navigateBasedOnRole = (role) => {
		switch (role) {
			case 'CUSTOMER':
				navigate('/user-dashboard');
				break;
			case 'ASSIGNEE':
				navigate('/assignee-dashboard');
				break;
			case 'SUPERVISOR':
				navigate('/supervisor-dashboard');
				break;
			default:
				setErrorMessage('Invalid role');
		}
	};

	return (
		<div className='login-container'>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<label>
					Username:
					<input
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Password:
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Role:
					<select value={role} onChange={(e) => setRole(e.target.value)}>
						<option value='' disabled>
							Select your role
						</option>
						<option value='CUSTOMER'>Customer</option>
						<option value='ASSIGNEE'>Assignee</option>
						<option value='SUPERVISOR'>Supervisor</option>
					</select>
				</label>
				<br />
				<button type='submit'>Login</button>
			</form>
			{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
			<p>
				Dont have an account? <Link to='/register'>Register</Link>
			</p>
		</div>
	);
};

export default Login;
