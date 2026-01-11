/**
 * Language detection and configuration utilities
 * Supports multiple programming languages with auto-detection
 */

export const SUPPORTED_LANGUAGES = {
  javascript: { name: 'JavaScript', extension: '.js', aliases: ['js', 'javascript', 'node'] },
  typescript: { name: 'TypeScript', extension: '.ts', aliases: ['ts', 'typescript'] },
  python: { name: 'Python', extension: '.py', aliases: ['py', 'python'] },
  java: { name: 'Java', extension: '.java', aliases: ['java'] },
  cpp: { name: 'C++', extension: '.cpp', aliases: ['cpp', 'c++', 'cc', 'cxx'] },
  c: { name: 'C', extension: '.c', aliases: ['c'] },
  csharp: { name: 'C#', extension: '.cs', aliases: ['cs', 'csharp', 'c#'] },
  html: { name: 'HTML', extension: '.html', aliases: ['html', 'htm'] },
  css: { name: 'CSS', extension: '.css', aliases: ['css'] },
  scss: { name: 'SCSS', extension: '.scss', aliases: ['scss', 'sass'] },
  sql: { name: 'SQL', extension: '.sql', aliases: ['sql'] },
  json: { name: 'JSON', extension: '.json', aliases: ['json'] },
  xml: { name: 'XML', extension: '.xml', aliases: ['xml'] },
  yaml: { name: 'YAML', extension: '.yml', aliases: ['yaml', 'yml'] },
  markdown: { name: 'Markdown', extension: '.md', aliases: ['md', 'markdown'] },
  php: { name: 'PHP', extension: '.php', aliases: ['php'] },
  ruby: { name: 'Ruby', extension: '.rb', aliases: ['rb', 'ruby'] },
  go: { name: 'Go', extension: '.go', aliases: ['go', 'golang'] },
  rust: { name: 'Rust', extension: '.rs', aliases: ['rs', 'rust'] },
  swift: { name: 'Swift', extension: '.swift', aliases: ['swift'] },
  kotlin: { name: 'Kotlin', extension: '.kt', aliases: ['kt', 'kotlin'] },
  bash: { name: 'Bash', extension: '.sh', aliases: ['bash', 'sh', 'shell'] },
  powershell: { name: 'PowerShell', extension: '.ps1', aliases: ['ps1', 'powershell'] },
  dockerfile: { name: 'Dockerfile', extension: '.dockerfile', aliases: ['dockerfile', 'docker'] },
  text: { name: 'Plain Text', extension: '.txt', aliases: ['text', 'txt', 'plain'] },
};

/**
 * Detects programming language from code content
 * Uses heuristics and patterns to identify the language
 */
