#!/usr/bin/env node

/**
 * Health Check Script
 * 
 * This script verifies that the application is properly configured
 * by checking for required files and configurations.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

console.log('🔍 Running application health checks...\n');

let allChecksPassed = true;

// Check 1: Vercel configuration exists
console.log('✓ Checking vercel.json...');
const vercelJsonPath = path.join(rootDir, 'vercel.json');
if (fs.existsSync(vercelJsonPath)) {
  console.log('  ✓ vercel.json found');
  try {
    const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
    console.log('  ✓ vercel.json is valid JSON');
    if (vercelConfig.builds && vercelConfig.builds.length > 0) {
      console.log('  ✓ Build configurations present');
    } else {
      console.log('  ✗ No build configurations found');
      allChecksPassed = false;
    }
  } catch (err) {
    console.log('  ✗ vercel.json is not valid JSON:', err.message);
    allChecksPassed = false;
  }
} else {
  console.log('  ✗ vercel.json not found');
  allChecksPassed = false;
}

// Check 2: Frontend package.json exists
console.log('\n✓ Checking frontend configuration...');
const frontendPackageJsonPath = path.join(rootDir, 'frontend', 'package.json');
if (fs.existsSync(frontendPackageJsonPath)) {
  console.log('  ✓ frontend/package.json found');
  try {
    const frontendPkg = JSON.parse(fs.readFileSync(frontendPackageJsonPath, 'utf8'));
    if (frontendPkg.scripts && frontendPkg.scripts.build) {
      console.log('  ✓ Frontend build script found');
    } else {
      console.log('  ✗ Frontend build script not found');
      allChecksPassed = false;
    }
  } catch (err) {
    console.log('  ✗ frontend/package.json is not valid JSON:', err.message);
    allChecksPassed = false;
  }
} else {
  console.log('  ✗ frontend/package.json not found');
  allChecksPassed = false;
}

// Check 3: Backend package.json exists
console.log('\n✓ Checking backend configuration...');
const backendPackageJsonPath = path.join(rootDir, 'backend', 'package.json');
if (fs.existsSync(backendPackageJsonPath)) {
  console.log('  ✓ backend/package.json found');
  try {
    const backendPkg = JSON.parse(fs.readFileSync(backendPackageJsonPath, 'utf8'));
    if (backendPkg.scripts && backendPkg.scripts.build) {
      console.log('  ✓ Backend build script found');
    } else {
      console.log('  ✗ Backend build script not found');
      allChecksPassed = false;
    }
  } catch (err) {
    console.log('  ✗ backend/package.json is not valid JSON:', err.message);
    allChecksPassed = false;
  }
} else {
  console.log('  ✗ backend/package.json not found');
  allChecksPassed = false;
}

// Check 4: Backend entry point exists
console.log('\n✓ Checking backend entry point...');
const backendEntryPath = path.join(rootDir, 'backend', 'src', 'index.ts');
if (fs.existsSync(backendEntryPath)) {
  console.log('  ✓ backend/src/index.ts found');
  const backendContent = fs.readFileSync(backendEntryPath, 'utf8');
  if (backendContent.includes('export default')) {
    console.log('  ✓ Backend exports app for serverless');
  } else {
    console.log('  ⚠ Backend may not export app for serverless (expected "export default")');
  }
} else {
  console.log('  ✗ backend/src/index.ts not found');
  allChecksPassed = false;
}

// Check 5: Root package.json has proper scripts
console.log('\n✓ Checking root package.json scripts...');
const rootPackageJsonPath = path.join(rootDir, 'package.json');
if (fs.existsSync(rootPackageJsonPath)) {
  console.log('  ✓ root package.json found');
  try {
    const rootPkg = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf8'));
    const requiredScripts = ['build', 'test', 'vercel-build'];
    let missingScripts = [];
    
    for (const script of requiredScripts) {
      if (rootPkg.scripts && rootPkg.scripts[script]) {
        console.log(`  ✓ Script "${script}" found`);
      } else {
        console.log(`  ✗ Script "${script}" not found`);
        missingScripts.push(script);
        allChecksPassed = false;
      }
    }
  } catch (err) {
    console.log('  ✗ root package.json is not valid JSON:', err.message);
    allChecksPassed = false;
  }
} else {
  console.log('  ✗ root package.json not found');
  allChecksPassed = false;
}

// Summary
console.log('\n' + '='.repeat(50));
if (allChecksPassed) {
  console.log('✅ All health checks passed!');
  console.log('The application is properly configured for Vercel deployment.');
  process.exit(0);
} else {
  console.log('❌ Some health checks failed.');
  console.log('Please review the errors above and fix the configuration.');
  process.exit(1);
}
