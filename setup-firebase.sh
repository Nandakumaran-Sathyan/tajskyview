#!/bin/bash
# Firebase Setup Script - Run this after cloning the repository

set -e

echo "🚀 Setting up Taj Skyview for Firebase Hosting..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "📦 Installing Firebase CLI..."
    npm install -g firebase-tools
fi

echo "✓ Firebase CLI version: $(firebase --version)"

# Install root dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Install functions dependencies
if [ -d "functions" ]; then
    echo "📦 Installing Cloud Functions dependencies..."
    cd functions
    npm install
    cd ..
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local..."
    cp .env.local .env.local 2>/dev/null || echo "Note: .env.local already exists"
fi

# Build the frontend
echo "🔨 Building frontend..."
npm run build

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Configure Firebase project:"
echo "   firebase login"
echo "   firebase init"
echo ""
echo "2. Set environment variables:"
echo "   firebase functions:config:set secrets.token=\"your-token\" secrets.sheet_id=\"your-sheet-id\""
echo ""
echo "3. For local development:"
echo "   firebase emulators:start"
echo ""
echo "4. In another terminal, start the frontend:"
echo "   npm run dev"
echo ""
echo "5. For production deployment:"
echo "   npm run deploy"
echo ""
echo "📖 For detailed instructions, see FIREBASE-DEPLOYMENT.md"
