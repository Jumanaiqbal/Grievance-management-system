// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
// 	const [username, setUsername] = useState('');
// 	const [password, setPassword] = useState('');
// 	const [role, setRole] = useState('');
// 	const [errorMessage, setErrorMessage] = useState('');
// 	const navigate = useNavigate();

// 	const handleRegister = async (e) => {
// 		e.preventDefault();
// 		try {
// 			await axios.post('http://localhost:8080/api/v1/user/signup', {
// 				username,
// 				password,
// 				role,
// 			});
// 			navigate('/login');
// 		} catch (error) {
// 			setErrorMessage('Error during registration');
// 		}
// 	};

// 	return (
// 		<div className='register-container'>
// 			<h2>Register</h2>
// 			<form onSubmit={handleRegister}>
// 				<label>
// 					Username:
// 					<input
// 						type='text'
// 						value={username}
// 						onChange={(e) => setUsername(e.target.value)}
// 					/>
// 				</label>
// 				<br />
// 				<label>
// 					Password:
// 					<input
// 						type='password'
// 						value={password}
// 						onChange={(e) => setPassword(e.target.value)}
// 					/>
// 				</label>
// 				<br />
// 				<label>
// 					Role:
// 					<select value={role} onChange={(e) => setRole(e.target.value)}>
// 						<option value='' disabled>
// 							Select your role
// 						</option>
// 						<option value='CUSTOMER'>User</option>
// 						<option value='ASSIGNEE'>Assignee</option>
// 						<option value='PASSWORD'>Supervisor</option>
// 					</select>
// 				</label>
// 				<br />
// 				<button type='submit'>Register</button>
// 			</form>
// 			{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
// 		</div>
// 	);
// };

// export default Register;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('');
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:8080/api/v1/user/signup', {
				username,
				password,
				role,
				address,
				phone,
				email,
			});
			navigate('/login');
		} catch (error) {
			setErrorMessage('Error during registration');
		}
	};

	return (
		<div className='register-container'>
			<h2>Register</h2>
			<form onSubmit={handleRegister}>
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
						<option value='CUSTOMER'>User</option>
						<option value='ASSIGNEE'>Assignee</option>
						<option value='SUPERVISOR'>Supervisor</option>
					</select>
				</label>
				<br />
				<label>
					Address:
					<input
						type='text'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Phone:
					<input
						type='text'
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Email:
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<br />
				<button type='submit'>Register</button>
			</form>
			{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
		</div>
	);
};

export default Register;
