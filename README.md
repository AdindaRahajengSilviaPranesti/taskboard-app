# TaskBoard Application

TaskBoard adalah aplikasi Kanban Board berbasis Angular.

## Features

- Authentication (Login & Register)
- Route Guard
- Kanban Board
- Add Ticket
- Edit Ticket
- Delete Ticket
- Drag & Drop Ticket
- Update Ticket Status (PATCH API)
- Loading Spinner
- Snackbar Notification
- Responsive UI
- Angular Material UI

## Tech Stack

- Angular 18
- Angular Material
- Angular CDK Drag & Drop
- TypeScript
- RxJS
- JSON Server
- NgRx (Store Structure)

## Installation

Clone repository
- bash: git clone <repository-url>


Install dependencies
- bash: npm install

Run JSON Server
- bash: npx json-server api/db.json --port 3000

Run Angular
- bash: ng serve

Open browser: http://localhost:4200


## Demo Account ##

Admin
Email : admin@taskboard.com
Password : admin123

Member
Email: budi@taskboard.com
Password: budi123


## Project Structure
src/app
│
├── core
│   ├── guards
│   ├── models
│   └── services
│
├── features
│   ├── auth
│   ├── board
│   └── ticket
│
├── store
│
└── shared

## Notes

This project uses JSON Server as mock REST API.

The application focuses on frontend implementation including CRUD operations, Drag & Drop interaction, Angular Material components, and responsive interface.

## ARSP - 18-6-2026 ##
