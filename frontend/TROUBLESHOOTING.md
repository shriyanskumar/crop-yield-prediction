# Troubleshooting Guide

## Common Issues and Solutions

### Issue: "Request ID" Error or Connection Problems

#### If you see this in your browser:

**Problem**: Browser security warning or connection error

**Solutions**:

1. **Make sure you're using HTTP, not HTTPS**
   - ✅ Correct: `http://localhost:3000`
   - ❌ Wrong: `https://localhost:3000`

2. **Check if the server is running**
   - Look at your terminal/PowerShell
   - You should see: `Ready on http://localhost:3000`
   - If not, start it with: `npm run dev`

3. **Try a different browser**
   - Sometimes Chrome/Edge cache issues cause problems
   - Try Firefox or clear browser cache

4. **Check firewall/antivirus**
   - Windows Firewall might be blocking localhost
   - Temporarily disable to test

#### If you see this in Cursor/IDE:

**Problem**: Cursor connection issue

**Solutions**:

1. **Restart Cursor**
   - Close and reopen the application

2. **Check internet connection**
   - Cursor needs internet for some features

3. **Clear Cursor cache**
   - Close Cursor
   - Delete cache folder (if needed)

### Issue: "Cannot GET /" or 404 errors

**Solution**: Make sure you're accessing the correct URL
- Homepage: `http://localhost:3000`
- Not: `http://localhost:3000/index.html`

### Issue: Port 3000 already in use

**Error**: `Port 3000 is already in use`

**Solution**:
1. Find what's using port 3000:
   ```powershell
   netstat -ano | findstr :3000
   ```
2. Kill the process, or use a different port:
   ```powershell
   npm run dev -- -p 3001
   ```
3. Then access: `http://localhost:3001`

### Issue: "Module not found" errors

**Solution**: Install dependencies
```powershell
npm install
```

### Issue: Node.js not found

**Solution**: Install Node.js from https://nodejs.org/

---

## Quick Health Check

Run these commands to verify everything is set up:

```powershell
# Check Node.js
node --version

# Check npm
npm --version

# Check if dependencies are installed
dir node_modules

# Start the server
npm run dev
```

If all commands work, you should see:
```
✓ Node.js version (e.g., v20.x.x)
✓ npm version (e.g., 10.x.x)
✓ node_modules folder exists
✓ Server starts on http://localhost:3000
```

---

## Still Having Issues?

Please provide:
1. **Exact error message** (copy and paste)
2. **Where you see it** (browser, terminal, Cursor)
3. **What you were doing** when it appeared
4. **Screenshot** if possible

