import express from 'express';
import cors from 'cors';
import morgan from 'morgan'

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // In order not to let haackers know about the app

const port = 8080;

// HTTP GET Request
app.get('/', (req, res) => {
    res.status(201).json('Home GET Request');
})

// Start Server
app.listen(port, () => {
    console.log(`Shagwell Server started on port http://localhost:${port}`);
})