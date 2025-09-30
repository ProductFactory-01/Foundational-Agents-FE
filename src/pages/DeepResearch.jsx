import React, { useState } from "react";
import axios from "axios";

export default function DeepResearch() {
  const [title, setTitle] = useState("");
  const [brief, setBrief] = useState("");
  const [length, setLength] = useState("medium");
  const [topK, setTopK] = useState(5);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Base URL from environment variable
  const API_BASE_URL = import.meta.env.API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/deep-research`, {
        title,
        brief,
        length,
        top_k: topK,
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch research data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Deep Research Agent
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter research title"
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Brief (Optional)</label>
          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Enter a short brief or context"
            rows={3}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-2">Length</label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block font-semibold mb-2">Top Results</label>
            <input
              type="number"
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              min={1}
              max={20}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Researching..." : "Run Deep Research"}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-600 font-semibold">{error}</div>
      )}

      {result && (
        <div className="mt-8 w-full max-w-3xl space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Research Content</h2>
            <p className="whitespace-pre-line">{result.content}</p>
          </div>

          {result.videos && result.videos.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Top Videos</h2>
              <ul className="list-disc pl-5 space-y-2">
                {result.videos.map((video, idx) => (
                  <li key={idx}>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {video.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.sources && result.sources.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Sources</h2>
              <ul className="list-decimal pl-5 space-y-2">
                {result.sources.map((s, idx) => (
                  <li key={idx}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {s.title || s.snippet || s.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
