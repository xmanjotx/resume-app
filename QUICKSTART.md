# Quick Start Guide - AI Resume Tailor

## 🚀 Get Running in 2 Minutes

### Step 1: Install Dependencies
```bash
cd /Users/mj/Git/resume-app
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to: **http://localhost:5173**

## 📝 How to Use

### Basic Workflow
1. **Paste Job Description** - Copy and paste the job posting into the text area
2. **Click Generate** - Click "Generate Tailored Resume & Cover Letter"
3. **Watch Progress** - See the progress bar with status updates (15-30 seconds)
4. **Review Results** - Check which resume was selected and the reasoning
5. **Download** - Download resume and cover letter as PDFs

### Keyboard Shortcuts
- **Ctrl/Cmd + Enter** - Submit job description
- **Tab** - Navigate between elements

## 📊 Progress Bar Stages

The progress bar shows 7 stages:

```
🚀 Initializing...
📄 Fetching your resumes...
🔍 Analyzing job description...
⚙️  Selecting best resume match...
✨ Tailoring resume content...
📝 Generating cover letter...
⏳ Finalizing documents...
✓ Your tailored resume is ready!
```

**Total Time**: 15-30 seconds

## 🎯 Features

✨ **AI-Powered**
- Automatically selects best resume
- Customizes content for job
- Generates cover letter

📊 **Progress Tracking**
- Visual progress bar
- Status messages
- Time remaining estimate
- Cancel option

📄 **Export Options**
- Download resume as PDF
- Download cover letter as PDF
- Copy text to clipboard

🎨 **User-Friendly**
- Modern, clean interface
- Mobile responsive
- Keyboard accessible
- Error handling

## 📁 Project Files

### Key Components
- `src/components/ProgressBar.jsx` - Progress bar with status updates
- `src/components/JobDescriptionInput.jsx` - Input form
- `src/components/ResultsDisplay.jsx` - Results with PDF download
- `src/App.jsx` - Main application

### Utilities
- `src/utils/api.js` - API communication
- `src/utils/pdfGenerator.js` - PDF generation

### Configuration
- `tailwind.config.js` - Tailwind CSS config
- `vite.config.js` - Vite build config
- `package.json` - Dependencies

## 🔧 Build for Production

```bash
npm run build
```

Output will be in the `dist` folder, ready for deployment to Cloudflare Pages.

## 🌐 Deployment

### Deploy to Cloudflare Pages
1. Push code to GitHub
2. Connect repo to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy!

## 🐛 Troubleshooting

### App won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port 5173 already in use
```bash
# Use different port
npm run dev -- --port 3000
```

### API not responding
- Check internet connection
- Verify Cloudflare Worker is running
- Check browser console for errors

### PDF download not working
- Check browser download settings
- Try a different browser
- Check browser console for errors

## 📚 Documentation

- **README.md** - Full documentation
- **FEATURES.md** - Detailed feature list
- **TESTING.md** - Testing guide
- **PROGRESS.md** - Development progress

## 💡 Tips

1. **Better Results**: Paste complete job descriptions (not just titles)
2. **Multiple Resumes**: Upload different resume versions to R2 for better selection
3. **Copy & Paste**: Use "Copy" button to paste into applications
4. **PDF Format**: Downloaded PDFs are professional and ready to send
5. **Cancel Anytime**: Click "Cancel" if you want to stop processing

## 🎓 Example Job Description

```
Senior Platform Engineer - Cloud Infrastructure

We are seeking a Senior Platform Engineer to build and maintain our Kubernetes infrastructure. 
You will work with our DevOps team to design and implement CI/CD pipelines, manage cloud resources, 
and ensure system reliability.

Responsibilities:
- Design and implement Kubernetes clusters
- Build CI/CD pipelines using Jenkins/GitLab
- Manage AWS/GCP cloud resources
- Implement monitoring and alerting
- Lead infrastructure projects

Requirements:
- 5+ years with Kubernetes and Docker
- Strong experience with CI/CD tools
- AWS or GCP certification preferred
- Experience with Terraform/Infrastructure as Code
- Excellent communication skills
```

## 🚀 Next Steps

1. **Test Locally** - Try with sample job descriptions
2. **Upload Resumes** - Add your resumes to R2 bucket
3. **Deploy** - Push to Cloudflare Pages
4. **Use** - Start tailoring resumes for job applications!

## 📞 Support

For issues or questions:
1. Check TESTING.md for troubleshooting
2. Review browser console for errors
3. Check Cloudflare Worker logs
4. Verify API endpoint is accessible

---

**Version**: 1.0.0  
**Last Updated**: November 2, 2025  
**Status**: ✅ Ready to Use
