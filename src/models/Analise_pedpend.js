const { Model, DataTypes } = require('sequelize');

class Analise_pedpend extends Model {
    static init(sequelize) {
        super.init({
            cdempresa: DataTypes.STRING(9),   
            tp_analise: DataTypes.STRING(15),
            ds_regiao: DataTypes.STRING(30),
            classif: DataTypes.STRING(30),
            qt_pedidos: DataTypes.INTEGER,
            vl_pedidos: DataTypes.INTEGER,
            percent: DataTypes.INTEGER,
            dt_analise: DataTypes.STRING(8),
            hr_analise: DataTypes.STRING(5),
        }, {
            sequelize,
            tableName: 'analise_pedpend'
        })
    }
}

module.exports = Analise_pedpend;