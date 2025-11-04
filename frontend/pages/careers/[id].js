import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { careersAPI, coursesAPI, collegesAPI } from '../../utils/api';

export default function CareerDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [career, setCareer] = useState(null);
  const [courses, setCourses] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCareer();
      fetchCourses();
      fetchColleges();
    }
  }, [id]);

  useEffect(() => {
    if (user && id) {
      checkSaved();
    }
  }, [user, id]);

  const fetchCareer = async () => {
    try {
      const response = await careersAPI.getById(id);
      setCareer(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching career:', error);
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await coursesAPI.getAll({ career_id: id });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchColleges = async () => {
    try {
      const response = await collegesAPI.getAll();
      // Filter colleges that might offer courses related to this career
      const filtered = response.data.filter(college => {
        const coursesList = JSON.parse(college.courses || '[]');
        return coursesList.length > 0;
      });
      setColleges(filtered.slice(0, 5)); // Show top 5
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const checkSaved = async () => {
    try {
      const response = await careersAPI.getSaved();
      const savedCareers = response.data;
      setSaved(savedCareers.some(c => c.id === parseInt(id)));
    } catch (error) {
      console.error('Error checking saved:', error);
    }
  };

  const handleSave = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      if (saved) {
        await careersAPI.unsave(id);
      } else {
        await careersAPI.save(id);
      }
      setSaved(!saved);
    } catch (error) {
      console.error('Error saving career:', error);
      alert('Failed to save career');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading career details...</p>
        </div>
      </Layout>
    );
  }

  if (!career) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Career not found</p>
          <Link href="/careers" className="btn-primary mt-4 inline-block">
            Back to Careers
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{career.name}</h1>
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded">
                {career.category}
              </span>
            </div>
            {user && (
              <button onClick={handleSave} className="btn-secondary">
                {saved ? '✓ Saved' : 'Save Career'}
              </button>
            )}
          </div>

          {/* Description */}
          <div className="card mb-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{career.description}</p>
          </div>

          {/* Skills */}
          {career.skills && (
            <div className="card mb-6">
              <h2 className="text-2xl font-semibold mb-4">Required Skills</h2>
              <p className="text-gray-700">{career.skills}</p>
            </div>
          )}

          {/* Eligibility */}
          {career.eligibility && (
            <div className="card mb-6">
              <h2 className="text-2xl font-semibold mb-4">Eligibility</h2>
              <p className="text-gray-700">{career.eligibility}</p>
            </div>
          )}

          {/* Salary & Growth */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {career.salary_range && (
              <div className="card">
                <h3 className="text-xl font-semibold mb-2">Salary Range</h3>
                <p className="text-gray-700 text-lg">{career.salary_range}</p>
              </div>
            )}
            {career.growth_outlook && (
              <div className="card">
                <h3 className="text-xl font-semibold mb-2">Growth Outlook</h3>
                <p className="text-gray-700 text-lg">{career.growth_outlook}</p>
              </div>
            )}
          </div>

          {/* Related Courses */}
          {courses.length > 0 && (
            <div className="card mb-6">
              <h2 className="text-2xl font-semibold mb-4">Related Courses</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <Link key={course.id} href={`/courses/${course.id}`}>
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 cursor-pointer">
                      <h3 className="font-semibold mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                      <p className="text-primary-600 font-semibold">₹{course.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Colleges */}
          {colleges.length > 0 && (
            <div className="card mb-6">
              <h2 className="text-2xl font-semibold mb-4">Related Colleges</h2>
              <div className="space-y-3">
                {colleges.map((college) => (
                  <div key={college.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-1">{college.name}</h3>
                    <p className="text-sm text-gray-600">{college.location}</p>
                    {college.entrance_exam && (
                      <p className="text-sm text-primary-600 mt-1">
                        Entrance: {college.entrance_exam}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/careers" className="btn-secondary mr-4">
              Back to Careers
            </Link>
            <Link href="/roadmap" className="btn-primary">
              View Career Roadmap
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

