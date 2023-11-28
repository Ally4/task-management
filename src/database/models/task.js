import { Model } from 'sequelize';


module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  task.init({
    title: DataTypes.STRING,
    assignee: DataTypes.JSON,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    priority: DataTypes.STRING,
    description: DataTypes.STRING,
    project: DataTypes.STRING,
    pdf: DataTypes.STRING,
    picture: DataTypes.STRING,
    state: DataTypes.STRING,
    draft: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};
