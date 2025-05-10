const express = require('express');
const bodyParser = require('body-parser');
const { connectToDb } = require('./db/connection');
const contactRoutes = require('./routes');


const app = express();

/* middleware */
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //header CORS (Cross-Origin Resource Sharing) : Allow all domains to access this API.
  next();
});

/* simple route for root path */
app.get('/', (req, res) => {
  res.send('API is running.');
});

/* route */
app.use('/', contactRoutes); 


// Start the server *after* DB connects
connectToDb().then(() => {
  app.listen(8080);
});
