import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Addpaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Plus, Hash, FileText, Code, Sparkles } from 'lucide-react';

const Home = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('text');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const dispatch = useDispatch();
  const pastes = useSelector(state => state.paste.pastes);

  const handleAddPaste = () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Title and Content are required');
      return;
    }

    const paste = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(Addpaste(paste));
    setTitle('');
    setContent('');
    setCategory('text');
    setTags([]);
    setTagInput('');
    toast.success('Paste created successfully! 🎉');
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

  return (
    <div className="create-paste-container">
      <div className="modern-card fade-in">
        <div className="page-header">
          <h1 className="page-title">Create New Paste</h1>
          <p className="page-subtitle">
            Share your code, notes, and text snippets with the world
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
                    onClick={() => setCategory(cat.value)}
                  >
                    <IconComponent size={16} />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

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

          {/* Content Textarea */}
          <div className="mb-4">
            <label className="form-label fw-bold">
              <Code size={16} className="me-2" />
              Content
            </label>
            <textarea
              className="form-control"
              rows="12"
              placeholder="Paste your code, text, or notes here...
              
Tips:
• Use proper indentation for code
• Add comments to explain complex parts
• Include examples if helpful"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
            />
            <small className="text-muted">
              {content.length} characters | {content.split('\n').length} lines
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
                <Plus size={16} />
                Create Paste
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setTitle('');
                  setContent('');
                  setCategory('text');
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
