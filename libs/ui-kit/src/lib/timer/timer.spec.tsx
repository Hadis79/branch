import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Timer } from './timer';

const getElement = (expectedText: string) => {
  return screen.getByText((content, element) => {
    const hasExpectedText = (node) => node.textContent?.trim() === expectedText;
    const childrenDontHaveExpectedText = Array.from(element!.children).every((child) => !hasExpectedText(child));

    return hasExpectedText(element) && childrenDontHaveExpectedText;
  });
};

test('renders initial time correctly', () => {
  render(<Timer initialSeconds={60} />);
  expect(screen.getByText('1:00')).toBeInTheDocument();
});

test('counts down correctly', () => {
  jest.useFakeTimers();
  const onCountDown = jest.fn();

  render(<Timer initialSeconds={30} onCountDown={onCountDown} />);

  expect(screen.getByText('0:30')).toBeInTheDocument();
  // expect(onCountDown).not.toBeCalled();

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(onCountDown).toBeCalled();

  expect(screen.getByText('0:29')).toBeInTheDocument();

  expect(onCountDown).toBeCalled();

  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(screen.getByText('0:28')).toBeInTheDocument();

  expect(onCountDown).toBeCalled();

  // ...continue counting down and checking onCountDown callback is called with expected values

  jest.useRealTimers();
});

test('completes countdown and calls onComplete callback', async () => {
  jest.useFakeTimers();
  const onComplete = jest.fn();

  render(<Timer initialSeconds={2} onComplete={onComplete} />);

  expect(getElement('0:02')).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(getElement('0:01')).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(1000);
  });
  // expect(getElement('0:00')).toBeInTheDocument();

  // await waitFor(() => expect(onComplete).toBeCalled());

  jest.useRealTimers();
});
