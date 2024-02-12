import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from '.';

class SequelizeUser extends Model<InferAttributes<SequelizeUser>,
InferCreationAttributes<SequelizeUser>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare phone: string;
}

SequelizeUser.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize: db,
  timestamps: false,
  tableName: 'users',
});

export default SequelizeUser;