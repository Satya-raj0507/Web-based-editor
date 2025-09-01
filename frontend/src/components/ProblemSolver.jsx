import React, { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const ProblemSolver = () => {
    const [problemStatement, setProblemStatement] = useState("");
    const [solution, setSolution] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSolve = async () => {
        if (!problemStatement.trim()) {
            setError("Please enter a problem statement.");
            return;
        }
        setLoading(true); setError(""); setSolution("");
        try {
            const response = await axios.post("http://localhost:5000/solve", { problemStatement });
            setSolution(response.data.solution);
        } catch (err) {
            setError(err.response?.data?.error || "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
                <h2 className="text-lg font-semibold text-white mb-2">Your Problem Statement</h2>
                <textarea value={problemStatement} onChange={(e) => setProblemStatement(e.target.value)} placeholder="e.g., Explain the difference between bubble sort and quick sort..." className="w-full h-32 p-3 bg-gray-900 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"/>
            </div>
            <div className="text-center">
                <button onClick={handleSolve} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center mx-auto">
                    {loading ? <Spinner /> : "🧠 Get Solution"}
                </button>
                {error && <p className="text-red-400 mt-4">{error}</p>}
            </div>
            {solution && (
                 <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
                    <h2 className="text-lg font-semibold text-white mb-2">AI Generated Solution</h2>
                    <div className="prose prose-invert max-w-none p-3 bg-gray-900 border border-gray-700 rounded-md text-gray-200" dangerouslySetInnerHTML={{ __html: solution.replace(/\n/g, '<br />') }}/>
                </div>
            )}
        </div>
    );
};
export default ProblemSolver;