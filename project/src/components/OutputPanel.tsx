import React from 'react';
import { Terminal, Globe, AlertCircle, CheckCircle } from 'lucide-react';

interface OutputPanelProps {
  output: string;
  error: string;
  language: string;
  htmlPreview?: string;
  isRunning: boolean;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ 
  output, 
  error, 
  language, 
  htmlPreview, 
  isRunning 
}) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center space-x-2">
          {language === 'html' ? (
            <Globe className="w-4 h-4 text-blue-600" />
          ) : (
            <Terminal className="w-4 h-4 text-green-600" />
          )}
          <span className="text-sm font-medium text-gray-700">
            {language === 'html' ? 'Live Preview' : 'Output'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {isRunning && (
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Executing...</span>
            </div>
          )}
          {error && (
            <div className="flex items-center space-x-1 text-sm text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span>Error</span>
            </div>
          )}
          {output && !error && !isRunning && (
            <div className="flex items-center space-x-1 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>Success</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {language === 'html' && htmlPreview ? (
          <div className="w-full h-full border border-gray-200 rounded-md">
            <iframe
              srcDoc={htmlPreview}
              className="w-full h-full rounded-md"
              sandbox="allow-scripts"
              title="HTML Preview"
            />
          </div>
        ) : (
          <div className="h-full">
            {error ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <pre className="text-red-700 font-mono text-sm whitespace-pre-wrap">
                  {error}
                </pre>
              </div>
            ) : output ? (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                <pre className="text-gray-800 font-mono text-sm whitespace-pre-wrap">
                  {output}
                </pre>
              </div>
            ) : !isRunning ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Terminal className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Click "Run Code" to see the output</p>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;