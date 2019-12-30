// yang mesti di install
// npm init
// npm install express express-graphql graphql --save
// server run in http://localhost:4000/graphql

// call in graphi
// {
//     forums {
//       title
//       desc
//     }
//  }

// with id for user with id same
// {
//     forum(id:"2") {
//       title
//       desc
//     }
// }
  
// call in graphi relasi
// {
// 	user(id:"2"){
//     name
//     forums{
//       title
//       desc
//     }
//   }
// }

// relasi forum to user ,you can call in graphi
// {
//     forums{
//       title
//       desc
//       user{
//         name
//       }
//     }
// }

// relasi user to all forums
// {
//     users {
//       name
//       forums{
//         title
//         desc
//       }
//     }
// }

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');


const app = express()

let forumData = [
    { id: "1", title: "cara belajar", desc:"belajar graphql", userId: "1"},
    { id: "2", title: "graphql dasar", desc: "latihan apa ?", userId: "2"},
    { id: "3", title: "graphql aja", desc: "done", userId: "2"},

]

let userData = [
    { id: "1", name: "Hendy"},
    { id: "2", name: "Dragon"},
    { id: "3", name: "Black"},
]

let schema = buildSchema(`
        type Forum {
            id: ID,
            title: String,
            desc: String,
            user: User
        }
        type User {
            id: ID,
            name: String,
            forums: [Forum]
        }
        type Query {
            forum(id: ID!): Forum,
            forums: [Forum],
            user(id: ID!): User,
            users: [User]
        }
`)

let resolvers = {
    //resolve //fetch

    forum: (args)=> {
        let _forum = forumData.find(el => el.id == args.id)
        _forum['user'] = userData.find(el => el.id == _forum.id)

        return _forum
    },
    forums: ()=> {
        let _user = ''
        

        // loop forum and iuser data
        forumData.map(
            (eachForum) => {
                _user = userData.find(el => el.id == eachForum.userId)
                eachForum['user'] = _user
            }
        )
        return forumData

    },
    user: (args) => {
        let _user = userData.find(el => el.id == args.id)
        _user['forums'] = forumData.filter(el => el.userId == _user.id)

        return _user
    },
    users: () => {
        let _forums = ''

        //loop user and insert all data
        userData.map(
            (eachUser) => {
                _forums = forumData.filter(el => el.userId == eachUser.id)
                eachUser['forums'] = _forums
            }
        )
        return userData
    }
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true //GUI

}))

app.listen(4000, ()=> console.log('berhasil jalan'))