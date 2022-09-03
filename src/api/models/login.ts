import { db } from '../../config/database';
import { Model, DataTypes, Sequelize } from 'sequelize';
import User from './user';

export default class Login extends Model {}
Login.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.UUID
    },
    is_verify: {
      type: DataTypes.BOOLEAN
    },
    is_active: {
      type: DataTypes.BOOLEAN
    },
    created_at: {
      type: DataTypes.DATE
    },
    created_by: {
      type: DataTypes.STRING
    }
  },
  {
    modelName: 'login',
    sequelize: db
  }
);

Login.belongsTo(User, {
  foreignKey: 'user_id'
});
