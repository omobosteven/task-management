/* eslint-disable valid-jsdoc, require-jsdoc */
import bcrypt from 'bcrypt';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: {
          args: true,
          msg: 'id already exists'
        },
        validate: {
          isUUID: {
            args: 4,
            msg: 'id must be uuid'
          }
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'input a valid email'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          signUpMethodValidation(value) {
            if (value === null && this.signUpWithExternalAccount === false) {
              throw new Error('input a password');
            }
          }
        }
      },
      signUpWithExternalAccount: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      hooks: {
        beforeCreate: async (user, options) => {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      sequelize,
      modelName: 'User',
      paranoid: true
    }
  );
  return User;
};
