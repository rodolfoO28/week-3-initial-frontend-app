import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { FiMail } from 'react-icons/fi';

import Input from '../../components/Input';

const mockedUnformFields = jest.fn(() => ({
  fieldName: 'email',
  defaultValue: '',
  error: '',
  registerField: jest.fn(),
}));

jest.mock('@unform/core', () => {
  return {
    useField() {
      return mockedUnformFields();
    },
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000;');
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000;');
      expect(containerElement).not.toHaveStyle('color: #ff9000;');
    });
  });

  it('should keep input border highlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const containerElement = getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'johndoe@example.com' },
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('color: #ff9000;');
    });
  });

  it('should render icon on input', async () => {
    const { getByTestId } = render(
      <Input name="email" icon={FiMail} placeholder="E-mail" />,
    );

    expect(getByTestId('input-icon')).toBeTruthy();
  });

  it('should render error on input', async () => {
    mockedUnformFields.mockImplementation(() => ({
      fieldName: 'email',
      defaultValue: '',
      error: 'Informe o email',
      registerField: jest.fn(),
    }));

    const { getByTestId } = render(<Input name="email" placeholder="E-mail" />);

    const tooltipContainer = getByTestId('tooltip-container');
    const iconErrorElement = getByTestId('icon-error');

    expect(tooltipContainer).toBeTruthy();
    expect(iconErrorElement).toBeTruthy();
  });
});
