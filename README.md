# Film Forge Client

A modern React front-end for browsing and discovering movies, built with Parcel and the MERN stack.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Available Scripts](#available-scripts)
6. [Project Structure](#project-structure)
7. [Usage](#usage)
8. [Deployment](#deployment)
9. [Contributing](#contributing)
10. [License](#license)

---

## Project Overview

The **Film Forge Client** is the front-end application for the Film Forge movie app. It provides a responsive user interface to explore, search, and save favorite films. Built using React and bundled with Parcel for fast development and production workflows.

## Features

- React-based component architecture
- Hot Module Replacement (HMR) during development
- ES6+ and JSX support
- Simple, zero-config bundling with Parcel
- Easy connectivity to the Film Forge backend API

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v14 or later)
- **npm** (v6 or later) or **Yarn**
- **Git** for cloning the repository

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/film-forge-client.git
   cd film-forge-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   This will launch Parcel and serve the app at `http://localhost:1234` by default.

## Available Scripts

In the project directory, you can run:

| Script          | Description                                 |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Starts the development server with HMR      |
| `npm run build` | Bundles the app for production into `/dist` |
| `npm test`      | Runs the test suite (if configured)         |

## Project Structure

film-forge-client/
├── src/
│   ├── index.html       # HTML entry point
│   └── index.js         # React root component & mounting
├── package.json         # Project metadata & scripts
├── .gitignore           # Files to ignore in Git
└── README.md            # Project documentation

## Usage

- Navigate to `http://localhost:1234` in your browser.
- Explore the movie listings and interact with the UI.
- Connects out-of-the-box to the Film Forge backend at `http://localhost:5000/api` (ensure your backend is running).

## Deployment

1. **Build the app for production**

   ```bash
   npm run build
   ```

2. **Serve the `dist/` folder**

   - You can host it on any static file server (e.g., `serve`, `nginx`, or `GitHub Pages`).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repo
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
