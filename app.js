const express = require('express');
const bodyParser = require('body-parser');
const { connectToDb } = require('./db/connection');
const contactRoutes = require('./routes/contact');


const app = express();

/* middleware */
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //header CORS (Cross-Origin Resource Sharing) : Allow all domains to access this API.
  next();
});

/* route */
app.use('/contact', contactRoutes); 


// Start the server *after* DB connects
connectToDb().then(() => {
  app.listen(8080);
});
