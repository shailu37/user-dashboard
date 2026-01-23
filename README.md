User Dashboard – Angular Assignment

A modern User Dashboard application built with Angular, Angular Material, and Bootstrap, featuring real-time user management and dynamic role-based data visualization.
The project focuses on performance optimization, lazy loading, and reactive state management using RxJS.

🚀 Features

User Dashboard

Displays users in a Material table

Columns: Name, Email, Role

Add User (Lazy-Loaded Modal)

Angular Material dialog form

Fields: Name, Email, Role (Admin / Editor / Viewer)

Reactive form validation

Loaded only when required

Dynamic Role Distribution Chart

Pie chart using Chart.js

Chart.js is dynamically imported

Updates automatically when users are added

Reactive State Management

Centralized user state using RxJS BehaviorSubject

Table and chart update in real time

Modern UI

Angular Material components

Bootstrap layout utilities

Design theme:

Primary color: #1c4980

Text color: #383838

Input and button height: 48px

🛠 Tech Stack

Angular (14+)

Angular Material

Bootstrap

Chart.js

RxJS

⚡ Performance Optimizations

Lazy loading for:

User form component

Chart.js library

Reduced initial bundle size

Chart initialized only after view rendering

📦 Installation & Setup
git clone <repository-url>
cd <project-folder>
npm install
ng serve

Open http://localhost:4200 in the browser.

🌐 Deployment

The application is deployed on Netlify with GitHub CI/CD integration.

Every push to the main branch triggers an automatic production deployment

Client-side routing is handled via Netlify redirects

📌 Notes

Dummy users are preloaded using RxJS for demonstration

Remove dummy data easily by clearing the initial BehaviorSubject state

👤 Author

Shailendra Rawat
