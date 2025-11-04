-- Sample Data for Career Compass
USE careercompass;

-- Sample Users (password is 'password123' hashed with bcrypt: $2b$10$rOzJgZqZrQqZrQqZrQqZrOuQqZrQqZrQqZrQqZrQqZrQqZrQqZrQ)
-- For simplicity, in production use proper password hashing
INSERT INTO users (username, password, email, full_name, role) VALUES
('admin', '$2b$10$rOzJgZqZrQqZrQqZrQqZrOuQqZrQqZrQqZrQqZrQqZrQqZrQqZrQ', 'admin@careercompass.com', 'Admin User', 'admin'),
('student1', '$2b$10$rOzJgZqZrQqZrQqZrQqZrOuQqZrQqZrQqZrQqZrQqZrQqZrQqZrQ', 'student1@example.com', 'John Doe', 'student'),
('student2', '$2b$10$rOzJgZqZrQqZrQqZrQqZrOuQqZrQqZrQqZrQqZrQqZrQqZrQqZrQ', 'student2@example.com', 'Jane Smith', 'student');

-- Sample Careers
INSERT INTO careers (name, description, skills, eligibility, salary_range, growth_outlook, category) VALUES
('Software Engineer', 'Design and develop software applications and systems. Work on cutting-edge technology to solve real-world problems.', 'Programming, Problem Solving, Algorithm Design, System Design', '10+2 with Science (PCM), B.Tech/B.E in Computer Science', '₹5-25 LPA', 'Very High', 'Engineering'),
('Doctor (MBBS)', 'Diagnose and treat illnesses, save lives, and improve patient health. Requires extensive medical knowledge and empathy.', 'Medical Knowledge, Patience, Communication, Decision Making', '10+2 with Science (PCB), NEET exam, MBBS degree', '₹8-50 LPA', 'High', 'Medical'),
('Data Scientist', 'Analyze complex data to extract insights and build predictive models. Combine statistics, programming, and domain expertise.', 'Python, Statistics, Machine Learning, Data Analysis', '10+2 with Science/Math, B.Tech/M.Sc in relevant field', '₹6-30 LPA', 'Very High', 'Science'),
('Chartered Accountant', 'Manage financial records, audit accounts, and provide financial advice to businesses and individuals.', 'Accounting, Financial Analysis, Tax Knowledge, Attention to Detail', '10+2 in Commerce/Arts, CA course from ICAI', '₹4-20 LPA', 'High', 'Commerce'),
('Graphic Designer', 'Create visual concepts to communicate ideas. Design logos, websites, advertisements, and marketing materials.', 'Creativity, Design Software, Color Theory, Typography', '10+2 any stream, BFA/Diploma in Graphic Design', '₹3-15 LPA', 'High', 'Arts'),
('Mechanical Engineer', 'Design, develop, and maintain mechanical systems. Work in automotive, aerospace, manufacturing industries.', 'Engineering Design, CAD, Manufacturing Processes, Problem Solving', '10+2 with Science (PCM), B.Tech in Mechanical Engineering', '₹4-20 LPA', 'High', 'Engineering'),
('Lawyer', 'Provide legal counsel, represent clients in court, and ensure justice. Specialize in various areas of law.', 'Legal Knowledge, Argumentation, Research, Communication', '10+2 any stream, LLB degree, Bar exam', '₹5-25 LPA', 'High', 'Arts'),
('Business Analyst', 'Analyze business processes and recommend improvements. Bridge the gap between business and technology.', 'Analysis, Communication, Problem Solving, Business Knowledge', '10+2 any stream, BBA/MBA/B.Tech', '₹4-18 LPA', 'High', 'Commerce'),
('Biotechnology Researcher', 'Conduct research in biological sciences, develop new medical treatments and agricultural solutions.', 'Lab Skills, Research Methodology, Scientific Knowledge', '10+2 with Science (PCB/PCM), B.Sc/M.Sc in Biotechnology', '₹4-20 LPA', 'High', 'Science'),
('Architect', 'Design buildings and structures. Combine artistic vision with engineering principles.', 'Design, CAD, Engineering Principles, Creativity', '10+2 with Math, B.Arch degree, Registration', '₹5-25 LPA', 'High', 'Engineering'),
('Psychologist', 'Study human behavior and mental processes. Help people overcome mental health challenges.', 'Empathy, Research, Communication, Analytical Skills', '10+2 any stream, B.A/M.A in Psychology', '₹3-15 LPA', 'High', 'Science'),
('Marketing Manager', 'Develop and execute marketing strategies to promote products and services.', 'Creativity, Communication, Market Analysis, Digital Marketing', '10+2 any stream, BBA/MBA in Marketing', '₹5-25 LPA', 'High', 'Commerce');

