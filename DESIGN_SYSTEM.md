# Premium SaaS Design System

## Overview
Resume Tailor now implements a premium, modern SaaS design system inspired by:
- **Linear**: Clean, minimal, sophisticated
- **Vercel**: Sharp, professional, elegant
- **Stripe**: Trustworthy, polished
- **Notion**: Intuitive, organized

---

## Color Palette

### Primary Colors (Blue)
```
primary-50:  #eff6ff (Light backgrounds, hover states)
primary-600: #2563eb (Main actions, primary buttons)
primary-700: #1d4ed8 (Hover states, active states)
```

### Neutral Colors (Gray)
```
gray-50:  #f9fafb (Page background)
gray-100: #f3f4f6 (Secondary backgrounds)
gray-200: #e5e7eb (Borders, dividers)
gray-300: #d1d5db (Input borders)
gray-500: #6b7280 (Secondary text)
gray-600: #4b5563 (Tertiary text)
gray-700: #374151 (Body text)
gray-900: #111827 (Headings, primary text)
```

### Status Colors
```
success-500:  #10b981 (Green - positive actions)
warning-500:  #f59e0b (Orange - warnings)
error-500:    #ef4444 (Red - errors)
```

---

## Typography

### Font Family
```
Primary: Inter, -apple-system, BlinkMacSystemFont, Segoe UI
Monospace: Fira Code, Monaco, Courier New
```

### Font Sizes
```
text-xs:   12px (0.75rem)  - Labels, captions
text-sm:   14px (0.875rem) - Small text
text-base: 16px (1rem)     - Body text
text-lg:   18px (1.125rem) - Subheadings
text-xl:   20px (1.25rem)  - Section titles
text-2xl:  24px (1.5rem)   - Page titles
text-3xl:  30px (1.875rem) - Hero titles
```

### Font Weights
```
normal:     400 (Regular text)
medium:     500 (Emphasized text)
semibold:   600 (Subheadings)
bold:       700 (Headings)
```

---

## Spacing Scale

```
space-1:  4px   (0.25rem)
space-2:  8px   (0.5rem)
space-3:  12px  (0.75rem)
space-4:  16px  (1rem)
space-6:  24px  (1.5rem)
space-8:  32px  (2rem)
space-12: 48px  (3rem)
```

---

## Border Radius

```
rounded-sm: 6px  (Small elements, inputs)
rounded-md: 8px  (Cards, buttons)
rounded-lg: 12px (Large cards)
rounded-xl: 16px (Modals, large components)
```

---

## Shadows

```
shadow-sm: Subtle (1px, 2px - cards, hover states)
shadow-md: Medium (4px, 6px - elevated cards)
shadow-lg: Large (10px, 15px - modals, important elements)
shadow-xl: Extra Large (20px, 25px - top-level modals)
```

---

## Component Specifications

### Header/Navigation (TopBar)
```
Height: 64px (h-16)
Background: White with subtle border
Border: 1px gray-200
Shadow: shadow-sm
Position: Sticky top
Logo: Icon + "Resume Tailor" + subtitle
Badge: "✨ Powered by AI" (primary-50 background)
```

### Job Description Input Card
```
Background: White
Border: 1px gray-200
Radius: rounded-lg (12px)
Shadow: shadow-sm (hover: shadow-md)
Padding: 24px (p-6)

Header:
  - Icon: FileText in primary-50 background
  - Title: "Job Description" (font-semibold, text-base)
  - Subtitle: "Paste the complete job posting" (text-xs, gray-500)

Textarea:
  - Height: 288px (h-72)
  - Border: 1px gray-300
  - Focus: ring-2 primary-500 + border-primary-500
  - Font: Monospace, 14px
  - Placeholder: gray-400

Buttons:
  - Clear: Secondary (bg-gray-100, hover:bg-gray-200)
  - Generate: Primary (bg-primary-600, hover:bg-primary-700, shadow-md)
```

### Smart Job Analysis Panel
```
Background: White
Border: 1px gray-200
Radius: rounded-lg
Shadow: shadow-sm
Padding: 24px

Badges (4-column grid):
  - Seniority: Purple (bg-purple-50, border-purple-200)
  - Experience: Amber (bg-amber-50, border-amber-200)
  - Work Type: Cyan (bg-cyan-50, border-cyan-200)
  - Complexity: Indigo (bg-indigo-50, border-indigo-200)

Skills:
  - Pills with white background
  - Border: 1px gray-200
  - Hover: bg-primary-50, border-primary-200

Smart Tip:
  - Background: white with border
  - Icon: CheckCircle2 (success-500)
  - Text: text-sm, gray-800
```

