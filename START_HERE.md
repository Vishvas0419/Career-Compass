# 🎯 START HERE - Career Compass

## Ready to Run? Follow These Steps:

### ✨ Step 1: Set Up MySQL Database

**Open a new Command Prompt or PowerShell as Administrator:**

```bash
cd "D:\Career Compass Cursor"

# Option 1: Use the setup script (easiest)
setup.bat

# OR Option 2: Manual setup
mysql -u root -p < database\schema.sql
mysql -u root -p careercompass < database\sample_data.sql
```

**Enter your MySQL root password when prompted.**

---

### ✨ Step 2: Configure Database Password

**If your MySQL has a password, edit `backend\.env`:**

Open `backend\.env` and change:
```
DB_PASSWORD=your_mysql_password_here
```

If no password, leave it empty:
```
DB_PASSWORD=
```

---

### ✨ Step 3: Start Backend Server

**Open Terminal/Command Prompt 1:**

```bash
cd "D:\Career Compass Cursor\backend"
npm run dev
```

**Wait for:** `✓ Server is running on port 5000`

✅ **Keep this window open!**

---

### ✨ Step 4: Start Frontend Server

**Open Terminal/Command Prompt 2 (New Window):**

```bash
cd "D:\Career Compass Cursor\frontend"
npm run dev
```

**Wait for:** `✓ Ready on http://localhost:3000`

✅ **Keep this window open too!**

---

### ✨ Step 5: Open in Browser

**Open your browser and go to:**

```
http://localhost:3000
```

---

### ✨ Step 6: Login

**Use demo credentials:**

```
Username: student1
Password: password123
```

**OR register a new account!**

---

## 🎉 You're All Set!

Now you can:
- ✅ Take the career quiz
- ✅ Browse careers and courses
- ✅ View interactive roadmaps
- ✅ Enroll in courses
- ✅ Explore resources
- ✅ Manage your profile

---

## ⚡ Quick Start Alternative

Want to start both servers at once? Use:

```bash
START.bat
```

(This will open two terminal windows for you)

---

## 🐛 Having Issues?

### "Can't connect to MySQL"

**Solution:**
```bash
# Test MySQL connection
mysql -u root -p

# If that works, try importing again:
mysql -u root -p < database\schema.sql
```

### "Port already in use"

**Solution:**
- Close other apps using ports 3000 or 5000
- Restart your computer if needed

### "Database error"

**Solution:**
- Make sure you imported schema.sql BEFORE sample_data.sql
- Check MySQL is running
- Verify credentials in backend\.env

### "Module not found"

**Solution:**
```bash
# Delete and reinstall
cd backend
rm -rf node_modules
npm install

cd ..\frontend
rm -rf node_modules
npm install
```

---

## 📚 Need More Help?

Check these files in order:

1. **QUICK_START.md** ← Detailed step-by-step
2. **INSTRUCTIONS.md** ← Troubleshooting guide
3. **README.md** ← Full documentation
4. **SETUP_COMPLETE.md** ← What's installed

---

## 📋 What's Included

**12 Careers:**
- Engineering, Medical, Commerce, Arts, Science

**10 Quiz Questions:**
- Covers interests, strengths, preferences

**10 Courses:**
- Different categories and levels

**7 Colleges:**
- Government and private institutions

**4 Roadmaps:**
- Engineering, Medical, Commerce, Arts paths

**8 Resources:**
- Articles, videos, helpful links

**3 Users:**
- 1 admin, 2 students (ready to login)

---

## 🎓 Features Highlights

- **Smart Quiz:** Personalized career recommendations
- **Detailed Info:** Skills, eligibility, salary, growth
- **Visual Roadmaps:** Interactive flowchart navigation
- **Course Catalog:** Browse, enroll, dummy payment
- **Save & Track:** Bookmark careers, view history
- **Resources Library:** Educational content
- **Admin Panel:** Manage all content

---

## 🚀 Try These First

1. **Take the Quiz** → Get personalized recommendations
2. **View Roadmaps** → See all career paths
3. **Browse Careers** → Filter by category
4. **Enroll in Course** → Try the payment flow
5. **Check Profile** → View your activity

---

## ✨ That's It!

**Just:**
1. Import database
2. Start backend
3. Start frontend
4. Open browser
5. Login
6. Explore!

**All the code is ready, just need to run it! 🎉**

---

**Still stuck? Read SETUP_COMPLETE.md for more details.**

