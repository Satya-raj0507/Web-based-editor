import React, { useState } from "react";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import Spinner from "./Spinner";


const languageOptions = {
  javascript: { name: "JavaScript", extension: javascript() },
  python: { name: "Python", extension: python() },
  java: { name: "Java", extension: java() },
  cpp: { name: "C++", extension: cpp() },
};

const CodeGenerator = () => {
  const [pseudocode, setPseudocode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!pseudocode.trim()) {
      setError("Please enter some pseudocode.");
      return;
    }
    setLoading(true); setError(""); setGeneratedCode("");
    try {
      const response = await axios.post("http://localhost:5000/generate", { pseudocode, language });
      setGeneratedCode(response.data.code);
    } catch (err) {
      setError(err.response?.data?.error || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-white">Your Pseudocode</h2>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              {Object.entries(languageOptions).map(([key, value]) => (<option key={key} value={key}>{value.name}</option>))}
            </select>
          </div>
          <CodeMirror value={pseudocode} height="300px" theme="dark" extensions={[languageOptions[language].extension]} onChange={(value) => setPseudocode(value)} className="border border-gray-700 rounded-md"/>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
          <h2 className="text-lg font-semibold text-white mb-2">Generated Code</h2>
          <CodeMirror value={generatedCode} height="300px" theme="dark" extensions={[languageOptions[language].extension]} readOnly className="border border-gray-700 rounded-md"/>
        </div>
      </div>
      <div className="text-center">
        <button onClick={handleGenerate} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center mx-auto">
          {loading ? <Spinner /> : "✨ Generate Code"}
        </button>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
    </div>
  );
};
export default CodeGenerator;