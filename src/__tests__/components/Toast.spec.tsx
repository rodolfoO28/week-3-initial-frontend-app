import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import Toast from '../../components/ToastContainer/Toast';

const mockedRemoveToast = jest.fn();

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      removeToast: mockedRemoveToast,
    }),
  };
});

describe('Toast component', () => {
  it('should be able to render an toast', () => {
    const { getByTestId } = render(
      <Toast
        style={{}}
        message={{
          id: 'tooltip-1',
          title: 'Sucesso!',
          description: 'Sucesso!',
          type: 'success',
        }}
      />,
    );

    expect(getByTestId('toast-container')).toBeTruthy();
  });

  it('should be able to render an toast without type defined', () => {
    const { getByTestId } = render(
      <Toast
        style={{}}
        message={{
          id: 'tooltip-1',
          title: 'Sucesso!',
          description: 'Sucesso!',
        }}
      />,
    );

    expect(getByTestId('toast-container')).toBeTruthy();
  });

  it('should be able to render an toast without description', () => {
    const { getByTestId } = render(
      <Toast
        style={{}}
        message={{
          id: 'tooltip-1',
          title: 'Sucesso!',
        }}
      />,
    );

    expect(getByTestId('toast-container')).toBeTruthy();
  });

  it('should be closed toast when click in container', async () => {
    const { getByTestId } = render(
      <Toast
        style={{}}
        message={{
          id: 'tooltip-1',
          title: 'Sucesso!',
        }}
      />,
    );

    const closeButton = getByTestId('toast-button');

    fireEvent.click(closeButton);

    await wait(() => {
      expect(mockedRemoveToast).toHaveBeenCalled();
    });
  });

  it('should be closed toast after 3 seconds', async () => {
    jest.useFakeTimers();

    const { getByTestId } = render(
      <Toast
        style={{}}
        message={{
          id: 'tooltip-1',
          title: 'Sucesso!',
        }}
      />,
    );

    jest.runAllTimers();

    expect(getByTestId('toast-container')).toBeTruthy();
    expect(mockedRemoveToast).toHaveBeenCalled();
  });
});
