'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('healthFacilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
      },
      assignee: {
        type: Sequelize.JSON
      },
      startDate: {
        type: Sequelize.STRING
      },
      endDate: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      project: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pdf: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('healthFacilities');
  }
};