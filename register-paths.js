// Register path aliases for runtime
const tsConfigPaths = require("tsconfig-paths")
const path = require("path")

// Map @/* to dist/* at runtime
tsConfigPaths.register({
  baseUrl: __dirname,
  paths: {
    "@/*": ["dist/*"],
  },
})
