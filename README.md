# Grievance Management System

The **Grievance Management System** is a web application that allows users to submit grievances, supervisors to manage grievances, and assignees to update grievance statuses. It is built with a Spring Boot backend and a React frontend.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation and Setup](#installation-and-setup)
4. [Usage](#usage)
5. [Endpoints](#endpoints)
6. [License](#license)

## Features

- **Customer**:
  - Submit grievances.
  - View submitted grievances.
- **Supervisor**:
  - View all unassigned grievances.
  - Assign grievances to assignees.
  - Filter grievances by category.
- **Assignee**:
  - View assigned grievances.
  - Update grievance status (resolved/pending).
- Authentication and role-based access control with Spring Security.

## Technologies Used

- **Java 22**: Programming language for backend development.
- **Spring Boot 3.3.3**: Framework for building REST APIs and managing application configurations.
  - **Spring Boot Starter Web**: For creating REST APIs.
  - **Spring Boot Starter Data JPA**: For database interactions using JPA.
  - **Spring Boot Starter Security**: For authentication and authorization.
- **PostgreSQL**: Database for storing application data.
- **Lombok**: Reduces boilerplate code in Java.
- **Spring Security**: For managing security features such as login and role-based access control.
- **JUnit & Spring Security Test**: For unit and integration testing.
- **Maven**: Build automation and dependency management.


## Installation and Setup

### Backend

### Prerequisites
Before you begin, ensure you have the following installed on your system:
- **Java 22** (Ensure JAVA_HOME is correctly set)
- **Maven** (for managing dependencies)
- **PostgreSQL** (for the database)
- **Git** (to clone the repository)

### Step 1: Clone the Repository
1. Open a terminal and navigate to the directory where you want to store your project.
2. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
### Usage
Login/Register: Customers, supervisors, and assignees can register and log in to access the system based on their roles.
Submit Grievance: Logged-in customers can submit grievances.
Assign Grievances: Supervisors can view all grievances and assign them to assignees.
Update Status: Assignees can update the status of grievances they have been assigned.
### Endpoints
Authentication
-POST /api/v1/user/login: Login for users.
-POST /api/v1/user/signup: Register a new user.
Grievance Management
-POST /api/v1/grievances: Submit a new grievance.
-GET /api/v1/grievances: View grievances based on role (Customer, Supervisor, Assignee).
-PUT /api/v1/grievances/{id}/assign: Assign a grievance to an assignee (Supervisor only).
-PUT /api/v1/grievances/{id}/status: Update grievance status (Assignee only).
-GET /api/v1/grievances/filter: Filter grievances by category (Supervisor only).
### License
This project is licensed under the MIT License.
