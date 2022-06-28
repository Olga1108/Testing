import React, {useState} from 'react';
import './App.css';
import validator from 'validator';

function App() {
  const [signupInput, setSignupInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setSignupInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    })
  }

  const handleClick = (e) => {
    e.preventDefault();
    if(!validator.isEmail(signupInput.email)) {
      setError('The email you input is invalid')
    }
  };
  return (
    <div className='App'>
     <form>
      <div className='mb-3'>
        <label htmlFor='password'>
          Password
        </label>
        <input
          type='password'
          id='password'
          name='password'
          className='form-control'
          value={signupInput.password}
          onChange={handleChange}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='confirm-password'>
          Confirm password
        </label>
        <input
          type='password'
          id='confirm-password'
          name='confirmPassword'
          className='form-control'
          value={signupInput.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>
          Email address
        </label>
        <input
          type='email'
          id='email'
          name='email'
          className='form-control'
          value={signupInput.email}
          onChange={handleChange}
        />
      </div>
      {error && <p className='text-danger'>{error}</p>}
      <button name='submit' type='submit' className='btn btn-primary' onClick={handleClick}>Submit</button>
     </form>
    </div>
  );
}

export default App;
