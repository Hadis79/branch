import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Alert } from './alert';

describe('Alert', () => {
  it('renders without error', () => {
    const { getByTestId } = render(<Alert data-testid='alert' message='This is a test alert!' />);
    expect(getByTestId('alert')).toBeInTheDocument();
  });

  it('renders the correct message', () => {
    const message = 'This is another test alert!';
    const { getByText } = render(<Alert message={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });

  it('renders with custom styling if style prop is provided', () => {
    const style = {
      color: 'red',
      backgroundColor: 'yellow',
    };
    const { getByTestId } = render(<Alert data-testid='alert' message='This is a test alert!' style={style} />);
    expect(getByTestId('alert')).toHaveStyle(`
    color: ${style.color};
    background-color: ${style.backgroundColor};
  `);
  });

  it('displays a close button if the closable prop is true', () => {
    const { getByRole } = render(<Alert message='This is a test alert!' closable />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('calls the onClose callback when the close button is clicked', () => {
    const onDismiss = jest.fn();
    const { getByRole } = render(<Alert message='This is a test alert!' closable onClose={onDismiss} />);
    const dismissButton = getByRole('button');
    fireEvent.click(dismissButton);
    expect(onDismiss).toHaveBeenCalled();
  });
});
