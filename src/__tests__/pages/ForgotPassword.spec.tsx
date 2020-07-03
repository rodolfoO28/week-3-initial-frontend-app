import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import ForgotPassword from '../../pages/ForgotPassword';

const mockedAddToast = jest.fn();
const mockedApiForgotPassoword = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../services/api', () => {
  return {
    post: () => mockedApiForgotPassoword(),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('Forgot Password page', () => {
  beforeEach(() => {
    mockedAddToast.mockClear();
  });

  it('should be able forgot password', async () => {
    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });

  it('should not be able forgot password with invalid email', async () => {
    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).not.toHaveBeenCalled();
    });
  });

  it('should be display an error message with forgot password fails', async () => {
    mockedApiForgotPassoword.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<ForgotPassword />);

    const emailField = getByPlaceholderText('E-mail');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
