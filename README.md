# contact-list

Manage a list of your personal contacts.

# Setup

This project is built on Node.js. You can download Node.js [here](https://nodejs.org/en/download/).

## Persistence

This application uses the [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage) for persistence. If you'd like to clear your contacts, please use your browser's built-in developer tools.

## Scripts

The following scripts can be run by invoking them via `npm run <script>`:

- `develop`: Lint, test, and deploy the application on file change. Useful for development.
- `lint`: Runs static analysis (read: linting) on application source.
- `start`: Deploys the application which will be available at `http://localhost:${PORT}`.
- `test`: Runs the application test suite.
