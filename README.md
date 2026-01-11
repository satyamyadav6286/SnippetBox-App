# 📋 SnippetBox

<div align="center">

![SnippetBox Logo](https://img.shields.io/badge/SnippetBox-Code%20Sharing%20Platform-4f9cf9?style=for-the-badge&logo=react&logoColor=white)

**A production-grade, interview-ready developer tool for organizing, reusing, and sharing code snippets efficiently**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![CodeMirror](https://img.shields.io/badge/CodeMirror-6.0-000000?style=flat-square)](https://codemirror.net/)

[🚀 Live Demo](https://snippet-box-app.vercel.app/) • [📖 Documentation](#-features) • [🐛 Report Bug](https://github.com/satyamyadav6286/SnippetBox-App/issues)

</div>

---

## 🌟 Overview

**SnippetBox** is a powerful, production-ready web application designed for developers who need to organize, manage, and share code snippets efficiently. Built with modern React best practices, it features a VS Code-like editing experience, multi-language syntax highlighting, and a clean, responsive interface that works seamlessly across all devices.

The application solves real-world developer problems: organizing code snippets, reusing code across projects, and sharing snippets with teams—all with a professional, polished interface that demonstrates strong frontend architecture and attention to detail.

---

## ✨ Features

### 🎯 Core Functionality

- **📝 Create & Edit Snippets** - Professional code editor with syntax highlighting
- **🎨 VS Code-like Editor** - CodeMirror integration with 15+ language support
- **🏷️ Smart Categorization** - Organize snippets by type (Code, Text, Note, Other)
- **🔖 Tag System** - Add custom tags for better organization and searchability
- **🔍 Advanced Search & Filter** - Find snippets quickly by title, content, tags, or category
- **📊 Real-time Statistics** - Track your snippet count and activity
- **💾 Local Storage** - Automatic saving with persistent local storage
- **🔄 Full CRUD Operations** - Create, read, update, and delete snippets

### 🎨 Advanced Code Editing

- **✨ Multi-Language Syntax Highlighting** - Supports 25+ programming languages:
  - JavaScript, TypeScript, Python, Java, C++, C, C#
  - HTML, CSS, SCSS, SQL, JSON, XML, YAML
  - Markdown, PHP, Ruby, Go, Rust, Swift, Kotlin
  - Bash, PowerShell, Dockerfile, and more
- **🤖 Auto Language Detection** - Intelligent language detection from code patterns
- **📏 Line Numbers** - Professional code display with line numbers
- **🎨 Theme Support** - Dark and light themes with VS Code-like syntax highlighting
- **📋 Copy-to-Clipboard** - One-click copying of code snippets
- **✏️ Editable Code Blocks** - Professional CodeMirror editor with features:
  - Syntax highlighting in editor
  - Code folding
  - Bracket matching
  - Auto-completion
  - Multiple selections

### 📄 Export & Sharing

- **📄 PDF Export** - High-quality PDF export with:
  - Proper formatting and syntax coloring
  - Headings and metadata
  - Tags and timestamps
  - Page numbers and professional layout
- **⬇️ Download Support** - Export snippets as text files
- **📱 QR Code Generation** - Share snippets via QR codes
- **🔗 Native Sharing** - Use browser's native share API
- **📋 Clipboard Integration** - Easy copy functionality

### 🎨 User Experience

- **🌙 Dark/Light Theme** - Seamless theme switching with persistent preferences
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **⚡ Lightning Fast** - Built with Vite for optimal performance
- **🎭 Modern UI/UX** - Clean, professional interface with smooth animations
- **♿ Accessible** - Built with accessibility in mind
- **🎯 Visual Hierarchy** - Well-organized layout with consistent spacing

### 🔧 Developer Features

- **📅 Timestamp Tracking** - Creation and modification dates
- **📈 Analytics Dashboard** - View usage statistics and trends
- **🎯 State Management** - Powered by Redux Toolkit
- **✅ Input Validation** - Comprehensive validation with error handling
- **🛡️ Error Boundaries** - Graceful error handling and recovery
- **🔒 Data Validation** - Input sanitization and validation

---

## 🛠️ Tech Stack

<div align="center">

| Frontend | Styling | State Management | Code Editor | Build Tool | Deployment |
|----------|---------|------------------|-------------|------------|------------|
| ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) | ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white) | ![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white) | ![CodeMirror](https://img.shields.io/badge/CodeMirror-000000?style=for-the-badge) | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) |

</div>

### 📦 Key Dependencies

#### Core Framework
- **React 18.3.1** - Modern React with hooks and concurrent features
- **React Router DOM 6.28.0** - Client-side routing
- **Redux Toolkit 2.3.0** - Efficient state management
- **React Redux 9.1.2** - React bindings for Redux

#### Code Editing & Syntax Highlighting
- **@uiw/react-codemirror 4.25.4** - Professional code editor component
- **@codemirror/lang-*** - Language support packages (JavaScript, Python, Java, C++, HTML, CSS, SQL, JSON, XML, Markdown, Rust, Go, PHP)
- **@codemirror/theme-one-dark 6.1.3** - Dark theme for CodeMirror
- **react-syntax-highlighter 15.6.1** - Syntax highlighting for code display

#### UI & Styling
- **Bootstrap 5.3.3** - Responsive CSS framework
- **React Bootstrap 2.10.5** - Bootstrap components for React
- **Lucide React 0.539.0** - Beautiful icon library
- **Framer Motion 12.23.12** - Smooth animations

#### Utilities
- **react-hot-toast 2.4.1** - Elegant toast notifications
- **react-copy-to-clipboard 5.1.0** - Copy functionality
- **qrcode 1.5.4** - QR code generation
- **jsPDF 3.0.1** - PDF generation
- **html2canvas 1.4.1** - HTML to canvas conversion

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/satyamyadav6286/SnippetBox-App.git
   cd SnippetBox-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📱 Screenshots

<div align="center">

### 🖥️ Desktop View
![Desktop View 1](src/assets/screenshots/Desktop%20View1.png)
![Desktop View 2](src/assets/screenshots/Desktop%20View2.png)
![Desktop View 3](src/assets/screenshots/Desktop%20View3.png)

### 📱 Mobile View
![Mobile View 1](src/assets/screenshots/Mobile%20View1.jpg)
![Mobile View 2](src/assets/screenshots/Mobile%20View2.jpg)
![Mobile View 3](src/assets/screenshots/Mobile%20View3.jpg)

### 🌙 Dark Mode
![Dark Mode 1](src/assets/screenshots/Dark%20Mode1.png)
![Dark Mode 2](src/assets/screenshots/Dark%20Mode2.png)

</div>

---

## 🎯 Usage

### Creating a Snippet

1. Navigate to the home page or click "Create New Paste"
2. Enter a descriptive title for your snippet (max 200 characters)
3. Select the appropriate category:
   - **Text**: Plain text, notes, documentation
   - **Code**: Programming code snippets
   - **Note**: Quick notes and reminders
   - **Other**: Miscellaneous content
4. For code snippets, select or auto-detect the programming language
5. Add relevant tags for better organization (press Enter after each tag)
6. Paste or type your content in the editor:
   - **Code category**: Uses CodeMirror editor with syntax highlighting
   - **Other categories**: Uses standard textarea
7. Click "Create Paste" to save

### Managing Snippets

#### View Snippets
- Navigate to "My Pastes" to see all your snippets
- Click on any snippet to view the full content with syntax highlighting
- Use search to find snippets by title, content, or tags
- Filter by category (All, Text, Code, Note, Other)
- Sort by: Newest, Oldest, Recently Updated, or Title A-Z

#### Edit Snippets
- Click the "Edit" button on any snippet
- Modify the title, content, category, language, or tags
- Changes are saved with an updated timestamp
- Click "Save Changes" to update

#### Delete Snippets
- Click the "Delete" button on any snippet
- Confirm the deletion
- Snippet is permanently removed

### Advanced Features

#### Export Options
- **Copy**: One-click copy to clipboard
- **Download**: Export as text file with appropriate extension
- **PDF Export**: Generate formatted PDF with:
  - Proper syntax coloring
  - Metadata (title, tags, dates)
  - Professional formatting
  - Page numbers

#### Sharing
- **QR Code**: Generate QR code for easy mobile sharing
- **Native Share**: Use browser's native share API
- **URL Copy**: Copy snippet URL to clipboard

#### Language Detection
- Automatic language detection based on code patterns
- Manual language selection available
- Supports 25+ programming languages

---

## 🏗️ Project Structure

```
SnippetBox-App/
├── src/
│   ├── components/          # React components
│   │   ├── CodeEditor.jsx   # CodeMirror editor component
│   │   ├── Home.jsx         # Create/Edit snippet page
│   │   ├── Paste.jsx        # Snippets list page
│   │   ├── ViewPaste.jsx    # View snippet detail page
│   │   ├── Navbar.jsx       # Navigation component
│   │   ├── Footer.jsx       # Footer component
│   │   └── ErrorBoundary.jsx # Error handling
│   ├── contexts/            # React contexts
│   │   └── ThemeContext.jsx # Theme management
│   ├── redux/               # Redux store
│   │   ├── pasteSlice.js    # Snippets state management
│   │   └── store.js         # Redux store configuration
│   ├── utils/               # Utility functions
│   │   ├── languageDetection.js # Language detection logic
│   │   ├── validation.js    # Input validation
│   │   └── pdfExport.js     # PDF export functionality
│   ├── App.jsx              # Main app component
│   ├── App.css              # Global styles
│   ├── index.css            # Base styles
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── README.md                # Documentation
```

---

## 🎨 Features in Detail

### Code Editor

The application features a professional CodeMirror-based code editor with:

- **Syntax Highlighting**: Real-time syntax highlighting for 15+ languages
- **Line Numbers**: Professional code display with line numbers
- **Code Folding**: Collapse and expand code blocks
- **Bracket Matching**: Visual bracket matching
- **Auto-completion**: Intelligent code completion
- **Multiple Selections**: Select and edit multiple instances
- **Theme Support**: Dark and light themes

### Language Support

Comprehensive language detection and highlighting for:

- **Web**: JavaScript, TypeScript, HTML, CSS, SCSS
- **Backend**: Python, Java, C++, C, C#, PHP, Ruby, Go, Rust
- **Mobile**: Swift, Kotlin
- **Data**: SQL, JSON, XML, YAML
- **DevOps**: Bash, PowerShell, Dockerfile
- **Documentation**: Markdown

### PDF Export

High-quality PDF generation with:

- Formatted code with syntax highlighting
- Metadata including title, tags, and timestamps
- Professional layout with page numbers
- Proper text wrapping and page breaks
- Customizable styling

---

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Code Style

The project follows React best practices:

- Functional components with hooks
- Component-based architecture
- Separation of concerns
- Error handling with error boundaries
- Input validation
- Accessibility considerations

---

## 🚀 Deployment

The application is configured for deployment on Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

The `vercel.json` configuration file handles routing for the SPA.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

**Satyam Govind Yadav**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/satyamyadav6286)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/satyamgovindyadav/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:satyamyadav6286@gmail.com)

</div>

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing framework
- [CodeMirror](https://codemirror.net/) for the professional code editor
- [Bootstrap](https://getbootstrap.com/) for the responsive design system
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Vercel](https://vercel.com/) for seamless deployment

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Satyam Govind Yadav](https://github.com/satyamyadav6286)

**Production-ready • Interview-ready • Developer-friendly**

</div>

---

## 📌 Key Highlights

- ✅ **Production-Grade**: Professional code quality and architecture
- ✅ **Interview-Ready**: Demonstrates strong frontend skills
- ✅ **Fully Responsive**: Works on all devices
- ✅ **Multi-Language Support**: 25+ programming languages
- ✅ **VS Code-like Experience**: Professional code editor
- ✅ **Modern UI/UX**: Clean, polished interface
- ✅ **Comprehensive Features**: Search, filter, export, share
- ✅ **Error Handling**: Robust error handling and validation
- ✅ **Performance Optimized**: Fast and efficient
- ✅ **Well Documented**: Comprehensive documentation
