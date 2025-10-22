#!/bin/bash

# Package Chrome Extension for Distribution
# This script creates a clean ZIP file ready for Chrome Web Store

EXTENSION_NAME="seeking-alpha-link-modifier"
VERSION="1.0.0"
OUTPUT_FILE="${EXTENSION_NAME}-v${VERSION}.zip"

echo "📦 Packaging Chrome Extension..."
echo "   Name: ${EXTENSION_NAME}"
echo "   Version: ${VERSION}"
echo ""

# Remove old package if exists
if [ -f "$OUTPUT_FILE" ]; then
    echo "🗑️  Removing old package..."
    rm "$OUTPUT_FILE"
fi

# Create ZIP with only production files
echo "📁 Creating ZIP archive..."
zip -r "$OUTPUT_FILE" \
    manifest.json \
    content.js \
    options.html \
    options.js \
    options.css \
    icons/ \
    README.md \
    -x "*.DS_Store" "*.git*" "*node_modules*" "*.sh"

echo ""
echo "✅ Package created: $OUTPUT_FILE"
echo ""

# Show package contents
echo "📋 Package contents:"
unzip -l "$OUTPUT_FILE"

echo ""
echo "🎉 Ready for Chrome Web Store!"
echo ""
echo "Next steps:"
echo "1. Go to: https://chrome.google.com/webstore/devconsole"
echo "2. Click 'New Item'"
echo "3. Upload: $OUTPUT_FILE"
echo "4. Fill in store listing details"
echo "5. Submit for review"
