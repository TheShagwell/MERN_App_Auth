import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express'; // Http server connection
import cors from 'cors'; // Practically, save against malicious attack
import morgan from 'morgan'
import connect from './database/conn.js';
import router from './router/route.js';


const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // In order not to let haackers know about the app

const port = process.env.API_PORT;

// HTTP GET Request
app.get('/', (req, res) => {
    res.status(201).json('Home GET Request');
})


// api routes
app.use('/api', router);


//  Start Server only when there is a valid connection
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Ezrah started the server on port http://localhost:${port}`);
        })
    } catch (error){
        console.log('Cannot connect to the server');
    }
}).catch(error => {
    console.log('Invalid database connection...');
})
