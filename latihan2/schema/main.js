const graphql = require('graphql')
const { GraphQLList,
        GraphQLSchema,
        GraphQLString,
        GraphQLObjectType } = graphql


const forumData = [
    { id: "1", title: "cara belajar", desc:"belajar graphql", userId: "1"},
    { id: "2", title: "graphql dasar", desc: "latihan apa ?", userId: "2"},
    { id: "3", title: "graphql aja", desc: "done", userId: "1"},
]

const userData = [
    { id: "1", name: "Hendy"},
    { id: "2", name: "Dragon"},
]

const ForumType = new GraphQLObjectType({
    name: 'Forum',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        desc: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return userData.find(el => el.id == parent.userId)
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
                return forumData.filter(el => el.userId == parent.id)
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
                return forumData
            }
        },
        forum: {
            type: ForumType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                return forumData.find(el => el.id == args.id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return userData
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                return userData.find(el => el.id == args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

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