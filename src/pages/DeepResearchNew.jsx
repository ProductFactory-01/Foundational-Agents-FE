import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Search, FileText, Video, ExternalLink, Loader2, AlertCircle, BookOpen, ArrowLeft } from 'lucide-react';

export default function DeepResearchAgent() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [brief, setBrief] = useState('');
  const [length, setLength] = useState('medium');
  const [topK, setTopK] = useState(5);
  const [loading, setLoading] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [result, setResult] = useState(null);
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  const parseContent = (text) => {
    if (!text) return [];

    const sections = [];
    const lines = text.split('\n');
    let currentSection = { title: '', content: [] };

    for (let line of lines) {
      line = line.trim();

      if (!line) continue;

      if (line.startsWith('###') || line.startsWith('##')) {
        if (currentSection.title || currentSection.content.length > 0) {
          sections.push(currentSection);
        }
        currentSection = {
          title: line.replace(/^#{2,3}\s*/, '').replace(/\*\*/g, ''),
          content: []
        };
      } else {
        const cleanLine = line
          .replace(/\*\*/g, '')
          .replace(/\[Source \d+(?:,\s*\d+)*\]/g, (match) => {
            const nums = match.match(/\d+/g);
            return nums ? nums.map(n => `[${n}]`).join('') : '';
          });

        if (cleanLine) {
          currentSection.content.push(cleanLine);
        }
      }
    }

    if (currentSection.title || currentSection.content.length > 0) {
      sections.push(currentSection);
    }

    return sections;
  };

  const handleResearch = async () => {
    if (!title.trim()) {
      setError('Please enter a research title');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setVideos(null);

    try {
      const response = await fetch(`${API_BASE_URL}/v2/research/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          brief: brief || null,
          length,
          top_k: topK,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch research data');
      }

      const data = await response.json();
      setResult(data.data); // Extract data from { success: true, data: {...} }
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred while fetching research data');
    } finally {
      setLoading(false);
    }
  };

  const handleGetVideos = async () => {
    if (!title) {
      setError('Please enter a title first');
      return;
    }

    setLoadingVideos(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/v2/research/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          top_k: 3,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch videos');
      }

      const data = await response.json();
      setVideos(data.data.videos); // Extract videos from { success: true, data: { videos: [...] } }
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred while fetching videos');
    } finally {
      setLoadingVideos(false);
    }
  };

  const sections = result ? parseContent(result.content) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2.5 rounded-lg">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Deep Research Agent
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">AI-powered research assistant for comprehensive analysis</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Research Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., The Impact of AI on Healthcare"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Brief / Context <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Provide additional context or specific aspects you want to focus on..."
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none text-gray-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Research Depth
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="deep">Deep</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Number of Sources
                </label>
                <input
                  type="number"
                  value={topK}
                  onChange={(e) => setTopK(Math.max(1, Math.min(10, Number(e.target.value))))}
                  min={1}
                  max={10}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleResearch}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Researching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Run Research
                  </>
                )}
              </button>

              <button
                onClick={handleGetVideos}
                disabled={loadingVideos || !title}
                className="sm:w-auto bg-gray-900 text-white font-medium px-6 py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loadingVideos ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Video className="w-5 h-5" />
                )}
                Get Videos
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-900">Error</h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Research Results */}
        {result && sections.length > 0 && (
          <div className="space-y-6">
            {/* Research Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4 flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">Research Report</h2>
              </div>

              <div className="p-6 sm:p-8">
                {sections.map((section, idx) => (
                  <div key={idx} className="mb-8 last:mb-0">
                    {section.title && (
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        {section.title}
                      </h3>
                    )}
                    <div className="space-y-4">
                      {section.content.map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sources */}
            {result.sources && result.sources.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200 px-6 py-4 flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-700" />
                  <h2 className="text-xl font-semibold text-gray-900">Sources & References</h2>
                </div>

                <div className="p-6">
                  <div className="space-y-3">
                    {result.sources.map((source, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                        <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {idx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium hover:underline block break-words"
                          >
                            {source.title || source.url}
                          </a>
                          <p className="text-sm text-gray-500 mt-1 break-all">{source.url}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Videos */}
        {videos && videos.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center gap-3">
              <Video className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-900">Related Videos</h2>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {videos.map((video, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                    <span className="flex-shrink-0 w-7 h-7 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline block break-words"
                      >
                        {video.title || video.url}
                      </a>
                      <p className="text-sm text-gray-500 mt-1 break-all">{video.url}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}