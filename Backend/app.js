const express = require('express');
const app = express();
const port  = 3000;

const topic = require('./routes/topic');
const blog = require('./routes/blog');

app.use('/topic', topic);
app.use('/blog', blog)

app.listen(port, ()=>{
    console.log('listening on port 3000...');
});