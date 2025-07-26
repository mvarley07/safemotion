# Contributing to SafeMotion

Thank you for your interest in contributing to SafeMotion! We welcome contributions from everyone.

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/safemotion.git
   cd safemotion
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run tests:
   ```bash
   npm test
   ```

5. Start development:
   ```bash
   npm run dev
   ```

## Project Structure

```
safemotion/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript types
│   └── index.ts       # Main exports
├── examples/          # Usage examples
├── tests/            # Test files
└── docs/             # Documentation
```

## Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style (Prettier configuration)
- Write meaningful variable and function names
- Add JSDoc comments for public APIs

### Testing

- Write tests for new features and bug fixes
- Ensure all tests pass before submitting
- Aim for good test coverage

### Performance

- SafeMotion prioritizes performance and accessibility
- Test on mobile devices and low-end hardware
- Respect user preferences (reduced motion, battery level)

### Accessibility

- All animations must respect `prefers-reduced-motion`
- Use semantic HTML and proper ARIA labels
- Test with screen readers when applicable

## Pull Request Process

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes
3. Add tests for new functionality
4. Run the test suite:
   ```bash
   npm test
   npm run lint
   ```

5. Commit your changes:
   ```bash
   git commit -m "feat: add your feature description"
   ```

6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

7. Open a Pull Request

## Commit Convention

We use conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Issues

- Check existing issues before creating new ones
- Use the issue templates when available
- Provide clear reproduction steps for bugs
- Include browser/device information for compatibility issues

## Questions?

- Open a discussion on GitHub
- Check the documentation
- Look at the examples folder

Thank you for contributing! 🎉