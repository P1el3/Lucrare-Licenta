// Importing modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import the cors package
const db = require('./models');
const userRoutes = require('./routes/users');
const agencyRoutes = require('./routes/agency');


// Setting up your port
const PORT = process.env.PORT || 8080;

// Assigning the variable app to express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173', // Permite doar solicitările de la această origine
    optionsSuccessStatus: 200, // Unele browsere (legacy) au probleme cu status 204
  };
  
app.use(cors(corsOptions));

// Synchronizing the database and forcing it to false so we don't lose data
db.sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync");
});


// Routes for the user API
app.use('/api/users', userRoutes);
app.use('/api/agency', agencyRoutes);

// Listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
