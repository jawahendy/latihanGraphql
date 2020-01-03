import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from "graphql-tag";
import usersQuery from '../queries/usersQuery'

const ADD_USER = gql`
    mutation AddUser($id: ID!, $name: String!){
        addUser(id: $id, name: $name){
            id
            name
        }
    }
`

export default class Form extends Component {
    state = {
        id: "",
        name: ""
    }

    updateName = ({target}) => {
        this.setState({name: target.value})
    }

    updateId = ({target}) => {
        this.setState({id: target.value})
    }

    resetField = () => {
        this.setState({name: "", id: ""})
    }

    render() {
        return (
            <Mutation 
                mutation={ADD_USER}
                refetchQueries = {[
                    {
                        query: usersQuery
                    }
                ]}>
                {(addUser, {loading, error, data}) => (
                    <form onSubmit = {e => {
                                e.preventDefault()
                                addUser({
                                    variables: {
                                        id: this.state.id,
                                        name: this.state.name
                                    }
                                })
                                this.resetField()
                            }}>
                        <span>New User: </span>
                        <input type="text" placeholder="id" value={this.state.id} onChange={this.updateId} />
                        <input type="text" placeholder="name" value={this.state.name} onChange={this.updateName} />
                        <button type="submit">Add User</button>            
                    </form>
                )}
            </Mutation>
        )
    }
}