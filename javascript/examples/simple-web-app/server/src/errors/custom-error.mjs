export class CustomError extends Error {
  constructor(message) {
    super(message);

    if (this.constructor === CustomError) {
      throw new Error('Cant instantiate abstract class!');
    }

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  /**
   * @abstract
   * @returns {Array} Array of error messages
   */
  serializeErrors() {
    throw new Error('Abstract method!');
  }
}
