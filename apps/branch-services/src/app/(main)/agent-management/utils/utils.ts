export function checkNationalCode(code) {
  let str = code.toString();

  const strLen = str.length;
  const strVal = parseInt(str, 10);

  // Check if the length is between 8 and 10, and if the value is a valid number
  if (strLen < 8 || strLen > 10 || isNaN(strVal) || strVal === 0) return false;

  // Pad the code to make it 10 characters long
  while (str.length < 10) str = '0' + str;

  // Check if all digits are the same (e.g., 1111111111 or 4444444444)
  if (/^(\d)\1+$/g.test(str)) return false;

  // Extract the check digit (last digit) and the rest of the code
  const checkDigit = parseInt(str.slice(-1), 10);
  const mainCode = str.slice(0, -1);

  let sum = 0;

  // Calculate the weighted sum of the first 9 digits
  for (let i = 0; i < 9; i++) {
    sum += parseInt(mainCode[i], 10) * (10 - i);
  }

  // Calculate the remainder
  const mod = sum % 11;

  // Validate the check digit against the calculated remainder
  return (mod < 2 && mod === checkDigit) || (mod >= 2 && checkDigit === 11 - mod);
}

export function isValidLegalId(legalId) {
  if (!legalId) return false;

  const regex = /^\d{11,12}$/; // فقط اعداد و دقیقاً ۱۱ تا ۱۲ رقم
  return regex.test(legalId);
}
