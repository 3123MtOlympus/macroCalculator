# Macro Calculator
A web application to calculate nutritional macros and generate a meal plan based on user input. The application also allows users to receive results via email or SMS.

## Features
- Calculate daily nutritional macros (calories, protein, fat, and carbohydrates) based on user inputs.
- Generate a meal plan breaking down macros into meals (breakfast, lunch, dinner).
- Collect user contact information and send results via email or SMS.
- Interactive modal for submitting contact information.
- Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MySQL
- Email: Nodemailer
- SMS: Twilio

## Installation
### Prerequisites

Ensure you have the following installed:
- Node.js
- MySQL

## Clone the Repository

<code>
git clone https://github.com/3123MtOlympus/macro-calculator.git
cd macro-calculator
<code>


## Install Dependencies

<code>
npm install
<code>

## Configure Environment
Create a .env file in the root directory with the following content:

<code>
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=micro_calculator
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
<code>

## Set Up the Database
Run the following SQL commands to set up the database schema:

<code>
CREATE DATABASE macro_calculator;

USE macro_calculator;

CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact_info VARCHAR(255) NOT NULL,
    results TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
<code>

## Running the Application
Start the server:

<code>
npm start
<code>

Open your browser and navigate to http://localhost:3000.

## Usage
1. Enter your weight, height, age, gender, activity level, and goal in the form.
2. Click "Calculate" to see your daily macros and meal plan.
3. Click "Submit Results" to provide your email or cell number to receive the results.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any inquiries, please contact:

Email: realchrislondon@gmail.com
GitHub: 3123MtOlympus

