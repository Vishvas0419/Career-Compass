import { useState, useEffect, useMemo } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { roadmapsAPI, collegesAPI, coursesAPI, resourcesAPI } from '../utils/api';

export default function Roadmap() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [colleges, setColleges] = useState([]);
  const [collegesLoading, setCollegesLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(false);
  const [sortKey, setSortKey] = useState('fees');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const response = await roadmapsAPI.getAll();
      setRoadmaps(response.data);
      if (response.data.length > 0) {
        setSelectedRoadmap(response.data[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setCollegesLoading(true);
        setCoursesLoading(true);
        setResourcesLoading(true);
        
        const [collegesRes, coursesRes, resourcesRes] = await Promise.all([
          collegesAPI.getAll(),
          coursesAPI.getAll(),
          resourcesAPI.getAll(),
        ]);
        
        setColleges(collegesRes.data || []);
        setCourses(coursesRes.data || []);
        setResources(resourcesRes.data || []);
      } catch (e) {
        console.error('Error fetching data:', e);
      } finally {
        setCollegesLoading(false);
        setCoursesLoading(false);
        setResourcesLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!selectedRoadmap || typeof window === 'undefined') return;

    const render = () => {
      const element = document.getElementById('mermaid-diagram');
      if (!element) return;
      element.innerHTML = '';
      try {
        window.mermaid.initialize({ startOnLoad: false, theme: 'default' });
        const code = selectedRoadmap.mermaid_code;
        // Use mermaid.render to get SVG and inject it
        const id = 'mermaid-' + Math.random().toString(36).slice(2);
        window.mermaid.render(id, code).then(({ svg }) => {
          element.innerHTML = svg;
        }).catch((err) => {
          console.error('Mermaid render error:', err);
          element.innerHTML = '<p class="text-red-600">Error rendering flowchart. Please check the Mermaid code.</p>';
        });
      } catch (error) {
        console.error('Mermaid setup error:', error);
        element.innerHTML = '<p class="text-red-600">Error rendering flowchart. Please check the Mermaid code.</p>';
      }
    };

    if (window.mermaid) {
      // Defer slightly to allow DOM update
      setTimeout(render, 50);
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
      script.onload = () => setTimeout(render, 50);
      document.head.appendChild(script);
    }
  }, [selectedRoadmap]);

  const streamLabel = selectedRoadmap?.stream || '';

  const programMeta = useMemo(() => {
    // Typical durations used to estimate total expense
    return {
      'Science - Engineering': { 
        durationYears: 4, 
        keywords: ['Engineering', 'B.Tech', 'BITS', 'VIT', 'SRM', 'Computer Science', 'Mechanical', 'Electrical', 'Civil'], 
        exams: ['JEE', 'BITSAT', 'VITEEE', 'SRMJEE'],
        courseCategories: ['Programming', 'Web Development', 'Engineering', 'Data Science'],
        resourceCategories: ['Engineering', 'Exam Preparation', 'Career Planning', 'Education']
      },
      'Science - Medical': { 
        durationYears: 5.5, 
        keywords: ['MBBS', 'Medicine', 'Medical', 'Health'], 
        exams: ['NEET'],
        courseCategories: ['Medical', 'Science'],
        resourceCategories: ['Medical', 'Exam Preparation', 'Career Planning', 'Education']
      },
      'Commerce': { 
        durationYears: 3, 
        keywords: ['Commerce', 'B.Com', 'BBA', 'Business', 'Finance', 'Accounting'], 
        exams: [],
        courseCategories: ['Commerce', 'Business'],
        resourceCategories: ['Commerce', 'Career Planning', 'Education']
      },
      'Arts': { 
        durationYears: 3, 
        keywords: ['Arts', 'B.A', 'Design', 'Law', 'Psychology', 'Journalism', 'English', 'Literature'], 
        exams: ['CLAT', 'NID', 'NIFT'],
        courseCategories: ['Design', 'Psychology'],
        resourceCategories: ['Arts', 'Design', 'Law', 'Career Planning', 'Education']
      },
    };
  }, []);

  const selectedMeta = useMemo(() => {
    const keys = Object.keys(programMeta);
    const matched = keys.find(k => streamLabel.toLowerCase().includes(k.toLowerCase()));
    return programMeta[matched] || null;
  }, [programMeta, streamLabel]);

  const filteredColleges = useMemo(() => {
    if (!selectedMeta) return [];
    return (colleges || []).filter((c) => {
      const courses = safeParseArray(c.courses);
      const inCourses = courses.some((name) =>
        selectedMeta.keywords.some((kw) => (name || '').toLowerCase().includes(kw.toLowerCase()))
      );
      const inExam = selectedMeta.exams.some((ex) => (c.entrance_exam || '').toLowerCase().includes(ex.toLowerCase()));
      return inCourses || inExam;
    });
  }, [colleges, selectedMeta]);

  const sortedColleges = useMemo(() => {
    const list = [...filteredColleges];
    if (sortKey === 'fees') list.sort((a, b) => (a.fees || 0) - (b.fees || 0));
    if (sortKey === 'name') list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    if (sortKey === 'type') list.sort((a, b) => (a.type || '').localeCompare(b.type || ''));
    return list;
  }, [filteredColleges, sortKey]);

  const filteredCourses = useMemo(() => {
    if (!selectedMeta) return [];
    return (courses || []).filter((course) => {
      const category = (course.category || '').toLowerCase();
      return selectedMeta.courseCategories.some(cat => 
        category.includes(cat.toLowerCase())
      );
    });
  }, [courses, selectedMeta]);

  const filteredResources = useMemo(() => {
    if (!selectedMeta) return [];
    return (resources || []).filter((resource) => {
      const category = (resource.category || '').toLowerCase();
      return selectedMeta.resourceCategories.some(cat => 
        category.toLowerCase().includes(cat.toLowerCase())
      );
    });
  }, [resources, selectedMeta]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center animate-fade-in">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 animate-pulse mb-4 shadow-lg" />
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">Loading roadmaps...</p>
        </div>
      </Layout>
    );
  }

  function safeParseArray(value) {
    try {
      const arr = Array.isArray(value) ? value : JSON.parse(value || '[]');
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function estimateTotal(fees, durationYears) {
    if (!fees || !durationYears) return null;
    const total = Number(fees) * durationYears;
    return total;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 relative">
        <div className="absolute -z-10 top-10 right-10 w-64 h-64 bg-primary-300/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -z-10 bottom-10 left-10 w-48 h-48 bg-primary-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <h1 className={`text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Career Roadmaps
        </h1>

        <p className={`text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto text-lg transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
          Explore interactive flowcharts showing all possible career paths based on different streams.
          Select a stream to view the complete roadmap, colleges, courses, and resources.
        </p>

        {/* Stream Selector */}
        <div className={`mb-10 overflow-x-auto no-scrollbar transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
          <div className="inline-flex gap-3 p-1.5 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl dark:from-primary-950 dark:to-primary-900">
            {roadmaps.map((roadmap) => (
              <button
                key={roadmap.id}
                onClick={() => setSelectedRoadmap(roadmap)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedRoadmap?.id === roadmap.id
                    ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg scale-105'
                    : 'text-gray-700 hover:bg-white hover:shadow-md dark:text-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                {roadmap.stream}
              </button>
            ))}
          </div>
        </div>

        {/* Roadmap Display */}
        {selectedRoadmap && (
          <div className={`card mb-10 transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">{selectedRoadmap.stream}</h2>
            
            {selectedRoadmap.description && (
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">{selectedRoadmap.description}</p>
            )}

            <div className="bg-gray-50 rounded-lg p-6 md:p-8 overflow-x-auto border border-gray-200">
              <div
                id="mermaid-diagram"
                className="flex justify-center items-center min-h-[400px]"
              />
            </div>

            {/* Fallback text display if Mermaid fails */}
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> If the flowchart doesn't render, here's the Mermaid code:
              </p>
              <pre className="mt-2 text-xs bg-white p-3 rounded overflow-x-auto">
                <code>{selectedRoadmap.mermaid_code}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Courses Section */}
        {selectedMeta && filteredCourses.length > 0 && (
          <div className={`mt-10 transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '800ms' }}>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Recommended Courses for {streamLabel}
            </h2>
            {coursesLoading ? (
              <div className="text-center py-8">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary-100 animate-pulse mb-3 dark:bg-primary-900/40" />
                <p className="text-gray-600 dark:text-gray-400">Loading courses...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.slice(0, 6).map((course) => (
                  <Link key={course.id} href={`/courses/${course.id}`}>
                    <div className="card hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{course.title}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700 font-medium dark:bg-primary-900 dark:text-primary-300">
                          {course.level || 'Beginner'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{course.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-primary-700 font-semibold dark:text-primary-400">
                          ₹{Number(course.price || 0).toLocaleString('en-IN')}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">{course.duration || 'N/A'}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {filteredCourses.length > 6 && (
              <div className="text-center mt-6">
                <Link href="/courses" className="btn-primary">
                  View All Courses →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Resources Section */}
        {selectedMeta && filteredResources.length > 0 && (
          <div className={`mt-10 transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1000ms' }}>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Useful Resources for {streamLabel}
            </h2>
            {resourcesLoading ? (
              <div className="text-center py-8">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary-100 animate-pulse mb-3 dark:bg-primary-900/40" />
                <p className="text-gray-600 dark:text-gray-400">Loading resources...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.slice(0, 6).map((resource) => (
                  <Link key={resource.id} href={`/resources/${resource.id}`}>
                    <div className="card hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{resource.title}</h3>
                        <span className="text-2xl">
                          {resource.type === 'video' ? '📹' : resource.type === 'link' ? '🔗' : '📄'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700 font-medium dark:bg-primary-900 dark:text-primary-300">
                          {resource.category || 'General'}
                        </span>
                        <span className="text-primary-600 font-semibold text-sm hover:text-primary-700 dark:text-primary-400">
                          View →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {filteredResources.length > 6 && (
              <div className="text-center mt-6">
                <Link href="/resources" className="btn-primary">
                  View All Resources →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Colleges & Expenses */}
        {selectedMeta && (
          <div className={`mt-10 transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1200ms' }}>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Colleges and Expected Expenses
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Based on: <strong>{streamLabel}</strong>. Estimated totals use typical duration for this stream.</p>

            <div className="mb-6 flex flex-wrap items-center gap-3">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sort by:</label>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="input-field w-48"
              >
                <option value="fees">Annual Fees (Low to High)</option>
                <option value="name">Name (A to Z)</option>
                <option value="type">Type</option>
              </select>
              {collegesLoading && (
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></span>
                  Loading colleges...
                </span>
              )}
            </div>

            {sortedColleges.length === 0 && !collegesLoading && (
              <div className="card text-center py-8">
                <p className="text-gray-700 dark:text-gray-300">No colleges found for this stream yet. Try another stream or check back soon.</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedColleges.map((c) => {
                const courses = safeParseArray(c.courses);
                const displayCourses = courses
                  .filter(name => selectedMeta.keywords.some(kw => (name || '').toLowerCase().includes(kw.toLowerCase())))
                  .slice(0, 3);
                const total = estimateTotal(c.fees, selectedMeta.durationYears);
                return (
                  <div key={c.id} className="card hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{c.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">📍 {c.location || 'Location N/A'}</p>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 font-semibold dark:from-primary-900 dark:to-primary-800 dark:text-primary-300">
                        {c.type || '—'}
                      </span>
                    </div>
                    <div className="space-y-3 text-sm">
                      {c.entrance_exam && (
                        <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-950">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">Entrance Exam: </span>
                          <span className="text-primary-700 dark:text-primary-400 font-semibold">{c.entrance_exam}</span>
                        </div>
                      )}
                      {displayCourses.length > 0 && (
                        <div>
                          <span className="text-gray-700 dark:text-gray-300 font-medium">Programs: </span>
                          <span className="text-gray-600 dark:text-gray-400">{displayCourses.join(', ')}</span>
                        </div>
                      )}
                      <div className="p-3 rounded-lg bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900">
                        <p className="text-gray-700 dark:text-gray-300 mb-1">
                          <span className="font-semibold">Annual Fees:</span> 
                          <span className="text-primary-700 dark:text-primary-400 font-bold ml-2">
                            {c.fees ? `₹${Number(c.fees).toLocaleString('en-IN')}` : 'N/A'}
                          </span>
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-semibold">Total ({selectedMeta.durationYears} yrs):</span> 
                          <span className="text-primary-700 dark:text-primary-400 font-bold ml-2">
                            {total ? `₹${Number(total).toLocaleString('en-IN')}` : 'N/A'}
                          </span>
                        </p>
                      </div>
                      {c.website && (
                        <a 
                          className="text-primary-600 hover:text-primary-700 font-semibold underline transition-colors dark:text-primary-400 dark:hover:text-primary-300" 
                          href={c.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          🌐 Visit website →
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {roadmaps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No roadmaps available yet.</p>
          </div>
        )}
      </div>

      {/* Load Mermaid CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.css"
      />
    </Layout>
  );
}

