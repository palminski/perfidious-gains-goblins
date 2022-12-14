import React from 'react';
import { useState, useEffect } from 'react';
import { setContext } from '@apollo/client/link/context'


import Auth from './utils/auth'
import Home from './components/LandingPage/index';
import { Counter } from './components/counter/Counter';
import { Community } from './components/Community';
import { Journal } from './components/Journal';
import { Signup } from './components/Signup';
import { Workouts } from './components/Workouts';
import { Login } from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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

  const [loggedInState, setLoggedInState] = useState(false);
  const [pageSelected, setPageSelected] = useState('Home')

  useEffect(() => {
    const tokenInterval = setInterval(() => {
      if (Auth.loggedIn()) {
        setLoggedInState(true);
        // setPageSelected('Journal');
      }  else if (!pageSelected === 'Signup' && !pageSelected === 'Login'){
        setLoggedInState(false);
        setPageSelected('Home')
      } 
    }, 60000)
    if (Auth.loggedIn()) {
      setLoggedInState(true);
      // setPageSelected('Journal');
    }  else {
      setLoggedInState(false);
     
    } 
  })

  return (
    <ApolloProvider client={client}>
    <div className="App">
      
        <Navbar pageSelected={pageSelected} setPageSelected={setPageSelected}/>
        
        {pageSelected === 'Home' && <Home/>}
        {pageSelected === 'Community' && <Community />}
        {pageSelected === 'Journal' && <Journal />}
        {pageSelected === 'Signup' && <Signup setPageSelected = { setPageSelected} />}
        {pageSelected === 'Workouts' && <Workouts />}
        {pageSelected === 'Counter' && <Counter />}
        {pageSelected === 'Login' && <Login setPageSelected = { setPageSelected } />}
        
        <Footer />
    </div>
    </ApolloProvider>
  );
}

export default App;
