import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import Button from 'react-bootstrap/Button'


export function Signup(props) {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);
    const [errorText, setErrorText] = useState("An Error Has Occured");
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      setErrorText("An Error Has Occured");
      if (formState.password.length < 8) {
        setErrorText("Password must be at least 8 characters");
      }
      try {
        const mutationResponse = await addUser({
          variables: {
            username: formState.username,
            password: formState.password,
          },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
        props.setPageSelected("Journal");
      } catch (e) {
        console.log(e);
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    return (
      <div className="container my-1">
        <h2>Signup</h2>
        <hr></hr>
        <form className='login-signup-form' onSubmit={handleFormSubmit}>
      <div className='login-input'>
        <label htmlFor="username">Username: </label>
          <input
            placeholder="Username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className='login-input'>
        <label htmlFor="pwd">Password: </label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
          
<hr></hr>
        
          <Button type="submit" variant="secondary" size="lg">Submit</Button>

          {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        
      </form>
      </div>
    );
  }
  
 
  