import React from "react";
import logo from "./logo.svg";
import "./App.css";

import ApolloClient, { from } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import User from './components/user'
import Form from './components/Form'


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
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

