# Instructions for Renaming Project to DTLcursor

## ✅ Code Changes Completed

I've updated all the source code files to use "DTLcursor" instead of "GreetingCard":

### Updated Files:
1. ✅ `package.json` - Project name changed to "dtlcursor"
2. ✅ `app/build.gradle.kts` - namespace and applicationId changed to "com.example.dtlcursor"
3. ✅ `settings.gradle.kts` - rootProject.name changed to "DTLcursor"
4. ✅ All Kotlin package declarations updated to "com.example.dtlcursor"
5. ✅ All Kotlin import statements updated
6. ✅ Theme function renamed from `GreetingCardTheme` to `DTLCursorTheme`
7. ✅ Documentation files updated with new paths

## ⚠️ Manual Steps Required

### Step 1: Rename the Project Folder
1. Close Cursor/IDE
2. Rename the folder:
   - From: `C:\Users\kumar\AndroidStudioProjects\GreetingCard`
   - To: `C:\Users\kumar\AndroidStudioProjects\DTLcursor`

### Step 2: Rename Android Package Directories
The Kotlin package structure needs to match the new package name. You have two options:

#### Option A: Rename directories (Recommended)
1. Navigate to: `app/src/main/java/com/example/`
2. Rename folder:
   - From: `greetingcard`
   - To: `dtlcursor`

#### Option B: Keep directories, update AndroidManifest
If you keep the old directory structure, you'll need to update:
- `app/src/main/AndroidManifest.xml` - Update theme references
- Any resource files that reference the old theme name

### Step 3: Update Android Resources (if needed)
If you see build errors about theme names:
1. Check `app/src/main/res/values/themes.xml` (if it exists)
2. Update `Theme.GreetingCard` to `Theme.DTLCursor`

### Step 4: Clean and Rebuild
After renaming:
```powershell
# Clean build
cd app
./gradlew clean

# Rebuild
./gradlew build
```

## 📝 Summary

**Code is ready!** All source code references have been changed from "GreetingCard" to "DTLcursor".

**You need to:**
1. Rename the project folder to "DTLcursor"
2. Rename the package directory: `greetingcard` → `dtlcursor`
3. Rebuild the project

After these steps, your project will be fully renamed to DTLcursor!

