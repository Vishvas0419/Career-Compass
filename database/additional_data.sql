-- Additional Data for Roadmap Section
-- Add more colleges, courses, and resources for all streams

USE careercompass;

-- Additional Colleges for Engineering
INSERT INTO colleges (name, location, courses, fees, type, entrance_exam, website) VALUES
('SRM Institute of Science and Technology', 'Chennai, Tamil Nadu', '["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Electronics"]', 350000.00, 'Private', 'SRMJEE', 'https://www.srmist.edu.in'),
('Manipal Institute of Technology', 'Manipal, Karnataka', '["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Aerospace Engineering"]', 450000.00, 'Private', 'MET', 'https://www.manipal.edu'),
('PES University', 'Bangalore, Karnataka', '["Computer Science", "Electronics", "Mechanical Engineering", "Information Science"]', 380000.00, 'Private', 'PESSAT', 'https://www.pes.edu'),
('Amity University', 'Noida, Uttar Pradesh', '["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Aerospace", "Biotechnology"]', 420000.00, 'Private', 'Amity JEE', 'https://www.amity.edu'),
('Thapar Institute of Engineering and Technology', 'Patiala, Punjab', '["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Electronics"]', 320000.00, 'Private', 'JEE Main', 'https://www.thapar.edu'),
('Birla Institute of Technology and Science', 'Pilani, Goa, Hyderabad', '["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Chemical Engineering"]', 300000.00, 'Private', 'BITSAT', 'https://www.bits-pilani.ac.in'),
('Jaypee Institute of Information Technology', 'Noida, Uttar Pradesh', '["Computer Science", "Information Technology", "Electronics", "Mechanical Engineering"]', 250000.00, 'Private', 'JEE Main', 'https://www.jiit.ac.in'),
('Vellore Institute of Technology', 'Vellore, Tamil Nadu', '["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Electronics", "Civil Engineering"]', 400000.00, 'Private', 'VITEEE', 'https://www.vit.ac.in'),
('PSG College of Technology', 'Coimbatore, Tamil Nadu', '["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering"]', 180000.00, 'Government', 'TNEA', 'https://www.psgtech.edu'),
('Indian Institute of Information Technology (IIIT)', 'Multiple Locations', '["Computer Science", "Information Technology", "Electronics", "Data Science"]', 200000.00, 'Government', 'JEE Main', 'https://www.iiit.ac.in');

-- Additional Colleges for Medical
INSERT INTO colleges (name, location, courses, fees, type, entrance_exam, website) VALUES
('Maulana Azad Medical College', 'New Delhi', '["MBBS", "MD", "MS", "MDS"]', 120000.00, 'Government', 'NEET', 'https://www.mamc.ac.in'),
('King George''s Medical University', 'Lucknow, Uttar Pradesh', '["MBBS", "MD", "MS", "BDS"]', 140000.00, 'Government', 'NEET', 'https://www.kgmu.org'),
('Seth GS Medical College', 'Mumbai, Maharashtra', '["MBBS", "MD", "MS"]', 150000.00, 'Government', 'NEET', 'https://www.kem.edu'),
('Grant Medical College', 'Mumbai, Maharashtra', '["MBBS", "MD", "MS"]', 145000.00, 'Government', 'NEET', 'https://www.grantmedicalcollege.edu'),
('Christian Medical College', 'Vellore, Tamil Nadu', '["MBBS", "MD", "MS", "B.Sc Nursing"]', 600000.00, 'Private', 'NEET', 'https://www.cmch-vellore.edu'),
('Armed Forces Medical College', 'Pune, Maharashtra', '["MBBS", "MD", "MS"]', 0.00, 'Government', 'AFMC', 'https://www.afmc.nic.in'),
('JIPMER', 'Puducherry', '["MBBS", "MD", "MS", "B.Sc Allied Health"]', 100000.00, 'Government', 'JIPMER', 'https://www.jipmer.edu.in'),
('Manipal Academy of Higher Education', 'Manipal, Karnataka', '["MBBS", "MD", "MS", "BDS", "Pharmacy"]', 850000.00, 'Private', 'NEET', 'https://www.manipal.edu'),
('Kasturba Medical College', 'Manipal, Karnataka', '["MBBS", "MD", "MS"]', 800000.00, 'Private', 'NEET', 'https://www.manipal.edu/kmc'),
('Sri Ramachandra Institute', 'Chennai, Tamil Nadu', '["MBBS", "MD", "MS", "BDS"]', 750000.00, 'Private', 'NEET', 'https://www.sriramachandra.edu.in');

