// FILE: src/environments/environment.prod.ts
// Dependencies: Production Firebase config placeholders; imported via Angular build configuration when --configuration production.

export const environment = {
  production: true,
  firebase: {
    apiKey: 'TODO_ADD_API_KEY',
    authDomain: 'TODO_ADD_AUTH_DOMAIN',
    projectId: 'TODO_ADD_PROJECT_ID',
    storageBucket: 'TODO_ADD_STORAGE_BUCKET',
    messagingSenderId: 'TODO_ADD_MESSAGING_SENDER_ID',
    appId: 'TODO_ADD_APP_ID',
  },
  apiBaseUrl: 'http://localhost:3000/api',
};
