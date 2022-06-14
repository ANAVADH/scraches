const express = require('express')
const app = express()
const env = require('dotenv')
//env file which holds the constant
env.config()
const PORT = process.env.PORT
//routes
const userRoutes = require('./routes/user')
//middleware to pass json used insted app.use(express.json()) - to maupulate data upto my requirement
const bodyParser = require('body-parser');

const mongoose = require('mongoose')
//mongodb constants from env folder
const MongoUser = process.env.MONGO_USER
const MongoPassword = process.env.MONGO_PASSWORD

mongoose.connect(`mongodb+srv://${MongoUser}:${MongoPassword}@cluster0.wus8u.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log('DataBase Connected')
}).catch(err =>{
    console.log(err);
})



//middleware to pass json used insted app.use(express.json()) - to maupulate data upto my requirement
app.use(bodyParser.json())

app.use('/api', userRoutes)


app.listen(PORT,()=>{
    console.log(`server is runing on  http://localhost:${PORT}`);

})