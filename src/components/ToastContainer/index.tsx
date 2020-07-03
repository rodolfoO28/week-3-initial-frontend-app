import React from 'react';
import { useTransition } from 'react-spring';

import { ToastMessage } from '../../hooks/toast';

import Toast from './Toast';

import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%' },
      enter: { right: '0%' },
      leave: { right: '-120%' },
    },
  );
  return (
    <Container data-testid="toasts-container">
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast
          data-testid={`toast-item-${key}`}
          key={key}
          message={item}
          style={props}
        />
      ))}
    </Container>
  );
};

export default ToastContainer;
