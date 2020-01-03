import React, { Component } from 'react'
import { Query } from 'react-apollo'
import usersQuery from '../queries/usersQuery'

const User = () => (
    <Query query = {usersQuery}>  
            {({loading, error, data }) => {
                if(loading) return <p>Loading...</p>
                if(error) return <p>Ups, ada Eror</p>

                return data.users.map(({ name }) =>(
                    <div key="name">
                        <p>{name}</p>
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