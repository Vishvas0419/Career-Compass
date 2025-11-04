@echo off
echo ========================================
echo Career Compass Setup Script
echo ========================================
echo.

echo This script will help you set up the database.
echo You'll need to enter your MySQL root password.
echo.

echo IMPORTANT: Make sure MySQL is running before proceeding!
echo Press any key to continue...
pause >nul
echo.

echo Step 1: Creating database and tables...
mysql -u root -p < database\schema.sql
if %errorlevel% neq 0 (
    echo Error creating database. Please check your MySQL credentials.
    pause
    exit /b 1
)

echo.
echo Step 2: Importing sample data...
mysql -u root -p career_compass < database\sample_data.sql
if %errorlevel% neq 0 (
    echo Error importing sample data. Please check your MySQL credentials.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Database setup completed successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Navigate to backend folder: cd backend
echo 2. Install dependencies: npm install
echo 3. Create .env file with your MySQL credentials
echo 4. Start backend: npm run dev
echo.
echo Then in another terminal:
echo 1. Navigate to frontend folder: cd frontend
echo 2. Install dependencies: npm install
echo 3. Create .env.local file
echo 4. Start frontend: npm run dev
echo.
pause

