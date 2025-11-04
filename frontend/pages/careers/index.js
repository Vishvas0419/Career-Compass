import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { careersAPI } from '../../utils/api';

export default function Careers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await careersAPI.getAll();
      setCareers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching careers:', error);
      setLoading(false);
    }
  };

  const filteredCareers = filter === 'all' 
    ? careers 
    : careers.filter(c => c.category === filter);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading careers...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Explore Careers</h1>

        {/* Filter */}
        <div className="mb-8 flex justify-center flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${
              filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            All
          </button>
          {['Engineering', 'Medical', 'Commerce', 'Arts', 'Science'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg ${
                filter === category ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career) => (
            <div key={career.id} className="card">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{career.name}</h3>
                <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm">
                  {career.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-3">{career.description}</p>
              <Link
                href={`/careers/${career.id}`}
                className="text-primary-600 hover:underline font-semibold"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

