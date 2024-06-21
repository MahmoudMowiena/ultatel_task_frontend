# Student Manager Application

## Overview

The Student Manager Application is a robust and user-friendly platform designed to manage student data efficiently. It features authentication, CRUD operations for students, and a responsive UI, ensuring seamless user experience across different devices.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication**: Secure login and registration using JWT.
- **CRUD Operations**: Add, edit, delete, and view students.
- **Pagination**: Efficiently browse through student records.
- **Date Picker**: Easy date selection using ng-bootstrap date picker.
- **Password Strength Checker**: Validates passwords for very weak, weak, medium, and strong criteria.
- **Responsive Design**: Optimized for various screen sizes.
- **Unit Testing**: Comprehensive tests for services using Jest.

## Technologies Used

- **Frontend**: Angular, Bootstrap, ng-bootstrap
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (hosted on Supabase)
- **Authentication**: JWT
- **Deployment**: Vercel (Frontend), Heroku (Backend)
- **Testing**: Jest

## Deployment

The application is deployed on Vercel for the frontend and Heroku for the backend.

- **Frontend**: Hosted on Vercel. The link is accessible via the GitHub repository.
- **Backend**: Hosted on Heroku. [Base URL for Backend Application]((https://student-manager-backend-940f11b85bff.herokuapp.com))

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Angular CLI (v13 or higher)
- PostgreSQL

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/student-manager.git
    cd student-manager
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

1. Start the development server:
    ```bash
    ng serve
    ```

2. Open your browser and navigate to `http://localhost:4200`.

### Testing

Run unit tests using Jest:
  ```bash
  npm run test
  ```
## Usage

### Authentication

- **Register**: Create a new account.
- **Login**: Log in with your credentials.
- **Logout**: Log out from your account.

### Managing Students

- **Add Student**: Click the "Add New" button and fill in the student details in the modal form.
- **Edit Student**: Click the edit button next to a student's record, update the details, and save.
- **Delete Student**: Click the delete button next to a student's record to remove it.
- **Search and Filter**: Use the search form to filter students by name, age, country, and gender.
- **Pagination**: Use the pagination controls to navigate through the list of students.

## Contributing

We welcome contributions to improve the Student Manager Application. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](https://www.mit.edu/~amini/LICENSE.md) file for details.

## Contact

For any inquiries, please contact:

- **Name**: Mahmoud Mowiena
- **Email**: [mowiena8@gmail.com](mailto:mowiena8@gmail.com)
- **GitHub**: [MahmoudMowiena](https://github.com/MahmoudMowiena)
