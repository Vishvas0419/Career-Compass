import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { resourcesAPI } from '../utils/api';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ type: 'all', category: 'all' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchResources();
  }, [filter]);

  const fetchResources = async () => {
    try {
      const params = {};
      if (filter.type !== 'all') params.type = filter.type;
      if (filter.category !== 'all') params.category = filter.category;

      const response = await resourcesAPI.getAll(params);
      setResources(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return resources;
    return resources.filter(r =>
      (r.title || '').toLowerCase().includes(q) ||
      (r.description || '').toLowerCase().includes(q) ||
      (r.category || '').toLowerCase().includes(q)
    );
  }, [resources, search]);

  const getResourceIcon = (type) => {
    switch (type) {
      case 'article':
        return '📄';
      case 'video':
        return '🎥';
      case 'link':
        return '🔗';
      default:
        return '📚';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-center mb-8">Resources</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="flex items-start mb-3 gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-24" />
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                <div className="h-3 bg-gray-100 rounded w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Resources</h1>

        {/* Search + Filters */}
        <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6 max-w-4xl mx-auto">
          <div className="flex-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, description, or category..."
              className="input-field w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center md:justify-end">
            {['all', 'article', 'video', 'link'].map((t) => (
              <button
                key={t}
                onClick={() => setFilter({ ...filter, type: t })}
                className={`px-3 py-2 rounded-full text-sm border transition ${
                  filter.type === t ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div>
            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              className="input-field w-56"
            >
              <option value="all">All Categories</option>
              <option value="Career Planning">Career Planning</option>
              <option value="Career Options">Career Options</option>
              <option value="Comparison">Comparison</option>
              <option value="Education">Education</option>
              <option value="Exam Preparation">Exam Preparation</option>
              <option value="Resources">Resources</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((resource) => (
            <Link key={resource.id} href={`/resources/${resource.id}`}>
              <div className="card hover:shadow-lg cursor-pointer transition group">
                <div className="flex items-start mb-3">
                  <div className="text-3xl mr-3 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-primary-50">
                    <span>{getResourceIcon(resource.type)}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold mb-1">{resource.title}</h3>
                    {resource.category && (
                      <span className="px-2 py-0.5 rounded text-xs bg-primary-100 text-primary-700">
                        {resource.category}
                      </span>
                    )}
                  </div>
                </div>
                {resource.description && (
                  <p className="text-gray-600 mb-4 line-clamp-3">{resource.description}</p>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{resource.type?.toUpperCase() || 'RESOURCE'}</span>
                  <span className="text-primary-600 font-semibold">View details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No resources found matching your criteria.</p>
            <p className="text-gray-500 text-sm mt-2">Try clearing filters or updating your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

