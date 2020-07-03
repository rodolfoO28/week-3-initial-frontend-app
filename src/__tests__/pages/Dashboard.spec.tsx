import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import MockDate from 'mockdate';

import api from '../../services/api';

import Dashboard from '../../pages/Dashboard';

const apiMock = new MockAdapter(api);

const mockedUserLogged = jest.fn().mockReturnValue({
  id: 'user-123',
  name: 'John Doe',
  email: 'johndoe@example.com.br',
  avatar_url: null,
});
const mockedSignOut = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      user: mockedUserLogged(),
      signOut: mockedSignOut,
    }),
  };
});

describe('Dashboard Page', () => {
  beforeEach(() => {
    MockDate.set(new Date(2020, 6, 2, 5, 0, 0));

    const user = mockedUserLogged();
    apiMock.onGet(`providers/${user.id}/month-availability`).reply(200, [
      {
        day: 1,
        available: true,
      },
      {
        day: 2,
        available: true,
      },
      {
        day: 3,
        available: true,
      },
      {
        day: 4,
        available: true,
      },
      {
        day: 5,
        available: true,
      },
      {
        day: 6,
        available: true,
      },
      {
        day: 7,
        available: true,
      },
    ]);

    apiMock.onGet('appointments/schedule').reply(200, [
      {
        id: 'schedule-1',
        date: '2020-07-02T12:00:00.000Z',
        user: {
          id: 'user-1',
          name: 'John One',
          avatar_url: 'user-1.png',
        },
      },
      {
        id: 'schedule-2',
        date: '2020-07-02T13:00:00.000Z',
        user: {
          id: 'user-2',
          name: 'John Tree',
          avatar_url: 'user-2.png',
        },
      },
      {
        id: 'schedule-3',
        date: '2020-07-02T17:00:00.000Z',
        user: {
          id: 'user-3',
          name: 'John Qua',
          avatar_url: 'user-3.png',
        },
      },
    ]);
  });

  it('should be able to render dashboard', async () => {
    const { getByText } = render(<Dashboard />);

    jest.setTimeout(10000);

    const bemVindoElement = getByText('Bem vindo,');

    await wait(() => {
      expect(bemVindoElement).toBeTruthy();
    });
  });

  it('should be able to render today if current date is now', async () => {
    const { getByText } = render(<Dashboard />);

    jest.setTimeout(10000);

    await wait(() => {
      expect(getByText('Hoje')).toBeTruthy();
    });
  });

  it('should not be able to render today if current date is different now', async () => {
    const { queryByText, getByText } = render(<Dashboard />);

    jest.setTimeout(10000);

    fireEvent.click(getByText('3'));

    await wait(() => {
      expect(queryByText('Hoje')).toBeNull();
    });
  });

  it('should be able list appointments', async () => {
    const { getAllByText } = render(<Dashboard />);

    jest.setTimeout(10000);

    await wait(() => {
      expect(getAllByText('09:00')).toBeTruthy();
      expect(getAllByText('John One')).toBeTruthy();

      expect(getAllByText('10:00')).toBeTruthy();
      expect(getAllByText('John Tree')).toBeTruthy();

      expect(getAllByText('14:00')).toBeTruthy();
      expect(getAllByText('John Qua')).toBeTruthy();
    });
  });

  it('should not be able list appointments if is empty', async () => {
    apiMock.onGet('appointments/schedule').reply(200, []);

    const { getAllByText } = render(<Dashboard />);

    jest.setTimeout(10000);

    await wait(() => {
      expect(getAllByText('Nenhum agendamento nesse período.')).toBeTruthy();
    });
  });

  it('should be able show next appointment', async () => {
    const { getByText, getByTestId } = render(<Dashboard />);

    jest.setTimeout(10000);

    await wait(() => {
      expect(getByTestId('next-appoitment')).toBeTruthy();
      expect(getByText('10:00')).toBeTruthy();
      expect(getByText('John Tree')).toBeTruthy();
    });
  });

  it('should not be able next appointment if is not exists', async () => {
    MockDate.set(new Date(2020, 6, 2, 17, 0, 0));

    const { queryByTestId } = render(<Dashboard />);

    jest.setTimeout(10000);

    await wait(() => {
      expect(queryByTestId('next-appoitment')).toBeNull();
    });
  });

  it('should be able enabled week days availability in month', async () => {
    const { getByText } = render(<Dashboard />);

    jest.setTimeout(10000);

    await wait(() => {
      expect(getByText('1')).toHaveClass('DayPicker-Day--available');
      expect(getByText('2')).toHaveClass('DayPicker-Day--available');
      expect(getByText('3')).toHaveClass('DayPicker-Day--available');
      expect(getByText('6')).toHaveClass('DayPicker-Day--available');
      expect(getByText('7')).toHaveClass('DayPicker-Day--available');
    });
  });

  it('should be able disabled weekend days availability in month', async () => {
    const { getByText } = render(<Dashboard />);

    jest.setTimeout(10000);

    await wait(() => {
      expect(getByText('4')).toHaveClass('DayPicker-Day--disabled');
      expect(getByText('5')).toHaveClass('DayPicker-Day--disabled');
    });
  });

  it('should be able disabled unavailability days in month', async () => {
    const user = mockedUserLogged();
    apiMock.onGet(`providers/${user.id}/month-availability`).reply(200, [
      {
        day: 1,
        available: false,
      },
      {
        day: 2,
        available: false,
      },
      {
        day: 3,
        available: false,
      },
      {
        day: 4,
        available: false,
      },
      {
        day: 5,
        available: false,
      },
      {
        day: 6,
        available: false,
      },
      {
        day: 7,
        available: false,
      },
    ]);

    const { getByText } = render(<Dashboard />);

    jest.setTimeout(10000);

    await wait(() => {
      expect(getByText('1')).toHaveClass('DayPicker-Day--disabled');
      expect(getByText('2')).toHaveClass('DayPicker-Day--disabled');
      expect(getByText('3')).toHaveClass('DayPicker-Day--disabled');
      expect(getByText('4')).toHaveClass('DayPicker-Day--disabled');
      expect(getByText('5')).toHaveClass('DayPicker-Day--disabled');
      expect(getByText('6')).toHaveClass('DayPicker-Day--disabled');
      expect(getByText('7')).toHaveClass('DayPicker-Day--disabled');
    });
  });

  it('should be able selected today in calendar', async () => {
    const { getByText } = render(<Dashboard />);

    jest.setTimeout(10000);

    await wait(() => {
      expect(getByText('2')).toHaveClass('DayPicker-Day--selected');
    });
  });

  it('should be able selected any week day in calendar', async () => {
    const { getByText } = render(<Dashboard />);

    jest.setTimeout(10000);

    fireEvent.click(getByText('3'));

    await wait(() => {
      expect(getByText('2')).toHaveClass('DayPicker-Day--available');
      expect(getByText('3')).toHaveClass('DayPicker-Day--selected');
    });
  });

  it('should not be able selected any weekend days in calendar', async () => {
    const { getByText } = render(<Dashboard />);

    jest.setTimeout(10000);

    fireEvent.click(getByText('4'));

    await wait(() => {
      expect(getByText('4')).not.toHaveClass('DayPicker-Day--selected');
    });
  });

  it('should be able selected next month in calendar', async () => {
    const { getByLabelText, getAllByText } = render(<Dashboard />);

    jest.setTimeout(10000);

    fireEvent.click(getByLabelText('Next Month'));

    await wait(() => {
      // debug(getByLabelText('Previous Month'));
      // debug(getByTestId('calendar-element'));

      expect(getAllByText('Agosto 2020')).toBeTruthy();
    });
  });

  it('should be not able selected prev month with less than current date in calendar', async () => {
    const { getByLabelText, getAllByText } = render(<Dashboard />);

    jest.setTimeout(10000);

    fireEvent.click(getByLabelText('Previous Month'));

    await wait(() => {
      expect(getAllByText('Julho 2020')).toBeTruthy();
    });
  });

  it('should be not able selected next and prev in calendar', async () => {
    const { getByLabelText, getAllByText } = render(<Dashboard />);

    jest.setTimeout(10000);

    fireEvent.click(getByLabelText('Next Month'));

    await wait(() => {
      expect(getAllByText('Agosto 2020')).toBeTruthy();
    });

    fireEvent.click(getByLabelText('Previous Month'));

    await wait(() => {
      expect(getAllByText('Julho 2020')).toBeTruthy();
    });
  });

  it('should be able to sign out', async () => {
    const { getByTestId } = render(<Dashboard />);

    const signOutButton = getByTestId('button-sign-out');

    fireEvent.click(signOutButton);

    await wait(() => {
      expect(mockedSignOut).toHaveBeenCalled();
    });
  });
});
