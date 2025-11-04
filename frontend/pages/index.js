import Layout from '../components/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute -z-10 top-10 left-10 w-40 h-40 bg-primary-200/40 rounded-full blur-2xl dark:bg-primary-900/20 animate-pulse" />
        <div className="absolute -z-10 bottom-20 right-10 w-56 h-56 bg-primary-300/30 rounded-full blur-3xl dark:bg-primary-800/20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -z-10 top-1/2 left-1/4 w-32 h-32 bg-primary-400/20 rounded-full blur-2xl dark:bg-primary-900/10 animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Hero Section */}
        <div className={`text-center py-20 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className={`inline-block px-6 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 border border-primary-200 mb-6 dark:from-primary-900/30 dark:to-primary-800/20 dark:border-primary-800 dark:text-primary-300 transform transition-all duration-700 hover:scale-110 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            ✨ Find your perfect path
          </span>
          <h1 className={`text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 bg-clip-text text-transparent leading-tight transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            Welcome to Career Compass
          </h1>
          <p className={`text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto dark:text-gray-300 transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            Discover your ideal career path based on your interests, strengths, and preferences. 
            Make informed decisions without societal pressure.
          </p>
          <div className={`flex flex-wrap justify-center gap-4 transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            <Link href="/quiz" className="btn-primary text-lg px-8 py-4 rounded-xl transform hover:scale-105 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Take Career Quiz
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
            <Link href="/careers" className="btn-secondary text-lg px-8 py-4 rounded-xl transform hover:scale-105 hover:shadow-lg transition-all duration-300">
              Explore Careers
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 py-16">
          <div className={`card text-center transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '800ms' }}>
            <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 text-4xl mb-4 transform transition-all duration-300 hover:scale-110 hover:rotate-6 dark:from-primary-900/40 dark:to-primary-800/30">🎯</div>
            <h3 className="text-xl font-semibold mb-3 dark:text-gray-100">Personalized Quiz</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Take our comprehensive career quiz to discover careers that match your interests and aptitude.
            </p>
          </div>

          <div className={`card text-center transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1000ms' }}>
            <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 text-4xl mb-4 transform transition-all duration-300 hover:scale-110 hover:rotate-6 dark:from-primary-900/40 dark:to-primary-800/30">📚</div>
            <h3 className="text-xl font-semibold mb-3 dark:text-gray-100">Career Information</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Get detailed information about various careers, required skills, eligibility, and scope.
            </p>
          </div>

          <div className={`card text-center transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1200ms' }}>
            <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 text-4xl mb-4 transform transition-all duration-300 hover:scale-110 hover:rotate-6 dark:from-primary-900/40 dark:to-primary-800/30">🗺️</div>
            <h3 className="text-xl font-semibold mb-3 dark:text-gray-100">Career Roadmap</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              View interactive flowcharts showing all possible career paths based on your chosen stream.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent transform transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1400ms' }}>
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className={`text-center transform transition-all duration-700 hover:scale-105 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1600ms' }}>
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg dark:from-primary-900/40 dark:to-primary-800/30">
                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">1</span>
              </div>
              <h4 className="font-semibold mb-2 text-lg dark:text-gray-100">Take the Quiz</h4>
              <p className="text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                Answer questions about your interests, strengths, and preferences
              </p>
            </div>

            <div className={`text-center transform transition-all duration-700 hover:scale-105 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1800ms' }}>
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg dark:from-primary-900/40 dark:to-primary-800/30">
                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">2</span>
              </div>
              <h4 className="font-semibold mb-2 text-lg dark:text-gray-100">Get Recommendations</h4>
              <p className="text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                Receive personalized career suggestions based on your answers
              </p>
            </div>

            <div className={`text-center transform transition-all duration-700 hover:scale-105 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '2000ms' }}>
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg dark:from-primary-900/40 dark:to-primary-800/30">
                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">3</span>
              </div>
              <h4 className="font-semibold mb-2 text-lg dark:text-gray-100">Explore Careers</h4>
              <p className="text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                Learn about skills, eligibility, courses, and scope for each career
              </p>
            </div>

            <div className={`text-center transform transition-all duration-700 hover:scale-105 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '2200ms' }}>
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg dark:from-primary-900/40 dark:to-primary-800/30">
                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">4</span>
              </div>
              <h4 className="font-semibold mb-2 text-lg dark:text-gray-100">Plan Your Path</h4>
              <p className="text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                View roadmaps and courses to plan your career journey
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-3xl p-12 md:p-16 text-center my-16 shadow-2xl transform transition-all duration-1000 hover:shadow-primary-500/20 ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`} style={{ transitionDelay: '2400ms' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 transform transition-all duration-500 hover:scale-105">
              Ready to Discover Your Career?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
              Take our quiz today and start your journey towards a fulfilling career
            </p>
            <Link 
              href="/quiz" 
              className="bg-white text-primary-700 px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 inline-block shadow-xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl text-lg group"
            >
              <span className="flex items-center gap-2">
                Get Started Now
                <span className="group-hover:translate-x-1 transition-transform">🚀</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

