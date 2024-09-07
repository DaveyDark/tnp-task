# Training and Placement Website (T&P Task)

This is a full-stack web application for managing the Training and Placement cell posts.
The project uses Laravel for the backend and Vite+React for the frontend.
It was made as a task for T&P Technical Team Interview 2nd Round

## Table of Contents

- [Getting Started](#getting-started)
- [Database](#database)
- [Backend Setup (Laravel)](#backend-setup-laravel)
- [Frontend Setup (Vite+React)](#frontend-setup-vite-react)
- [Usage](#usage)

## Getting Started

To get the project up and running on your local machine, follow the instructions below for both the backend and frontend parts of the application.

## Database

- Make sure a MySQL Installation is set up and accessible

## Backend Setup (Laravel)

1. Navigate to the `backend/` directory:
   
   ```bash
   cd backend/
   ```

2. Install dependencies using composer
   
   ```bash
   composer install
   ```

3. Set up you .env file
   
   - Copy the .env.example file to .env
     
     ```bash
     cp .env.example .env
     ```
   
   - Open the .env file and configure MySQL database connection. Make sure to update the following lines with your database credentials:
     
     ```bash
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=your_database_name
     DB_USERNAME=your_database_username
     DB_PASSWORD=your_database_password
     ```

4. Generate application key:
   
   ```bash
   php artisan key:generate
   ```

5. Migrate and seed the database
   
   ```bash
   php artisan migrate --seed
   ```

6. Serve the backend
   
   ```bash
   php artisan serve
   ```

## Frontend Setup (Vite + React)

1. Navigate to `frontend/` directory
   
   ```bash
   cd frontend/
   ```

2. Install the required NPM packages
   
   ```bash
   npm install
   ```

3. Set the API URL for the frontend
   
   - Open the .env file (or create it if it doesn't exist)
   
   - Add the following line with the URL of the laravel backend (typically `http://127.0.0.1:8000`):    
     
     ```bash
     VITE_API_URL=http://127.0.0.1:8000
     ```

4. Start the frontend server:
   
   ```bash
   npm run dev
   ```
   
    The frontend should now be running, and you can access it at the provided URL (typically `http://127.0.0.1:5173`)

## Usage

- Make sure both the frontend and backend servers are running, then visit the frontend server in you browser to view the website. 
- The default admin credentials are:
  - username: `admmin`
  - password: `adminadmin`
