import React, { Component } from 'react'
import { Query , Mutation} from 'react-apollo'
import usersQuery from '../queries/usersQuery'
import gql from "graphql-tag"


const UPDATE_ACTIVE_USER = gql `
        mutation updateUserActive($id: ID!, $isActive: Boolean!){
            updateUserActive(id: $id, isActive: $isActive) @client
        }`

const User = () => (
    <Query query = {usersQuery}>  
            {({loading, error, data }) => {
                if(loading) return <p>Loading...</p>
                if(error) return <p>Ups, ada Eror</p>

                return data.users.map(({ id, name, isActive}) =>(
                    <div key="name">
                        <p>{id} - {name}- </p>
                        <Mutation 
                                mutation = {UPDATE_ACTIVE_USER}
                                refetchQueries = {[
                                    {
                                        query: usersQuery
                                    }
                                ]}>
                            {(updateUserActive, {loading, error}) =>(
                                <button onClick={()=>
                                    updateUserActive({
                                        variables: {
                                            id,
                                            isActive: !isActive
                                        }
                                    })
                                }>{isActive ? "😃" : "😘" }</button>
                            )}

                        </Mutation>
                    </div>
                ))
            }}
    </Query>
)
export default User

// untuk search by id un coment ini and un comment in usersquery di query folder dan jangan coment import

// const User = () => (
//     <Query query = {usersQuery} variables={{id: "1"}}>  
//             {({loading, error, data }) => {
//                 if(loading) return <p>Loading...</p>
//                 if(error) return <p>Ups, ada Eror</p>

//             return <p>{data.user.name}</p>
//             }}
//     </Query>
// )