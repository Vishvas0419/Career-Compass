import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { quizAPI, careersAPI } from '../utils/api';

export default function Recommendations() {
  const { user } = useAuth();
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const resultId = router.query.resultId;
    if (resultId) {
      fetchResult(resultId);
    } else {
      fetchLatestResult();
    }
  }, [user, router.query.resultId]);

  const fetchResult = async (resultId) => {
    try {
      const response = await quizAPI.getResultById(resultId);
      setResult(response.data);
      const raw = response.data.suggested_careers;
      const suggestedCareers = Array.isArray(raw)
        ? raw
        : (typeof raw === 'string' ? (() => { try { return JSON.parse(raw); } catch { return []; } })() : []);
      setCareers(suggestedCareers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching result:', error);
      setLoading(false);
    }
  };

  const fetchLatestResult = async () => {
    try {
      const response = await quizAPI.getResults();
      if (response.data.length > 0) {
        const latestResult = response.data[0];
        setResult(latestResult);
        const raw = latestResult.suggested_careers;
        const suggestedCareers = Array.isArray(raw)
          ? raw
          : (typeof raw === 'string' ? (() => { try { return JSON.parse(raw); } catch { return []; } })() : []);
        setCareers(suggestedCareers);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching results:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading recommendations...</p>
        </div>
      </Layout>
    );
  }

  if (!result || careers.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto card text-center">
            <h1 className="text-3xl font-bold mb-4">No Recommendations Yet</h1>
            <p className="text-gray-600 mb-6">
              Take our career quiz to get personalized career recommendations.
            </p>
            <Link href="/quiz" className="btn-primary">
              Take Quiz Now
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Your Career Recommendations</h1>

        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
          <p className="text-center text-gray-700">
            Based on your quiz answers, we recommend the following careers for you:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career) => (
            <div key={career.id} className="card">
              <h3 className="text-xl font-semibold mb-2">{career.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{career.description}</p>
              <Link
                href={`/careers/${career.id}`}
                className="text-primary-600 hover:underline font-semibold"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/quiz" className="btn-secondary mr-4">
            Retake Quiz
          </Link>
          <Link href="/careers" className="btn-primary">
            Browse All Careers
          </Link>
        </div>
      </div>
    </Layout>
  );
}

