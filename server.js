const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

// Example user data (this would be in a database in a real app)
const users = [
    {
        id: 1,
        email: 'kp.rejy1972@gmail.com',
        password: bcrypt.hashSync('admin123', 10) // pre-hashed password
    }
];

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Set up sessions
app.use(session({
    secret: 'your-secret-key', // Use a more secure secret key in production
    resave: false,
    saveUninitialized: true
}));

// Serve static files (e.g., for your login page)
app.use(express.static('public'));

// Login route (GET - serve the login page)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Login route (POST - handle form submission)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(u => u.email === email);

    if (user && bcrypt.compareSync(password, user.password)) {
        // Set up session if user is authenticated
        req.session.user = user;
        res.redirect('/protected'); // Redirect to protected page
    } else {
        res.send('Invalid credentials');
    }
});

// Protected route - only accessible if the user is logged in
app.get('/protected', (req, res) => {
    if (req.session.user) {
        res.send(`<h1>Welcome ${req.session.user.email}</h1><p>You can access the protected content here.</p>`);
    } else {
        res.redirect('/login'); // Redirect to login page if not authenticated
    }
});

// Starting the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
