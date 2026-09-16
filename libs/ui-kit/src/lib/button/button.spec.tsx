import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Button } from './button';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button />);
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully with default props', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const buttonElement = getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('should render with specified text', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const buttonTextElement = getByText('Click me');
    expect(buttonTextElement).toBeInTheDocument();
  });

  it('should be disabled when "disabled" prop is set to true', () => {
    const { getByRole } = render(<Button disabled>Click me</Button>);
    const buttonElement = getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  it('should trigger a click event when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = getByRole('button');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