-- Additional Colleges for Commerce
INSERT INTO colleges (name, location, courses, fees, type, entrance_exam, website) VALUES
('Shri Ram College of Commerce', 'New Delhi', '["B.Com (Hons)", "Economics", "Business Studies"]', 45000.00, 'Government', 'DUET', 'https://www.srcc.edu'),
('Lady Shri Ram College', 'New Delhi', '["B.Com (Hons)", "Economics", "BA Economics"]', 40000.00, 'Government', 'DUET', 'https://www.lsr.edu.in'),
('St. Xavier''s College', 'Mumbai, Maharashtra', '["B.Com", "BBA", "BMS", "Economics"]', 85000.00, 'Private', 'XAT', 'https://www.xaviers.edu'),
('Christ University', 'Bangalore, Karnataka', '["B.Com", "BBA", "Economics", "Business Management"]', 120000.00, 'Private', 'Christ Entrance', 'https://www.christuniversity.in'),
('Narsee Monjee College of Commerce', 'Mumbai, Maharashtra', '["B.Com", "BBA", "BMS", "Economics"]', 75000.00, 'Private', 'NMIMS', 'https://www.nmims.edu'),
('Loyola College', 'Chennai, Tamil Nadu', '["B.Com", "BBA", "Economics", "Commerce"]', 60000.00, 'Private', 'Loyola Entrance', 'https://www.loyolacollege.edu'),
('Presidency College', 'Chennai, Tamil Nadu', '["B.Com", "Economics", "Commerce"]', 35000.00, 'Government', 'TNEA', 'https://www.presidencycollege.ac.in'),
('Madras Christian College', 'Chennai, Tamil Nadu', '["B.Com", "BBA", "Economics"]', 55000.00, 'Private', 'MCC Entrance', 'https://www.mcc.edu.in'),
('Xavier Institute of Management', 'Bhubaneswar, Odisha', '["MBA", "BBA", "PGDM"]', 450000.00, 'Private', 'XAT', 'https://www.ximb.edu.in'),
('Symbiosis Centre for Management', 'Pune, Maharashtra', '["BBA", "MBA", "Business Management"]', 350000.00, 'Private', 'SET', 'https://www.scmhrd.edu');

-- Additional Colleges for Arts
INSERT INTO colleges (name, location, courses, fees, type, entrance_exam, website) VALUES
('National Law School of India University', 'Bangalore, Karnataka', '["BA LLB", "LLM", "Law"]', 250000.00, 'Government', 'CLAT', 'https://www.nls.ac.in'),
('National Institute of Design', 'Ahmedabad, Gujarat', '["B.Des", "M.Des", "Graphic Design", "Fashion Design", "Interior Design"]', 150000.00, 'Government', 'NID', 'https://www.nid.edu'),
('National Institute of Fashion Technology', 'Multiple Locations', '["B.Des", "M.Des", "Fashion Design", "Textile Design"]', 180000.00, 'Government', 'NIFT', 'https://www.nift.ac.in'),
('Jawaharlal Nehru University', 'New Delhi', '["BA", "MA", "English", "Psychology", "History", "Political Science"]', 30000.00, 'Government', 'JNUEE', 'https://www.jnu.ac.in'),
('St. Stephen''s College', 'New Delhi', '["BA", "English", "History", "Economics", "Psychology"]', 50000.00, 'Government', 'DUET', 'https://www.ststephens.edu'),
('Miranda House', 'New Delhi', '["BA", "English", "History", "Psychology", "Political Science"]', 40000.00, 'Government', 'DUET', 'https://www.mirandahouse.ac.in'),
('Presidency College', 'Kolkata, West Bengal', '["BA", "English", "History", "Political Science", "Psychology"]', 35000.00, 'Government', 'WBJEE', 'https://www.presidencycollege.ac.in'),
('Loyola College', 'Chennai, Tamil Nadu', '["BA", "English", "Psychology", "History", "Journalism"]', 55000.00, 'Private', 'Loyola Entrance', 'https://www.loyolacollege.edu'),
('Christ University', 'Bangalore, Karnataka', '["BA", "English", "Psychology", "Journalism", "Law"]', 120000.00, 'Private', 'Christ Entrance', 'https://www.christuniversity.in'),
('Tata Institute of Social Sciences', 'Mumbai, Maharashtra', '["BA", "MA", "Social Work", "Psychology", "Humanities"]', 80000.00, 'Government', 'TISS NET', 'https://www.tiss.edu');

