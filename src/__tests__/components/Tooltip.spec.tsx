import React from 'react';
import { render } from '@testing-library/react';

import Tooltip from '../../components/Tooltip';

describe('Tooltip component', () => {
  it('should be able to render an tooltip', () => {
    const { getByTestId } = render(<Tooltip title="Nome obrigatório" />);

    expect(getByTestId('tooltip-container')).toBeTruthy();
  });
});
