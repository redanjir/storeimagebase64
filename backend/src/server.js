const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/dbConnect.js');
const routes = require('./routes/index.js');
const cors = require('cors');

const app = express();
dotenv.config();
connectDb();

app.get('/', (req,res) =>{
    res.send('Hello world');
});

app.use(cors({
    // origin: "http://localhost:5173"
}));
app.use(express.json({limit: "10mb"}));


app.use(routes);

const port = process.env.PORT || 8080;
app.listen(port, (err)=>{
    console.log(`Server connected to http://localhost:${port}`);
})