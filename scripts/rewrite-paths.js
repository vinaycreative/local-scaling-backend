#!/usr/bin/env node
/**
 * Rewrites TypeScript path aliases (@/) to relative paths in compiled JavaScript files
 * This script uses only Node.js built-in modules - no external dependencies
 */

const fs = require('fs')
const path = require('path')

const distDir = path.join(__dirname, '..', 'dist')

/**
 * Convert @/ alias to relative path
 */
function aliasToRelative(fromFile, aliasPath) {
  // Remove @/ prefix
  const targetPath = aliasPath.replace(/^@\//, '')
  
  // Get directory of the file making the import
  const fromDir = path.dirname(fromFile)
  
  // Calculate target file path in dist
  // @/app -> dist/app.js
  // @/config/env -> dist/config/env.js
  let targetFile = path.join(distDir, targetPath)
  
  // Check if target exists as .js file
  if (fs.existsSync(targetFile + '.js')) {
    targetFile = targetFile + '.js'
  } else if (fs.existsSync(targetFile)) {
    // It's a directory, check for index.js
    if (fs.statSync(targetFile).isDirectory()) {
      const indexPath = path.join(targetFile, 'index.js')
      if (fs.existsSync(indexPath)) {
        targetFile = indexPath
      } else {
        targetFile = targetFile + '.js'
      }
    }
  } else {
    // Assume .js extension
    targetFile = targetFile + '.js'
  }
  
  // Calculate relative path
  const relativePath = path.relative(fromDir, targetFile)
  
  // Normalize path separators
  let result = relativePath.replace(/\\/g, '/')
  
  // Ensure it starts with ./ for relative paths
  if (!result.startsWith('.')) {
    result = './' + result
  }
  
  // Remove .js extension for require/import statements
  result = result.replace(/\.js$/, '')
  
  return result
}

/**
 * Rewrite paths in a single file
 */
function rewriteFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  let modified = false
  
  // Match require("@/...) and import ... from "@/...
  const patterns = [
    // require("@/...")
    /require\(["'](@\/[^"']+)["']\)/g,
    // import ... from "@/..."
    /from\s+["'](@\/[^"']+)["']/g,
    // import("@/...")
    /import\(["'](@\/[^"']+)["']\)/g,
  ]
  
  patterns.forEach(pattern => {
    content = content.replace(pattern, (match, aliasPath) => {
      const relativePath = aliasToRelative(filePath, aliasPath)
      modified = true
      return match.replace(aliasPath, relativePath)
    })
  })
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`Rewrote paths in: ${path.relative(distDir, filePath)}`)
  }
}

/**
 * Recursively process all .js files in dist directory
 */
function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    
    if (entry.isDirectory()) {
      processDirectory(fullPath)
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      rewriteFile(fullPath)
    }
  }
}

// Main execution
if (require.main === module) {
  if (!fs.existsSync(distDir)) {
    console.error(`Error: dist directory not found at ${distDir}`)
    process.exit(1)
  }
  
  console.log('Rewriting path aliases in compiled JavaScript...')
  processDirectory(distDir)
  console.log('Done!')
}

