# Testing Guide - AI Resume Tailor

## Quick Start Testing

### 1. Start the Application
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### 2. Test the Progress Bar Feature

#### Test Case 1: Normal Flow
1. Open the application
2. Paste a job description in the textarea (e.g., "Senior Platform Engineer with Kubernetes experience...")
3. Click "Generate Tailored Resume & Cover Letter"
4. **Expected**: 
   - Progress bar appears below the input
   - Status messages update: 🚀 → 📄 → 🔍 → ⚙️ → ✨ → 📝 → ⏳
   - Progress percentage increases from 0% to 90%
   - Estimated time remaining counts down from ~25s
   - After API response, progress reaches 100% with "✓ Your tailored resume is ready!"

#### Test Case 2: Cancel Request
1. Paste a job description
2. Click "Generate Tailored Resume & Cover Letter"
3. While progress bar is visible, click the "Cancel" button
4. **Expected**:
   - Request is aborted
   - Progress bar disappears
   - Error message appears: "Request cancelled."
   - Input form becomes active again

#### Test Case 3: Error Handling
1. Paste an empty or very short job description
2. Click "Generate Tailored Resume & Cover Letter"
3. **Expected**:
   - Progress bar shows
   - API returns error
   - Error message displays with red background
   - Progress bar disappears
   - User can dismiss error and try again

### 3. Test Results Display

#### After Successful Generation
1. **Expected to see**:
   - Green success card showing which resume was selected
   - Reasoning explanation
   - Number of resumes analyzed
   - Tailored resume preview (scrollable)
   - Cover letter preview (scrollable)
   - Download PDF buttons for both
   - Copy to clipboard buttons

#### Test PDF Download
1. Click "Download PDF" on resume section
2. **Expected**: 
   - PDF downloads with filename: `Tailored_Resume_YYYYMMDD_HHMMSS.pdf`
   - PDF contains properly formatted resume content
3. Click "Download PDF" on cover letter section
4. **Expected**:
   - PDF downloads with filename: `Cover_Letter_YYYYMMDD_HHMMSS.pdf`
   - PDF contains properly formatted cover letter

#### Test Copy to Clipboard
1. Click "Copy" button on resume section
2. **Expected**:
   - Button text changes to "Copied!" for 2 seconds
   - Resume content is copied to clipboard
   - Can paste elsewhere (Ctrl/Cmd + V)

### 4. Test UI Responsiveness

#### Mobile View (< 768px)
1. Open DevTools (F12)
2. Toggle device toolbar
3. Select mobile device (iPhone 12, etc.)
4. **Expected**:
   - All elements stack vertically
   - Buttons are touch-friendly
   - Text is readable
   - Progress bar is visible and functional

#### Tablet View (768px - 1024px)
1. Select tablet device in DevTools
2. **Expected**:
   - Layout adjusts appropriately
   - Two-column results display works
   - All buttons are accessible

#### Desktop View (> 1024px)
1. Full browser window
2. **Expected**:
   - Two-column layout for results
   - Proper spacing and alignment
   - All features work smoothly

### 5. Test Keyboard Shortcuts

#### Ctrl/Cmd + Enter
1. Focus on job description textarea
2. Type some text
3. Press `Ctrl + Enter` (Windows/Linux) or `Cmd + Enter` (Mac)
4. **Expected**: Form submits and progress bar appears

### 6. Test Error States

#### Network Error
1. Open DevTools Network tab
2. Set throttling to "Offline"
3. Try to generate resume
4. **Expected**:
   - Error message displays
   - Progress bar disappears
   - User can dismiss error

#### API Timeout
1. Wait for progress bar to reach ~90%
2. If API takes > 30 seconds
3. **Expected**:
   - Progress bar caps at 90% while waiting
   - Once response arrives, jumps to 100%

### 7. Test Accessibility

#### Screen Reader (Mac)
1. Enable VoiceOver: Cmd + F5
2. Navigate through the page
3. **Expected**:
   - All buttons are announced
   - Progress bar is announced with current percentage
   - Status messages are read aloud
   - Form labels are clear

#### Keyboard Navigation
1. Use Tab key to navigate
2. Use Enter/Space to activate buttons
3. **Expected**:
   - All interactive elements are reachable
   - Focus indicators are visible
   - No keyboard traps

## Sample Job Descriptions for Testing

### Test 1: Platform Engineer
```
We are seeking a Senior Platform Engineer to build and maintain our Kubernetes infrastructure. 
You will work with our DevOps team to design and implement CI/CD pipelines, manage cloud resources, 
and ensure system reliability. Required: 5+ years experience with Kubernetes, Docker, and cloud platforms.
```

### Test 2: Security Architect
```
Join our security team as a Security Architect. You'll design and implement security solutions 
for our cloud infrastructure, conduct security audits, and lead security initiatives. 
Experience with AWS security, IAM, encryption, and compliance frameworks required.
```

### Test 3: Cloud Solutions Architect
```
We need a Cloud Solutions Architect to help clients design and implement cloud solutions. 
You'll work with enterprise clients, design scalable architectures, and provide technical guidance. 
Must have 7+ years of experience with cloud platforms, solution design, and client management.
```

## Performance Testing

### Load Time
- Initial page load: < 2 seconds
- Progress bar appears: < 100ms after clicking generate
- API response: 15-30 seconds (expected)

### Memory Usage
- Monitor in DevTools Performance tab
- Should not exceed 50MB for normal usage
- No memory leaks on repeated submissions

### Smooth Animations
- Progress bar fill: Smooth 0.3s transition
- Status text: Smooth fade transitions
- No jank or stuttering

## Regression Testing Checklist

- [ ] Progress bar displays correctly
- [ ] Status messages update at right times
- [ ] Estimated time counts down accurately
- [ ] Cancel button works
- [ ] PDF downloads work
- [ ] Copy to clipboard works
- [ ] Error handling works
- [ ] Mobile responsive
- [ ] Keyboard shortcuts work
- [ ] Accessibility features work
- [ ] No console errors
- [ ] No memory leaks

## Deployment Testing

### Before Deploying to Production

1. **Build Test**
   ```bash
   npm run build
   npm run preview
   ```
   - Should build without errors
   - Preview should work at http://localhost:4173

2. **Production Checklist**
   - [ ] All features tested locally
   - [ ] No console errors
   - [ ] Performance acceptable
   - [ ] Mobile responsive
   - [ ] Accessibility verified
   - [ ] Error handling works
   - [ ] API integration confirmed

3. **Cloudflare Pages Deployment**
   - Connect GitHub repo
   - Set build command: `npm run build`
   - Set output: `dist`
   - Deploy and test live

---

**Last Updated**: November 2, 2025
