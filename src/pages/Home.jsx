
import React from 'react';
import { Search, Sparkles, ArrowRight, MessageSquareDot } from 'lucide-react';

export default function Home() {
    const handleV1Click = () => {
        window.location.href = '/deep-research';
    };

    const handleV2Click = () => {
        window.location.href = '/deep-research-v2';
    };
    const handleV3Click = () => {
        window.location.href = '/policy-suggest';
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Agents Platform
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Select your research experience
                        </p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">

                    {/* V1 Card */}
                    <div
                        onClick={handleV1Click}
                        className="bg-white rounded-md border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer p-5"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Search className="w-5 h-5 text-gray-600" />
                            <h2 className="text-lg font-semibold text-gray-800">Deep Search V1</h2>
                        </div>
                        <div className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded mb-3">
                            Version 1
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                            Agent Tool calling Method.
                        </p>
                        <ul className="space-y-1 mb-3 text-xs text-gray-600">
                            <li className="flex items-center gap-1">✓ Source citations</li>
                            <li className="flex items-center gap-1">✓ Video recommendations</li>
                            <li className="flex items-center gap-1">✓ Customizable depth</li>
                        </ul>
                        <button className="w-full bg-gray-700 text-white text-sm font-medium py-1.5 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-1">
                            Try Agent
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* V2 Card */}
                    <div
                        onClick={handleV2Click}
                        className="bg-white rounded-md border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer p-5"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-5 h-5 text-gray-600" />
                            <h2 className="text-lg font-semibold text-gray-800">Deep Search V2</h2>
                        </div>
                        <div className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded mb-3">
                            Version 2 - New
                        </div>
                        <ul className="space-y-1 mb-3 text-xs text-gray-600">
                            <li className="flex items-center gap-1">✓ Source citations</li>
                            <li className="flex items-center gap-1">✓ Video recommendations</li>
                            <li className="flex items-center gap-1">✓ Customizable depth</li>
                        </ul>
                        <p className="text-gray-600 text-sm mb-3">
                            Working on Agent Executor.
                        </p>

                        <button className="w-full bg-gray-700 text-white text-sm font-medium py-1.5 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-1">
                            Try Agent
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div
                        onClick={handleV3Click}
                        className="bg-white rounded-md border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer p-5"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <MessageSquareDot className="w-5 h-5 text-gray-600" />
                            <h2 className="text-lg font-semibold text-gray-800">Policy Suggestion </h2>
                        </div>
                        <div className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded mb-3">
                            Version 1
                        </div>
                        <ul className="space-y-1 mb-3 text-xs text-gray-600">
                            <li className="flex items-center gap-1">✓ Policy Recommendation</li>
                            <li className="flex items-center gap-1">✓ Proposed Policy</li>
                            <li className="flex items-center gap-1">✓ Guideline Proposal</li>
                        </ul>
                        <p className="text-gray-600 text-sm mb-3">
                            Working on Agent Executor.
                        </p>

                        <button className="w-full bg-gray-700 text-white text-sm font-medium py-1.5 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-1">
                            Try Agent
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Info Section */}
                {/* <div className="mt-6 text-center max-w-lg mx-auto">
                    <p className="text-xs text-gray-500">
                        Not sure which to choose? Try <span className="font-medium text-gray-700">V1</span> for detailed research or <span className="font-medium text-gray-700">V2</span> for new features.
                    </p>
                </div> */}
            </main>
        </div>
    );
}