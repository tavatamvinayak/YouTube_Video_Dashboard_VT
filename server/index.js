const express = require('express');
const cors = require('cors');
const  DbConnection  = require('./services/db');
require('dotenv').config();

const app = express();
// ${process.env.CLIENT_URL || 'http://localhost:3000'}
app.use(cors({
  origin: `*`
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// db connection
DbConnection();



app.use('/api/',require('./controllers/Log'));
app.use('/api/', require('./controllers/Youtube_video'));
app.use('/api/', require('./controllers/Notes'));




app.get('/', (req, res) => {
  res.send('server is running..');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
