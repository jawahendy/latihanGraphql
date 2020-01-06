import gql from "graphql-tag";

export default gql`{
    users{
        id
        name
        isActive @client
    }
}
`

// uncoment ini untuk find by id and comment above, no uncomment import
// export default gql`
// query user($id: ID!){
//     user(id: $id){
//         name
//     }
// }
// `