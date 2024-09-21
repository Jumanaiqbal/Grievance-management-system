import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssigneeDashboard = () => {
	const [grievances, setGrievances] = useState([]);
	const [feedback, setFeedback] = useState({});
	const userData = JSON.parse(localStorage.getItem('userData'));
	console.log(userData, 'user');
	const username = userData.username;
	const password = userData.password;
	const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

	useEffect(() => {
		const fetchGrievances = async () => {
			try {
				const response = await axios.get(`/api/v1/grievances`, {
					headers: {
						Authorization: authHeader,
						'Content-Type': 'application/json',
					},
				});
				setGrievances(response.data);
			} catch (error) {
				console.error('Error fetching grievances:', error);
			}
		};

		fetchGrievances();
	}, []);

	const handleStatusChange = async (grievanceId, newStatus) => {
		try {
			await axios.put(
				`/api/v1/grievances/${grievanceId}/status`,
				{ status: newStatus },
				{
					headers: {
						Authorization: authHeader,
						'Content-Type': 'application/json',
					},
				}
			);
		} catch (error) {
			console.error('Error updating status:', error);
		}
	};

	const handleFeedbackChange = (grievanceId, feedbackText) => {
		setFeedback({
			...feedback,
			[grievanceId]: feedbackText,
		});
	};

	const handleFeedbackSubmit = async (grievanceId) => {
		try {
			await axios.put(
				`/api/v1/grievances/${grievanceId}/feedback`,
				{ feedback: feedback[grievanceId] },
				{
					headers: {
						Authorization: authHeader,
						'Content-Type': 'application/json',
					},
				}
			);
			// Clear feedback after submission
			setFeedback({
				...feedback,
				[grievanceId]: '',
			});
		} catch (error) {
			console.error('Error submitting feedback:', error);
		}
	};

	return (
		<div>
			<h1>Assignee Dashboard</h1>
			<ul>
				{grievances.map((grievance) => (
					<li key={grievance.id}>
						<h2>{grievance.title}</h2>
						<p>{grievance.description}</p>
						<select
							value={grievance.status}
							onChange={(e) =>
								handleStatusChange(grievance.id, e.target.value)
							}>
							<option value='Pending'>Pending</option>
							<option value='resolved'>resolved</option>
						</select>
						<textarea
							value={feedback[grievance.id] || ''}
							onChange={(e) =>
								handleFeedbackChange(grievance.id, e.target.value)
							}
							placeholder='Provide feedback here...'
						/>
						<button onClick={() => handleFeedbackSubmit(grievance.id)}>
							Submit Feedback
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AssigneeDashboard;
