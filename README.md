<h2 align="center">Portfolio</h2>

<p align="center">
	Source code for my personal portfolio website
	<br />
	<a href="https://n5n.dev">Visit</a>
	·
	<a href="https://github.com/janeumnn/portfolio/issues">Report Bug</a>
</p>

## About the Project

This repository contains the source code for my personal portfolio website, organized as a monorepo using pnpm workspaces. It is designed to separate applications and shared configuration packages for maintainability, scalability, and code reuse. The main focus is on the web application, but the structure allows for easy extension with additional apps or shared tooling.

In addition to serving as a portfolio, this project is a space for experimenting with current web technologies and keeping up with the latest frameworks, tools, and best practices. It is intended as a living project that evolves alongside the modern web ecosystem.

## Project Structure

- `apps/web` — Main portfolio web application built with [Astro](https://astro.build/) and [Svelte](https://svelte.dev/).
- `packages/api` — API server and endpoints, built with [Hono](https://hono.dev/).
- `packages/utils` — Shared utility functions and helpers.
- `configs/eslint` — Shared ESLint configuration for consistent code quality.
- `configs/prettier` — Shared Prettier configuration for code formatting.
- `configs/ts` — Shared TypeScript configuration for type safety across projects.

## Technologies

- **Astro** — Static site generation
- **Svelte** — UI components
- **TypeScript** — Type safety
- **Hono** — Fast, lightweight web framework for the API
- **pnpm** — Monorepo and package management
- **ESLint** & **Prettier** — Code quality and formatting

## Contribution

Contributions are welcome! Please open an issue or submit a pull request for suggestions or improvements.

## License

This project is licensed under the MIT License.
