const express = require('express')
const app = express()
const env = require('dotenv')
//env file which holds the constant
env.config()
const PORT = process.env.PORT
//routes
const userAuth = require('./routes/user')
const adminAuth = require('./routes/admin/user')
const categoryRoutes = require('./routes/category') 
const productRoutes = require('./routes/product') 
//middleware to pass json used insted app.use(express.json()) - to maupulate data upto my requirement
// const bodyParser = require('body-parser');

const mongoose = require('mongoose')
// const category = require('./models/category')
//mongodb constants from env folder
const MongoUser = process.env.MONGO_USER
const MongoPassword = process.env.MONGO_PASSWORD

mongoose.connect(`mongodb+srv://${MongoUser}:${MongoPassword}@cluster0.d7y3h.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log('DataBase Connected')
}).catch(err =>{
    console.log(err);
})
//middleware to pass json used insted app.use(express.json()) - to maupulate data upto my requirement
// app.use(bodyParser.json())
app.use(express.json())  //this can also be used

app.use('/api', userAuth)
app.use('/api', adminAuth)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)

app.listen(PORT,()=>{
    console.log(`server is runing on  http://localhost:${PORT}`);

})