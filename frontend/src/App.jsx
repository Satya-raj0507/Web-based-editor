import React, { useState } from "react";
import CodeGenerator from "./components/CodeGenerator";
import ProblemSolver from "./components/ProblemSolver";

function App() {
  const [activeTab, setActiveTab] = useState("generator");

  const tabStyle = "px-6 py-2 rounded-md font-semibold transition-all duration-300 focus:outline-none";
  const activeTabStyle = "bg-blue-600 text-white shadow-lg";
  const inactiveTabStyle = "bg-gray-700 text-gray-300 hover:bg-gray-600";

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">AI Dev Assistant</h1>
        <p className="text-gray-400 mt-2">Your AI-powered partner for coding and problem-solving.</p>
      </header>
      <div className="bg-gray-800 p-2 rounded-lg mb-8 shadow-md flex space-x-2">
        <button
          onClick={() => setActiveTab("generator")}
          className={`${tabStyle} ${activeTab === "generator" ? activeTabStyle : inactiveTabStyle}`}
        > Code Generator </button>
        <button
          onClick={() => setActiveTab("solver")}
          className={`${tabStyle} ${activeTab === "solver" ? activeTabStyle : inactiveTabStyle}`}
        > Problem Solver </button>
      </div>
      <main className="w-full max-w-4xl">
        {activeTab === "generator" ? <CodeGenerator /> : <ProblemSolver />}
      </main>
    </div>
  );
}

export default App;