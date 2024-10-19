// Required imports
const { ApiPromise, WsProvider } = require('@polkadot/api');
const express = require('express');
const { router, setApiInstance } = require('./swap/swap.router');

// Main setup function to initialize API
async function setupApi() {
  const provider = new WsProvider('wss://cryptotest.agaglobal.com');
  const api = await ApiPromise.create({ provider });
  return api;
}

// Express setup
const app = express();
app.use(express.json()); // Middleware to parse JSON requests
let apiInstance;

// Mounting routes
app.use('/api', router);

// Start the server and initialize API
const PORT = 3003;
app.listen(PORT, async () => {
  try {
    apiInstance = await setupApi();
    setApiInstance(apiInstance); // Set the API instance in the controller
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to initialize API', error);
  }
});
