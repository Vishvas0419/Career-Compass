# Career Compass

A full-stack web application to help high school students make informed career decisions based on their interests and aptitude, without societal pressure.

## Project Overview

Career Compass provides:
- Personalized career quiz based on interests and strengths
- Career recommendations with detailed information
- Interactive career roadmaps using Mermaid.js flowcharts
- Course browsing and enrollment with dummy payment system
- Resource library with articles, videos, and links
- User profile to track quiz results, saved careers, and enrollments

## Tech Stack

**Frontend:**
- Next.js 14
- React 18
- Tailwind CSS
- Mermaid.js

**Backend:**
- Node.js
- Express.js
- MySQL2
- bcryptjs
- JWT

**Database:**
- MySQL

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MySQL Server (v8.0 or higher)
- npm or yarn

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd "Career Compass Cursor"
```

### Step 2: Database Setup

1. Start your MySQL server.

2. Create the database and import schema:

```bash
mysql -u root -p < database/schema.sql
```

3. Import sample data:

```bash
mysql -u root -p career_compass < database/sample_data.sql
```

**Note:** Replace `root` with your MySQL username and enter password when prompted.

### Step 3: Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```bash
# On Windows PowerShell
copy .env.example .env

# On Unix/Mac
cp .env.example .env
```

4. Edit `.env` file and update with your database credentials:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=career_compass
JWT_SECRET=your_secret_key_here
```

5. Start the backend server:

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The backend API will be running at `http://localhost:5000`

### Step 4: Frontend Setup

1. Open a new terminal and navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` file:

```bash
# On Windows PowerShell
copy .env.local.example .env.local

# On Unix/Mac
cp .env.local.example .env.local
```

4. Edit `.env.local` and ensure API URL is correct:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

5. Start the development server:

```bash
npm run dev
```

The frontend will be running at `http://localhost:3000`

## Accessing the Application

1. Open your browser and go to `http://localhost:3000`

2. **Demo Credentials:**
   - Username: `student1`
   - Password: `password123`
   
   - **Admin Login:**
   - Username: `admin`
   - Password: `password123`

## Project Structure

```
Career Compass Cursor/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── middleware/
│   │   └── auth.js               # Authentication middleware
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── careers.js            # Career management routes
│   │   ├── quiz.js               # Quiz routes
│   │   ├── courses.js            # Course management routes
│   │   ├── payments.js           # Payment routes
│   │   ├── colleges.js           # College routes
│   │   ├── resources.js          # Resource routes
│   │   └── roadmaps.js           # Roadmap routes
│   ├── package.json
│   ├── server.js                 # Express server setup
│   └── .env                      # Environment variables
│
├── frontend/
│   ├── components/
│   │   └── Layout.js             # Main layout component
│   ├── context/
│   │   └── AuthContext.js        # Authentication context
│   ├── pages/
│   │   ├── index.js              # Home page
│   │   ├── login.js              # Login page
│   │   ├── register.js           # Registration page
│   │   ├── quiz.js               # Career quiz
│   │   ├── recommendations.js    # Quiz results
│   │   ├── careers/
│   │   │   ├── index.js          # All careers
│   │   │   └── [id].js           # Career details
│   │   ├── courses/
│   │   │   ├── index.js          # All courses
│   │   │   └── [id].js           # Course details
│   │   ├── payment.js            # Payment page
│   │   ├── profile.js            # User profile
│   │   ├── roadmap.js            # Career roadmaps
│   │   └── resources.js          # Resources library
│   ├── styles/
│   │   └── globals.css           # Global styles
│   ├── utils/
│   │   └── api.js                # API utility functions
│   ├── package.json
│   └── .env.local                # Frontend environment variables
│
├── database/
│   ├── schema.sql                # Database schema
│   └── sample_data.sql           # Sample data
│
└── README.md                     # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Careers
- `GET /api/careers` - Get all careers
- `GET /api/careers/:id` - Get career by ID
- `POST /api/careers/:id/save` - Save career (User)
- `GET /api/careers/saved/list` - Get saved careers

### Quiz
- `GET /api/quiz/questions` - Get all quiz questions
- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/quiz/results` - Get user's quiz results

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses/:id/enroll` - Enroll in course
- `GET /api/courses/user/enrollments` - Get user enrollments

### Payments
- `POST /api/payments` - Create payment
- `GET /api/payments/history` - Get payment history

### Colleges
- `GET /api/colleges` - Get all colleges
- `GET /api/colleges/:id` - Get college by ID

### Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources/:id` - Get resource by ID

### Roadmaps
- `GET /api/roadmaps` - Get all roadmaps
- `GET /api/roadmaps/:id` - Get roadmap by ID
- `GET /api/roadmaps/stream/:stream` - Get roadmap by stream

## Features

### User Features
- ✅ User registration and authentication
- ✅ Personalized career quiz
- ✅ Career recommendations based on quiz results
- ✅ Browse and view detailed career information
- ✅ Save favorite careers
- ✅ Interactive career roadmaps with flowcharts
- ✅ Course browsing and enrollment
- ✅ Dummy payment system
- ✅ Resource library access
- ✅ View profile with quiz history, saved careers, and enrollments

### Admin Features (if logged in as admin)
- Create, update, and delete careers
- Create, update, and delete quiz questions
- Create, update, and delete courses
- Create, update, and delete colleges
- Create, update, and delete resources
- Create, update, and delete roadmaps

## Database Schema

### Main Tables
- `users` - User accounts and authentication
- `careers` - Career information and details
- `quizzes` - Quiz questions and options
- `quiz_results` - User quiz submissions and results
- `courses` - Course catalog
- `enrollments` - User course enrollments
- `payments` - Payment transactions
- `colleges` - College/university information
- `saved_careers` - User's saved careers
- `resources` - Articles, videos, and links
- `roadmaps` - Career roadmap flowcharts

## Troubleshooting

### Backend Issues

**Port already in use:**
- Change PORT in `.env` file or stop the process using port 5000

**Database connection error:**
- Verify MySQL server is running
- Check database credentials in `.env`
- Ensure database `career_compass` exists

**Authentication errors:**
- Verify JWT_SECRET is set in `.env`
- Check token expiration settings

### Frontend Issues

**API connection error:**
- Verify backend server is running at `http://localhost:5000`
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS is enabled in backend

**Page not found:**
- Clear browser cache
- Restart Next.js dev server

**Mermaid diagrams not rendering:**
- Check browser console for errors
- Verify CDN links are loaded
- Check Mermaid syntax in database

### Database Issues

**Import errors:**
- Verify SQL syntax is correct
- Check for duplicate entries
- Ensure all tables were created

**Sample data issues:**
- Verify JSON format for JSON columns
- Check foreign key constraints
- Re-import schema if needed

## Development

### Running in Development Mode

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

**Backend:**
```bash
cd backend
npm start
```

## Sample Data

The database includes sample data:
- 3 users (1 admin, 2 students)
- 12 careers across different categories
- 10 quiz questions
- 10 courses
- 7 colleges/universities
- 8 resources
- 4 roadmaps (Engineering, Medical, Commerce, Arts)

## Security Notes

- Passwords are hashed using bcryptjs
- JWT tokens used for authentication
- API routes protected with middleware
- Admin-only routes require admin role
- Dummy payment system for demonstration only

## Future Enhancements

- Advanced quiz algorithms with ML
- Real payment gateway integration
- Email notifications
- Progress tracking for courses
- Mentor matching feature
- Video chat integration
- Mobile app version
- Multi-language support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue in the repository.

## Credits

Built for helping high school students make informed career decisions.

---

**Made with ❤️ for students exploring their career paths**

