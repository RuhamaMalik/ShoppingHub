const express = require('express');
require('./models/config');
const app = express();
const cors = require('cors');
const router = express.Router();

const path = require('path');

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// router.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/users', require('./routes/userRoutes'));
app.use('/admin', require('./routes/adminRoutes'));


app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(5000, () => console.log('server is running'))