const express = require ('express')
const graphqlHTTP = require('express-graphql')
const schema = require ('./schema/main')

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, ()=>{
    console.log('server run in 4000')
})