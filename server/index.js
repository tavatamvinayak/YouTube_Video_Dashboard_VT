const express = require('express');
const cors = require('cors');
const  DbConnection  = require('./services/db');
require('dotenv').config();

const app = express();
// ${process.env.CLIENT_URL || 'http://localhost:3000'}
// Allow only your frontend
app.use(cors({
  origin: "https://you-tube-video-dashboard-vt-d6rv.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
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