-- Sample Quiz Questions
INSERT INTO quizzes (question, options, category, question_type) VALUES
('What subjects do you enjoy the most?', '["Mathematics and Physics", "Biology and Chemistry", "Commerce and Economics", "Arts and Literature", "Mixed interests"]', 'academic', 'interest'),
('How do you prefer to solve problems?', '["Logical step-by-step approach", "Creative and innovative solutions", "Collaborative discussion", "Research and analysis", "Intuitive thinking"]', 'problem_solving', 'strength'),
('What work environment appeals to you?', '["Office with regular hours", "Field work and travel", "Laboratory or research facility", "Remote/flexible work", "Creative studio"]', 'workplace', 'preference'),
('Which activities do you enjoy in your free time?', '["Coding and technology projects", "Reading and writing", "Social activities and networking", "Creative arts (drawing, music)", "Sports and outdoor activities"]', 'hobbies', 'interest'),
('What motivates you most?', '["Solving complex problems", "Helping others", "Financial success", "Creative expression", "Discovery and innovation"]', 'motivation', 'preference'),
('How do you prefer to learn?', '["Hands-on practical work", "Reading and studying", "Discussions and debates", "Visual and creative methods", "Experimentation and trial"]', 'learning', 'strength'),
('What type of impact do you want to make?', '["Technological advancement", "Healthcare and wellness", "Business and economy", "Arts and culture", "Social change"]', 'impact', 'preference'),
('How comfortable are you with technology?', '["Very comfortable, love tech", "Moderately comfortable", "Not very comfortable", "Interested but need training", "Prefer traditional methods"]', 'technology', 'strength'),
('What are your strongest skills?', '["Logical reasoning and math", "Communication and people skills", "Creative thinking", "Organization and planning", "Research and analysis"]', 'skills', 'strength'),
('What career outcomes are most important to you?', '["High salary potential", "Job security", "Creative fulfillment", "Helping others", "Innovation and advancement"]', 'outcomes', 'preference');

-- Sample Colleges
INSERT INTO colleges (name, location, courses, fees, type, entrance_exam, website) VALUES
('Indian Institute of Technology (IIT)', 'Multiple Locations', '["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering"]', 200000.00, 'Government', 'JEE Advanced', 'https://www.iit.ac.in'),
('All India Institute of Medical Sciences (AIIMS)', 'Multiple Locations', '["MBBS", "MD", "MS"]', 150000.00, 'Government', 'NEET', 'https://www.aiims.edu'),
('National Institute of Technology (NIT)', 'Multiple Locations', '["Computer Science", "Mechanical Engineering", "Electronics"]', 150000.00, 'Government', 'JEE Main', 'https://www.nit.ac.in'),
('Delhi University', 'Delhi', '["Commerce", "Arts", "Science", "Engineering"]', 50000.00, 'Government', 'DUET', 'https://www.du.ac.in'),
('Symbiosis International University', 'Pune', '["Business", "Law", "Arts", "Engineering"]', 500000.00, 'Private', 'SET', 'https://www.siu.edu.in'),
('VIT University', 'Vellore', '["Engineering", "Business", "Science"]', 400000.00, 'Private', 'VITEEE', 'https://www.vit.ac.in'),
('BITS Pilani', 'Pilani', '["Engineering", "Pharmacy", "Science"]', 300000.00, 'Private', 'BITSAT', 'https://www.bits-pilani.ac.in');

