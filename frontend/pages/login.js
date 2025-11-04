import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);

    if (result.success) {
      router.push('/quiz');
    } else {
      setError(result.message || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 relative">
        <div className="absolute -z-10 top-10 right-10 w-64 h-64 bg-primary-300/30 rounded-full blur-3xl animate-float" />
        <div className="absolute -z-10 bottom-10 left-10 w-48 h-48 bg-primary-200/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className={`max-w-md mx-auto card transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 text-3xl mb-4 shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12">🔐</div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent">Login</h1>
          </div>
          
          {error && (
            <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 dark:bg-red-950 dark:border-red-900 dark:text-red-200 transform animate-slide-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mb-4 disabled:opacity-50 text-lg"
            >
              {loading ? '⏳ Logging in...' : '🚀 Login'}
            </button>
          </form>

          <p className="text-center text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary-600 hover:text-primary-700 font-semibold hover:underline transition-colors">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

