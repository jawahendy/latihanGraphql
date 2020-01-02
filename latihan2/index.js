const express = require ('express')
const graphqlHTTP = require('express-graphql')
const schema = require ('./schema/main')

// using mangoose using call mongodb
const mongoose = require('mongoose');


const app = express()

// call mongo db 
mongoose.connect('mongodb://localhost:27017/graphql-lat1');

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, ()=>{
    console.log('server run in 4000')
})