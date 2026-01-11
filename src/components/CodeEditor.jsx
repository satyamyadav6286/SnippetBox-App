/**
 * CodeEditor component using CodeMirror for VS Code-like editing experience
 * Supports syntax highlighting, line numbers, and theme switching
 */
import React, { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { useTheme } from '../contexts/ThemeContext';

// Language support
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { sql } from '@codemirror/lang-sql';
import { json } from '@codemirror/lang-json';
import { xml } from '@codemirror/lang-xml';
import { markdown } from '@codemirror/lang-markdown';
import { rust } from '@codemirror/lang-rust';
import { go } from '@codemirror/lang-go';
import { php } from '@codemirror/lang-php';

import { getSyntaxHighlighterLanguage } from '../utils/languageDetection';

/**
 * Maps language codes to CodeMirror language extensions
 */
const getLanguageExtension = (langCode) => {
  const languageMap = {
    javascript: javascript({ jsx: true }),
    typescript: javascript({ jsx: true, typescript: true }),
    python: python(),
    java: java(),
    cpp: cpp(),
    c: cpp(),
    csharp: cpp(), // C# uses C++ syntax as fallback
    html: html(),
    css: css(),
    scss: css(),
    sql: sql(),
    json: json(),
    xml: xml(),
    markdown: markdown(),
    php: php(),
    rust: rust(),
    go: go(),
    bash: javascript(), // Bash uses JS as fallback
    powershell: javascript(), // PowerShell uses JS as fallback
    dockerfile: javascript(), // Dockerfile uses JS as fallback
    kotlin: javascript(), // Kotlin uses JS as fallback
    swift: javascript(), // Swift uses JS as fallback
    ruby: javascript(), // Ruby uses JS as fallback
    yaml: javascript(), // YAML uses JS as fallback
    text: null, // Plain text
  };

  return languageMap[langCode] || null;
};

const CodeEditor = ({ value, onChange, language = 'text', placeholder = '', readOnly = false, minHeight = '300px', maxHeight = '600px' }) => {
  const { isDarkMode } = useTheme();

  // Get the appropriate language extension
  const languageExtension = useMemo(() => {
    return getLanguageExtension(language);
  }, [language]);

  // Configure extensions
  const extensions = useMemo(() => {
    const exts = [];
    if (languageExtension) {
      exts.push(languageExtension);
    }
    return exts;
  }, [languageExtension]);

  return (
    <div className="code-editor-wrapper" style={{ 
      border: '2px solid var(--border-color)', 
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
    }}>
      <CodeMirror
        value={value}
        height={minHeight}
        minHeight={minHeight}
        maxHeight={maxHeight}
        theme={isDarkMode ? oneDark : undefined}
        extensions={extensions}
        onChange={onChange}
        placeholder={placeholder}
        editable={!readOnly}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          foldGutter: true,
          dropCursor: false,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          highlightActiveLineGutter: true,
        }}
        style={{
          fontSize: '14px',
          fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
        }}
      />
    </div>
  );
};

export default CodeEditor;
