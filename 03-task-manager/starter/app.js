const express = require('express');
const app = express();
const tasks = require('./routes/tasks.js');
const connectDB = require('./db/connect');
require('dotenv').config();
const {notFound} = require('./middlewares/not-found.js');
const {errorHandler} = require('./middlewares/error-handler.js');

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandler);

// app.get('/api/v1/tasks')          --> Get all the Tasks
// app.post('/api/v1/tasks')         --> Create a new Task
// app.get('/api/v1/tasks/:id')      --> Get single Task
// app.patch('/api/v1/tasks/:id')    --> Update Task
// app.delete('/api/v1/tasks/:id')   --> Delete Task

const port = process.env.PORT || 3000;
const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`Server is listening on port ${port}........`);
        });
    }catch(error){
        console.log(error);
    }
};

start();

//  $env:PORT=6000 ; node app.js