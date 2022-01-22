import React, { FC, useState, ChangeEvent } from 'react';
import { Form, FormGroup, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import useAPI from '../hooks/useAPI';

const Login: FC = () => {
  const { authenticateUser } = useAPI();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'email') setEmail(value);
    else setPassword(value);
  };
  const submitCred = () => {
    authenticateUser({ email, password })
      .then((user) => {
        toast(`User authenticated`, { type: 'success' });
      })
      .catch((error) => {
        toast(`Unable to authenticate user`, { type: 'error' });
      });
  };

  return (
    <main className="Login">
      <h1>Login</h1>
      <Form>
        <FormGroup>
          <label>Email</label>
          <input name="email" id="email" placeholder="email" onChange={changeHandler} />
        </FormGroup>
        <FormGroup>
          <label>Password</label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="password"
            onChange={changeHandler}
          />
        </FormGroup>
        <Button onClick={submitCred}>Login</Button>
      </Form>
    </main>
  );
};

export default Login;
