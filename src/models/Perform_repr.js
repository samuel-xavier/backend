const { Model, DataTypes } = require('sequelize');

class Perform_repr extends Model {
    static init(sequelize) {
        super.init({
            cdempresa: DataTypes.STRING(9),            
            tp_analise: DataTypes.STRING(15),
            ds_regiao: DataTypes.STRING(30),
            ano_mes: DataTypes.STRING(6),
            qt_cli_atend: DataTypes.INTEGER,
            vlr_meta: DataTypes.INTEGER,
            vlr_faturam: DataTypes.INTEGER,
            efi: DataTypes.INTEGER,
            dt_analise: DataTypes.STRING(8),
            hr_analise: DataTypes.STRING(5),

        }, {
            sequelize,
            tableName: 'perform_repr'
        })
    }
}

module.exports = Perform_repr;