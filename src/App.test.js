import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  render(<App />)
});

afterEach(() => {
  console.log('This will run after each test')
});

beforeAll(() => {
  console.log('This will run before all tests')
});

afterAll(() => {
  console.log('This will run after all of the test')
});

test('inputs should be initially empty', () => {
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement = screen.getByLabelText(/Confirm password/i)
  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordInputElement.value).toBe('');
});

test('should be able to type an email', () => {
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i
  }); 
  userEvent.type(emailInputElement, 'olha@gmail.com');
  expect(emailInputElement.value).toBe('olha@gmail.com');
});

test('should be able to type a password', () => {
  const passwordInputElement = screen.getByLabelText('Password'); 
  userEvent.type(passwordInputElement, 'password!');
  expect(passwordInputElement.value).toBe('password!');
});

test('should be able to type a confirm password', () => {
  const confirmPasswordInputElement = screen.getByLabelText(/Confirm password/i); 
  userEvent.type(confirmPasswordInputElement, 'password!');
  expect(confirmPasswordInputElement.value).toBe('password!');
});

test('should shown email error message on invalid email', () => {
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

test('should show password error if password is less than 5 characters', () => {
  
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i
  });
  const passwordInputElement = screen.getByLabelText('Password'); 
  const passwordErrorElement = screen.queryByText(/the password you entered should contain 5 or more characters/i)
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i
  });
  userEvent.type(emailInputElement, 'olha@gmail.com');
  expect(passwordErrorElement).not.toBeInTheDocument()
  userEvent.type(passwordInputElement, '123');
  userEvent.click(submitBtnElement);
});

test("should show confirm password error if password don't match", () => {
  
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i
  });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i); 
  const confirmPasswordErrorElement = screen.queryByText(/the passwords don't match. try again/i)
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i
  });
  userEvent.type(emailInputElement, 'olha@gmail.com');
  userEvent.type(passwordInputElement, '12345');
  expect(confirmPasswordErrorElement).not.toBeInTheDocument()
  userEvent.type(confirmPasswordInputElement, '123456');
  userEvent.click(submitBtnElement);
});