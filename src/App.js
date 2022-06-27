
import './App.css';

function App() {
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
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='confirm-password'>
          Confirm password
        </label>
        <input
          type='password'
          id='confirm-password'
          name='confirm-password'
          className='form-control'
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='email'>
          email
        </label>
        <input
          type='email'
          id='email'
          name='email'
        />
      </div>
     </form>
    </div>
  );
}

export default App;
