# JSCodeshift Codemods with Vitest

This repository contains a modern testing setup for JSCodeshift codemods using Vitest. It provides a streamlined way to write, test, and maintain codemods for JavaScript/TypeScript code transformations.

## Features

- 🚀 Modern ESM-based testing setup using Vitest
- 💪 Full TypeScript support for codemods
- 📁 Organized test fixtures structure
- 🧪 Snapshot and inline testing capabilities
- ♻️ Reusable test utilities

## Getting Started

### Installation

```bash
# Clone the repository
git clone [your-repo-url]
cd [your-repo-name]

# Install dependencies
npm install
```

### Project Structure

```
├── codemods/
│   ├── __testfixtures__/    # Test fixtures for transformations
│   │   ├── example.input.tsx    # Input fixture
│   │   └── example.output.tsx   # Expected output fixture
│   ├── __tests__/          # Test files
│   │   └── testUtils.js    # Test utilities
│   └── transform.ts        # Your codemod transformation
├── tsconfig.json
└── package.json
```

### Writing Tests

1. Create your codemod transformation file (e.g., `transform.ts`)
2. Add test fixtures in the `__testfixtures__` directory:
   - `example.input.tsx`: The source code to transform
   - `example.output.tsx`: The expected result
3. Write your test:

```typescript
import { defineTest } from './testUtils';

// Basic test
defineTest(__dirname, 'transform', {}, 'example', { parser: 'tsx' });

// With options
defineTest(__dirname, 'transform', { 
  optionName: 'value' 
}, 'example', { 
  parser: 'tsx' 
});
```

### Available Test Utilities

- `defineTest`: Define a test using input/output files
- `defineInlineTest`: Define a test with inline code
- `defineSnapshotTest`: Define a snapshot test
- `runTest`: Run a single test
- `applyTransform`: Apply a transform to source code

## Examples

### Inline Test Example

```typescript
import { defineInlineTest } from './testUtils';
import transform from './transform';

defineInlineTest(
  transform,
  {},
  `
    // Input code
    const x = 1;
  `,
  `
    // Expected output
    const x: number = 1;
  `,
  'adds type annotation'
);
```

### Fixture Test Example

```typescript
import { defineTest } from './testUtils';

defineTest(__dirname, 'transform', {}, 'example', { parser: 'tsx' });
```

With corresponding files:
- `__testfixtures__/example.input.tsx`
- `__testfixtures__/example.output.tsx`

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## Configuration

### TypeScript Configuration

The project includes a `tsconfig.json` that's configured to:
- Ignore `__testfixtures__` directories
- Support modern ESM imports
- Enable strict type checking
- Support JSX/TSX

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Based on the original JSCodeshift test utilities
- Updated for modern JavaScript/TypeScript development
- Adapted for use with Vitest

## Related Projects

- [JSCodeshift](https://github.com/facebook/jscodeshift)
- [Vitest](https://github.com/vitest-dev/vitest)
