import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { quizAPI } from '../utils/api';

export default function Quiz() {
  const { user } = useAuth();
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    fetchQuestions();
  }, [user]);

  const fetchQuestions = async () => {
    try {
      const response = await quizAPI.getQuestions();
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const answersArray = questions.map(q => answers[q.id] || '');
      const response = await quizAPI.submitQuiz(answersArray);
      
      router.push({
        pathname: '/recommendations',
        query: { resultId: response.data.result.id },
      });
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center animate-fade-in">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 animate-pulse mb-4 shadow-lg" />
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">Loading questions...</p>
        </div>
      </Layout>
    );
  }

  if (questions.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-gray-700 dark:text-gray-300">No questions available.</p>
        </div>
      </Layout>
    );
  }

  const question = questions[currentQuestion];
  const rawOptions = question?.options;
  const options = Array.isArray(rawOptions)
    ? rawOptions
    : (typeof rawOptions === 'string'
        ? (() => { try { return JSON.parse(rawOptions); } catch { return []; } })()
        : []);
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className={`text-4xl md:text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Career Quiz
          </h1>

          {/* Progress Bar */}
          <div className={`mb-8 transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
            <div className="flex justify-between text-sm font-semibold text-gray-600 mb-3 dark:text-gray-300">
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full shadow-inner dark:from-gray-800 dark:to-gray-700">
              <div
                className="h-4 rounded-full transition-all duration-500 bg-gradient-to-r from-primary-400 to-primary-600 shadow-lg"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className={`card mb-6 transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`} style={{ transitionDelay: '400ms' }}>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
              {question.question}
            </h2>

            <div className="space-y-4">
              {options.map((option, index) => (
                <label
                  key={index}
                  className={`block p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                    answers[question.id] === option
                      ? 'border-primary-500 bg-primary-50 shadow-lg scale-[1.02] dark:bg-primary-900/30'
                      : 'border-gray-200 hover:border-primary-400 hover:bg-primary-50/50 dark:border-gray-700 dark:hover:bg-gray-800'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={() => handleAnswer(question.id, option)}
                    className="mr-3 accent-primary-600 scale-125"
                  />
                  <span className="font-medium">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className={`flex justify-between sticky bottom-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-gray-200/50 dark:bg-gray-900/90 dark:border-gray-800 transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={submitting || !answers[question.id]}
                className="btn-primary disabled:opacity-50 text-lg px-8"
              >
                {submitting ? 'Submitting...' : '✨ Submit Quiz'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!answers[question.id]}
                className="btn-primary disabled:opacity-50"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

