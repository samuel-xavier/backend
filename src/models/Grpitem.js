const { Model, DataTypes } = require('sequelize');

class Grpitem extends Model {
    static init(sequelize) {
        super.init({
            cdempresa: DataTypes.STRING(9),            
            cdgrpitem: DataTypes.STRING(15),
            dsgrpitem: DataTypes.STRING(60),
            uri: DataTypes.STRING(256),
            uridet: DataTypes.STRING(256),
        }, {
            sequelize,
            tableName: 'grpitens'
        })
    }
}

module.exports = Grpitem;