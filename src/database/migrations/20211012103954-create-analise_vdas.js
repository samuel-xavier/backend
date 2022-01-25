'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('analise_vdas', {
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
      met_dia: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vda_dia: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      efi_dia: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      met_acu: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vda_acu: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      efi_acu: {
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
    await queryInterface.dropTable('analise_vdas');
  }
};