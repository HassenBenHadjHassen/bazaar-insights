export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
  EMAIL_IN_USE: "Email already in use",
  USER_REGISTERED: "User registered successfully",
  INVALID_CREDENTIALS: "Invalid credentials",
  INTERNAL_ERROR: "Internal server error",
  UNEXPECTED_ERROR: "Unexpected error occurred",
  FETCH_FAILED: "Failed to fetch bazaar products",
  INVALID_USER: "User not found",

  /* Guest */
  GUEST_REGISTERED: "Guest Registered Successfully",
  GUEST_EXISTS: "Guest Already In Database",
  GUEST_UPDATE: "Guest Updated Successfully",
  INVALID_GUEST: "Guest not found",

  /* Services */
  EMAIL_SENT: "Password reset email sent",
};
