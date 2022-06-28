import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('inputs should be initially empty', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement = screen.getByLabelText(/Confirm password/i)
  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordInputElement.value).toBe('');
});

test('should be able to type an email', () => {
  render(<App/>)
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i
  }); 
  userEvent.type(emailInputElement, 'olha@gmail.com');
  expect(emailInputElement.value).toBe('olha@gmail.com');
});

test('should be able to type a password', () => {
  render(<App/>);
  const passwordInputElement = screen.getByLabelText('Password'); 
  userEvent.type(passwordInputElement, 'password!');
  expect(passwordInputElement.value).toBe('password!');
});

test('should be able to type a confirm password', () => {
  render(<App/>);
  const confirmPasswordInputElement = screen.getByLabelText(/Confirm password/i); 
  userEvent.type(confirmPasswordInputElement, 'password!');
  expect(confirmPasswordInputElement.value).toBe('password!');
});

test('should shown email error message on invalid email', () => {
  render(<App/>)
  const emailErrorElement = screen.queryByText(/the email you input is invalid/i)
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i
  });
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i
  });
  expect(emailErrorElement).not.toBeInTheDocument()
   
  userEvent.type(emailInputElement, 'olha@gmail.com');
  userEvent.click(submitBtnElement);
});

