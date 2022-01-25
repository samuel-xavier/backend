const { Model, DataTypes } = require('sequelize');

class Item extends Model {
    static init(sequelize) {
        super.init({
            cdempresa: DataTypes.STRING(9),
            cditem: DataTypes.STRING(15),
            dsitem: DataTypes.STRING(60),
            dsdetitem: DataTypes.STRING(256),
            cdgrpitem: DataTypes.STRING(15),
            prcvda: DataTypes.INTEGER,
            uri: DataTypes.STRING(256),
            uridet: DataTypes.STRING(256),
        }, {
            sequelize,
            tableName: 'itens'
        })
    }
}

module.exports = Item;