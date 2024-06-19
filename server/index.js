
const express = require('express');
const { exec } = require('child_process');
const cors = require('cors'); // Import cors middleware

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Example endpoint
app.post('/python-function', (req, res) => {
    const inputData = req.body.data;  // Assuming JSON data sent from client
    exec(`python ../hola.py ${inputData}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log(`Python script output: ${stdout}`);
        res.json({ message: stdout });
    });
});

app.get("/", (req, res) => {
    res.send("Hello from Express!");
});
  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
