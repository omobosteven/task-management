import { validateAll } from 'indicative/validator';
import { sanitize } from 'indicative/sanitizer';

import { RequestError } from '../utils/errors';

/**
 * Auth validation Class
 */
export default class AuthValidation {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
  static async validateRegisterInput(req, res, next) {
    try {
      const validationSchema = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        password: 'required|min:8'
      };

      const sanitizerSchema = {
        firstName: 'trim|lower_case',
        lastName: 'trim|lower_case',
        email: 'normalize_email',
        password: 'trim'
      };

      const messages = {
        required: (field) => `${field} is required`,
        string: (field) => `invalid input entered for ${field}`,
        'email.email': 'enter a valid email address',
        'password.min': 'password must be greater than 8 characters'
      };

      const validatedData = await validateAll(
        req.body,
        validationSchema,
        messages,
        { removeAdditional: true }
      );
      req.authData = await sanitize(validatedData, sanitizerSchema);
      next();
    } catch (error) {
      next(new RequestError(error, 422, 'inputs validation error'));
    }
  }
}
