export const isValidEmail = (email: string) =>
  !!email && email.includes('@') && email.includes('.');

export const isStrongPassword = (password: string) =>
  password.length >= 6;