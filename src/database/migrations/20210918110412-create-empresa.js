'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('empresa', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, 
      },
      cdempresa: {
        type: Sequelize.STRING(9),
        allowNull: false,
      },
      dsempresa: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      uri: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      uridet: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      logo: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      created_at: {
       type: Sequelize.DATE,
       allowNull: false,
     },
     updated_at: {
       type: Sequelize.DATE,
       allowNull: false,
     },
   });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
