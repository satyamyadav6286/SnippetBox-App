import React from 'react';
import { Heart, Code, Github, Mail, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <Code size={18} />
              <span>
                Made with <Heart size={16} color="var(--danger-color)" className="mx-1" /> by{' '}
                <strong>Satyam Govind Yadav</strong>
              </span>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              <a 
                href="https://github.com/satyamyadav6286" 
                target="_blank" 
                rel="noopener noreferrer"
                className="icon-btn"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/satyamgovindyadav/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="icon-btn"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="mailto:satyamyadav6286@gmail.com"
                className="icon-btn"
                title="Email"
              >
                <Mail size={18} />
              </a>
              <span className="text-muted">
                &copy; {new Date().getFullYear()} All Rights Reserved
              </span>
            </div>
          </div>
          
          <div className="text-center mt-3 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
            <small className="text-muted">
              SnippetBox - Your modern paste and code sharing platform
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
