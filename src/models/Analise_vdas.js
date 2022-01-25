const { Model, DataTypes } = require('sequelize');

class Analise_vdas extends Model {
    static init(sequelize) {
        super.init({
            cdempresa: DataTypes.STRING(9),            
            tp_analise: DataTypes.STRING(15),
            ds_regiao: DataTypes.STRING(30),
            met_dia: DataTypes.INTEGER,
            vda_dia: DataTypes.INTEGER,
            efi_dia: DataTypes.INTEGER,
            met_acu: DataTypes.INTEGER,
            vda_acu: DataTypes.INTEGER,
            efi_acu: DataTypes.INTEGER,
            dt_analise: DataTypes.STRING(8),
            hr_analise: DataTypes.STRING(5),

        }, {
            sequelize,
            tableName: 'analise_vdas'
        })
    }
}

module.exports = Analise_vdas;