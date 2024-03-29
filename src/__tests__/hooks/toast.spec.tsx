import { renderHook, act } from '@testing-library/react-hooks';

import { uuid } from 'uuidv4';

import { useToast, ToastProvider } from '../../hooks/toast';

jest.mock('uuidv4', () => {
  return {
    uuid() {
      return 'toast-123';
    },
  };
});

describe('Toast hook', () => {
  it('should be able add toast and show/hide the view', async () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    const key = uuid();
    act(() => {
      result.current.addToast({
        title: 'Title',
        description: 'Description',
        type: 'success',
      });
    });

    expect(result.current.messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Title',
          description: 'Description',
          type: 'success',
        }),
      ]),
    );

    act(() => {
      result.current.removeToast(key);
    });

    expect(result.current.messages).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Title',
          description: 'Description',
          type: 'success',
        }),
      ]),
    );
  });
});
