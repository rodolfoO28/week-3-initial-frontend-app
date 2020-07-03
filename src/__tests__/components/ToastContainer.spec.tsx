import React from 'react';
import { render } from '@testing-library/react';

import ToastContainer from '../../components/ToastContainer';

describe('Toast component', () => {
  it('should be able to render an toast', () => {
    const { getByTestId } = render(
      <ToastContainer
        messages={[
          {
            id: 'tooltip-1',
            title: 'Sucesso!',
            description: 'Sucesso!',
            type: 'success',
          },
        ]}
      />,
    );

    expect(getByTestId('toasts-container')).toBeTruthy();
  });
});
