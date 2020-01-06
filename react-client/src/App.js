import React from "react";
import logo from "./logo.svg";
import "./App.css";

import ApolloClient, { from } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import User from './components/user'
import Form from './components/Form'


const resolvers = {
  User: {
    isActive: parent => {
      const activeUsers = JSON.parse(localStorage.getItem('activeUsers')) || [] 
      return activeUsers.includes(parent.id)
    }
  },
  Mutation: {
    updateUserActive: (_ , variables, {getCacheKey, cache}) => {
      const activeUsers = JSON.parse(localStorage.getItem('activeUsers')) || []
      
      if(variables.isActive){
        localStorage.setItem("activeUsers",
                            JSON.stringify(activeUsers.concat([variables.id]))
                            )
      } else {
        localStorage.setItem("activeUsers",
                              JSON.stringify(activeUsers.filter( userId => userId != [variables.id]))
                            )
      }
    }
  }
}


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  clientState: {
    resolvers // client site have 3 : default, resolvers and typeDef
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          Learn Apollo
          <User />
          <Form />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;

