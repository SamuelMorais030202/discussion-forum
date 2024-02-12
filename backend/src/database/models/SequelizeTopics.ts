import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import SequelizeMessage from "./SequelizeMessage";
import SequelizeUser from "./SequelizeUser";
import db from '.';

class SequelizeTopics extends Model<InferAttributes<SequelizeTopics>,
InferCreationAttributes<SequelizeTopics>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare userId: number;
  declare type: string;
  declare createdAt: Date;
}

SequelizeTopics.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'created_at'
  }
}, {
  sequelize: db,
  modelName: 'topics',
  timestamps: true,
  underscored: true,
});

SequelizeTopics.hasMany(SequelizeMessage, {
  foreignKey: 'topicId',
  as: 'messages',
});

SequelizeTopics.belongsTo(SequelizeUser,{
  foreignKey: 'userId',
  as: 'user'
});

export default SequelizeTopics;