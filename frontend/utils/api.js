import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://career-compass-uyi2.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Careers API
export const careersAPI = {
  getAll: () => api.get('/careers'),
  getById: (id) => api.get(`/careers/${id}`),
  save: (id) => api.post(`/careers/${id}/save`),
  getSaved: () => api.get('/careers/saved/list'),
  unsave: (id) => api.delete(`/careers/${id}/save`),
};

// Quiz API
export const quizAPI = {
  getQuestions: () => api.get('/quiz/questions'),
  submitQuiz: (answers) => api.post('/quiz/submit', { answers }),
  getResults: () => api.get('/quiz/results'),
  getResultById: (id) => api.get(`/quiz/results/${id}`),
};

// Courses API
export const coursesAPI = {
  getAll: (params) => api.get('/courses', { params }),
  getById: (id) => api.get(`/courses/${id}`),
  enroll: (id) => api.post(`/courses/${id}/enroll`),
  getEnrollments: () => api.get('/courses/user/enrollments'),
};

// Payments API
export const paymentsAPI = {
  create: (data) => api.post('/payments', data),
  getHistory: () => api.get('/payments/history'),
  getById: (id) => api.get(`/payments/${id}`),
};

// Colleges API
export const collegesAPI = {
  getAll: (params) => api.get('/colleges', { params }),
  getById: (id) => api.get(`/colleges/${id}`),
};

// Resources API
export const resourcesAPI = {
  getAll: (params) => api.get('/resources', { params }),
  getById: (id) => api.get(`/resources/${id}`),
};

// Roadmaps API
export const roadmapsAPI = {
  getAll: (params) => api.get('/roadmaps', { params }),
  getById: (id) => api.get(`/roadmaps/${id}`),
  getByStream: (stream) => api.get(`/roadmaps/stream/${stream}`),
};

export default api;