export const detectLanguage = (content, filename = '') => {
  if (!content || typeof content !== 'string') {
    return 'text';
  }

  const trimmedContent = content.trim();
  if (!trimmedContent) {
    return 'text';
  }

  // Extract file extension from filename if provided
  const fileExt = filename
    ? filename.split('.').pop()?.toLowerCase()
    : null;

  // Language detection patterns (ordered by specificity)
  const patterns = {
    dockerfile: /^FROM\s+\w+/i,
    html: /<html|<div|<body|<head|<!DOCTYPE\s+html/i,
    xml: /<\?xml|<root|<element/i,
    css: /^\s*[\w\-]+\s*\{|@media|@import|@keyframes/i,
    scss: /^\s*[\w\-]+\s*\{|@mixin|@include|\$[\w\-]+:/i,
    javascript: /function\s+\w+|const\s+\w+\s*=|let\s+\w+\s*=|=>\s*\{|console\.(log|error)|require\(|import\s+.*from/i,
    typescript: /interface\s+\w+|type\s+\w+\s*=|:\s*\w+\s*[=;]|import\s+.*from.*['"]/i,
    python: /^def\s+\w+|^import\s+\w+|^from\s+\w+\s+import|print\(|if\s+__name__|^\s*#.*python/i,
    java: /public\s+(class|static|void)|package\s+\w+|import\s+java\.|@Override|System\.out\.println/i,
    cpp: /#include\s*<iostream|#include\s*<vector|using\s+namespace\s+std|std::|cout\s*<<|cin\s*>>/i,
    c: /#include\s*<stdio\.h|#include\s*<stdlib\.h|printf\(|scanf\(/i,
    csharp: /using\s+System|namespace\s+\w+|public\s+class|Console\.WriteLine/i,
    php: /<\?php|<\?=|echo\s+\$|\$\w+\s*=/i,
    ruby: /^\s*def\s+\w+|^require\s+['"]|puts\s+|^\s*#.*ruby|class\s+\w+\s*</i,
    go: /package\s+\w+|func\s+\w+|import\s+\(|fmt\.Print|^\s*\/\/.*go/i,
    rust: /fn\s+\w+|let\s+mut\s+\w+|use\s+\w+::|println!|^\s*\/\/.*rust/i,
    swift: /func\s+\w+|import\s+Foundation|var\s+\w+:|let\s+\w+:/i,
    kotlin: /fun\s+\w+|import\s+\w+\.|println\(|^\s*\/\/.*kotlin/i,
    sql: /SELECT\s+.*FROM|INSERT\s+INTO|UPDATE\s+\w+\s+SET|CREATE\s+TABLE|ALTER\s+TABLE/i,
    json: /^\s*[\{\[]\s*["\']?\w+["\']?\s*:/i,
    yaml: /^[\w\-]+\s*:|\-\s+\w+|^#.*yaml/i,
    markdown: /^#+\s+\w+|^\*\s+\w+|^\[.*\]\(.*\)/i,
    bash: /^#!\/bin\/(bash|sh)|^\$\w+|echo\s+\$|if\s+\[/i,
    powershell: /#Requires\s+-Version|Get-|Set-|Write-Host|\$\w+\s*=/i,
  };

  // Check filename extension first (highest priority)
  if (fileExt) {
    for (const [lang, config] of Object.entries(SUPPORTED_LANGUAGES)) {
      if (config.aliases.includes(fileExt)) {
        return lang;
      }
    }
  }

  // Check patterns (ordered by specificity)
  const patternEntries = Object.entries(patterns).sort((a, b) => {
    // Prioritize more specific patterns
    return b[1].toString().length - a[1].toString().length;
  });

  for (const [lang, pattern] of patternEntries) {
    if (pattern.test(trimmedContent)) {
      return lang;
    }
  }

  // Check first few lines for language hints
  const firstLines = trimmedContent.split('\n').slice(0, 5).join('\n').toLowerCase();
  
  if (firstLines.includes('#!/usr/bin/env python') || firstLines.includes('#!/usr/bin/python')) {
    return 'python';
  }
  if (firstLines.includes('#!/bin/bash') || firstLines.includes('#!/bin/sh')) {
    return 'bash';
  }
  if (firstLines.includes('#!/usr/bin/env node')) {
    return 'javascript';
  }

  // Default to text if no pattern matches
  return 'text';
};

/**
 * Gets language name from language code
 */
export const getLanguageName = (langCode) => {
  return SUPPORTED_LANGUAGES[langCode]?.name || 'Plain Text';
};

/**
 * Gets syntax highlighter language code (maps to react-syntax-highlighter languages)
 */
export const getSyntaxHighlighterLanguage = (langCode) => {
  // Map our language codes to react-syntax-highlighter language codes
  // Note: react-syntax-highlighter uses Prism language names
  const languageMap = {
    javascript: 'javascript',
    typescript: 'typescript',
    python: 'python',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    csharp: 'csharp',
    html: 'markup', // HTML is 'markup' in Prism
    css: 'css',
    scss: 'scss',
    sql: 'sql',
    json: 'json',
    xml: 'markup', // XML is also 'markup' in Prism
    yaml: 'yaml',
    markdown: 'markdown',
    php: 'php',
    ruby: 'ruby',
    go: 'go',
    rust: 'rust',
    swift: 'swift',
    kotlin: 'kotlin',
    bash: 'bash',
    powershell: 'powershell',
    dockerfile: 'docker',
    text: 'text',
  };

  return languageMap[langCode] || 'text';
};

/**
 * Gets list of languages formatted for dropdowns
 */
export const getLanguageOptions = () => {
  return Object.entries(SUPPORTED_LANGUAGES)
    .filter(([code]) => code !== 'text') // Exclude plain text from main list
    .map(([code, config]) => ({
      value: code,
      label: config.name,
      extension: config.extension,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
};
