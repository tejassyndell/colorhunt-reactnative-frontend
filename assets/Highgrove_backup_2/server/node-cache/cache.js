// /* eslint-disable */

const NodeCache = require('node-persist');

// Create a new instance of the cache
const cache = NodeCache.create();

// Initialize the cache asynchronously
cache.init().then(() => {
  console.log('Cache initialized successfully');
}).catch((error) => {
  console.error('Error initializing cache:', error);
});

module.exports = cache;



