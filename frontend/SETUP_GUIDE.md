# Setup Guide - Step by Step Instructions

## What You Need to Know

**npm** = Node Package Manager (comes with Node.js)
- It's a tool that downloads and manages code libraries your project needs
- Think of it like an app store for code

**npm install** = Downloads all the code libraries your project needs
**npm run dev** = Starts your web application so you can see it in a browser

---

## Step 1: Install Node.js (If You Don't Have It)

1. **Go to**: https://nodejs.org/
2. **Click** the big green button that says "Download Node.js (LTS)" 
   - LTS = Long Term Support (most stable version)
3. **Run the installer** (the .msi file you downloaded)
4. **Click "Next"** through all the prompts (default settings are fine)
5. **Restart your computer** or close and reopen your terminal/PowerShell

---

## Step 2: Verify Node.js is Installed

1. **Open PowerShell** (search for "PowerShell" in Windows Start menu)
2. **Type this command** and press Enter:
   ```
   node --version
   ```
3. **You should see** something like: `v20.x.x` (any version number is good)
4. **If you see an error**, Node.js isn't installed - go back to Step 1

---

## Step 3: Navigate to Your Project Folder

In PowerShell, type these commands one by one (press Enter after each):

```
cd C:\Users\kumar\AndroidStudioProjects\DTLcursor
```

You should now be in your project folder.

---

## Step 4: Install Project Dependencies

Type this command and press Enter:

```
npm install
```

**What this does:**
- Downloads all the code libraries your project needs (Next.js, React, etc.)
- Creates a `node_modules` folder (this is normal - don't delete it!)
- Takes 1-3 minutes depending on your internet speed

**You'll see:**
- Lots of text scrolling by (this is normal)
- At the end, it should say something like "added 500 packages"

**If you see errors**, let me know what they say!

---

## Step 5: Start the Development Server

Type this command and press Enter:

```
npm run dev
```

**What this does:**
- Starts your web application
- Makes it available at http://localhost:3000

**You'll see:**
- Text that says something like "Ready on http://localhost:3000"
- The terminal will keep running (this is normal - don't close it!)

---

## Step 6: View Your Application

1. **Open your web browser** (Chrome, Edge, Firefox, etc.)
2. **Go to**: http://localhost:3000
3. **You should see** your crop health analysis application!

---

## Common Issues

### "node is not recognized"
- Node.js isn't installed or isn't in your PATH
- Solution: Install Node.js from nodejs.org and restart your computer

### "npm is not recognized"
- Same as above - Node.js includes npm
- Solution: Install Node.js from nodejs.org and restart your computer

### "Cannot find module" errors
- Dependencies aren't installed
- Solution: Run `npm install` again

### Port 3000 already in use
- Something else is using port 3000
- Solution: Close other applications or restart your computer

---

## To Stop the Server

When you're done testing:
- Go back to the PowerShell window
- Press `Ctrl + C` (this stops the server)
- Type `Y` and press Enter if it asks

---

## Need Help?

If you get stuck at any step, tell me:
1. What command you ran
2. What error message you saw (copy and paste it)
3. What step you're on

I'll help you fix it!

