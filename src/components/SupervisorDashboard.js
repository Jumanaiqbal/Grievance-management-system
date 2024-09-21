// src/pages/SupervisorDashboard.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SupervisorDashboard = () => {
// 	const [grievances, setGrievances] = useState([]);
// 	const [selectedCategory, setSelectedCategory] = useState('');
// 	const [assigneeId, setAssigneeId] = useState('');
// 	const [errorMessage, setErrorMessage] = useState('');
// 	const userData = JSON.parse(localStorage.getItem('userData'));
// 	const username = userData.username;
// 	const password = userData.password;
// 	const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

// 	const fetchGrievances = async (category) => {
// 		try {
// 			const response = await axios.get(
// 				`http://localhost:8080/api/v1/grievances?category=${category}`,
// 				{
// 					headers: {
// 						Authorization: authHeader,
// 						'Content-Type': 'application/json',
// 					},
// 				}
// 			);
// 			setGrievances(response.data);
// 		} catch (error) {
// 			setErrorMessage('Error fetching grievances');
// 		}
// 	};

// 	const handleAssign = async (grievanceId) => {
// 		try {
// 			await axios.post(
// 				`http://localhost:8080/api/v1/grievances/${grievanceId}/assign`,
// 				{
// 					assigneeId,
// 				},
// 				{
// 					headers: {
// 						Authorization: authHeader,
// 						'Content-Type': 'application/json',
// 					},
// 				}
// 			);
// 			setAssigneeId('');
// 			fetchGrievances(selectedCategory);
// 		} catch (error) {
// 			setErrorMessage('Error assigning grievance');
// 		}
// 	};

// 	useEffect(() => {
// 		if (selectedCategory) {
// 			fetchGrievances(selectedCategory);
// 		}
// 	}, [selectedCategory]);

// 	return (
// 		<div className='supervisor-dashboard'>
// 			<h2>Supervisor Dashboard</h2>
// 			<label>
// 				Category:
// 				<select
// 					value={selectedCategory}
// 					onChange={(e) => setSelectedCategory(e.target.value)}>
// 					<option value='' disabled>
// 						Select category
// 					</option>
// 					<option value='AC'>AC</option>
// 					<option value='TV'>TV</option>
// 					<option value='Other Electrical Appliances'>
// 						Other Electrical Appliances
// 					</option>
// 				</select>
// 			</label>
// 			<h3>Received Grievances</h3>
// 			<ul>
// 				{grievances.map((grievance) => (
// 					<li key={grievance.id}>
// 						<p>
// 							<strong>Title:</strong> {grievance.title}
// 						</p>
// 						<p>
// 							<strong>Description:</strong> {grievance.description}
// 						</p>
// 						<p>
// 							<strong>Category:</strong> {grievance.grievanceType}
// 						</p>
// 						<p>
// 							<strong>Status:</strong> {grievance.status}
// 						</p>
// 						<label>
// 							Assignee ID:
// 							<input
// 								type='text'
// 								value={assigneeId}
// 								onChange={(e) => setAssigneeId(e.target.value)}
// 							/>
// 						</label>
// 						<button onClick={() => handleAssign(grievance.id)}>Assign</button>
// 					</li>
// 				))}
// 			</ul>
// 			{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
// 		</div>
// 	);
// };

// export default SupervisorDashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupervisorDashboard = () => {
	const [grievances, setGrievances] = useState([]);
	const [assigneeId, setAssigneeId] = useState(''); // Default to empty or 1 based on your logic
	const [selectedCategory, setSelectedCategory] = useState(''); // Adjust based on your component logic
	const [errorMessage, setErrorMessage] = useState('');
	const [selectedGrievanceId, setSelectedGrievanceId] = useState(null);
	// State to manage input values
	const [inputs, setInputs] = useState({});

	// Handle input change
	const handleInputChange = (id, value) => {
		setInputs((prevInputs) => ({
			...prevInputs,
			[id]: value,
		}));
	};

	const userData = JSON.parse(localStorage.getItem('userData'));
	const username = userData.username;
	const password = userData.password;
	const authHeader = `Basic ${btoa(`${username}:${password}`)}`; // Replace with dynamic auth header

	// Fetch grievances on component load or when the category is updated
	const fetchGrievances = async (category) => {
		try {
			const response = await axios.get(
				`http://localhost:8080/api/v1/grievances/filter?category=${category}`,
				{
					headers: {
						Authorization: authHeader,
						'Content-Type': 'application/json',
					},
				}
			);
			setGrievances(response.data);
		} catch (error) {
			console.error(
				'Error fetching grievances:',
				error.response ? error.response.data : error.message
			);
			setErrorMessage(
				error.response && error.response.data
					? error.response.data.message
					: 'Error fetching grievances'
			);
		}
	};

	useEffect(() => {
		fetchGrievances(selectedCategory);
	}, [selectedCategory]);

	const handleAssign = async (grievanceId) => {
		try {
			console.log(
				`Assigning grievance ${grievanceId} to assignee ${assigneeId}`
			);
			console.log('test input', inputs);

			await axios.put(
				`http://localhost:8080/api/v1/grievances/${grievanceId}/assign`,
				{ assigneeId: inputs[grievanceId] }, // Make sure this is passed correctly
				{
					headers: {
						Authorization: authHeader,
						'Content-Type': 'application/json',
					},
				}
			);

			setAssigneeId(''); // Reset after successful assignment
			fetchGrievances(selectedCategory); // Refresh the grievances list
		} catch (error) {
			console.error(
				'Error assigning grievance:',
				error.response ? error.response.data : error.message
			);
			setErrorMessage(
				error.response && error.response.data
					? error.response.data.message
					: 'Error assigning grievance'
			);
		}
	};

	return (
		<div>
			<h1>Supervisor Dashboard</h1>
			{errorMessage && <p className='error'>{errorMessage}</p>}
			<select onChange={(e) => setSelectedCategory(e.target.value)}>
				<option value=''>Select Category</option>
				<option value='AC'>AC</option>
				<option value='TV'>TV</option>
				<option value='Other Electrical Appliances'>
					Other Electrical Appliances
				</option>
				{/* Add more categories as needed */}
			</select>

			<div className='grievance-list'>
				{grievances.map((grievance) => (
					<div key={grievance.id} className='grievance-item'>
						<p>Title: {grievance.title}</p>
						<p>Description: {grievance.description}</p>
						<p>Category: {grievance.category}</p>
						<p>Status: {grievance.status}</p>
						<input
							type='number'
							placeholder='Assignee ID'
							value={inputs[grievance.id] || ''}
							onChange={(e) => handleInputChange(grievance.id, e.target.value)}
						/>
						<button onClick={() => handleAssign(grievance.id)}>Assign</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default SupervisorDashboard;
