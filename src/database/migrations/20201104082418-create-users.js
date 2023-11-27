module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      }, 
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'edit@myEmail.com',
      },
      password: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Edit my address!.',
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Edit my number',
      },
      confirmation: {
        type: Sequelize.STRING,
      },
      isLoggedIn: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  },
};