-- Sample Courses
INSERT INTO courses (title, description, instructor, duration, price, category, level, skills_covered, career_id) VALUES
('Introduction to Programming', 'Learn the fundamentals of programming with Python. Perfect for beginners.', 'Dr. Ravi Kumar', '8 weeks', 2999.00, 'Programming', 'Beginner', 'Python, Problem Solving, Algorithms', 1),
('Web Development Bootcamp', 'Master HTML, CSS, JavaScript, and React to build modern web applications.', 'Prof. Sarah Johnson', '12 weeks', 4999.00, 'Web Development', 'Intermediate', 'HTML, CSS, JavaScript, React', 1),
('Data Science Fundamentals', 'Introduction to data analysis, statistics, and machine learning.', 'Dr. Amit Patel', '10 weeks', 3999.00, 'Data Science', 'Beginner', 'Python, Statistics, Pandas, Machine Learning', 3),
('Medical Entrance Preparation', 'Comprehensive course for NEET exam preparation.', 'Dr. Priya Sharma', '24 weeks', 9999.00, 'Medical', 'Advanced', 'Biology, Chemistry, Physics', 2),
('Accounting Basics', 'Learn fundamental accounting principles and practices.', 'CA Rajesh Mehta', '6 weeks', 1999.00, 'Commerce', 'Beginner', 'Accounting, Financial Statements, Bookkeeping', 4),
('Graphic Design Masterclass', 'Learn design principles, tools, and create stunning visual designs.', 'Designer Anjali Kapoor', '8 weeks', 3499.00, 'Design', 'Intermediate', 'Photoshop, Illustrator, Design Principles', 5),
('Java Programming Advanced', 'Advanced Java concepts including Spring Framework and Microservices.', 'Prof. Vikram Singh', '14 weeks', 5999.00, 'Programming', 'Advanced', 'Java, Spring Boot, Microservices', 1),
('Business Analytics', 'Learn to analyze business data and make data-driven decisions.', 'Prof. Neha Gupta', '10 weeks', 4499.00, 'Business', 'Intermediate', 'Excel, SQL, Power BI, Analytics', 8),
('CAD and Engineering Design', 'Master AutoCAD and engineering design principles.', 'Engineer Rohit Verma', '12 weeks', 3999.00, 'Engineering', 'Intermediate', 'AutoCAD, Engineering Design, 3D Modeling', 6),
('Psychology Fundamentals', 'Introduction to psychology and human behavior.', 'Dr. Kavita Nair', '8 weeks', 2999.00, 'Psychology', 'Beginner', 'Psychology Basics, Research Methods', 11);

-- Sample Resources
INSERT INTO resources (title, description, type, url, category) VALUES
('Career Planning Guide for High School Students', 'Comprehensive guide to help students plan their career path.', 'article', 'https://example.com/career-guide', 'Career Planning'),
('Top 10 Career Options After 12th', 'Video covering the best career options available after high school.', 'video', 'https://youtube.com/watch?v=example1', 'Career Options'),
('How to Choose the Right Career', 'Article with tips and strategies for choosing the right career.', 'article', 'https://example.com/choose-career', 'Career Planning'),
('Engineering vs Medical: Which is Better?', 'Comparison video helping students decide between engineering and medical fields.', 'video', 'https://youtube.com/watch?v=example2', 'Comparison'),
('Best Colleges in India 2024', 'Comprehensive list of top colleges across different fields.', 'article', 'https://example.com/best-colleges', 'Education'),
('NEET Preparation Tips', 'Essential tips and strategies for NEET exam preparation.', 'article', 'https://example.com/neet-tips', 'Exam Preparation'),
('JEE Main vs JEE Advanced', 'Understanding the difference between JEE Main and Advanced.', 'video', 'https://youtube.com/watch?v=example3', 'Exam Preparation'),
('Career Counseling Resources', 'Links to professional career counseling services.', 'link', 'https://example.com/counseling', 'Resources');

