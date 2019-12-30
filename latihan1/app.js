// yang mesti di install
// npm init
// npm install express express-graphql graphql --save

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');


const app = express()

let forumData = [
    { id: "1", title: "cara belajar", desc:"belajar graphql"},
    { id: "2", title: "graphql dasar", desc: "latihan apa ?"},
    { id: "3", title: "graphql aja", desc: "done"},

]

let schema = buildSchema(`
        type Forum {
            id: ID,
            title: String,
            desc: String
        }
        type Query {
            forum(id: ID!): Forum,
            forums: [Forum]
        }
`)

let resolvers = {
    //resolve //fetch

    forum: (args)=> {
        return forumData.find(el => el.id == args.id)
    },
    forums: ()=> forumData
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true //GUI

}))

app.listen(4000, ()=> console.log('berhasil jalan'))