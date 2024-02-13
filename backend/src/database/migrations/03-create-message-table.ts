import { DataTypes, Model, QueryInterface } from "sequelize";
import IMessage from "../../interfaces/message/message";
export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMessage>>('messages', {
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
        references: {
          model: 'users',
          key: 'id',
        },
      },
      topicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'topic_id',
        references: {
          model: 'topics',
          key: 'id',
        },
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('messages');
  }
}