const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to serve static files and parse form data
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Base URL for the Django Notes API
const API_URL = 'http://127.0.0.1:8000/api/notes/';

// Routes

// List all notes
app.get('/', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.render('index', { notes: response.data });
    } catch (error) {
        res.send('Error fetching notes');
    }
});

// Render form to create a new note
app.get('/create', (req, res) => {
    res.render('create');
});

// Handle form submission to create a new note
app.post('/create', async (req, res) => {
    const { title, content } = req.body;
    try {
        await axios.post(API_URL + 'create/', { title, content });
        res.redirect('/');
    } catch (error) {
        res.send('Error creating note');
    }
});

// Delete a note
app.post('/delete/:id', async (req, res) => {
    const noteId = req.params.id;
    try {
        await axios.delete(`${API_URL}delete/${noteId}/`);
        res.redirect('/');
    } catch (error) {
        res.send('Error deleting note');
    }
});

// Render form to edit a note
app.get('/edit/:id', async (req, res) => {
    const noteId = req.params.id;
    try {
        const response = await axios.get(`${API_URL}${noteId}/`);
        res.render('edit', { note: response.data });
    } catch (error) {
        res.send('Error fetching note for editing');
    }
});

// Handle form submission to update a note
app.post('/edit/:id', async (req, res) => {
    const noteId = req.params.id;
    const { title, content } = req.body;
    try {
        await axios.put(`${API_URL}update/${noteId}/`, { title, content });
        res.redirect('/');
    } catch (error) {
        res.send('Error updating note');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
