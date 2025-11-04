import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { quizAPI, careersAPI, coursesAPI, paymentsAPI } from '../utils/api';

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [quizResults, setQuizResults] = useState([]);
  const [savedCareers, setSavedCareers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchData();
    }
  }, [user, authLoading]);

  const fetchData = async () => {
    try {
      const [quizRes, careersRes, enrollRes, paymentsRes] = await Promise.all([
        quizAPI.getResults(),
        careersAPI.getSaved(),
        coursesAPI.getEnrollments(),
        paymentsAPI.getHistory(),
      ]);

      setQuizResults(quizRes.data);
      setSavedCareers(careersRes.data);
      setEnrollments(enrollRes.data);
      setPayments(paymentsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center animate-fade-in">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 animate-pulse mb-4 shadow-lg" />
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">Loading profile...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 relative">
        <div className="absolute -z-10 top-10 right-10 w-64 h-64 bg-primary-300/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -z-10 bottom-10 left-10 w-48 h-48 bg-primary-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <h1 className={`text-4xl md:text-5xl font-extrabold mb-10 bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          My Profile
        </h1>

        {/* User Info */}
        <div className={`card mb-8 transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
          <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">Account Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 dark:from-primary-950 dark:to-primary-900 dark:border-primary-800 transform transition-all duration-300 hover:scale-[1.02]">
              <p className="text-gray-600 mb-2 dark:text-gray-400 font-medium">Full Name</p>
              <p className="font-bold text-lg">{user.full_name || 'Not provided'}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 dark:from-primary-950 dark:to-primary-900 dark:border-primary-800 transform transition-all duration-300 hover:scale-[1.02]">
              <p className="text-gray-600 mb-2 dark:text-gray-400 font-medium">Username</p>
              <p className="font-bold text-lg">{user.username}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 dark:from-primary-950 dark:to-primary-900 dark:border-primary-800 transform transition-all duration-300 hover:scale-[1.02]">
              <p className="text-gray-600 mb-2 dark:text-gray-400 font-medium">Email</p>
              <p className="font-bold text-lg">{user.email}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 dark:from-primary-950 dark:to-primary-900 dark:border-primary-800 transform transition-all duration-300 hover:scale-[1.02]">
              <p className="text-gray-600 mb-2 dark:text-gray-400 font-medium">Role</p>
              <p className="font-bold text-lg capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Quiz Results */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">Quiz History</h2>
          {quizResults.length === 0 ? (
            <p className="text-gray-600 mb-4 dark:text-gray-400">No quiz results yet.</p>
          ) : (
            <div className="space-y-4">
              {quizResults.map((result) => {
                const rawSuggested = result.suggested_careers;
                const suggestedCareers = Array.isArray(rawSuggested)
                  ? rawSuggested
                  : (typeof rawSuggested === 'string'
                      ? (() => { try { return JSON.parse(rawSuggested); } catch { return []; } })()
                      : []);
                return (
                  <div key={result.id} className="border-2 border-primary-200 rounded-xl p-5 bg-gradient-to-r from-white to-primary-50/50 hover:from-primary-50 hover:to-primary-100 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] dark:from-gray-900 dark:to-primary-950 dark:border-primary-800">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        📅 Taken on {new Date(result.taken_at).toLocaleDateString()}
                      </p>
                      <Link
                        href={`/recommendations?resultId=${result.id}`}
                        className="text-primary-700 hover:text-primary-800 font-semibold text-sm transition-colors"
                      >
                        View Results →
                      </Link>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">✨ Suggested {suggestedCareers.length} careers</p>
                  </div>
                );
              })}
            </div>
          )}
          <Link href="/quiz" className="btn-primary mt-4 inline-block">
            Take New Quiz
          </Link>
        </div>

        {/* Saved Careers */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">Saved Careers</h2>
          {savedCareers.length === 0 ? (
            <p className="text-gray-600 mb-4 dark:text-gray-400">No saved careers yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {savedCareers.map((career) => (
                <Link key={career.id} href={`/careers/${career.id}`}>
                  <div className="border-2 border-primary-200 rounded-xl p-5 hover:border-primary-400 cursor-pointer bg-gradient-to-br from-white to-primary-50/50 hover:from-primary-50 hover:to-primary-100 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg dark:from-gray-900 dark:to-primary-950 dark:border-primary-800">
                    <h3 className="font-bold mb-2 text-lg">{career.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 dark:text-gray-400">{career.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <Link href="/careers" className="btn-secondary mt-4 inline-block">
            Browse Careers
          </Link>
        </div>

        {/* Enrollments */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
          {enrollments.length === 0 ? (
            <p className="text-gray-600 mb-4 dark:text-gray-400">No course enrollments yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {enrollments.map((course) => (
                <Link key={course.id} href={`/courses/${course.id}`}>
                  <div className="border border-gray-200 rounded-xl p-4 hover:border-primary-300 cursor-pointer bg-white dark:bg-gray-900 dark:border-gray-800">
                    <h3 className="font-semibold mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2 dark:text-gray-400">{course.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Enrolled on {new Date(course.enrolled_at).toLocaleDateString()}
                    </p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                      course.status === 'active' ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md' : 
                      course.status === 'completed' ? 'bg-gradient-to-r from-primary-500 to-blue-600 text-white shadow-md' : 
                      'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <Link href="/courses" className="btn-primary mt-4 inline-block">
            Browse Courses
          </Link>
        </div>

        {/* Payment History */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
          {payments.length === 0 ? (
            <p className="text-gray-600 mb-4 dark:text-gray-400">No payments yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-primary-50/60 dark:bg-gray-800">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Course</th>
                    <th className="text-left p-2">Amount</th>
                    <th className="text-left p-2">Transaction ID</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b">
                      <td className="p-2">{new Date(payment.created_at).toLocaleDateString()}</td>
                      <td className="p-2">{payment.course_title}</td>
                      <td className="p-2">₹{payment.amount}</td>
                      <td className="p-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs dark:bg-gray-800 dark:text-gray-200">
                          {payment.transaction_id}
                        </code>
                      </td>
                      <td className="p-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          payment.status === 'completed' ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md' : 
                          payment.status === 'pending' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md' : 
                          'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

