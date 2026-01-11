import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Removefrompaste } from '../redux/pasteSlice';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';
import { 
  Copy, 
  Download, 
  Edit, 
  Trash2, 
  Share2, 
  Calendar, 
  Tag, 
  FileText,
  Code,
  Hash,
  Sparkles,
  ArrowLeft,
  Eye,
  QrCode,
  Languages
} from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode';
import { exportSnippetToPDF } from '../utils/pdfExport';
import { getSyntaxHighlighterLanguage, getLanguageName, detectLanguage } from '../utils/languageDetection';

const ViewPaste = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
  const pastes = useSelector(state => state.paste.pastes);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [showQR, setShowQR] = useState(false);
  
  const paste = pastes.find(p => p.id === id);

  useEffect(() => {
    if (paste) {
      // Generate QR code for the current URL
      const currentUrl = window.location.href;
      QRCode.toDataURL(currentUrl)
        .then(url => setQrCodeUrl(url))
        .catch(err => console.error('QR Code generation failed:', err));
    }
  }, [paste]);

  if (!paste) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h2>Paste Not Found</h2>
          <p>The paste you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} className="me-2" />
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this paste?')) {
      try {
        dispatch(Removefrompaste(id));
        navigate('/');
      } catch (error) {
        console.error('Error deleting paste:', error);
        toast.error('Failed to delete paste. Please try again.');
      }
    }
  };

  const handleCopy = () => {
    toast.success('Content copied to clipboard!');
  };

  const handleDownload = () => {
    try {
      const element = document.createElement('a');
      const file = new Blob([paste.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      const extension = paste.language && paste.language !== 'text' 
        ? (paste.language === 'javascript' ? '.js' : 
           paste.language === 'python' ? '.py' :
           paste.language === 'java' ? '.java' :
           paste.language === 'html' ? '.html' :
           paste.language === 'css' ? '.css' : '.txt')
        : '.txt';
      element.download = `${(paste.title || 'snippet').replace(/[^a-z0-9]/gi, '_').toLowerCase()}${extension}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      URL.revokeObjectURL(element.href);
      toast.success('File downloaded successfully!');
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file. Please try again.');
    }
  };

  const handleExportPDF = async () => {
    try {
      toast.loading('Generating PDF...', { id: 'pdf-export' });
      await exportSnippetToPDF(paste, isDarkMode ? 'dark' : 'light');
      toast.success('PDF exported successfully!', { id: 'pdf-export' });
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export PDF. Please try again.', { id: 'pdf-export' });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: paste.title,
          text: paste.content.substring(0, 200),
          url: window.location.href,
        });
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success('URL copied to clipboard!');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
        // Fallback: copy URL to clipboard
        try {
          await navigator.clipboard.writeText(window.location.href);
          toast.success('URL copied to clipboard!');
        } catch (clipboardError) {
          toast.error('Failed to share. Please copy the URL manually.');
        }
      }
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="view-paste-container">
      <div className="container py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/" className="btn btn-outline-secondary">
            <ArrowLeft size={16} className="me-2" />
            Back to Home
          </Link>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-outline-info"
              onClick={() => setShowQR(!showQR)}
            >
              <QrCode size={16} className="me-2" />
              QR Code
            </button>
            <CopyToClipboard text={paste.content} onCopy={handleCopy}>
              <button className="btn btn-outline-primary">
                <Copy size={16} className="me-2" />
                Copy
              </button>
            </CopyToClipboard>
            <button className="btn btn-outline-success" onClick={handleDownload}>
              <Download size={16} className="me-2" />
              Download
            </button>
            <button className="btn btn-outline-info" onClick={handleExportPDF}>
              <FileText size={16} className="me-2" />
              Export PDF
            </button>
            <button className="btn btn-outline-warning" onClick={handleShare}>
              <Share2 size={16} className="me-2" />
              Share
            </button>
            <Link to="/" state={{ editPaste: paste }} className="btn btn-outline-secondary">
              <Edit size={16} className="me-2" />
              Edit
            </Link>
            <button className="btn btn-outline-danger" onClick={handleDelete}>
              <Trash2 size={16} className="me-2" />
              Delete
            </button>
          </div>
        </div>

        {/* QR Code Modal */}
        {showQR && qrCodeUrl && (
          <div className="card mb-4">
            <div className="card-body text-center">
              <h5>QR Code for this Paste</h5>
              <img src={qrCodeUrl} alt="QR Code" className="img-fluid" style={{ maxWidth: '200px' }} />
              <p className="mt-2 text-muted">Scan to view this paste</p>
            </div>
          </div>
        )}

        {/* Paste Details */}
        <div className="modern-card" id="paste-content">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h2 className="card-title mb-2">{paste.title}</h2>
                <div className="d-flex flex-wrap gap-3 text-muted">
                  <span className="d-flex align-items-center">
                    {getCategoryIcon(paste.category)}
                    <span className="ms-1 text-capitalize">{paste.category}</span>
                  </span>
                  {paste.category === 'code' && paste.language && paste.language !== 'text' && (
                    <span className="d-flex align-items-center">
                      <Languages size={16} className="me-1" />
                      {getLanguageName(paste.language)}
                    </span>
                  )}
                  <span className="d-flex align-items-center">
                    <Calendar size={16} className="me-1" />
                    Created: {formatDate(paste.createdAt)}
                  </span>
                  {paste.updatedAt !== paste.createdAt && (
                    <span className="d-flex align-items-center">
                      <Calendar size={16} className="me-1" />
                      Updated: {formatDate(paste.updatedAt)}
                    </span>
                  )}
                </div>
              </div>
              <div className="d-flex align-items-center text-muted">
                <Eye size={16} className="me-1" />
                <span>{paste.content.length} characters</span>
              </div>
            </div>
            
            {/* Tags */}
            {paste.tags && paste.tags.length > 0 && (
              <div className="mt-3">
                <div className="d-flex align-items-center mb-2">
                  <Tag size={16} className="me-2" />
                  <span>Tags:</span>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {paste.tags.map((tag, index) => (
                    <span key={index} className="badge bg-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="card-body">
            {paste.category === 'code' ? (
              <SyntaxHighlighter
                language={getSyntaxHighlighterLanguage(paste.language || detectLanguage(paste.content))}
                style={isDarkMode ? vscDarkPlus : vs}
                customStyle={{
                  margin: 0,
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: isDarkMode ? '#1e1e1e' : '#ffffff',
                }}
                showLineNumbers
                wrapLines
                wrapLongLines
              >
                {paste.content}
              </SyntaxHighlighter>
            ) : (
              <pre className="paste-content" style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: '1.6',
                margin: 0,
                padding: 0,
              }}>{paste.content}</pre>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="stat-card">
              <div className="stat-number">{paste.content.split('\n').length}</div>
              <div className="stat-label">Lines</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <div className="stat-number">{paste.content.split(' ').length}</div>
              <div className="stat-label">Words</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <div className="stat-number">{paste.content.length}</div>
              <div className="stat-label">Characters</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;