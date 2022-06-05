import { isDev } from '@valhalla/utilities';

function generateDevCode(length: number) {
  return ''.padEnd(length, '0');
}

/**
 * It generates a random verification code of a given length
 *
 * @param {number} length - The length of the verification code.
 * @param {VerificationCodeGeneratorOption} options - VerificationCodeGeneratorOption
 */
export function generateVerificationCode(length: number) {
  if (isDev()) {
    return generateDevCode(length);
  }

  if (isNaN(length)) {
    throw new TypeError('Length must be a number');
  } else if (length < 1) {
    throw new RangeError('Length must be at least 1');
  }

  const possible = '0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return code;
}
