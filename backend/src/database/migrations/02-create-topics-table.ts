import { DataTypes, Model, QueryInterface } from "sequelize";
import ITopics from "../../interfaces/topics/topics";
export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITopics>>('topics', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        defaultValue: new Date(),
        field: 'created_at'
      }
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('topics');
  }
}