-- Additional Courses for Engineering
INSERT INTO courses (title, description, instructor, duration, price, category, level, skills_covered, career_id) VALUES
('Machine Learning and AI', 'Comprehensive course on machine learning algorithms, neural networks, and AI applications.', 'Dr. Neha Sharma', '16 weeks', 7999.00, 'Data Science', 'Advanced', 'Python, TensorFlow, Neural Networks, Deep Learning', 1),
('Full Stack Development', 'Complete full-stack development with MERN stack and deployment strategies.', 'Prof. Arjun Reddy', '14 weeks', 6999.00, 'Web Development', 'Intermediate', 'React, Node.js, MongoDB, Express, Deployment', 1),
('Cloud Computing with AWS', 'Learn AWS services, cloud architecture, and DevOps practices.', 'Engineer Ravi Kumar', '12 weeks', 8999.00, 'Programming', 'Intermediate', 'AWS, Cloud Architecture, DevOps, Docker', 1),
('Cybersecurity Fundamentals', 'Introduction to cybersecurity, ethical hacking, and network security.', 'Prof. Vikram Singh', '10 weeks', 5999.00, 'Engineering', 'Intermediate', 'Network Security, Ethical Hacking, Cryptography', 1),
('Mobile App Development', 'Build native and cross-platform mobile apps with React Native and Flutter.', 'Prof. Anjali Mehta', '12 weeks', 6499.00, 'Web Development', 'Intermediate', 'React Native, Flutter, Mobile Development', 1),
('Robotics and Automation', 'Learn robotics, automation systems, and industrial applications.', 'Engineer Rohit Verma', '14 weeks', 7499.00, 'Engineering', 'Advanced', 'Robotics, Automation, Embedded Systems', 6),
('Blockchain Development', 'Master blockchain technology, smart contracts, and cryptocurrency development.', 'Dr. Amit Patel', '10 weeks', 8499.00, 'Programming', 'Advanced', 'Blockchain, Solidity, Smart Contracts, Web3', 1),
('Data Structures and Algorithms', 'Advanced algorithms and data structures for competitive programming.', 'Prof. Sarah Johnson', '12 weeks', 4999.00, 'Programming', 'Intermediate', 'Algorithms, Data Structures, Problem Solving', 1);

-- Additional Courses for Medical
INSERT INTO courses (title, description, instructor, duration, price, category, level, skills_covered, career_id) VALUES
('Anatomy and Physiology', 'Detailed study of human anatomy and physiological systems.', 'Dr. Priya Sharma', '20 weeks', 8999.00, 'Medical', 'Beginner', 'Human Anatomy, Physiology, Medical Terminology', 2),
('Pathology Fundamentals', 'Introduction to pathology, disease mechanisms, and diagnostic methods.', 'Dr. Rajesh Kumar', '16 weeks', 7999.00, 'Medical', 'Intermediate', 'Pathology, Diagnostics, Laboratory Techniques', 2),
('Pharmacology Basics', 'Understanding drugs, their mechanisms, and therapeutic applications.', 'Dr. Kavita Nair', '14 weeks', 7499.00, 'Medical', 'Beginner', 'Pharmacology, Drug Interactions, Therapeutics', 2),
('Clinical Skills Development', 'Hands-on training in clinical examination and patient care.', 'Dr. Anil Mehta', '18 weeks', 9999.00, 'Medical', 'Intermediate', 'Clinical Examination, Patient Care, Medical Procedures', 2),
('Medical Ethics and Law', 'Ethical principles and legal aspects in medical practice.', 'Dr. Sunita Patel', '8 weeks', 3999.00, 'Medical', 'Beginner', 'Medical Ethics, Healthcare Law, Patient Rights', 2);

