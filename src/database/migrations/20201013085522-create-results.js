// 'use strict';
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('results', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       name: {
//         type: Sequelize.STRING,
//       },
//       email: {
//         type: Sequelize.STRING
//       },
//       phoneNumber: {
//         type: Sequelize.STRING
//       },
//       address: {
//         type: Sequelize.STRING
//       },
//       sickness: {
//         type: Sequelize.STRING
//       },
//       pdf: {
//         type: Sequelize.BLOB
//       },
//       status: {
//         type: Sequelize.BLOB
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable('results');
//   }
// };


'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('results', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        default: Sequelize.fn('uuid_generate_v4')
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      sickness: {
        type: Sequelize.STRING
      },
      pdf: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('results');
  }
};