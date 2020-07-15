/**
 * Error class
 */
export class RequestError extends Error {
  /**
   *
   * @param {object} error
   * @param {number} statusCode\
   * @param {string} message
   */
  constructor(error, statusCode, message) {
    super(error.message);

    this.data = { error };
    this.statusCode = statusCode || 400;
    this.errorMessage = message || error.message;
  }
}
