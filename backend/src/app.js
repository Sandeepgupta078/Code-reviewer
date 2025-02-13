const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');
const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());

app.use('/ai', aiRoutes);

module.exports = app;