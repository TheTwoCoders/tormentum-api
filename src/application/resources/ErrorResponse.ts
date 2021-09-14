class ErrorResponse {
  message: string;
  details: ErrorDetail[];

  constructor(message: string, details: ErrorDetail[] = []) {
    this.message = message
    this.details = details
  }
}

class ErrorDetail {
  property: string;
  message: string | undefined;

  constructor(property: string, message: string | undefined) {
    this.property = property
    this.message = message
  }
}

export default ErrorResponse

export { ErrorDetail }
