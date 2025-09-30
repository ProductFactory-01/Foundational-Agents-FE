
import React from 'react';
import { Search, Sparkles, MessageSquareDot, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const handleV1Click = () => {
        navigate('/deep-research');
    };

    const handleV2Click = () => {
        navigate('/deep-research-v2');
    };

    const handleV3Click = () => {
        navigate('/policy-suggest');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2.5 rounded-lg">
                            <Search className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Agents Platform
                            </h1>
                            <p className="text-sm text-gray-600 mt-0.5">
                                Select your AI-powered research or policy experience
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* V1 Card */}
                    <div
                        onClick={handleV1Click}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Search className="w-6 h-6 text-gray-600" />
                            <h2 className="text-xl font-semibold text-gray-900">Deep Search V1</h2>
                        </div>
                        <div className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded mb-4">
                            Version 1
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            Agent tool-calling method for comprehensive research.
                        </p>
                        <ul className="space-y-2 mb-4 text-sm text-gray-600">
                            <li className="flex items-center gap-2">✓ Source citations</li>
                            <li className="flex items-center gap-2">✓ Video recommendations</li>
                            <li className="flex items-center gap-2">✓ Customizable depth</li>
                        </ul>
                        <button className="w-full bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            Try Agent
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* V2 Card */}
                    <div
                        onClick={handleV2Click}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-6 h-6 text-gray-600" />
                            <h2 className="text-xl font-semibold text-gray-900">Deep Search V2</h2>
                        </div>
                        <div className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded mb-4">
                            Version 2 - New
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            Enhanced agent executor for advanced research tasks.
                        </p>
                        <ul className="space-y-2 mb-4 text-sm text-gray-600">
                            <li className="flex items-center gap-2">✓ Source citations</li>
                            <li className="flex items-center gap-2">✓ Video recommendations</li>
                            <li className="flex items-center gap-2">✓ Customizable depth</li>
                        </ul>
                        <button className="w-full bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            Try Agent
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* V3 Card (Policy Suggestion) */}
                    <div
                        onClick={handleV3Click}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <MessageSquareDot className="w-6 h-6 text-gray-600" />
                            <h2 className="text-xl font-semibold text-gray-900">Policy Suggestion</h2>
                        </div>
                        <div className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded mb-4">
                            Version 1
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            AI-driven policy recommendations and guidelines.
                        </p>
                        <ul className="space-y-2 mb-4 text-sm text-gray-600">
                            <li className="flex items-center gap-2">✓ Policy recommendation</li>
                            <li className="flex items-center gap-2">✓ Proposed policy</li>
                            <li className="flex items-center gap-2">✓ Guideline proposal</li>
                        </ul>
                        <button className="w-full bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            Try Agent
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Info Section (Commented Out) */}
                {/* <div className="mt-8 text-center max-w-xl mx-auto">
          <p className="text-sm text-gray-600">
            Not sure which to choose? Try <span className="font-medium text-gray-900">V1</span> for detailed research, <span className="font-medium text-gray-900">V2</span> for advanced features, or <span className="font-medium text-gray-900">Policy Suggestion</span> for policy advice.
          </p>
        </div> */}
            </main>
        </div>
    );
}