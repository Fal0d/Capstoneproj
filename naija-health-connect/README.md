# React + Vite

We were asked to choose a focus area for our project and i have chosen Patient and clinic management application. the name of my project is Naija Health Connect

Naija Health Connect is a web-based health management application designed to streamline patient care and record management in healthcare organizations. The app connects receptionists, doctors, and pharmacists in one centralized platform, enabling efficient patient registration, consultation, and prescription management.

Purpose

This application aims to digitize and simplify the workflow in healthcare facilities, reducing manual record-keeping, minimizing errors, and improving communication between healthcare staff. By integrating the receptionist, doctor, and pharmacist roles into one system, Naija Health Connect ensures a seamless patient experience and better coordination of care.

Key Features

Role-Based Access

Receptionists, doctors, and pharmacists each have their own login credentials.

Each role sees a dashboard tailored to their responsibilities.

Receptionist Functionality

Registers new patients and records their details, including contact information, age, reason for visit, and medical history.

Adds patients to the system so doctors and pharmacists can access them later.

Doctor Functionality

Views patients registered by the receptionist.

Records vitals, diagnosis, and prescription information.

Updates patient records, which are automatically saved for pharmacist access.

Pharmacist Functionality

Views patient records with prescriptions created by doctors.

Records drugs given to the patient.

Ensures proper fulfillment of prescriptions and maintains patient medication logs.

Data Persistence

All patient information, diagnoses, and prescriptions are saved in the browser’s localStorage.

Data persists even after refreshing the page or closing the browser.

Professional UI

Clean, modern design with responsive layouts.

Intuitive forms and dashboards for each role.

Input validation to ensure data accuracy.

How It Helps

Naija Health Connect is designed to improve the efficiency of healthcare organizations by:

Reducing paperwork and manual errors in patient registration and record keeping.

Streamlining communication between receptionists, doctors, and pharmacists.

Providing real-time access to patient records for faster, coordinated care.

Enhancing patient experience with organized, quick, and professional service.

Technologies Used

React — for building dynamic user interfaces.

Vite — fast build tool for React projects.

JavaScript — core programming language.

HTML & CSS — for responsive design and styling.

localStorage — to persist patient records, diagnoses, and prescriptions.

How to Run the Project

Clone the repository:

git clone <your-repo-url>


Navigate into the project folder:

cd naija-health-connect


Install dependencies:

npm install


Start the development server:

npm run dev


Open the app in your browser at the provided URL (usually http://localhost:5173/).

Login Credentials for Demo
Role	Password
Receptionist	reception123
Doctor	doctor123
Pharmacist	pharm123

Note: Users can enter any name; only the password is validated per role.

Workflow Overview

Receptionist logs in → registers patient details → patient appears in system.

Doctor logs in → views patient list → records diagnosis and prescriptions → updates saved automatically.

Pharmacist logs in → views patient prescriptions → records dispensed drugs → ensures proper medication delivery.

Future Enhancements

Integration with a real database for multi-user access across devices.

Role-specific dashboards with analytics and reporting.

Dark mode toggle and animations for improved UX.

Notifications and reminders for appointments and prescriptions.

Thank you.