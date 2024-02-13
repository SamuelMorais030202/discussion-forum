import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import db from '.';
import SequelizeTopics from "./SequelizeTopics";
import SequelizeUser from "./SequelizeUser";

class SequelizeMessage extends Model<InferAttributes<SequelizeMessage>,
InferCreationAttributes<SequelizeMessage>> {
  declare id: CreationOptional<number>;
  declare message: string;
  declare userId: number;
  declare topicId: number;
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
}, {
  sequelize: db,
  modelName: 'messages',
  timestamps: false,
  underscored: true,
});

SequelizeMessage.belongsTo(SequelizeTopics, {
  foreignKey: 'topicId',
  as: 'topics'
});

SequelizeTopics.hasMany(SequelizeMessage, {
  foreignKey: 'topicId',
  as: 'messages',
});

SequelizeMessage.belongsTo(SequelizeUser, {
  foreignKey: 'userId',
  as: 'user'
});

export default SequelizeMessage;