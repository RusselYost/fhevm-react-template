# Contributing to Universal FHEVM SDK

Thank you for your interest in contributing to the Universal FHEVM SDK! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

## Code of Conduct

This project adheres to a code of conduct that all contributors are expected to follow. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- Git

### Installation

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/fhevm-universal-sdk.git
   cd fhevm-universal-sdk
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Changes

Edit files in the appropriate directory:
- `packages/fhevm-sdk/src/` - Core SDK code
- `examples/` - Example applications
- `docs/` - Documentation

### 3. Build the SDK

```bash
npm run build:sdk
```

### 4. Run Tests

```bash
npm test
```

### 5. Type Check

```bash
npm run typecheck
```

## Project Structure

```
fhevm-universal-sdk/
├── packages/
│   └── fhevm-sdk/          # Core SDK package
│       ├── src/
│       │   ├── core/       # Framework-agnostic client
│       │   ├── hooks/      # React hooks
│       │   ├── types/      # TypeScript definitions
│       │   ├── utils/      # Utilities
│       │   ├── index.ts    # Main exports
│       │   ├── react.ts    # React exports
│       │   └── vue.ts      # Vue exports
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
├── examples/
│   └── nextjs-confidential-flight/  # Example application
├── docs/                   # Documentation
├── README.md              # Main documentation
├── LICENSE                # MIT License
└── package.json           # Root package.json
```

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Enable strict mode
- Provide comprehensive type definitions
- Avoid `any` type when possible
- Use explicit return types for functions

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Maximum line length: 100 characters
- Use meaningful variable and function names

### Example:

```typescript
// Good
export function validateEncryptType(type: string): type is EncryptType {
  return VALID_ENCRYPT_TYPES.includes(type as EncryptType);
}

// Avoid
export function validate(t: any) {
  return VALID_ENCRYPT_TYPES.includes(t);
}
```

### Comments

- Add JSDoc comments for public APIs
- Explain complex logic with inline comments
- Keep comments up-to-date with code changes

### Example:

```typescript
/**
 * Encrypt a value using FHEVM
 * @param value - Value to encrypt (number, bigint, boolean, or string)
 * @param type - Encryption type
 * @returns Encrypted value with metadata
 */
async encrypt<T>(value: T, type: EncryptType): Promise<EncryptedValue> {
  // Implementation
}
```

## Testing

### Writing Tests

Tests are located in `packages/fhevm-sdk/src/__tests__/`

```typescript
import { describe, it, expect } from 'vitest';
import { validateEncryptType } from '../utils/validation';

describe('validateEncryptType', () => {
  it('should validate correct types', () => {
    expect(validateEncryptType('uint16')).toBe(true);
    expect(validateEncryptType('bool')).toBe(true);
  });

  it('should reject incorrect types', () => {
    expect(validateEncryptType('uint256')).toBe(false);
    expect(validateEncryptType('invalid')).toBe(false);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Pull Request Process

### Before Submitting

1. **Update Documentation**: Update README and relevant docs
2. **Add Tests**: Ensure new code is tested
3. **Type Check**: Run `npm run typecheck`
4. **Build**: Ensure `npm run build` succeeds
5. **Format Code**: Follow coding standards

### PR Guidelines

1. **Title**: Use clear, descriptive titles
   - `feat: Add support for uint256 encryption`
   - `fix: Resolve initialization race condition`
   - `docs: Update React hooks documentation`

2. **Description**: Include:
   - What changes were made
   - Why the changes were necessary
   - How the changes were tested
   - Any breaking changes
   - Related issues (if any)

3. **Commits**: Use conventional commit messages
   - `feat:` - New features
   - `fix:` - Bug fixes
   - `docs:` - Documentation changes
   - `test:` - Test additions/changes
   - `refactor:` - Code refactoring
   - `chore:` - Maintenance tasks

### Example PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] TypeScript types updated
- [ ] Build passes
- [ ] No breaking changes (or documented)
```

## Reporting Bugs

### Bug Report Template

```markdown
**Describe the bug**
Clear and concise description

**To Reproduce**
Steps to reproduce:
1. Initialize SDK with...
2. Call encrypt()...
3. See error

**Expected behavior**
What should happen

**Actual behavior**
What actually happens

**Environment**
- SDK version:
- Framework: (React/Vue/Node.js)
- Framework version:
- Node.js version:
- Browser (if applicable):

**Code sample**
```typescript
// Minimal reproducible example
```

**Error message**
```
Full error message
```
```

## Feature Requests

### Feature Request Template

```markdown
**Problem**
Describe the problem this feature would solve

**Proposed Solution**
How should this feature work?

**Alternatives**
Alternative solutions considered

**Additional Context**
Any other relevant information

**Example Usage**
```typescript
// How the API might look
```
```

## Areas for Contribution

We welcome contributions in the following areas:

### High Priority

- [ ] Additional framework adapters (Svelte, Angular, etc.)
- [ ] More comprehensive tests
- [ ] Performance optimizations
- [ ] Documentation improvements
- [ ] Example applications

### Medium Priority

- [ ] Additional utility functions
- [ ] Better error messages
- [ ] TypeScript improvements
- [ ] Build optimizations

### Nice to Have

- [ ] Benchmarking suite
- [ ] Visual documentation
- [ ] Interactive examples
- [ ] Video tutorials

## Questions?

If you have questions about contributing:

1. Check existing issues and discussions
2. Read the documentation
3. Ask in discussions or create an issue

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to making encrypted applications more accessible!
