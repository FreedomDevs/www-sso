export const maskEmail = (email: string | null) => {
  if (!email) return '';

  const [name, domain] = email.split('@');

  if (!domain) return email;

  if (name.length <= 2) {
    return `${name[0]}*@${domain}`;
  }

  return `${name.slice(0, 2)}${'*'.repeat(name.length - 2)}@${domain}`;
};
