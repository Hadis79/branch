import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Loading } from './loading';

describe('Loading', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Loading />);
    expect(baseElement).toBeTruthy();
  });
});
