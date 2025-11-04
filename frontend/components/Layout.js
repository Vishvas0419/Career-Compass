import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useTheme } from '../context/ThemeContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary-300/30 blur-3xl animate-float"></div>
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary-200/40 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="pointer-events-none absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-primary-400/20 blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-800 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="inline-flex h-10 w-10 rounded-xl bg-gradient-to-tr from-primary-500 to-primary-700 text-white items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">🧭</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">Career Compass</span>
            </Link>

            <div className="flex items-center gap-2 md:gap-3">
              <Link href="/" className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800 font-medium">Home</Link>
              <Link href="/quiz" className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800 font-medium">Quiz</Link>
              <Link href="/careers" className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800 font-medium">Careers</Link>
              <Link href="/courses" className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800 font-medium">Courses</Link>
              <Link href="/roadmap" className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800 font-medium">Roadmap</Link>
              <Link href="/resources" className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800 font-medium">Resources</Link>

              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="px-4 py-2 rounded-lg border-2 border-primary-200 hover:border-primary-400 bg-white hover:bg-primary-50 text-gray-700 hover:text-primary-700 transition-all duration-200 transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-primary-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>

              {user ? (
                <>
                  <Link href="/profile" className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800 font-medium">Profile</Link>
                  <button onClick={handleLogout} className="btn-secondary">Logout</button>
                </>
              ) : (
                <Link href="/login" className="btn-primary">Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="mt-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white dark:from-gray-950 dark:via-black dark:to-gray-950">
        <div className="container mx-auto px-4 py-10 text-center">
          <p className="text-white/90">&copy; 2024 Career Compass. All rights reserved.</p>
          <p className="mt-2 text-white/60">Helping students make informed career decisions</p>
        </div>
      </footer>
    </div>
  );
}

