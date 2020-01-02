// noted ada di bawah
// yang mesti di install
// npm init
// npm install express express-graphql graphql --save
// server run in http://localhost:4000/graphql
// npm install mangoose --save for mongo db

const graphql = require('graphql')
const { GraphQLList,
        GraphQLSchema,
        GraphQLString,
        GraphQLObjectType,
        GraphQLNonNull } = graphql

// call dari db use this kalau tidak comment
const User = require('../models/user')
const Forum = require('../models/forum')


// ini untuk data statis bukan dari db
// const forumData = [
//     { id: "1", title: "cara belajar", desc:"belajar graphql", userId: "1"},
//     { id: "2", title: "graphql dasar", desc: "latihan apa ?", userId: "2"},
//     { id: "3", title: "graphql aja", desc: "done", userId: "1"},
// ]

// const userData = [
//     { id: "1", name: "Hendy"},
//     { id: "2", name: "Dragon"},
// ]

const ForumType = new GraphQLObjectType({
    name: 'Forum',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        desc: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId)
                // return userData.find(el => el.id == parent.userId) // untuk data statis diatas yang di comment
            }
        }
    })
})


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        forums: {
            type: new GraphQLList(ForumType),
            resolve(parent, args) {
                return Forum.find({ userId: parent.id })
                // return forumData.filter(el => el.userId == parent.id) // untuk data statis diatas yang di comment
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        forums: {
            type: new GraphQLList(ForumType),
            resolve(parent, args){
                return Forum.find({})
                // return forumData // untuk data statis
            }
        },
        forum: {
            type: ForumType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                return Forum.findById(args.id)
                // return forumData.find(el => el.id == args.id) // untuk data statis diatas yang di comment
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({})
                // return userData // untuk data statis diatas yang di comment
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                return User.findById(args.id)
                // return userData.find(el => el.id == args.id) // untuk data statis diatas yang di comment
            }
        }
    }
})


// mutation sama seperti post di rest
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: { 
                name: { type: new GraphQLNonNull(GraphQLString) }//GraphQLNonNull di gunakan untuk required saat post
            },
            resolve(parent, args){
                let user = new User({
                    name: args.name
                })
                return user.save()
            }
        },
        addForum: {
            type: ForumType,
            args: { 
                title: { type: new GraphQLNonNull(GraphQLString) },
                desc: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: GraphQLString }
            },
            resolve(parent, args){
                let forum = new Forum({
                    title: args.title,
                    desc: args.desc,
                    userId: args.userId
                })
                return forum.save()
            }
        },
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

// untuk call api in graphi using data statis in above
// untuk call in graphi 
// {
//     forums {
//       id
//       title
//       desc
//     }
// }
  
// untuk memanggil by id graphql
// {
//     forum(id: "1") {
//       id
//       title
//       desc
//     }
// }

// untuk mengakses users
// {
//     users{
//       id
//       name
//     }
// }

// akses users with id
// {
//     user(id: "2"){
//       id
//       name
//     }
// }
  
// untu manggil di graphi forum  relasi user
// {
//     forums{
//       id
//       title
//       desc
//       user{
//         name
//       }
//     }
// }

// untuk calling users dengan forum
// {
//     users{
//       name
//       forums{
//         title
//         desc
//       }
//     }
// }

// untuk dari db mangoose yg beda saat find by id,id in mongo auto

// untuk post di mongo db gunakan mutation dan call
// mutation {
//     addUser(name:"Black"){
//       name
//     }
// }

//  untuk forum mutation
// mutation {
//     addForum(title: "graphql bos", desc: "practice make happy", userId:"5e0d67350934e03e7c5ef562"){
//       title
//     }
// }