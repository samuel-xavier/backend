'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('analise_pedpend', {
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
      tp_analise: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      ds_regiao: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      classif: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      qt_pedidos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vl_pedidos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      percent: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dt_analise: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      hr_analise: {
        type: Sequelize.STRING(5),
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
    await queryInterface.dropTable('analise_analise_pedpend');
  }
};
