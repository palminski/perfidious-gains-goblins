import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { Journal } from '../Journal';
import Button from 'react-bootstrap/Button';
import {Row, Col} from 'react-bootstrap';

export function Login(props) {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { username: formState.username, password: formState.password },
      });

      const token = mutationResponse.data.loginUser.token;
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
   
    <div className="container my-1 login">

      <h2 className='login-title'>Login</h2>
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