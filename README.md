# contact-list
Manage a list of your personal contacts.

[ ![Codeship Status for andrewshawcare/contact-list](https://app.codeship.com/projects/8f7749c0-d775-0134-6ded-3a9d3eea3b3f/status?branch=master)](https://app.codeship.com/projects/203061)

# Setup

This project is built on Node.js. You can download Node.js [here](https://nodejs.org/en/download/).

## Persistence

This application uses the [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage) for persistence. If you'd like to clear your contacts, please use your browser's built-in developer tools.

## Environment variables

You must have the `PORT` environment variable set to a free local port in the range of 1024 - 65535 (0 - 65535 if running with elevated privileges). This will be the port the application will listen for incoming connections on.

## Scripts

The following scripts can be run by invoking them via `npm run <script>`:

* `develop`: Lint, test, and deploy the application on file change. Useful for development.
* `lint`: Runs static analysis (read: linting) on application source.
* `start`: Deploys the application which will be available at `http://localhost:${PORT}`.
* `test`: Runs the application test suite.
