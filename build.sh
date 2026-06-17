#!/bin/bash
# Exit on any error
set -e

echo "Starting Multi-Version Build for Vercel..."

# 1. Prepare public directory
rm -rf public
mkdir -p public

# 2. Copy V1 (Default) to the root of public
echo "Copying V1 (Default)..."
cp -r v1/* public/

# 3. Copy V2 to public/v2
echo "Copying V2..."
mkdir -p public/v2
cp -r v2/* public/v2/

# 4. Merge V2 assets into root assets
echo "Merging V2 assets to root..."
cp -rn v2/assets/* public/assets/ || true

# 5. Build V3 and copy to public/v3
echo "Building V3..."
cd v3
npm install
npm run build
cd ..
mkdir -p public/v3
cp -r v3/dist/* public/v3/

# 6. Merge V3 public assets into root assets to fix absolute pathing in V3 React code
echo "Merging V3 assets to root..."
cp -rn v3/public/assets/* public/assets/ || true

echo "Build complete. Output is in the /public directory."
