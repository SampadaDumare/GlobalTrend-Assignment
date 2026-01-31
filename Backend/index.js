require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

connectToMongo();

app.use(express.json());
app.use(cors());

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/task'));

app.listen(port, () => {
    console.log(`App backend listening on http://localhost:${port}`);
});
