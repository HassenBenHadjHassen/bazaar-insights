export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export function validatePassword(password: string) {
  if (password.length < 8) {
    return {
      error: true,
      errorText: "Password must be at least 8 characters long.",
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      error: true,
      errorText: "Password must include at least one uppercase letter.",
    };
  }
  if (!/\d/.test(password)) {
    return {
      error: true,
      errorText: "Password must include at least one number.",
    };
  }
  if (!/[!@#$%^&*]/.test(password)) {
    return {
      error: true,
      errorText: "Password must include at least one symbol.",
    };
  }

  return {
    error: false,
    errorText: "",
  };
}
