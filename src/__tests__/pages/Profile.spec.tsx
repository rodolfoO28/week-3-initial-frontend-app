import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import Profile from '../../pages/Profile';

const mockedHistoryPush = jest.fn();
const mockedPutApiProfile = jest.fn(() => ({ data: {} }));
const mockedPatchApiProfile = jest.fn(() => ({ data: {} }));
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../services/api', () => {
  return {
    put: () => mockedPutApiProfile(),
    patch: () => mockedPatchApiProfile(),
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      user: jest.fn().mockReturnValue({}),
      updateUser: jest.fn(),
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('Profile Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedAddToast.mockClear();
  });

  it('should be able to update profile', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');

    const oldPassowordField = getByPlaceholderText('Senha atual');
    const passwordField = getByPlaceholderText('Nova senha');
    const confirmationPassowordField = getByPlaceholderText('Confirmar senha');

    const buttonElement = getByText('Confirmar mundanças');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });

    fireEvent.change(oldPassowordField, { target: { value: '' } });
    fireEvent.change(passwordField, { target: { value: '' } });
    fireEvent.change(confirmationPassowordField, { target: { value: '' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });

  it('should be able to update password profile', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');

    const oldPassowordField = getByPlaceholderText('Senha atual');
    const passwordField = getByPlaceholderText('Nova senha');
    const confirmationPassowordField = getByPlaceholderText('Confirmar senha');

    const buttonElement = getByText('Confirmar mundanças');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });

    fireEvent.change(oldPassowordField, { target: { value: '123456' } });
    fireEvent.change(passwordField, { target: { value: '1234567' } });
    fireEvent.change(confirmationPassowordField, {
      target: { value: '1234567' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });

  it('should be display a success toast when update profile', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');

    const oldPassowordField = getByPlaceholderText('Senha atual');
    const passwordField = getByPlaceholderText('Nova senha');
    const confirmationPassowordField = getByPlaceholderText('Confirmar senha');

    const buttonElement = getByText('Confirmar mundanças');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });

    fireEvent.change(oldPassowordField, { target: { value: '' } });
    fireEvent.change(passwordField, { target: { value: '' } });
    fireEvent.change(confirmationPassowordField, { target: { value: '' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });

  it('should not be able to update profile with data invalid', async () => {
    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');

    const oldPassowordField = getByPlaceholderText('Senha atual');
    const passwordField = getByPlaceholderText('Nova senha');
    const confirmationPassowordField = getByPlaceholderText('Confirmar senha');

    const buttonElement = getByText('Confirmar mundanças');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });

    fireEvent.change(oldPassowordField, { target: { value: '' } });
    fireEvent.change(passwordField, { target: { value: '' } });
    fireEvent.change(confirmationPassowordField, { target: { value: '' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error with update profile fails', async () => {
    mockedPutApiProfile.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<Profile />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');

    const oldPassowordField = getByPlaceholderText('Senha atual');
    const passwordField = getByPlaceholderText('Nova senha');
    const confirmationPassowordField = getByPlaceholderText('Confirmar senha');

    const buttonElement = getByText('Confirmar mundanças');

    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });

    fireEvent.change(oldPassowordField, { target: { value: '' } });
    fireEvent.change(passwordField, { target: { value: '' } });
    fireEvent.change(confirmationPassowordField, { target: { value: '' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });

  it('should be able to update avatar profile', async () => {
    const { getByAltText } = render(<Profile />);

    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });
    const imageInput = getByAltText('Alterar avatar');
    fireEvent.change(imageInput, { target: { files: [file] } });

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });

  it('should not be able to update avatar profile without image', async () => {
    const { getByAltText } = render(<Profile />);

    const imageInput = getByAltText('Alterar avatar');
    fireEvent.change(imageInput, { target: { files: null } });

    await wait(() => {
      expect(mockedAddToast).not.toHaveBeenCalled();
    });
  });

  it('should display an error with update avatar fails', async () => {
    mockedPatchApiProfile.mockImplementation(() => {
      throw new Error();
    });

    const { getByAltText } = render(<Profile />);

    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    });
    const imageInput = getByAltText('Alterar avatar');
    fireEvent.change(imageInput, { target: { files: [file] } });

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
