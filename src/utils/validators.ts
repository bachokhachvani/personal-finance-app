export function validateEmail(value: string) {
  if (!value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
    throw new Error("Invalid email address");
  }

  return true;
}

export function validatePassword(value: string) {
  if (value.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  return true;
}
