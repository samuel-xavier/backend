'use strict';

const Sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('grpitens', { 
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
       cdgrpitem: {
         type: Sequelize.STRING(15),
         allowNull: false,
       },
       dsgrpitem: {
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
    await queryInterface.dropTable('grpitens');

  }
};
