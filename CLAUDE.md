# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MirageUI** is a comprehensive Persian RTL design system built for modern web applications. The project features:

- **Persian RTL Design System**: Complete right-to-left layout support optimized for Persian/Farsi interfaces
- **Glass Morphism Aesthetics**: Modern backdrop blur effects and gradient overlays
- **YekanBakh Typography**: Optimized Persian font rendering with proper fallbacks
- **Component-Based Architecture**: Modular design with reusable components (buttons, inputs, etc.)
- **Interactive Dashboard Template**: Admin dashboard showcasing all system components
- **Persian Number System**: Automatic conversion between English and Persian numerals (۰۱۲۳۴۵۶۷۸۹)

## Architecture

### File Structure
```
MirageUI/
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── mirage-styles.css      # Main design system CSS
│   │   │   └── fonts-yekanbakh.css    # Persian font definitions
│   │   ├── fonts/                     # YekanBakh font files
│   │   └── js/
│   │       └── mirage-script.js       # Interactive components JS
│   ├── components/
│   │   ├── button/                    # Button component system
│   │   │   ├── button.css
│   │   │   ├── button.js
│   │   │   ├── button-docs.md
│   │   │   └── button-demo.html
│   │   └── input/                     # Input component system
│   │       ├── input.css
│   │       ├── input.js
│   │       ├── input-docs.md
│   │       └── input-demo.html
│   └── index.html                     # Main dashboard template
├── docs/
│   └── mirage.md                      # Complete design system documentation
└── README.md                          # Project documentation
```

### Key Design Principles

1. **RTL-First**: All components are designed with right-to-left layout as the primary consideration
2. **Persian Typography**: YekanBakh font is used throughout with proper fallbacks (Vazirmatn Variable, Tahoma)
3. **Glass Morphism**: Components use `backdrop-filter: blur()` and transparent backgrounds
4. **Golden Ratio Spacing**: Spacing system based on mathematical ratios for visual harmony
5. **Semantic Colors**: Consistent color palette with Persian cultural considerations

## Development Commands

Since this is a static design system, there are no build commands. To work with the project:

1. **View Dashboard**: Open `src/index.html` in a browser
2. **Component Development**: Components are in `src/components/[component-name]/`
3. **Styling**: Main styles are in `src/assets/css/mirage-styles.css`
4. **Interactive Features**: JavaScript is in `src/assets/js/mirage-script.js`

## Component Development

### CSS Architecture
- **CSS Custom Properties**: All design tokens are defined as CSS variables in `:root`
- **BEM-like Naming**: Components use `mir-` prefix (e.g., `mir-btn`, `mir-input`)
- **RTL Considerations**: Use `right` instead of `left`, `margin-inline-start` instead of `margin-left`

### JavaScript Architecture
- **Vanilla JavaScript**: No frameworks, pure JavaScript for maximum compatibility
- **Module Pattern**: Each component has its own initialization function
- **Event-Driven**: Components communicate through custom events
- **Persian Number Conversion**: Automatic conversion between English and Persian numerals

## Key Features to Understand

### RTL Layout System
- HTML direction is set to `rtl`
- Text alignment defaults to `right`
- Components flow from right to left
- Icons and interactive elements are positioned for RTL flow

### Persian Typography
- **Primary Font**: YekanBakh (Persian optimized)
- **Fallbacks**: Vazirmatn Variable, Tahoma, Arial
- **Line Height**: 1.75 for Persian script readability
- **Number Formatting**: Persian numerals (۰۱۲۳۴۵۶۷۸۹) instead of English (0123456789)

### Glass Morphism Design
- Components use `backdrop-filter: blur(16px)`
- Transparent backgrounds with subtle borders
- Layered depth with appropriate shadows
- Smooth transitions and hover effects

### Component Variants
- **Buttons**: Primary, Secondary, Ghost, Outline, Success, Warning, Danger
- **Inputs**: Text, Email, Password, Search, Phone, Textarea, Select
- **Sizes**: XS, SM, MD (default), LG, XL
- **States**: Default, Hover, Focus, Active, Disabled, Loading

## Development Guidelines

