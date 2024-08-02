const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from the frontend's URL
    methods: ['GET', 'POST'], // Allow these methods
    allowedHeaders: ['Content-Type'], // Allow these headers
  }));


  app.get('/test-cors', (req, res) => {
    res.json({ message: "CORS is working!" });
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the BFHL API');
});



app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});


app.post('/bfhl', (req, res) => {
    const data = req.body.data;
    const userId = "K.Neena 12/03/2004"; 
    const email = "kr5121@srmist.edu.in"; 
    const rollNumber = "RA2111008020026"; 
    
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestAlphabet = alphabets.length > 0 ? [alphabets.sort().pop()] : [];

    res.status(200).json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet
    });
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
  });

