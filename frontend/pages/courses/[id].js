import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { coursesAPI } from '../../utils/api';

export default function CourseDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCourse();
      if (user) {
        checkEnrollment();
      }
    }
  }, [id, user]);

  const fetchCourse = async () => {
    try {
      const response = await coursesAPI.getById(id);
      setCourse(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching course:', error);
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    try {
      const response = await coursesAPI.getEnrollments();
      const enrollments = response.data;
      setEnrolled(enrollments.some(e => e.id === parseInt(id)));
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  };

  const handleEnroll = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    router.push(`/payment?course_id=${id}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading course details...</p>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Course not found</p>
          <Link href="/courses" className="btn-primary mt-4 inline-block">
            Back to Courses
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded">
              {course.category}
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded">
              {course.level}
            </span>
            {course.duration && (
              <span className="text-gray-600">Duration: {course.duration}</span>
            )}
          </div>

          <div className="card mb-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{course.description}</p>
          </div>

          {course.instructor && (
            <div className="card mb-6">
              <h3 className="text-xl font-semibold mb-2">Instructor</h3>
              <p className="text-gray-700">{course.instructor}</p>
            </div>
          )}

          {course.skills_covered && (
            <div className="card mb-6">
              <h3 className="text-xl font-semibold mb-2">Skills Covered</h3>
              <p className="text-gray-700">{course.skills_covered}</p>
            </div>
          )}

          <div className="card bg-primary-50 border border-primary-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Course Price</p>
                <p className="text-4xl font-bold text-primary-600">₹{course.price}</p>
              </div>
              {enrolled ? (
                <div className="text-center">
                  <p className="text-green-600 font-semibold mb-2">✓ Enrolled</p>
                  <Link href="/profile" className="btn-secondary">
                    View in Profile
                  </Link>
                </div>
              ) : (
                <button onClick={handleEnroll} className="btn-primary text-lg px-8 py-3">
                  Enroll Now
                </button>
              )}
            </div>
          </div>

          <div className="text-center">
            <Link href="/courses" className="btn-secondary">
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

