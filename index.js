// File: index.js
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the web build folder
app.use(express.static(path.join(__dirname, 'web-build')));

// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web-build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
