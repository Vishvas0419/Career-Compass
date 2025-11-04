# Quick Setup Instructions for Career Compass

## Prerequisites Check

Make sure you have installed:
- ✅ Node.js (v16 or higher) - Check with: `node -v`
- ✅ MySQL Server - Check with: `mysql --version`
- ✅ npm - Comes with Node.js

## Setup Steps

### Option 1: Using the Setup Scripts (Easiest)

1. **First-time setup:**
   ```bash
   # Double-click or run in terminal:
   setup.bat
   ```
   This will create the database and import sample data. You'll be prompted for your MySQL root password.

2. **Configure Backend:**
   ```bash
   cd backend
   npm install
   ```
   
   Create a file named `.env` in the `backend` folder with:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=career_compass
   JWT_SECRET=career_compass_secret_key_2024
   ```
   Replace `your_mysql_password` with your actual MySQL password.

3. **Configure Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   
   Create a file named `.env.local` in the `frontend` folder with:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start the Application:**
   ```bash
   # Go back to root folder
   cd ..
   
   # Double-click or run:
   START.bat
   ```

   This opens two terminal windows - one for backend, one for frontend.

### Option 2: Manual Setup

#### Step 1: Database Setup

```bash
# Open MySQL command line
mysql -u root -p

# Then run these SQL commands:
CREATE DATABASE IF NOT EXISTS career_compass;
exit;

# Import schema
mysql -u root -p < database\schema.sql

# Import sample data
mysql -u root -p career_compass < database\sample_data.sql
```

#### Step 2: Backend Setup

```bash
cd backend
npm install

# Create .env file with:
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=career_compass
JWT_SECRET=your_secret_here

# Start backend
npm run dev
```

#### Step 3: Frontend Setup (New Terminal)

```bash
cd frontend
npm install

# Create .env.local file with:
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start frontend
npm run dev
```

## Access the Application

1. Open browser and go to: `http://localhost:3000`

2. **Login with demo credentials:**
   - Username: `student1`
   - Password: `password123`

   Or register a new account.

3. **Admin login:**
   - Username: `admin`
   - Password: `password123`

## Troubleshooting

### MySQL Issues

**Problem:** "Access denied" or "Can't connect to MySQL"

**Solutions:**
- Make sure MySQL service is running
- Check if you're using the correct password
- Try: `mysql -u root -p` in terminal to test connection
- If no password set, leave DB_PASSWORD empty in .env

**Problem:** "Database doesn't exist"

**Solution:**
```bash
mysql -u root -p
CREATE DATABASE career_compass;
exit;
# Then run setup.bat again or import schema manually
```

### Backend Issues

**Problem:** "Cannot find module" error

**Solution:**
```bash
cd backend
rm -rf node_modules
npm install
```

**Problem:** Port 5000 already in use

**Solution:**
- Change PORT in backend/.env to another port (e.g., 5001)
- Update NEXT_PUBLIC_API_URL in frontend/.env.local accordingly

**Problem:** "Database connection failed"

**Solution:**
- Verify MySQL is running: `mysql -u root -p` should work
- Check DB credentials in backend/.env
- Ensure database `career_compass` exists

### Frontend Issues

**Problem:** "Cannot connect to API"

**Solution:**
- Make sure backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in frontend/.env.local
- Verify CORS is enabled in backend

**Problem:** "Module not found" errors

**Solution:**
```bash
cd frontend
rm -rf node_modules .next
npm install
```

### General Issues

**Problem:** Scripts not working (setup.bat, START.bat)

**Solution:**
- Right-click → Run as Administrator
- Or use manual setup (Option 2)

**Problem:** npm install fails

**Solutions:**
- Update npm: `npm install -g npm@latest`
- Clear cache: `npm cache clean --force`
- Delete node_modules and package-lock.json, then reinstall

## Next Steps After Setup

1. ✅ Login with demo credentials
2. ✅ Take the career quiz
3. ✅ Browse careers and courses
4. ✅ View career roadmaps
5. ✅ Enroll in courses
6. ✅ Try the dummy payment
7. ✅ Explore resources

## Need Help?

- Check README.md for detailed documentation
- Review error messages in terminal windows
- Verify all prerequisites are installed
- Check that ports 3000 and 5000 are not in use

## Database Reset

If you need to reset the database:

```bash
# Drop and recreate database
mysql -u root -p
DROP DATABASE career_compass;
exit;

# Run setup again
setup.bat
```

---

**Happy exploring your career path! 🚀**

