# Share Link Feature

## Overview
The Work Order Guru application now supports sharing links to specific work orders. This allows users to easily share work orders with others via a URL.

## How to Use

### Generating a Share Link

1. **Select or Load a Work Order**: Use the dropdown menu to select an existing saved work order, or save a new work order first.

2. **Click the "Share Link" Button**: Once a work order is loaded/selected, the "Share Link" button will appear in the bottom toolbar (next to the Delete button).

3. **Copy the Link**: When you click "Share Link", the shareable URL will be automatically copied to your clipboard. You'll see a confirmation message: "🔗 Link copied to clipboard!"

4. **Share the Link**: You can now paste and share this link with anyone who needs access to this specific work order.

### Opening a Shared Link

1. **Click the Shared Link**: When someone opens a shared link (e.g., `https://yourdomain.com/index.html?id=abc123`), the application will automatically:
   - Load the specified work order
   - Display a confirmation message: "🔗 Shared work order loaded!"
   - Clean up the URL in the browser's address bar

2. **View or Edit**: The work order will be fully loaded with all its data, ready for viewing or editing.

## Technical Details

- **URL Format**: Shared links use the format: `[base-url]?id=[work-order-id]`
- **Automatic Loading**: The application automatically detects and loads work orders from URL parameters on page load
- **Clipboard Support**: Uses the modern Clipboard API with fallback for older browsers
- **Clean URLs**: After loading, the URL parameter is removed to keep the address bar clean

## Example

If your work order ID in Firebase is `-NqX8yZabc123`, the shareable link would be:
```
https://yourdomain.com/index.html?id=-NqX8yZabc123
```

When someone opens this link, they'll see the complete work order with all customer information, vehicle details, and work descriptions.
