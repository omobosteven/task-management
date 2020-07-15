import models from '../database/models';
import { RequestError } from '../utils/errors';

const { User } = models;

/**
 * User Controller class
 */
export default class AuthController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @return {Promise<*>}
   */
  static async registerUser(req, res, next) {
    try {
      const { authData } = req;
      const isUserExist = await User.findOne({
        where: {
          email: authData.email
        }
      });
      if (isUserExist) throw new RequestError({}, 409, 'email already exist');

      const user = await User.create({ ...authData });

      const {
        password,
        signUpWithExternalAccount,
        updatedAt,
        deletedAt,
        ...userData
      } = user.dataValues;

      return res.status(201).json({
        success: true,
        message: 'Account created successfully',
        data: userData
      });
    } catch (error) {
      return next(error);
    }
  }
}
