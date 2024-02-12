import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import SequelizeTopics from "./SequelizeTopics";
import SequelizeUser from "./SequelizeUser";
import db from '.';

class SequelizeMessage extends Model<InferAttributes<SequelizeMessage>,
InferCreationAttributes<SequelizeMessage>> {
  declare id: CreationOptional<number>;
  declare message: string;
  declare userId: number;
  declare topicId: number;
  declare createdAt: Date;
}

SequelizeMessage.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
  topicId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'topic_id',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'created_at'
  }
}, {
  sequelize: db,
  modelName: 'messages',
  timestamps: false,
  underscored: true,
});

SequelizeMessage.belongsTo(SequelizeTopics, {
  foreignKey: 'topicId',
  as: 'topic'
});

SequelizeMessage.belongsTo(SequelizeUser, {
  foreignKey: 'userId',
  as: 'user'
});

export default SequelizeMessage;