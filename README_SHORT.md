# Career Compass - Quick Start 🚀

## One-Line Setup

**For Windows Users:**

```bash
# 1. Run database setup
setup.bat

# 2. Configure backend
cd backend && npm install && copy .env.example .env

# 3. Configure frontend  
cd ../frontend && npm install && copy .env.local.example .env.local

# 4. Edit .env files with your MySQL password

# 5. Start everything
cd .. && START.bat
```

## Steps in Detail

### 1️⃣ Database Setup

**Option A - Using script:**
```bash
setup.bat  # Enter MySQL password when prompted
```

**Option B - Manual:**
```bash
mysql -u root -p -e "CREATE DATABASE career_compass"
mysql -u root -p < database\schema.sql
mysql -u root -p career_compass < database\sample_data.sql
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
copy .env.example .env
```

**Edit `backend\.env`:**
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YourMySQLPassword
DB_NAME=career_compass
JWT_SECRET=career_compass_secret_2024
```

```bash
npm run dev  # Starts on http://localhost:5000
```

### 3️⃣ Frontend Setup (New Terminal)

```bash
cd frontend
npm install
copy .env.local.example .env.local
```

**Edit `frontend\.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
npm run dev  # Starts on http://localhost:3000
```

## 🎯 Access the App

Open: **http://localhost:3000**

**Login:**
- Username: `student1`
- Password: `password123`

**Admin Login:**
- Username: `admin`  
- Password: `password123`

## ✅ Verify Installation

1. ✓ Backend: http://localhost:5000/api/health
2. ✓ Frontend: http://localhost:3000
3. ✓ Login works
4. ✓ Quiz loads
5. ✓ Careers display

## 📁 Quick File Guide

```
Career Compass Cursor/
├── setup.bat          # Run this first
├── START.bat          # Use this to start servers
├── INSTRUCTIONS.md    # Detailed instructions
├── README.md          # Full documentation
├── database/          # SQL files
├── backend/           # API server
└── frontend/          # Web app
```

## ⚠️ Common Issues

**MySQL won't connect?**
- Check MySQL is running: `mysql -u root -p`
- Verify password in `backend\.env`

**Port already in use?**
- Change PORT in backend/.env
- Update API_URL in frontend/.env.local

**Module not found?**
- Run `npm install` in both folders
- Delete node_modules and reinstall

## 🔧 Quick Fixes

```bash
# Reset database
mysql -u root -p -e "DROP DATABASE career_compass"
setup.bat

# Fresh npm install
cd backend && rm -rf node_modules && npm install
cd ../frontend && rm -rf node_modules && npm install

# Check MySQL status
mysql -u root -p
```

## 📚 Learn More

- Full docs: `README.md`
- Troubleshooting: `INSTRUCTIONS.md`

---

**Ready? Run `setup.bat` and get started! 🎉**

