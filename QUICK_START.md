# 🚀 Career Compass - Quick Start Guide

**Status:** Backend and Frontend packages installed successfully! ✅

## Next Steps

### Step 1: Set up MySQL Database

You have 3 options:

#### Option A: Using MySQL Command Line (Recommended)

1. Open a new terminal/command prompt
2. Run these commands (enter password when prompted):

```bash
mysql -u root -p

# Inside MySQL:
CREATE DATABASE career_compass;
exit;

# Then import schema:
mysql -u root -p < "D:\Career Compass Cursor\database\schema.sql"

# Then import sample data:
mysql -u root -p career_compass < "D:\Career Compass Cursor\database\sample_data.sql"
```

#### Option B: Using MySQL Workbench (GUI)

1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Create a new query tab
4. Run the contents of `database\schema.sql`
5. Then run the contents of `database\sample_data.sql`

#### Option C: Using the setup.bat script

```bash
setup.bat
# Enter your MySQL password when prompted
```

---

### Step 2: Configure Database Credentials

**Important:** If you set a password for MySQL root, you need to update it:

1. Navigate to `backend` folder
2. Edit the `.env` file 
3. Update the `DB_PASSWORD` line:

```env
DB_PASSWORD=your_actual_mysql_password
```

If MySQL has no password, leave it empty:
```env
DB_PASSWORD=
```

---

### Step 3: Start the Servers

#### Start Backend (Terminal 1)

```bash
cd "D:\Career Compass Cursor\backend"
npm run dev
```

Wait for: `Server is running on port 5000`

#### Start Frontend (Terminal 2)

```bash
cd "D:\Career Compass Cursor\frontend"
npm run dev
```

Wait for: `Ready on http://localhost:3000`

---

### Step 4: Access the Application

1. Open browser
2. Go to: **http://localhost:3000**

3. **Login with:**
   - Username: `student1`
   - Password: `password123`

Or register a new account!

---

## Quick Test

To verify everything is working:

1. **Test Backend:** http://localhost:5000/api/health
   - Should show: `{"message":"Career Compass API is running","status":"OK"}`

2. **Test Database:** Try logging in with demo credentials

3. **Test Quiz:** Click "Take Career Quiz" and answer questions

4. **Test Roadmap:** Go to Roadmap page and select different streams

---

## Troubleshooting

### "Can't connect to MySQL"

**Fix:**
- Make sure MySQL service is running
- Check if you're using the correct password
- Try: `mysql -u root -p` to test connection

### "Database doesn't exist"

**Fix:**
```bash
mysql -u root -p
CREATE DATABASE career_compass;
exit;
# Then re-run the schema import
```

### "Port 5000 already in use"

**Fix:**
- Close any other app using port 5000
- Or change PORT in `backend\.env` to 5001
- Update `frontend\.env.local` API_URL to match

### "Cannot find module"

**Fix:**
```bash
# In both backend and frontend folders:
rm -rf node_modules
npm install
```

---

## What's Installed

✅ **Backend:** Node.js with Express, MySQL2, JWT, bcrypt
✅ **Frontend:** Next.js with React, Tailwind CSS, Axios
✅ **Database Files:** Schema and sample data ready

## What You Need to Do

⏳ **Database:** Import schema and sample data
⏳ **Configure:** Update MySQL password in backend/.env
⏳ **Start:** Run both servers
⏳ **Test:** Login and explore!

---

## Need Help?

1. Check `README.md` for full documentation
2. Check `INSTRUCTIONS.md` for detailed troubleshooting
3. Review error messages in terminal windows
4. Verify MySQL is installed and running

---

**You're almost there! Just set up the database and start the servers! 🎉**

