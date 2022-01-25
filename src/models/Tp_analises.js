const { Model, DataTypes } = require('sequelize');

class Tp_analise extends Model {
    static init(sequelize) {
        super.init({
            cdempresa: DataTypes.STRING(9),            
            tp_analise: DataTypes.STRING(15),
            ds_analise: DataTypes.STRING(30),
            dt_analise: DataTypes.STRING(8),
            hr_analise: DataTypes.STRING(5),
        }, {
            sequelize,
            tableName: 'tp_analises'
        })
    }
}

module.exports = Tp_analise;