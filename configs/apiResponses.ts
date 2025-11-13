export type ErrorType = keyof typeof ERROR_RESPONSES;

export const ERROR_RESPONSES = {
  badRequest: {
    status: 400,
    code: "BAD_REQUEST",
    message:
      "The request is invalid. Please check your parameters and try again.",
  },

  invalidCredentials: {
    status: 401,
    code: "INVALID_CREDENTIALS",
    message: "Invalid email or password.",
  },

  unauthorized: {
    status: 401,
    code: "UNAUTHORIZED",
    message: "Authentication is required to access this resource.",
  },

  forbidden: {
    status: 403,
    code: "FORBIDDEN",
    message: "You do not have permission to perform this action.",
  },

  notFound: {
    status: 404,
    code: "NOT_FOUND",
    message: "The requested resource was not found.",
  },

  conflict: {
    status: 409,
    code: "CONFLICT",
    message: "A conflict occurred. The resource may already exist or be in a state that prevents this action.",
  },

  unsupportedMediaType: {
    status: 415,
    code: "UNSUPPORTED_MEDIA_TYPE",
    message: "The content type of this request is not supported.",
  },

  rateLimit: {
    status: 429,
    code: "RATE_LIMIT",
    message: "Too many requests. Please try again later.",
  },

  internalServerError: {
    status: 500,
    code: "INTERNAL_SERVER_ERROR",
    message:
      "An unexpected error occurred on the server. Please try again later.",
  },
} as const;