### When Adding New Components
1. Create component directory in `src/components/`
2. Follow naming convention: `mir-component-name`
3. Include CSS, JS, documentation, and demo files
4. Ensure RTL compatibility
5. Test with Persian content
6. Add to main dashboard if applicable

### CSS Best Practices
- Use CSS custom properties for theming
- Follow golden ratio spacing system
- Ensure proper contrast ratios
- Test in both light and dark modes
- Use logical properties (`margin-inline-start` vs `margin-left`)

### JavaScript Best Practices
- Initialize components on DOMContentLoaded
- Use event delegation for dynamic content
- Implement proper error handling
- Support Persian number conversion
- Ensure keyboard accessibility

## Cultural Considerations

- **Color Psychology**: Turquoise/teal accents alongside primary colors
- **Typography**: Extra line-height for Persian script
- **Spacing**: Generous whitespace with proper text rendering
- **Icons**: RTL-flipped directional icons (arrows, chevrons)
- **Numbers**: Always use Persian numerals in the interface

## Testing

To test components:
1. Open component demo files in browser
2. Test with Persian content
3. Verify RTL layout behavior
4. Check responsive behavior on mobile
5. Test keyboard navigation
6. Verify accessibility with screen readers

## Common Tasks

### Adding a New Button Variant
1. Add CSS class in `src/components/button/button.css`
2. Update JavaScript in `src/components/button/button.js`
3. Add documentation in `src/components/button/button-docs.md`
4. Include demo in `src/components/button/button-demo.html`

### Customizing Colors
1. Edit CSS custom properties in `src/assets/css/mirage-styles.css`
2. Update the `:root` section with new color values
3. Test across all components

### Adding Interactive Features
1. Add JavaScript functions in `src/assets/js/mirage-script.js`
2. Follow the existing module pattern
3. Ensure Persian number conversion if applicable
4. Test keyboard and touch interactions

This design system prioritizes cultural authenticity, accessibility, and modern web standards while maintaining the premium quality that defines the Mirage system.

## Component Development Roadmap

**IMPORTANT:** This project follows a comprehensive component roadmap tracked in `COMPONENT_ROADMAP.md`. 

### Current Status (2025-07-17)
- **Completed Components:** 20/72 (27.8%)
- **Detailed Tracking:** See `COMPONENT_ROADMAP.md` for complete component list and progress

### Development Phases
1. **Phase 1 (High Priority):** Core missing components (Modal, Alerts, Advanced Tables, Form Validation)
2. **Phase 2 (Medium Priority):** Navigation & Layout (Breadcrumbs, Tabs, Pagination)
3. **Phase 3 (Medium Priority):** Data & Display (Cards, Timeline, Progress Bars)
4. **Phase 4 (Medium Priority):** Advanced Forms (Date Pickers, File Upload, Rich Editor)
5. **Phase 5 (Lower Priority):** Layout Components (Accordion, Drawer, Grid System)
6. **Phase 6 (Lower Priority):** Interactive Components (Drag & Drop, Context Menu)
7. **Phase 7 (Lower Priority):** Admin-Specific (User Management, Settings Panel)
8. **Phase 8 (Lower Priority):** Advanced Charts (Bar, Pie, Area Charts)

### Mandatory Documentation Updates
**⚠️ CRITICAL:** After adding or modifying any component, you MUST:
1. Update `COMPONENT_ROADMAP.md` with progress status
2. Update completion percentages
3. Add file location references
4. Update this CLAUDE.md section if needed

### Component Structure Requirements
Each new component must include:
- `src/components/[component-name]/[component-name].css` - Component styles
- `src/components/[component-name]/[component-name].js` - Component logic
- `src/components/[component-name]/[component-name]-docs.md` - Persian documentation
- `src/components/[component-name]/[component-name]-demo.html` - Demo page

### RTL & Persian Requirements for New Components
- All components must support RTL layout
- Persian text must render correctly with YekanBakh font
- Persian numbers (۰۱۲۳۴۵۶۷۸۹) must be used throughout
- All labels and messages must be in Persian
- Component naming must follow `mir-component-name` convention

### Integration with Main Dashboard
New components should be integrated into `src/index.html` where applicable to demonstrate their usage in the admin panel context.

## Development Memory

- keep @src/index.html page updated after adding new components