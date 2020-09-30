const validateEmail = (email: string): any => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const errors = [];
  const validEmail = re.test(String(email).toLowerCase());
  if (!validEmail) errors.push('Improper email format');
  return errors.length ? { success: false, errors } : { success: true, errors };
};

const validatePw = (pw: string, pw2: string): any => {
  const lower = /[a-z]/.test(pw);
  const upper = /[A-Z]/.test(pw);
  const num = /[0-9]/.test(pw);
  const lenChars = pw.length >= 8;
  const errors = [];
  if (!lower || !upper || !num)
    errors.push(
      'Password must contain at least one lowercase character, uppercase character, and number.',
    );
  if (!lenChars)
    errors.push('Password must be at least 8 characters in length.');
  if (pw !== pw2) errors.push('Passwords do not match.');
  return errors.length ? { success: false, errors } : { success: true, errors };
};

export const validateCredentials = (
  email: string,
  pw: string,
  pw2: string,
): any => {
  const { errors: emailErrors } = validateEmail(email);
  const { errors: pwErrors } = validatePw(pw, pw2);
  const errors = [...emailErrors, ...pwErrors];
  return errors.length ? { success: false, errors } : { success: true, errors };
};
