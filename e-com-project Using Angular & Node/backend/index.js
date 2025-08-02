const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const categoryRoutes = require('./routes/category.js');
const userRoutes = require('./routes/user.js')
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Category routes
app.use('/category', categoryRoutes);

//User ROutes
app.use('/user', userRoutes)
// Database connection
async function connectDb() {
    try {
        await mongoose.connect('mongodb://localhost:27017', {
            dbName: 'e-comm-store',
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}
connectDb();

// Start server
app.listen(port, () => {
    console.log('Server started on port:', port);
});
