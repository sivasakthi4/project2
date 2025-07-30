// Code execution utilities
export const executeJavaScript = (code: string): { output: string; error: string } => {
  try {
    // Capture console.log output
    const logs: string[] = [];
    const originalLog = console.log;
    
    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };

    // Execute the code
    const result = eval(code);
    
    // Restore console.log
    console.log = originalLog;
    
    // Combine logs and result
    let output = logs.join('\n');
    if (result !== undefined && logs.length === 0) {
      output = String(result);
    }
    
    return { output: output || 'Code executed successfully', error: '' };
  } catch (err) {
    return { 
      output: '', 
      error: err instanceof Error ? err.message : String(err) 
    };
  }
};

export const executePython = (code: string): { output: string; error: string } => {
  // Simulate Python execution for demo purposes
  // In a real implementation, you'd use Pyodide or a backend service
  try {
    // Simple pattern matching for common Python constructs
    if (code.includes('print(')) {
      const printMatches = code.match(/print\((.*?)\)/g);
      if (printMatches) {
        const outputs = printMatches.map(match => {
          const content = match.replace(/print\((.*?)\)/, '$1');
          // Remove quotes if it's a string literal
          return content.replace(/^['"]|['"]$/g, '');
        });
        return { output: outputs.join('\n'), error: '' };
      }
    }
    
    return { 
      output: 'Python execution simulated successfully.\n(Note: Full Python support requires backend integration)', 
      error: '' 
    };
  } catch (err) {
    return { 
      output: '', 
      error: 'Python execution error (simulated)' 
    };
  }
};

export const executeJava = (code: string): { output: string; error: string } => {
  // Simulate Java execution for demo purposes
  // In a real implementation, you'd need a backend Java compiler
  try {
    if (code.includes('System.out.print')) {
      const printMatches = code.match(/System\.out\.print(?:ln)?\((.*?)\)/g);
      if (printMatches) {
        const outputs = printMatches.map(match => {
          const content = match.replace(/System\.out\.print(?:ln)?\((.*?)\)/, '$1');
          return content.replace(/^"|"$/g, '');
        });
        return { output: outputs.join('\n'), error: '' };
      }
    }
    
    return { 
      output: 'Java compilation and execution simulated successfully.\n(Note: Full Java support requires backend integration)', 
      error: '' 
    };
  } catch (err) {
    return { 
      output: '', 
      error: 'Java compilation error (simulated)' 
    };
  }
};

export const executeHTML = (code: string): string => {
  return code;
};

export const executeCSS = (code: string): string => {
  return `<style>${code}</style><div class="demo-content"><h1>CSS Preview</h1><p>Your styles are applied to this content.</p><button>Sample Button</button></div>`;
};