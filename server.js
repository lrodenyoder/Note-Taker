const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

//move to other files later
const { notes } = require('./db/db');

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static('public'));

// //use api routes
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

//move to other files later
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});