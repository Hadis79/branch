import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Direction, Locale } from '@branch-services/types';

import { LocaleSwitcher } from './locale-switcher';

describe('LocaleSwitcher', () => {
  it('renders LocaleSwitcher component with default props', () => {
    const updateConfigMock = jest.fn();
    const { getByRole } = render(<LocaleSwitcher onToggleLocale={updateConfigMock} />);

    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should toggle the locale when the button is clicked', () => {
    const updateConfigMock = jest.fn();
    const { getByRole } = render(<LocaleSwitcher onToggleLocale={updateConfigMock} />);
    fireEvent.click(getByRole('button'));
    expect(updateConfigMock).toHaveBeenCalled();
  });

  it('should display the correct locale text based on the current configuration', () => {
    const { getByText } = render(<LocaleSwitcher />);
    expect(getByText('En')).toBeInTheDocument();

    // Mock the useConfig hook to return a different locale
    jest.mock('@branch-services/hooks', () => ({
      useConfig: () => ({
        config: { locale: Locale.EN_US, direction: Direction.LTR },
        updateConfig: jest.fn(),
      }),
    }));

    // Re-render the component with the mocked hook
    // const { getByText: getLocaleText } = render(<LocaleSwitcher />);
    // expect(getLocaleText('فا')).toBeInTheDocument();
  });
});
