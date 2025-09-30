import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function PolicySuggestionAgent() {
    const [query, setQuery] = useState('');
    const [context, setContext] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const res = await fetch('http://localhost:8000/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, context: context || null }),
            });

            if (!res.ok) {
                throw new Error('Failed to fetch response from server');
            }

            const data = await res.json();
            setResponse(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Policy Advisor
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Get expert policy advice based on your query
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    {/* Query Form */}
                    <div className="bg-white rounded-md border border-gray-100 p-5 mb-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Policy Query
                                </label>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="e.g., What are my rights if my flight is canceled?"
                                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Additional Context (Optional)
                                </label>
                                <textarea
                                    value={context}
                                    onChange={(e) => setContext(e.target.value)}
                                    placeholder="e.g., The flight was canceled due to weather conditions"
                                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-400 resize-none"
                                    rows="3"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gray-700 text-white text-sm font-medium py-2 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Get Advice
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Response Display */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {response && (
                        <div className="bg-white rounded-md border border-gray-100 p-5">
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                Policy Advice
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">{response.answer}</p>
                            <div className="mb-4">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Sources</h3>
                                {response.sources.length > 0 ? (
                                    <ul className="space-y-2">
                                        {response.sources.map((source, index) => (
                                            <li key={index} className="text-xs text-gray-600">
                                                <a
                                                    href={source.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-700 hover:underline"
                                                >
                                                    {source.document_title}
                                                </a>
                                                <p className="text-gray-500">{source.excerpt}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-xs text-gray-500">No sources available</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}