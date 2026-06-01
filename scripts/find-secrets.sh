#!/usr/bin/env bash
set -euo pipefail

echo "Scanning repository for common secret patterns..."
grep -RIIn --line-number --exclude-dir=.git --exclude-dir=node_modules \
  "-----BEGIN PRIVATE KEY-----\|private_key\|GMAIL_APP_PASSWORD\|SECRET_TOKEN\|VITE_SECRET_TOKEN\|DB_PASSWORD\|client_email\|GOOGLE_SERVICE_ACCOUNT_JSON\|AKIA\|AWS_ACCESS_KEY_ID" . || true

echo "Scan complete. Review matches above."
