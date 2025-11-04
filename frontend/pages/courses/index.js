import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { coursesAPI } from '../../utils/api';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ category: 'all', level: 'all' });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const params = {};
      if (filter.category !== 'all') params.category = filter.category;
      if (filter.level !== 'all') params.level = filter.level;

      const response = await coursesAPI.getAll(params);
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [filter]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading courses...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Available Courses</h1>

        {/* Filters */}
        <div className="mb-8 flex justify-center flex-wrap gap-4">
          <select
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="input-field w-48"
          >
            <option value="all">All Categories</option>
            <option value="Programming">Programming</option>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Medical">Medical</option>
            <option value="Commerce">Commerce</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
            <option value="Engineering">Engineering</option>
          </select>

          <select
            value={filter.level}
            onChange={(e) => setFilter({ ...filter, level: e.target.value })}
            className="input-field w-48"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <div className="card hover:shadow-xl cursor-pointer h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                  {course.description}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm">
                    {course.category}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                    {course.level}
                  </span>
                </div>
                {course.duration && (
                  <p className="text-sm text-gray-600 mb-2">Duration: {course.duration}</p>
                )}
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-2xl font-bold text-primary-600">₹{course.price}</p>
                  <span className="text-primary-600 font-semibold">View Details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

