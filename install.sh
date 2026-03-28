#!/bin/bash
# OPENMONSTER v4.0 [OMEGA-ARIES] INSTALLER
# Logic: SENSE -> ARCHITECT -> MANIFEST

echo "🌌 INITIALIZING OPENMONSTER INSTALLATION..."

# Check dependencies
if ! command -v git &> /dev/null; then echo "❌ GIT MISSING"; exit 1; fi
if ! command -v node &> /dev/null; then echo "❌ NODE MISSING"; exit 1; fi

# Install
cd /home/cube/syncstack/opendev-labs/OpenMonster-v4
npm install
npm run build
sudo npm link

echo "✅ OPENMONSTER LINKED TO SYSTEM BUS."
echo "👉 Run: monster omega 'hello'"
