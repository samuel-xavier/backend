const { Model, DataTypes } = require('sequelize');

class Vdas_detalhe extends Model {
    static init(sequelize) {
        super.init({
            cdempresa: DataTypes.STRING(9),            
            tp_analise: DataTypes.STRING(15),
            ds_regiao: DataTypes.STRING(30),
            cd_cli: DataTypes.STRING(20),
            loja_cli: DataTypes.STRING(4),
            ds_cli: DataTypes.STRING(60),
            nr_documento: DataTypes.STRING(20),
            nat_oper: DataTypes.STRING(15),
            dt_emissao: DataTypes.STRING(8),
            tp_docum: DataTypes.STRING(15),
            vlr_docum: DataTypes.INTEGER,
            dt_analise: DataTypes.STRING(8),
            hr_analise: DataTypes.STRING(5),

        }, {
            sequelize,
            tableName: 'vdas_detalhe'
        })
    }
}

module.exports = Vdas_detalhe;