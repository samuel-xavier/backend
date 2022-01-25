'use strict';

const Sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vdas_detalhe', { 
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
      cd_cli: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      loja_cli: {
        type: Sequelize.STRING(4),
        allowNull: false,
      },
      ds_cli: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      nr_documento: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      nat_oper: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      dt_emissao: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      tp_docum: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      vlr_docum: {
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
    await queryInterface.dropTable('vdas_detalhe');

  }
};
