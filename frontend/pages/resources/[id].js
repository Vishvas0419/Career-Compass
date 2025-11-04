import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { resourcesAPI } from '../../utils/api';

function slugify(title) {
  return (title || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default function ResourceDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState('');
  const [htmlError, setHtmlError] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchResource = async () => {
      try {
        const res = await resourcesAPI.getById(id);
        setResource(res.data);
      } catch (e) {
        console.error('Error loading resource', e);
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, [id]);

  const articlePath = useMemo(() => {
    if (!resource || resource.type !== 'article') return null;
    return `/articles/${slugify(resource.title)}.html`;
  }, [resource]);

  useEffect(() => {
    const loadArticle = async () => {
      if (!articlePath) return;
      try {
        const res = await fetch(articlePath);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        setHtmlContent(text);
      } catch (err) {
        setHtmlError('Could not load local article content.');
      }
    };
    loadArticle();
  }, [articlePath]);

  const renderContent = () => {
    if (!resource) return null;
    if (resource.type === 'article') {
      return (
        <div>
          {htmlContent ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-gray-700 mb-2">{htmlError || 'Loading article...'}</p>
              {resource.url && (
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
                  Open external article →
                </a>
              )}
            </div>
          )}
        </div>
      );
    }
    if (resource.type === 'video') {
      const url = resource.url || '';
      // Try to extract YouTube video ID
      const match = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{11})/);
      const videoId = match ? match[1] : null;
      return (
        <div className="aspect-w-16 aspect-h-9">
          {videoId ? (
            <iframe
              className="w-full h-[360px] md:h-[480px] rounded"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={resource.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
              Watch video →
            </a>
          )}
        </div>
      );
    }
    // link or default
    return (
      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
        Visit link →
      </a>
    );
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading resource...</p>
        </div>
      </Layout>
    );
  }

  if (!resource) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Resource not found.</p>
          <Link href="/resources" className="btn-primary mt-4 inline-block">Back to Resources</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/resources" className="text-primary-600 hover:text-primary-700 underline">← Back to Resources</Link>
            {resource.type && (
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">{resource.type.toUpperCase()}</span>
            )}
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>
            <div className="flex items-center gap-3">
              {resource.category && (
                <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs inline-block">
                  {resource.category}
                </span>
              )}
              {resource.url && resource.type !== 'article' && (
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 underline">Open source →</a>
              )}
            </div>
            {resource.description && (
              <p className="text-gray-600 mt-3">{resource.description}</p>
            )}
          </div>

          <div className="card">
            {renderContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
}


