const { Model, DataTypes } = require('sequelize');

class Hist_faturamento extends Model {
    static init(sequelize) {
        super.init({
            cdempresa: DataTypes.STRING(9),            
            tp_analise: DataTypes.STRING(15),
            ds_regiao: DataTypes.STRING(30),
            cnpj: DataTypes.STRING(20),
            ds_cli: DataTypes.STRING(60),
            uf_cidade: DataTypes.STRING(30),
            ano_mes: DataTypes.STRING(6),
            vlr_faturam: DataTypes.INTEGER,
            dt_analise: DataTypes.STRING(8),
            hr_analise: DataTypes.STRING(5),

        }, {
            sequelize,
            tableName: 'hist_faturamento'
        })
    }
}

module.exports = Hist_faturamento;