

import React, { useState } from 'react';
import { Search, FileText, Video, ExternalLink, Loader2, AlertCircle, BookOpen } from 'lucide-react';

export default function DeepResearchAgent() {
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

      // Skip empty lines
      if (!line) continue;

      // Check if it's a section header (## or ###)
      if (line.startsWith('###') || line.startsWith('##')) {
        // Save previous section if it has content
        if (currentSection.title || currentSection.content.length > 0) {
          sections.push(currentSection);
        }
        // Start new section
        currentSection = {
          title: line.replace(/^#{2,3}\s*/, '').replace(/\*\*/g, ''),
          content: []
        };
      } else {
        // Regular content line - clean markdown
        const cleanLine = line
          .replace(/\*\*/g, '') // Remove bold markers
          .replace(/\[Source \d+(?:,\s*\d+)*\]/g, (match) => {
            // Convert [Source 1, 2] to superscript numbers
            const nums = match.match(/\d+/g);
            return nums ? nums.map(n => `[${n}]`).join('') : '';
          });

        if (cleanLine) {
          currentSection.content.push(cleanLine);
        }
      }
    }

    // Add last section
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
      const response = await fetch(`${API_BASE_URL}/research/run`, {
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
        throw new Error('Failed to fetch research data');
      }

      const data = await response.json();
      setResult(data);
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
      const response = await fetch(`${API_BASE_URL}/research/videos`, {
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
        throw new Error('Failed to fetch videos');
      }

      const data = await response.json();
      setVideos(data.videos);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred while fetching videos');
    } finally {
      setLoadingVideos(false);
    }
  };

  const sections = result ? parseContent(result.content) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Deep Research Agent
            </h1>
          </div>
          <p className="text-slate-600 text-lg">AI-powered research assistant for comprehensive analysis</p>
        </div>

        {/* Main Input Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-slate-100">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-3">
                Research Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., The Impact of AI on Healthcare"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-3">
                Brief / Context (Optional)
              </label>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Provide additional context or specific aspects you want to focus on..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-3">
                  Research Depth
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="small">Small (½–1 page)</option>
                  <option value="medium">Medium (1–2 pages)</option>
                  <option value="deep">Deep (2–3 pages)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-3">
                  Number of Sources
                </label>
                <input
                  type="number"
                  value={topK}
                  onChange={(e) => setTopK(Math.max(1, Math.min(20, Number(e.target.value))))}
                  min={1}
                  max={20}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleResearch}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-6 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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
                className="bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold px-8 py-4 rounded-xl hover:from-red-700 hover:to-pink-700 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                {loadingVideos ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Video className="w-5 h-5" />
                )}
                Videos
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800">Error</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Research Results */}
        {result && sections.length > 0 && (
          <div className="space-y-6">
            {/* Research Content */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">Research Report</h2>
              </div>

              <div className="p-8">
                {sections.map((section, idx) => (
                  <div key={idx} className="mb-8 last:mb-0">
                    {section.title && (
                      <h3 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-blue-200">
                        {section.title}
                      </h3>
                    )}
                    <div className="space-y-4">
                      {section.content.map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-slate-700 leading-relaxed text-lg">
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
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex items-center gap-3">
                  <ExternalLink className="w-6 h-6 text-white" />
                  <h2 className="text-2xl font-bold text-white">Sources & References</h2>
                </div>

                <div className="p-6 space-y-3">
                  {result.sources.map((source, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl hover:from-slate-100 hover:to-slate-200 transition-all border border-slate-200">
                      <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-semibold hover:underline block"
                        >
                          {source.title || source.url}
                        </a>
                        <p className="text-sm text-slate-500 mt-1 truncate">{source.url}</p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Videos */}
        {videos && videos.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden mt-6">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 px-6 py-4 flex items-center gap-3">
              <Video className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold text-white">Related Videos</h2>
            </div>

            <div className="p-6 space-y-3">
              {videos.map((video, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl hover:from-red-100 hover:to-pink-100 transition-all border border-red-200">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-800 font-semibold hover:underline block"
                    >
                      {video.title || video.url}
                    </a>
                    <p className="text-sm text-slate-500 mt-1 truncate">{video.url}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}