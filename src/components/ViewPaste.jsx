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
  QrCode
} from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
      dispatch(Removefrompaste(id));
      toast.success('Paste deleted successfully');
      navigate('/');
    }
  };

  const handleCopy = () => {
    toast.success('Content copied to clipboard!');
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([paste.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${paste.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('File downloaded successfully!');
  };

  const handleExportPDF = async () => {
    try {
      const element = document.getElementById('paste-content');
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${paste.title}.pdf`);
      toast.success('PDF exported successfully!');
    } catch (error) {
      toast.error('Failed to export PDF');
      console.error('PDF export error:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: paste.title,
          text: paste.content,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('URL copied to clipboard!');
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
            <Link to={`/paste`} state={{ editPaste: paste }} className="btn btn-outline-secondary">
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
                language="javascript"
                style={isDarkMode ? vscDarkPlus : vs}
                customStyle={{
                  margin: 0,
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                showLineNumbers
              >
                {paste.content}
              </SyntaxHighlighter>
            ) : (
              <pre className="paste-content">{paste.content}</pre>
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