import { isValidNationalIdLength, normalizeDigits, normalizeFormValues } from './utils';

describe('organization code utilities', () => {
  it('normalizes Persian and Arabic digits', () => {
    expect(normalizeDigits('۱۲۳٤٥')).toBe('12345');
  });

  it('normalizes form values and removes an empty optional account number', () => {
    expect(
      normalizeFormValues({
        nationalId: ' ۰۰۱۸۵۶۷۹۷۰ ',
        organizationCode: '۱۲۳۴۵۶',
        accountNumber: ' ',
      })
    ).toEqual({
      nationalId: '0018567970',
      organizationCode: '123456',
      accountNumber: undefined,
    });
  });

  it('accepts only 10 or 11 digit national identifiers', () => {
    expect(isValidNationalIdLength('1234567890')).toBe(true);
    expect(isValidNationalIdLength('12345678901')).toBe(true);
    expect(isValidNationalIdLength('123456789')).toBe(false);
  });
});
