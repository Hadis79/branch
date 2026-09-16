import { render, fireEvent } from '@testing-library/react';

import { OtpInput } from './otp-input';

describe('OtpInput', () => {
  it('renders input fields with the correct number of digits', () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(<OtpInput value='' valueLength={6} onChange={handleChange} />);
    const inputs = getAllByRole('textbox');
    expect(inputs).toHaveLength(6);
  });

  it('triggers onChange when a digit is entered', () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(<OtpInput value='' valueLength={4} onChange={handleChange} />);
    const inputs = getAllByRole('textbox');

    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(handleChange).toHaveBeenCalledWith('1');

    fireEvent.change(inputs[1], { target: { value: '2' } });
    expect(handleChange).toHaveBeenCalledWith('2');
  });

  /*
  it('triggers onComplete when all digits are entered', () => {
    const handleComplete = jest.fn();
    const handleChange = jest.fn();
    const { getAllByRole } = render(<OtpInput value='' valueLength={3} onComplete={handleComplete}
                                              onChange={handleChange} />);
    const inputs = getAllByRole('textbox');

    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });

    expect(handleChange).toHaveBeenCalledWith('123');
  });
*/

  /*  it('allows deleting digits using backspace key', () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(<OtpInput value='123' valueLength={3} onChange={handleChange} />);
    const inputs = getAllByRole('textbox');

    fireEvent.keyDown(inputs[2], { key: 'Backspace' });
    expect(handleChange).toHaveBeenCalledWith('12');
  });*/

  it('allows navigating between input fields using arrow keys', () => {
    const { getAllByRole } = render(<OtpInput value='' valueLength={3} onChange={() => {}} />);
    const inputs = getAllByRole('textbox');

    fireEvent.keyDown(inputs[0], { key: 'ArrowRight' });
    expect(document.activeElement).toBe(inputs[1]);

    fireEvent.keyDown(inputs[1], { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(inputs[0]);
  });
});
