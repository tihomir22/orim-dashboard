const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const esEmail = (input: string): boolean => {
  return emailRegex.test(input);
};

export const copyTextToClipboard = (val: string) => {
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = val;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
};

export const sendEmailTo = (email: string, subject: string, body: string) => {
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink);
};
