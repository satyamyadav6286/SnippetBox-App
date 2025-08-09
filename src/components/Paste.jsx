import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Resetpaste } from "../redux/pasteSlice";
import { 
  Search, 
  Filter, 
  RotateCcw, 
  FileText, 
  Code, 
  Hash, 
  Sparkles,
  Calendar,
  Eye,
  Edit3,
  Trash2
} from 'lucide-react';

const Paste = () => {
  const dispatch = useDispatch();
  const pastes = useSelector(state => state.paste.pastes);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleReset = () => {
    dispatch(Resetpaste());
    setShowConfirmReset(false);
  };

  const categories = [
    { value: 'all', label: 'All', icon: Filter },
    { value: 'text', label: 'Text', icon: FileText },
    { value: 'code', label: 'Code', icon: Code },
    { value: 'note', label: 'Note', icon: Hash },
    { value: 'other', label: 'Other', icon: Sparkles }
  ];

  const filteredAndSortedPastes = useMemo(() => {
    let filtered = pastes.filter(paste => {
      const matchesSearch = paste.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           paste.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (paste.tags && paste.tags.some(tag => 
                             tag.toLowerCase().includes(searchTerm.toLowerCase())
                           ));
      
      const matchesCategory = selectedCategory === 'all' || 
                             (paste.category || 'text') === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort pastes
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'updated':
        filtered.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
        break;
      default:
        break;
    }

    return filtered;
  }, [pastes, searchTerm, selectedCategory, sortBy]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hour${Math.floor(diffInHours) !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)} day${Math.floor(diffInHours / 24) !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'code': return <Code size={16} />;
      case 'note': return <Hash size={16} />;
      case 'other': return <Sparkles size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <div className="paste-list-container">
      <div className="modern-card fade-in">
        <div className="page-header">
          <h1 className="page-title">My Pastes</h1>
          <p className="page-subtitle">
            Manage and organize your code snippets and notes
          </p>
        </div>

        <div style={{ padding: '2rem' }}>
          {/* Controls */}
          <div className="paste-controls">
            <div className="search-container">
              <div className="position-relative">
                <Search 
                  size={20} 
                  style={{ 
                    position: 'absolute', 
                    left: '1rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: 'var(--text-secondary)'
                  }} 
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search pastes by title, content, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: '3rem' }}
                />
              </div>
            </div>

            <div className="d-flex gap-2 flex-wrap">
              {/* Category Filter */}
              <select
                className="form-control"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ width: 'auto', minWidth: '120px' }}
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>

              {/* Sort Options */}
              <select
                className="form-control"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ width: 'auto', minWidth: '120px' }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="updated">Recently Updated</option>
                <option value="title">Title A-Z</option>
              </select>

              {/* Reset Button */}
              {!showConfirmReset ? (
                <button 
                  className="btn btn-danger"
                  onClick={() => setShowConfirmReset(true)}
                  disabled={pastes.length === 0}
                >
                  <RotateCcw size={16} />
                  Reset All
                </button>
              ) : (
                <div className="d-flex gap-1">
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={handleReset}
                  >
                    Confirm
                  </button>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowConfirmReset(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-3">
            <small className="text-muted">
              Showing {filteredAndSortedPastes.length} of {pastes.length} pastes
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedCategory !== 'all' && ` in ${selectedCategory} category`}
            </small>
          </div>

          {/* Paste List */}
          {filteredAndSortedPastes.length > 0 ? (
            <div>
              {filteredAndSortedPastes.map(paste => (
                <div key={paste.id} className="paste-item">
                  <div className="paste-header d-flex justify-content-between align-items-start mb-2">
                    <div className="d-flex align-items-center gap-2">
                      {getCategoryIcon(paste.category || 'text')}
                      <h3 className="paste-title mb-0">{paste.title}</h3>
                    </div>
                    <span className="badge bg-secondary">
                      {(paste.category || 'text').toUpperCase()}
                    </span>
                  </div>

                  <p className="paste-content-preview">
                    {paste.content.slice(0, 150)}
                    {paste.content.length > 150 && '...'}
                  </p>

                  {/* Tags */}
                  {paste.tags && paste.tags.length > 0 && (
                    <div className="mb-2">
                      {paste.tags.map(tag => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="paste-meta">
                    <div className="d-flex align-items-center gap-3 text-muted small">
                      <span className="d-flex align-items-center gap-1">
                        <Calendar size={14} />
                        Created {formatDate(paste.createdAt)}
                      </span>
                      {paste.updatedAt && paste.updatedAt !== paste.createdAt && (
                        <span className="d-flex align-items-center gap-1">
                          <Edit3 size={14} />
                          Updated {formatDate(paste.updatedAt)}
                        </span>
                      )}
                      <span>
                        {paste.content.length} chars
                      </span>
                    </div>

                    <div className="paste-actions">
                      <Link 
                        to={`/paste/${paste.id}`} 
                        className="btn btn-info btn-sm"
                      >
                        <Eye size={14} />
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-pastes">
              <div className="no-pastes-icon">
                📄
              </div>
              <h3 className="no-pastes-text">
                {pastes.length === 0 
                  ? "No pastes yet" 
                  : "No pastes match your search"
                }
              </h3>
              <p className="text-muted">
                {pastes.length === 0 
                  ? "Create your first paste to get started!" 
                  : "Try adjusting your search terms or filters"
                }
              </p>
              {pastes.length === 0 && (
                <Link to="/" className="btn btn-primary">
                  Create Your First Paste
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
