// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserDashboard = () => {
// 	const [title, setTitle] = useState('');
// 	const [description, setDescription] = useState('');
// 	const [category, setCategory] = useState('');
// 	const [grievances, setGrievances] = useState([]);
// 	// const [feedback, setFeedback] = useState({});
// 	const [errorMessage, setErrorMessage] = useState('');
// 	const [successMessage, setSuccessMessage] = useState('');

// 	// Fetch grievances from the backend
// 	const userData = JSON.parse(localStorage.getItem('userData'));
// 	console.log(userData, 'user');
// 	const username = userData.username;
// 	const password = userData.password;
// 	const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

// 	// Fetch grievances including feedback
// 	const fetchGrievances = async () => {
// 		try {
// 			const response = await axios.get(
// 				'http://localhost:8080/api/v1/grievances',
// 				{
// 					headers: {
// 						Authorization: authHeader,
// 						'Content-Type': 'application/json',
// 					},
// 				}
// 			);
// 			setGrievances(response.data);

// 			setErrorMessage('');
// 		} catch (error) {
// 			setErrorMessage('Error fetching grievances and feedback');
// 		}
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		if (!title || !description || !category) {
// 			setErrorMessage('All fields are required');
// 			return;
// 		}

// 		try {
// 			await axios.post(
// 				'http://localhost:8080/api/v1/grievances',
// 				{
// 					title,
// 					description,
// 					grievanceType: category,
// 				},
// 				{
// 					headers: {
// 						Authorization: authHeader,
// 						'Content-Type': 'application/json',
// 					},
// 				}
// 			);
// 			setTitle('');
// 			setDescription('');
// 			setCategory('');
// 			setSuccessMessage('Grievance submitted successfully');
// 			setErrorMessage('');
// 			fetchGrievances();
// 		} catch (error) {
// 			setErrorMessage('Error submitting grievance');
// 			setSuccessMessage('');
// 		}
// 	};

// 	useEffect(() => {
// 		fetchGrievances();
// 	}, []);

// 	return (
// 		<div className='user-dashboard'>
// 			<h2>Grievance Portal</h2>

// 			{/* Grievance Submission Form */}
// 			<form onSubmit={handleSubmit}>
// 				<label>
// 					Title:
// 					<input
// 						type='text'
// 						value={title}
// 						onChange={(e) => setTitle(e.target.value)}
// 					/>
// 				</label>
// 				<br />
// 				<label>
// 					Description:
// 					<textarea
// 						value={description}
// 						placeholder='Describe your issue'
// 						onChange={(e) => setDescription(e.target.value)}
// 					/>
// 				</label>
// 				<br />
// 				<label>
// 					Category:
// 					<select
// 						value={category}
// 						onChange={(e) => setCategory(e.target.value)}>
// 						<option value='' disabled>
// 							Select category
// 						</option>
// 						<option value='AC'>AC</option>
// 						<option value='TV'>TV</option>
// 						<option value='Other Electrical Appliances'>
// 							Other Electrical Appliances
// 						</option>
// 					</select>
// 				</label>
// 				<br />
// 				<button type='submit'>Submit Grievance</button>
// 			</form>

// 			{/* Success/Error Message */}
// 			{successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
// 			{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

// 			{/* List of Grievances */}
// 			<h3>Submitted Grievances</h3>
// 			{grievances.length === 0 ? (
// 				<p>No grievances found</p>
// 			) : (
// 				<ul>
// 					{grievances.map((grievance) => (
// 						<li key={grievance.id}>
// 							<p>
// 								<strong>Title:</strong> {grievance.title}
// 							</p>
// 							<p>
// 								<strong>Description:</strong> {grievance.description}
// 							</p>
// 							<p>
// 								<strong>Category:</strong> {grievance.grievanceType}
// 							</p>
// 							<p>
// 								<strong>Status:</strong> {grievance.status}
// 							</p>
// 							<p>
// 								<strong>Feedback from Assignee:</strong>{' '}
// 								{grievance.resolutionFeedback ?? 'no feedback yet'}
// 							</p>
// 						</li>
// 					))}
// 				</ul>
// 			)}
// 		</div>
// 	);
// };

// export default UserDashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserDashboard = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [grievances, setGrievances] = useState([]);
	const [showGrievances, setShowGrievances] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const userData = JSON.parse(localStorage.getItem('userData'));
	const username = userData.username;
	const password = userData.password;
	const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

	const fetchGrievances = async () => {
		try {
			const response = await axios.get(
				'http://localhost:8080/api/v1/grievances',
				{
					headers: {
						Authorization: authHeader,
						'Content-Type': 'application/json',
					},
				}
			);
			setGrievances(response.data);
			setErrorMessage('');
		} catch (error) {
			setErrorMessage('Error fetching grievances');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title || !description || !category) {
			setErrorMessage('All fields are required');
			return;
		}

		try {
			await axios.post(
				'http://localhost:8080/api/v1/grievances',
				{
					title,
					description,
					grievanceType: category,
				},
				{
					headers: {
						Authorization: authHeader,
						'Content-Type': 'application/json',
					},
				}
			);
			setTitle('');
			setDescription('');
			setCategory('');
			setSuccessMessage('Grievance submitted successfully');
			setErrorMessage('');
			fetchGrievances();
		} catch (error) {
			setErrorMessage('Error submitting grievance');
			setSuccessMessage('');
		}
	};

	useEffect(() => {
		fetchGrievances();
	}, []);

	return (
		<div className='dashboard-container'>
			<div className='sidebar'>
				<FontAwesomeIcon icon={faUser} size='3x' className='user-icon' />
				<p className='user-name'>{username}</p>
				<button
					className='grievance-button'
					onClick={() => setShowGrievances(!showGrievances)}>
					My Grievances
				</button>
			</div>
			<div className='main-content'>
				<h2>Grievance Portal</h2>
				{!showGrievances && (
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className='form-input'
							placeholder='Title'
						/>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className='form-textarea'
							placeholder='Describe your issue'
						/>
						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className='form-select'>
							<option value='' disabled>
								Select category
							</option>
							<option value='AC'>AC</option>
							<option value='TV'>TV</option>
							<option value='Other Electrical Appliances'>
								Other Electrical Appliances
							</option>
						</select>
						<button type='submit' className='form-button'>
							Submit Grievance
						</button>
					</form>
				)}
				{successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
				{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
				{showGrievances && (
					<div className='grievances-list'>
						<h3>Submitted Grievances</h3>
						{grievances.length === 0 ? (
							<p>No grievances found</p>
						) : (
							<ul>
								{grievances.map((grievance) => (
									<li key={grievance.id} className='grievance-item'>
										<p>
											<strong>Title:</strong> {grievance.title}
										</p>
										<p>
											<strong>Description:</strong> {grievance.description}
										</p>
										<p>
											<strong>Category:</strong> {grievance.grievanceType}
										</p>
										<p>
											<strong>Status:</strong> {grievance.status}
										</p>
										<p>
											<strong>Feedback from Assignee:</strong>{' '}
											{grievance.resolutionFeedback ?? 'No feedback yet'}
										</p>
									</li>
								))}
							</ul>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default UserDashboard;
