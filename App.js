// src/App.js
import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { FaCode, FaPlay, FaSave, FaFile, FaMagic, FaHistory, FaPlus, FaUpload, FaShare, FaProjectDiagram, FaCog, FaUser, FaBug } from 'react-icons/fa';
import './App.css';

function App() {
  const [code, setCode] = useState(`FUNCTION main()\n  INPUT number\n  IF number > 10 THEN\n    PRINT "Large number"\n  ELSE\n    PRINT "Small number"\n  ENDIF\nENDFUNCTION`);
  const [output, setOutput] = useState('> Ready to execute code...');
  const [files] = useState(['sorting.pseudo', 'api-integration.pseudo']);
  const [targetLanguage, setTargetLanguage] = useState('python');
  const [generatedCode, setGeneratedCode] = useState('');
  const [logs, setLogs] = useState([]);
  const editorRef = useRef(null);

  const languages = [
    { value: 'python', name: 'Python' },
    { value: 'javascript', name: 'JavaScript' },
    { value: 'java', name: 'Java' },
    { value: 'C++', name: 'C++' },
    { value: 'C', name: 'C' }
  ];

  const convertPseudocode = () => {
    // Previous conversion logic remains the same
    // ...
  };

  const handleRunCode = async () => {
    setLogs([]);
    setOutput('Running code...');
    
    try {
      // WARNING: This is a simplified example - use a sandboxed environment in production!
      if (targetLanguage === 'javascript') {
        const logMessages = [];
        const originalConsole = console.log;
        
        console.log = (...args) => {
          logMessages.push(args.join(' '));
          originalConsole(...args);
        };

        // Create a safe execution context
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        new AsyncFunction(generatedCode)();
        
        console.log = originalConsole;
        setLogs(logMessages);
        setOutput('Execution completed successfully');
      } else {
        setOutput('Code execution for this language requires backend integration');
      }
    } catch (error) {
      setLogs([`Error: ${error.message}`]);
      setOutput('Execution failed');
    }
  };

  return (
    <div className="app">
      {/* Header remains same */}

      <div className="container">
        {/* Sidebar remains same */}

        <main className="main-editor">
          <div className="toolbar">
            <select 
              className="language-select"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.name}
                </option>
              ))}
            </select>

            <button className="toolbar-button" onClick={convertPseudocode}>
              <FaCode /> Generate {targetLanguage.toUpperCase()}
            </button>

            <button className="toolbar-button" onClick={handleRunCode}>
              <FaPlay /> Run Code
            </button>
          </div>

          <div className="editor-container">
            <div className="pseudocode-editor">
              <h4>Pseudocode Input</h4>
              <Editor
                height="40vh"
                defaultLanguage="plaintext"
                theme="vs-light"
                value={code}
                onChange={(value) => setCode(value || '')}
              />
            </div>

            <div className="generated-code">
              <h4>Generated {targetLanguage.toUpperCase()} Code</h4>
              <Editor
                height="40vh"
                language={targetLanguage}
                theme="vs-dark"
                value={generatedCode}
                options={{ readOnly: true }}
                onMount={(editor) => (editorRef.current = editor)}
              />
            </div>
          </div>

          <div className="console">
            <div className="console-title">Execution Output</div>
            <div className="logs">
              {logs.map((log, index) => (
                <pre key={index}>{log}</pre>
              ))}
            </div>
            <div className="status">{output}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;