-- Additional Courses for Commerce
INSERT INTO courses (title, description, instructor, duration, price, category, level, skills_covered, career_id) VALUES
('Financial Planning and Analysis', 'Advanced financial planning, budgeting, and investment analysis.', 'CA Rajesh Mehta', '10 weeks', 5499.00, 'Business', 'Advanced', 'Financial Planning, Investment Analysis, Budgeting', 4),
('Digital Marketing Mastery', 'Complete digital marketing course covering SEO, SEM, social media, and analytics.', 'Prof. Neha Gupta', '12 weeks', 5999.00, 'Business', 'Intermediate', 'SEO, SEM, Social Media Marketing, Analytics', 8),
('Tax Planning and Compliance', 'Comprehensive guide to tax planning, filing, and compliance for businesses.', 'CA Deepak Sharma', '8 weeks', 4499.00, 'Commerce', 'Intermediate', 'Tax Planning, GST, Income Tax, Compliance', 4),
('Stock Market Trading', 'Learn stock market fundamentals, trading strategies, and portfolio management.', 'Prof. Anil Kapoor', '10 weeks', 4999.00, 'Business', 'Intermediate', 'Stock Trading, Technical Analysis, Portfolio Management', 8),
('Business Communication', 'Effective business communication, presentations, and negotiation skills.', 'Prof. Ritu Singh', '6 weeks', 2999.00, 'Business', 'Beginner', 'Communication, Presentations, Negotiation', 8),
('Supply Chain Management', 'Understanding supply chains, logistics, and operations management.', 'Prof. Manish Verma', '10 weeks', 5499.00, 'Business', 'Intermediate', 'Supply Chain, Logistics, Operations Management', 8);

-- Additional Courses for Arts
INSERT INTO courses (title, description, instructor, duration, price, category, level, skills_covered, career_id) VALUES
('UI/UX Design Fundamentals', 'Learn user interface and user experience design principles and tools.', 'Designer Anjali Kapoor', '10 weeks', 5999.00, 'Design', 'Intermediate', 'UI/UX Design, Figma, Adobe XD, User Research', 5),
('Creative Writing Workshop', 'Develop your writing skills for fiction, non-fiction, and content creation.', 'Author Priya Desai', '8 weeks', 3999.00, 'Arts', 'Beginner', 'Creative Writing, Storytelling, Content Creation', 5),
('Photography and Videography', 'Master photography and videography techniques for professional work.', 'Photographer Rahul Joshi', '12 weeks', 6499.00, 'Arts', 'Intermediate', 'Photography, Videography, Editing, Composition', 5),
('Legal Research and Writing', 'Essential skills for legal research, case analysis, and legal writing.', 'Advocate Sunil Rao', '10 weeks', 5499.00, 'Arts', 'Intermediate', 'Legal Research, Case Analysis, Legal Writing', 7),
('Criminal Psychology', 'Deep dive into criminal behavior, forensic psychology, and profiling.', 'Dr. Kavita Nair', '12 weeks', 5999.00, 'Psychology', 'Advanced', 'Criminal Psychology, Forensic Psychology, Profiling', 11),
('Journalism and Media Studies', 'Modern journalism, digital media, and news reporting techniques.', 'Journalist Ravi Patel', '10 weeks', 4999.00, 'Arts', 'Intermediate', 'Journalism, News Reporting, Media Ethics, Digital Media', 5);