### Progress Bar
```
Container:
  - Background: White
  - Border: 1px gray-200
  - Shadow: shadow-lg
  - Padding: 24px
  - Radius: rounded-lg

Bar:
  - Height: 10px
  - Background: gray-200
  - Fill: Gradient (primary-500 to primary-600)
  - Animation: Smooth transition

Status:
  - Icon + text (gray-700, text-base)
  - Fade transition between messages

Timer:
  - Text-sm, gray-500
  - Updates every second
```

### Results Display
```
Selection Card:
  - Background: White
  - Border: 1px gray-200
  - Icon: CheckCircle (success-500)
  - Title: Bold, gray-900

Resume/Cover Letter Cards:
  - Background: White
  - Border: 1px gray-200
  - Accordion style with expand/collapse
  - Content area: Monospace font, gray-50 background

Buttons:
  - Download: Primary (bg-primary-600)
  - Copy: Secondary (bg-gray-100)
  - Hover: Shadow increase, color shift
```

---

## Animations & Micro-interactions

### Transitions
```
Duration: 200ms for quick interactions
Duration: 300ms for larger transitions
Easing: ease-out (smooth deceleration)
```

### Button Interactions
```
Hover: Scale 1.02 + shadow increase
Active: Scale 0.98 + shadow decrease
Disabled: opacity-50 + cursor-not-allowed
```

### Card Interactions
```
Hover: shadow-sm → shadow-md (smooth transition)
Focus: border-primary-500 + ring-2 primary-500
```

### Loading States
```
Spinner: Smooth rotation animation
Progress: Smooth fill animation
Pulse: Subtle pulse effect on important elements
```

### Feedback
```
Copy Success: "Copied!" text change (200ms)
Error: Shake animation + red border
Success: Checkmark animation + green highlight
```

---

## Responsive Design

### Breakpoints
```
Mobile:  < 768px  (Single column, reduced padding)
Tablet:  768px - 1024px (Stacked layout)
Desktop: > 1024px (Two-column layout)
```

### Layout Adjustments
```
Mobile:
  - Single column layout
  - Padding: 16px → 12px
  - Font sizes: -2px
  - Collapsible sections

Tablet:
  - Stack columns vertically
  - Full-width cards
  - Maintain spacing

Desktop:
  - Two-column layout (55% / 45%)
  - Side-by-side components
  - Floating action buttons
```

---

## Best Practices

### Color Usage
- ✅ Use primary-600 for main CTAs
- ✅ Use gray-200 for borders and dividers
- ✅ Use gray-50 for secondary backgrounds
- ✅ Use status colors for feedback (success, warning, error)
- ❌ Don't use more than 3 colors per component

### Typography
- ✅ Use semibold for section titles
- ✅ Use medium for emphasis
- ✅ Use regular for body text
- ✅ Maintain consistent line-height (1.5-1.6)
- ❌ Don't use more than 3 font sizes per page

### Spacing
- ✅ Use consistent spacing scale
- ✅ Use space-6 (24px) between major sections
- ✅ Use space-4 (16px) between cards
- ✅ Use space-2 (8px) between elements
- ❌ Don't mix spacing scales

### Shadows
- ✅ Use shadow-sm for subtle elevation
- ✅ Use shadow-md for hover states
- ✅ Use shadow-lg for modals
- ❌ Don't use multiple shadows on one element

---

## Implementation Guide

### Tailwind Classes
```jsx
// Primary Button
className="px-6 py-2 rounded-md font-semibold text-white bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg transition-all duration-200"

// Secondary Button
className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"

// Card
className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"

// Input
className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"

// Badge
className="px-3 py-1 bg-primary-50 border border-primary-200 rounded-full text-xs font-medium text-primary-600"
```

---

## Accessibility

- ✅ Sufficient color contrast (WCAG AA)
- ✅ Focus states on all interactive elements
- ✅ Semantic HTML structure
- ✅ ARIA labels for icons
- ✅ Keyboard navigation support
- ✅ Reduced motion support

---

## Version History

**v1.0** - Initial Premium SaaS Design System
- Color palette (primary, neutral, status)
- Typography system
- Spacing scale
- Component specifications
- Animations and micro-interactions
- Responsive design guidelines

---

**Last Updated**: November 2, 2025  
**Status**: ✅ Production Ready
