# Contributing to Indigo AI Skills

## Adding a New Skill Package

1. Create a new directory under `packages/`:
   ```bash
   mkdir packages/my-skill
   cd packages/my-skill
   npm init
   ```

2. Follow the workspace naming convention: `@3rd-eye-labs/indigo-skill-<name>`

3. Include a `README.md` with:
   - Description of MCP tools covered
   - Sub-skills list
   - Usage examples

4. Export skill metadata in your package entry point.

## Development

```bash
# Install all dependencies
npm install

# Build all packages
npm run build --workspaces --if-present

# Run tests
npm test --workspaces --if-present
```

## Pull Requests

- One issue per branch (e.g., `feat/3RD-XXX`)
- Keep PRs focused and small
- Include a clear description of changes
- Update documentation if adding new features

## Code Style

- Use ES modules (`"type": "module"`)
- Node.js 20+ target
- MIT license for all packages