-- Additional Resources for Engineering
INSERT INTO resources (title, description, type, url, category) VALUES
('JEE Main Preparation Guide 2024', 'Complete guide for JEE Main exam preparation with tips and strategies.', 'article', '/articles/jee-main-vs-jee-advanced.html', 'Exam Preparation'),
('Top 10 Engineering Colleges in India', 'Comprehensive list of best engineering colleges with rankings and details.', 'article', '/articles/best-colleges-in-india-2024.html', 'Education'),
('Engineering Career Paths Explained', 'Video explaining different engineering branches and career opportunities.', 'video', 'https://youtube.com/watch?v=engineering-careers', 'Career Planning'),
('Programming Languages Comparison', 'Detailed comparison of popular programming languages for beginners.', 'article', 'https://example.com/programming-languages', 'Engineering'),
('Tech Interview Preparation', 'Resources and tips for technical interviews at top tech companies.', 'link', 'https://example.com/tech-interviews', 'Career Planning'),
('Open Source Contribution Guide', 'How to contribute to open source projects and build your portfolio.', 'article', 'https://example.com/open-source', 'Engineering');

-- Additional Resources for Medical
INSERT INTO resources (title, description, type, url, category) VALUES
('NEET Preparation Strategy', 'Complete NEET preparation strategy with study plans and tips.', 'article', '/articles/neet-preparation-tips.html', 'Exam Preparation'),
('Medical Career Options After MBBS', 'Video explaining various specialization options after MBBS.', 'video', 'https://youtube.com/watch?v=medical-careers', 'Career Planning'),
('AIIMS vs Private Medical Colleges', 'Comparison guide to help choose between AIIMS and private colleges.', 'article', 'https://example.com/aiims-vs-private', 'Education'),
('Medical Internship Guide', 'Everything you need to know about medical internships and rotations.', 'article', 'https://example.com/medical-internship', 'Medical'),
('Healthcare Industry Trends', 'Latest trends and opportunities in the healthcare industry.', 'article', 'https://example.com/healthcare-trends', 'Career Planning'),
('Medical Research Opportunities', 'Guide to medical research, publications, and career paths.', 'link', 'https://example.com/medical-research', 'Medical');

-- Additional Resources for Commerce
INSERT INTO resources (title, description, type, url, category) VALUES
('CA vs CS vs CMA: Which to Choose?', 'Detailed comparison of professional courses in Commerce stream.', 'video', 'https://youtube.com/watch?v=ca-cs-cma', 'Career Planning'),
('Commerce Career Guide', 'Comprehensive guide to career options after Commerce in 12th.', 'article', '/articles/career-planning-guide-for-high-school-students.html', 'Career Planning'),
('MBA Preparation Guide', 'Complete guide for CAT, XAT, and other MBA entrance exams.', 'article', 'https://example.com/mba-preparation', 'Exam Preparation'),
('Financial Planning for Students', 'Tips on financial planning and investment for students.', 'article', 'https://example.com/financial-planning', 'Commerce'),
('Business School Rankings', 'Latest rankings of top business schools in India and abroad.', 'link', 'https://example.com/business-schools', 'Education'),
('Startup and Entrepreneurship', 'Resources for aspiring entrepreneurs and startup founders.', 'article', 'https://example.com/entrepreneurship', 'Commerce');

-- Additional Resources for Arts
INSERT INTO resources (title, description, type, url, category) VALUES
('CLAT Preparation Strategy', 'Complete guide for CLAT exam preparation for law aspirants.', 'article', 'https://example.com/clat-preparation', 'Exam Preparation'),
('Design Career Paths', 'Video explaining various design careers and opportunities.', 'video', 'https://youtube.com/watch?v=design-careers', 'Career Planning'),
('Law School Selection Guide', 'How to choose the right law school for your career goals.', 'article', 'https://example.com/law-schools', 'Education'),
('Psychology Career Opportunities', 'Detailed guide to careers in psychology and related fields.', 'article', 'https://example.com/psychology-careers', 'Career Planning'),
('Creative Industries Guide', 'Opportunities in creative industries like media, design, and arts.', 'article', 'https://example.com/creative-industries', 'Arts'),
('NID and NIFT Entrance Guide', 'Complete preparation guide for design entrance exams.', 'article', 'https://example.com/design-entrance', 'Exam Preparation');

