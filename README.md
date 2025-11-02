# AI Resume Tailor

An intelligent resume tailoring system that automatically customizes your resume and generates cover letters based on job descriptions using AI.

## Features

- **AI-Powered Analysis**: Automatically selects the best resume from your collection
- **Smart Tailoring**: Customizes resume content to match job requirements
- **PDF Generation**: Download professional PDFs of tailored resumes and cover letters
- **Copy to Clipboard**: Quickly copy content for easy pasting
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Fast**: Powered by Cloudflare Workers and OpenAI GPT

## Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **PDF Generation**: jsPDF
- **Backend**: Cloudflare Workers (API at https://jobs.trusase.com)
- **AI**: OpenAI GPT-4o-mini

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resume-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory, ready for deployment to Cloudflare Pages or any static hosting service.

## Usage

1. **Paste Job Description**: Copy and paste the complete job description into the text area
2. **Generate**: Click "Generate Tailored Resume & Cover Letter" button
3. **Wait**: The AI analyzes your resumes (typically 15-30 seconds)
4. **Review**: See which resume was selected and why
5. **Download**: Download tailored resume and cover letter as PDFs

## Backend Setup

The application connects to a Cloudflare Worker API that:
- Stores multiple resume versions in R2 bucket
- Uses OpenAI API to analyze and tailor content
- Returns customized resume and cover letter

API Endpoint: `https://jobs.trusase.com`

## Project Structure

```
resume-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # App header
│   │   ├── JobDescriptionInput.jsx # Job description input form
│   │   ├── LoadingState.jsx        # Loading overlay
│   │   ├── ResultsDisplay.jsx      # Results display with PDF download
│   │   └── ErrorDisplay.jsx        # Error message display
│   ├── utils/
│   │   ├── api.js                  # API communication functions
│   │   └── pdfGenerator.js         # PDF generation utilities
│   ├── App.jsx                     # Main application component
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles with Tailwind
├── public/                         # Static assets
├── index.html                      # HTML template
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── vite.config.js                  # Vite configuration
└── package.json                    # Dependencies and scripts
```

## Keyboard Shortcuts

- `Ctrl/Cmd + Enter`: Submit job description

## Deployment

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

The app will automatically use the Cloudflare Worker API at `https://jobs.trusase.com`.

## Personal Use

This application is designed for personal use only. It helps streamline the job application process by automatically tailoring resumes to specific job postings.

## License

Private - Personal Use Only
