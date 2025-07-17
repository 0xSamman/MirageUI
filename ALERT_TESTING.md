# 🚨 Alert System Testing Guide

## Quick Fix Summary
The alert system was not working because the static methods were set to `inline: true` by default, which requires a target element. I've fixed this by:

1. **Changed static methods** to use `inline: false` for popup alerts
2. **Added position support** for popup alerts
3. **Fixed container creation** for positioned alerts
4. **Added error handling** and debugging

## Test Files Created

### 1. **debug-alert.html** - Complete Debug System
- **Location**: `/debug-alert.html`
- **Purpose**: Comprehensive testing with debug logs
- **Features**: 
  - System status checks
  - All alert types and features
  - Real-time statistics
  - Error logging

### 2. **test-alert.html** - Simple Test
- **Location**: `/test-alert.html`
- **Purpose**: Basic functionality testing
- **Features**: Simple buttons to test each alert type

## How to Test

### Method 1: Use Debug System (Recommended)
```bash
# Open debug-alert.html in browser
open debug-alert.html
```

### Method 2: Use Component Demo
```bash
# Open the enhanced alert demo
open src/components/alert/alert-demo.html
```

### Method 3: Use Main Dashboard
```bash
# Open main dashboard (shows alert on load)
open src/index.html
```

## What Should Work Now

### ✅ Basic Alert Types
```javascript
MirageAlert.success('عنوان', 'پیام موفقیت');
MirageAlert.error('عنوان', 'پیام خطا');
MirageAlert.warning('عنوان', 'پیام هشدار');
MirageAlert.info('عنوان', 'پیام اطلاعیه');
```

### ✅ Advanced Features
```javascript
// With actions
const alert = new MirageAlert({
    type: 'warning',
    title: 'تأیید',
    message: 'آیا مطمئن هستید؟',
    actions: [
        { text: 'لغو', onClick: (e, alert) => alert.close() },
        { text: 'تأیید', onClick: (e, alert) => { /* action */ } }
    ]
});
alert.show();

// With position
MirageAlert.info('عنوان', 'پیام', { position: 'top-center' });

// With progress
MirageAlert.success('عنوان', 'پیام', { showProgress: true });
```

### ✅ Positions Available
- `top-right` (default)
- `top-left`
- `top-center`
- `bottom-right`
- `bottom-left`
- `bottom-center`

### ✅ Sizes Available
- `sm` (small)
- `md` (medium, default)
- `lg` (large)

## Browser Console Commands

Test these commands in browser console:

```javascript
// Test basic alert
MirageAlert.success('تست', 'این یک تست است');

// Test with options
MirageAlert.info('اطلاعیه', 'پیام مهم', {
    position: 'top-center',
    duration: 5000,
    showProgress: true
});

// Clear all alerts
MirageAlert.clearAll();
```

## Troubleshooting

### If alerts still don't show:
1. **Check browser console** for errors
2. **Verify files are loaded**: Check Network tab in DevTools
3. **Test with debug-alert.html**: It has comprehensive error reporting

### Common Issues:
- **Feather icons not loading**: Check internet connection
- **CSS not loading**: Verify file paths
- **JavaScript errors**: Check console for syntax errors

## System Status

The alert system now provides:
- **Title + Extended Content**: Rich HTML content support
- **Action Buttons**: Custom interactive buttons
- **Positioning**: 6 different positions
- **Progress Bars**: Visual progress indicators
- **Animations**: Smooth enter/exit animations
- **RTL Support**: Full Persian/Arabic support
- **Accessibility**: Screen reader support
- **Auto-dismiss**: Configurable timing
- **Manual Control**: Close buttons and programmatic control

## Next Steps

1. **Test with debug-alert.html** first
2. **If working**: Use the enhanced alert-demo.html
3. **If still not working**: Check browser console and file paths
4. **Report specific error messages** if any issues persist

The alert system is now properly configured as a **popup notification system** separate from the **toast system**, with enhanced title and content support as requested.