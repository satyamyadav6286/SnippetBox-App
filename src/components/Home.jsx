import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Addpaste, Updatepaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Plus, Hash, FileText, Code, Sparkles, Languages, Save } from 'lucide-react';
import { detectLanguage, getLanguageName, getLanguageOptions, SUPPORTED_LANGUAGES } from '../utils/languageDetection';
import { validatePaste } from '../utils/validation';
import CodeEditor from './CodeEditor';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pastes = useSelector(state => state.paste.pastes);
  
  // Check if we're in edit mode
  const editPaste = location.state?.editPaste;
  const isEditMode = !!editPaste;
  
  const [title, setTitle] = useState(editPaste?.title || '');
  const [content, setContent] = useState(editPaste?.content || '');
  const [category, setCategory] = useState(editPaste?.category || 'text');
  const [language, setLanguage] = useState(editPaste?.language || 'text');
  const [tags, setTags] = useState(editPaste?.tags || []);
  const [tagInput, setTagInput] = useState('');

  // Initialize form when editPaste changes
  useEffect(() => {
    if (editPaste) {
      setTitle(editPaste.title || '');
      setContent(editPaste.content || '');
      setCategory(editPaste.category || 'text');
      setLanguage(editPaste.language || 'text');
      setTags(editPaste.tags || []);
    }
  }, [editPaste]);

  // Auto-detect language when content or category changes
  useEffect(() => {
    if (category === 'code' && content.trim()) {
      const detected = detectLanguage(content);
      setLanguage(detected);
    } else if (category !== 'code') {
      setLanguage('text');
    }
  }, [content, category]);

  const handleAddPaste = () => {
    // Validate input
    const paste = {
      title: title.trim(),
      content: content.trim(),
      category,
      language: category === 'code' ? language : 'text',
      tags,
    };

    const validation = validatePaste(paste);
    if (!validation.valid) {
      toast.error(validation.errors[0] || 'Please check your input');
      return;
    }

    try {
      if (isEditMode && editPaste?.id) {
        // Update existing paste
        dispatch(Updatepaste({
          id: editPaste.id,
          newPaste: {
            ...editPaste,
            ...paste,
            // Preserve createdAt
            createdAt: editPaste.createdAt,
          }
        }));
        // Clear edit state and reset form
        navigate('/', { replace: true, state: null });
        setTitle('');
        setContent('');
        setCategory('text');
        setLanguage('text');
        setTags([]);
        setTagInput('');
      } else {
        // Create new paste
        const newPaste = {
          id: Date.now().toString(),
          ...paste,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        dispatch(Addpaste(newPaste));
        setTitle('');
        setContent('');
        setCategory('text');
        setLanguage('text');
        setTags([]);
        setTagInput('');
      }
    } catch (error) {
      console.error('Error saving paste:', error);
      toast.error('Failed to save paste. Please try again.');
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const categories = [
    { value: 'text', label: 'Text', icon: FileText },
    { value: 'code', label: 'Code', icon: Code },
    { value: 'note', label: 'Note', icon: Hash },
    { value: 'other', label: 'Other', icon: Sparkles }
  ];

  const languageOptions = getLanguageOptions();

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    if (newCategory !== 'code') {
      setLanguage('text');
    } else if (content.trim()) {
      // Auto-detect language when switching to code category
      const detected = detectLanguage(content);
      setLanguage(detected);
    }
  };

  return (
    <div className="create-paste-container">
      <div className="modern-card fade-in">
        <div className="page-header">
          <h1 className="page-title">{isEditMode ? 'Edit Paste' : 'Create New Paste'}</h1>
          <p className="page-subtitle">
            {isEditMode 
              ? 'Update your code, notes, and text snippets'
              : 'Share your code, notes, and text snippets with the world'
            }
          </p>
        </div>

        <div className="container" style={{ padding: '2rem' }}>
          {/* Stats Overview */}
          <div className="stats-container mb-4">
            <div className="stat-card">
              <div className="stat-number">{pastes.length}</div>
              <div className="stat-label">Total Pastes</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {pastes.filter(p => p.category === 'code').length}
              </div>
              <div className="stat-label">Code Snippets</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {pastes.filter(p => {
                  const now = new Date();
                  const created = new Date(p.createdAt);
                  return now - created < 24 * 60 * 60 * 1000;
                }).length}
              </div>
              <div className="stat-label">Today</div>
            </div>
          </div>

          {/* Title Input */}
          <div className="mb-4">
            <label className="form-label fw-bold">
              <FileText size={16} className="me-2" />
              Title
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter a descriptive title for your paste..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
            <small className="text-muted">{title.length}/100 characters</small>
          </div>

          {/* Category Selection */}
          <div className="mb-4">
            <label className="form-label fw-bold">
              <Hash size={16} className="me-2" />
              Category
            </label>
            <div className="d-flex flex-wrap gap-2">
              {categories.map(cat => {
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    className={`btn ${category === cat.value ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleCategoryChange(cat.value)}
                  >
                    <IconComponent size={16} />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Selection (only for code category) */}
          {category === 'code' && (
            <div className="mb-4">
              <label className="form-label fw-bold">
                <Languages size={16} className="me-2" />
                Programming Language
              </label>
              <select
                className="form-control"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="text">Auto-detect</option>
                {languageOptions.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <small className="text-muted">
                {language !== 'text' 
                  ? `Selected: ${getLanguageName(language)}`
                  : 'Language will be auto-detected from code content'}
              </small>
            </div>
          )}

          {/* Tags Input */}
          <div className="mb-4">
            <label className="form-label fw-bold">
              <Hash size={16} className="me-2" />
              Tags
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Add tags and press Enter..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleAddTag}
            />
            <div className="tag-input mt-2">
              {tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: 'white', 
                      marginLeft: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Content Editor */}
          <div className="mb-4">
            <label className="form-label fw-bold">
              <Code size={16} className="me-2" />
              Content
            </label>
            {category === 'code' ? (
              <CodeEditor
                value={content}
                onChange={(value) => setContent(value)}
                language={language !== 'text' ? language : 'javascript'}
                placeholder="Paste your code here...

Tips:
• Use proper indentation
• Add comments to explain complex parts
• Include examples if helpful"
                minHeight="300px"
                maxHeight="600px"
              />
            ) : (
              <textarea
                className="form-control"
                rows="12"
                placeholder="Paste your text or notes here...
              
Tips:
• Use clear formatting
• Add structure with headings
• Include examples if helpful"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
              />
            )}
            <small className="text-muted mt-2 d-block">
              {content.length} characters | {content.split('\n').length} lines
              {category === 'code' && language !== 'text' && (
                <span className="ms-2">
                  | Language: {getLanguageName(language)}
                </span>
              )}
            </small>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2">
              <button 
                className="btn btn-primary" 
                onClick={handleAddPaste}
                disabled={!title.trim() || !content.trim()}
              >
                {isEditMode ? (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Create Paste
                  </>
                )}
              </button>
              {isEditMode && (
                <button 
                  className="btn btn-secondary" 
                  onClick={() => {
                    navigate('/', { replace: true, state: null });
                    setTitle('');
                    setContent('');
                    setCategory('text');
                    setLanguage('text');
                    setTags([]);
                    setTagInput('');
                  }}
                >
                  Cancel
                </button>
              )}
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setTitle('');
                  setContent('');
                  setCategory('text');
                  setLanguage('text');
                  setTags([]);
                  setTagInput('');
                }}
              >
                Clear All
              </button>
            </div>
            
            <div className="text-muted small">
              Preview as you type
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
