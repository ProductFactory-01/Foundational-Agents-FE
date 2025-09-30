import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Search, FileText, ExternalLink, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

export default function PolicySuggestionAgent() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [context, setContext] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) {
            setError('Please enter a policy query');
            return;
        }

        setLoading(true);
        setError('');
        setResponse(null);

        try {
            const res = await fetch(`${API_BASE_URL}/query`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, context: context || null }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.detail || `Server error: ${res.status}`);
            }

            const data = await res.json();
            setResponse(data);
        } catch (err) {
            console.error(err);
            setError(err.message || 'An error occurred while fetching policy advice');
        } finally {
            setLoading(false);
        }
    };

    const handleRetry = () => {
        if (query) {
            handleSubmit({ preventDefault: () => { } });
        }
    };

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
                                    Policy Advisor
                                </h1>
                                <p className="text-sm text-gray-600 mt-0.5">
                                    AI-powered policy advice for government regulations
                                </p>
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

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Input Form */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Policy Query <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="e.g., What are my rights if my flight is canceled?"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Additional Context <span className="text-gray-500 text-xs">(Optional)</span>
                            </label>
                            <textarea
                                value={context}
                                onChange={(e) => setContext(e.target.value)}
                                placeholder="e.g., The flight was canceled due to operational issues"
                                rows={4}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none text-gray-900"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex-1 bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Search className="w-5 h-5" />
                                        Get Policy Advice
                                    </>
                                )}
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
                            <button
                                onClick={handleRetry}
                                className="mt-2 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                            >
                                <Loader2 className="w-4 h-4" />
                                Retry
                            </button>
                        </div>
                    </div>
                )}

                {/* Policy Advice Results */}
                {response && (
                    <div className="space-y-6">
                        {/* Policy Advice Content */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="border-b border-gray-200 px-6 py-4 flex items-center gap-3">
                                <FileText className="w-5 h-5 text-gray-700" />
                                <h2 className="text-xl font-semibold text-gray-900">Policy Advice</h2>
                            </div>

                            <div className="p-6 sm:p-8">
                                <p className="text-gray-700 leading-relaxed">{response.answer}</p>
                            </div>
                        </div>

                        {/* Sources */}
                        {response.sources && response.sources.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="border-b border-gray-200 px-6 py-4 flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-gray-700" />
                                    <h2 className="text-xl font-semibold text-gray-900">Sources & References</h2>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-3">
                                        {response.sources.map((source, idx) => (
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
                                                        {source.document_title || source.url}
                                                    </a>
                                                    <p className="text-sm text-gray-500 mt-1 break-all">{source.excerpt}</p>
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
            </main>
        </div>
    );
}