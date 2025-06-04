const router = require('express').Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = "weak-secret";
const User = require('../models/user');

router.post('/login', async (req, res) => {
    console.log('Login attempt:', req.body);
    const { username, password } = req.body;
  
    const user = await User.findOne({ username, password });
    console.log('Found user:', user);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
    res.json({ token });
  });

router.post('/login-insecure', async (req, res) => {
    console.log('Insecure Login attempt:', req.body);
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });
    console.log('Found user:', user);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful' });
});

router.post('/login-secure', async (req, res) => {
    console.log('Secure login attempt:', req.body);

    let { username, password } = req.body;
    if (typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: 'Username and password must be strings' });
    }
    username = username.trim();
    password = password.trim();
    const forbiddenPattern = /[\{\}\$]/;
    if (forbiddenPattern.test(username) || forbiddenPattern.test(password)) {
        return res.status(400).json({ message: 'Invalid characters in username or password' });
    }

    try {
        const user = await User.findOne({ username, password });
        console.log('Found user:', user);
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        res.json({ message: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/register', async (req, res) => {
try {
    const { username, password, role } = req.body;
    if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
    return res.status(400).json({ message: 'Username already taken' });
    }
    const newUser = new User({ username, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
} catch (err) {
    console.error('Error in /register:', err);
    res.status(500).json({ message: 'Server error' });
}
});
module.exports = router;