"# bus-ticket-setup" 
# Bus Ticket Reservation System

Welcome to the Bus Ticket Reservation System, a web application built to manage bus ticket bookings, employee administration, and route management. This project is designed with a user-friendly interface and integrates authentication, booking functionalities, and administrative tools.

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Roles and Permissions](#roles-and-permissions)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description
This is a full-stack web application that allows users to book bus tickets, cancel bookings, and view tickets. Admins can manage routes, employees, and buses, while employees can handle booking-related tasks. The application uses a modern React frontend with Tailwind CSS for styling and integrates with a backend API for data management.

## Features
- User authentication (Login/Register).
- Booking ticket with multiple passenger details.
- Cancel booking with refund information.
- Download ticket as PDF.
- Admin dashboard to manage:
  - Routes (add and view).
  - Employees (add and view).
  - Buses (add and view).
- Role-based access control (Admin and Employee).
- Responsive design with dark/light theme toggle.

## Installation

### Prerequisites
- Node.js (v14.x or higher)
- npm or yarn
- Backend API running (e.g., at `https://localhost:7112`)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bus-ticket-reservation.git
   cd bus-ticket-reservation

2. Install dependencies:
npm install

3. start the project:
npm run dev
    