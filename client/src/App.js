import React from 'react';
import {useState} from 'react';
import { setContext } from '@apollo/client/link/context'



import { Counter } from './components/counter/Counter';
import { Community } from './components/Community';
import { Journal } from './components/Journal';
import { Signup } from './components/Signup';
import { Workouts } from './components/Workouts';
import { Login} from './components/Login';
import { Navbar } from './components/Navbar';
import './App.css';
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
     ...headers,
      authorization: token? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const [pageSelected, setPageSelected] = useState('Community')



  return (
    <ApolloProvider client={client}>
    <div className="App">
      
        <Navbar pageSelected={pageSelected} setPageSelected={setPageSelected}/>
        
        {pageSelected === 'Community' && <Community />}
        {pageSelected === 'Journal' && <Journal />}
        {pageSelected === 'Signup' && <Signup />}
        {pageSelected === 'Workouts' && <Workouts />}
        {pageSelected === 'Counter' && <Counter />}
        {pageSelected === 'Login' && <Login setPageSelected = { setPageSelected } />}
        
      
    </div>
    </ApolloProvider>
  );
}

export default App;
