import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER} from '../../utils/mutations';


export function Signup(props) {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
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
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="username">Username: </label>
            <input
              placeholder="Username"
              name="username"
              type="username"
              id="username"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="pwd">Password: </label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
          </div>
          {error ? (
            <div>
              <p className='error-text'>Password should be at least 8 characters</p>
            </div>
          ) : null}
          <div className="flex-row flex-end">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
  
 
  