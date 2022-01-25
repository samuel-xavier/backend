const { Model, DataTypes } = require('sequelize');

class Analise_clientes extends Model {
    static init(sequelize) {
        super.init({
            cdempresa: DataTypes.STRING(9),            
            tp_analise: DataTypes.STRING(15),
            ds_regiao: DataTypes.STRING(30),
            qt_vda_mes: DataTypes.INTEGER,
            qt_novos: DataTypes.INTEGER,
            qt_recuper: DataTypes.INTEGER,
            qt_ativos: DataTypes.INTEGER,
            qt_ativos_180: DataTypes.INTEGER,
            qt_semvda_90: DataTypes.INTEGER,
            dt_analise: DataTypes.STRING(8),
            hr_analise: DataTypes.STRING(5),

        }, {
            sequelize,
            tableName: 'analise_clientes'
        })
    }
}

module.exports = Analise_clientes;