-- Sample Roadmaps (Mermaid.js code)
INSERT INTO roadmaps (stream, mermaid_code, description) VALUES
('Science - Engineering', 'graph TD
    A[After 12th Science PCM] --> B{JEE Main}
    B -->|Good Score| C[JEE Advanced]
    C -->|Top Rank| D[IIT - Top Engineering]
    C -->|Medium Rank| E[NIT - Good Engineering]
    B -->|Average Score| F[State Engineering Colleges]
    B -->|Lower Score| G[Private Engineering Colleges]
    A --> H[Other Entrance Exams]
    H --> I[BITSAT - BITS]
    H --> J[VITEEE - VIT]
    H --> K[SRMJEE - SRM]
    D --> L[Computer Science]
    D --> M[Mechanical]
    D --> N[Electrical]
    E --> L
    E --> M
    E --> N
    F --> L
    F --> M
    F --> N
    G --> L
    G --> M
    G --> N', 'Complete roadmap for Engineering career path after 12th Science'),

('Science - Medical', 'graph TD
    A[After 12th Science PCB] --> B[NEET Exam]
    B -->|Top Rank| C[AIIMS - Top Medical]
    B -->|High Rank| D[Government Medical Colleges]
    B -->|Medium Rank| E[Private Medical Colleges]
    B -->|Lower Rank| F[Alternative Paths]
    C --> G[MBBS Degree]
    D --> G
    E --> G
    G --> H[Specialization Options]
    H --> I[MD - Doctor of Medicine]
    H --> J[MS - Master of Surgery]
    F --> K[Allied Health Sciences]
    F --> L[Veterinary Science]
    F --> M[Nursing]
    F --> N[Pharmacy]
    I --> O[Cardiologist]
    I --> P[Neurologist]
    I --> Q[Pediatrician]
    J --> R[Surgeon]', 'Complete roadmap for Medical career path after 12th Science'),

('Commerce', 'graph TD
    A[After 12th Commerce] --> B{Choose Path}
    B -->|Professional Course| C[CA - Chartered Accountant]
    B -->|Professional Course| D[CS - Company Secretary]
    B -->|Professional Course| E[CMA - Cost Management]
    B -->|Degree Course| F[B.Com]
    B -->|Degree Course| G[BBA - Business Administration]
    C --> H[CA Foundation]
    H --> I[CA Intermediate]
    I --> J[CA Final]
    J --> K[Chartered Accountant]
    F --> L{Masters}
    L -->|MBA| M[Business Management]
    L -->|M.Com| N[Commerce Master]
    G --> M
    M --> O[Business Analyst]
    M --> P[Marketing Manager]
    M --> Q[Finance Manager]
    K --> R[Financial Advisor]
    K --> S[Tax Consultant]
    K --> T[Auditor]', 'Complete roadmap for Commerce career path'),

('Arts', 'graph TD
    A[After 12th Arts] --> B{Choose Path}
    B -->|Law| C[Law Entrance Exams]
    B -->|Design| D[Design Entrance Exams]
    B -->|Arts Degree| E[B.A - Bachelor of Arts]
    C --> F[CLAT - Common Law]
    C --> G[AILET - AIL]
    F --> H[BA LLB - 5 Years]
    G --> H
    H --> I[Lawyer]
    I --> J[Corporate Lawyer]
    I --> K[Criminal Lawyer]
    I --> L[Constitutional Lawyer]
    D --> M[NID Entrance]
    D --> N[NIFT Entrance]
    M --> O[B.Des - Design]
    N --> O
    O --> P[Graphic Designer]
    O --> Q[Fashion Designer]
    O --> R[Interior Designer]
    E --> S{Specialization}
    S -->|Psychology| T[B.A Psychology]
    S -->|Journalism| U[B.A Journalism]
    S -->|Literature| V[B.A English]
    T --> W[Psychologist]
    U --> X[Journalist]
    V --> Y[Writer/Editor]', 'Complete roadmap for Arts career path');

