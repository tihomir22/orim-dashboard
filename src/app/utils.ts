const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const esEmail = (input: string): boolean => {
  return emailRegex.test(input);
};
