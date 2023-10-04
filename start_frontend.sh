#/bin/sh
cd frontend
npm ci
npm run build
nginx -g "daemon off;"
