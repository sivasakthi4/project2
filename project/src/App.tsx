import React, { useState, useCallback } from 'react';
import { Code2, Zap, Users, Star } from 'lucide-react';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';
import LanguageSelector from './components/LanguageSelector';
import { codeTemplates } from './data/codeTemplates';
import { 
  executeJavaScript, 
  executePython, 
  executeJava, 
  executeHTML, 
  executeCSS 
} from './utils/codeExecutor';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(codeTemplates.javascript);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [htmlPreview, setHtmlPreview] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = useCallback((language: string) => {
    setSelectedLanguage(language);
    setCode(codeTemplates[language as keyof typeof codeTemplates]);
    setOutput('');
    setError('');
    setHtmlPreview('');
  }, []);

  const executeCode = useCallback(async () => {
    setIsRunning(true);
    setOutput('');
    setError('');
    setHtmlPreview('');

    // Simulate execution delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      switch (selectedLanguage) {
        case 'javascript': {
          const result = executeJavaScript(code);
          setOutput(result.output);
          setError(result.error);
          break;
        }
        case 'python': {
          const result = executePython(code);
          setOutput(result.output);
          setError(result.error);
          break;
        }
        case 'java': {
          const result = executeJava(code);
          setOutput(result.output);
          setError(result.error);
          break;
        }
        case 'html': {
          const preview = executeHTML(code);
          setHtmlPreview(preview);
          setOutput('HTML rendered successfully');
          break;
        }
        case 'css': {
          const preview = executeCSS(code);
          setHtmlPreview(preview);
          setOutput('CSS applied successfully');
          break;
        }
        default:
          setError('Language not supported');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsRunning(false);
    }
  }, [selectedLanguage, code]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CodeRunner</h1>
                <p className="text-sm text-gray-600">Online Code Compiler & Visualizer</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4" />
                  <span>Fast Execution</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>5 Languages</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Live Preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Language Selector */}
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
          />

          {/* Main Editor Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-280px)]">
            {/* Code Editor */}
            <div className="h-full">
              <CodeEditor
                code={code}
                onChange={setCode}
                language={selectedLanguage}
                onRun={executeCode}
                isRunning={isRunning}
              />
            </div>

            {/* Output Panel */}
            <div className="h-full">
              <OutputPanel
                output={output}
                error={error}
                language={selectedLanguage}
                htmlPreview={htmlPreview}
                isRunning={isRunning}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>
              Built with React, TypeScript, and Tailwind CSS. 
              JavaScript runs natively, HTML/CSS renders live.
            </p>
            <p className="mt-1">
              Python and Java execution are simulated for demo purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;