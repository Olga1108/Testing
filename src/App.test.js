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

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i
  }); 
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement = screen.getByLabelText(/Confirm password/i);
  if(email) {
    userEvent.type(emailInputElement, email)
  }
  if(password) {
    userEvent.type(passwordInputElement, password)
  }
  if(confirmPassword) {
    userEvent.type(confirmPasswordInputElement, password)
  }
  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement
  }
}

const clickOnSubmitButton = () => {
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  });
  userEvent.click(submitBtnElement)
}

describe('App', () => {
  test('inputs should be initially empty', () => {
    const emailInputElement = screen.getByRole('textbox');
    const passwordInputElement = screen.getByLabelText('Password');
    const confirmPasswordInputElement = screen.getByLabelText(/Confirm password/i)
    expect(emailInputElement.value).toBe('');
    expect(passwordInputElement.value).toBe('');
    expect(confirmPasswordInputElement.value).toBe('');
  });
  
  test('should be able to type an email', () => {
    const {emailInputElement} = typeIntoForm({email: 'olha@gmail.com'});
    expect(emailInputElement.value).toBe('olha@gmail.com');
  });
  
  test('should be able to type a password', () => {
    const {passwordInputElement} = typeIntoForm({password: 'password!'});
    expect(passwordInputElement.value).toBe('password!');
  });
  
  test('should be able to type a confirm password', () => {
    const {confirmPasswordInputElement} = typeIntoForm({confirmPassword: 'password!'});
    expect(confirmPasswordInputElement.value).toBe('123456');
  });

  describe('Error Handling', () => {
    test('should show email error message on invalid email', () => {
      expect(screen.queryByText(
        /the email you input is invalid/i
        )).not.toBeInTheDocument()
      typeIntoForm({
        email: 'olha@gmail.com'
      }) 
      clickOnSubmitButton();
    });
    
    test('should show password error if password is less than 5 characters', () => {
      typeIntoForm({email: 'olha@gmail.com'})
      expect(screen.queryByText(
        /the password you entered should contain 5 or more characters/i
        )).not.toBeInTheDocument()
      typeIntoForm({password: 'password!'})
      clickOnSubmitButton();
    });
    
    test("should show confirm password error if password don't match", () => {
      typeIntoForm({
        email: 'olha@gmail.com',
        password: 'password!',
      })
      expect(screen.queryByText(
        /the passwords don't match. try again/i
        )).not.toBeInTheDocument()
      typeIntoForm({
        confirmPassword: 'password!',
      })
      clickOnSubmitButton();
    });
  })
})

