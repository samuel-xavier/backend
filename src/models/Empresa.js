const { Model, DataTypes } = require('sequelize');

class Empresa extends Model {
    static init(sequelize) {
        super.init({
            cdempresa: DataTypes.STRING(9),
            dsempresa: DataTypes.STRING(60),
            uri: DataTypes.STRING(256),
            uridet: DataTypes.STRING(256),
            logo: DataTypes.STRING(256),
        }, {
            sequelize,
            tableName: 'empresa'
        })
    }
}

module.exports = Empresa;