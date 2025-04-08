export const validateEmail = (email) => {
  if (!email) return "Enter your email";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Enter your password";
  if (password.length < 6) return "Passwords must be at least 6 characters";
  return "";
};

export const validateName = (name, fieldName) => {
  if (!name) return `Enter your ${fieldName}`;
  if (name.length < 2) return `${fieldName} must be at least 2 characters`;
  return "";
};
