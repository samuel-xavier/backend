const Sequelize = require('sequelize');
const connection = require('../database');

const Item = require('../models/Item');
const { update } = require('../models/Item');

module.exports = {
    async index(req, res) {
        const itens = await Item.findAll();

        return res.json(itens);
    },

    async index_empresa(req, res) { 

        const { cdempresa } = req.params;

        var qry = '';
        qry = qry + 'SELECT ITENS.ID AS id, ITENS.CDEMPRESA AS cdempresa, ITENS.CDITEM AS cditem, ';
        qry = qry +   'ITENS.DSITEM AS dsitem, ITENS.DSDETITEM AS dsdetitem, ITENS.CDGRPITEM AS cdgrpitem, ';
        qry = qry +   'ITENS.PRCVDA AS prcvda, ITENS.URI AS uri, ITENS.URIDET AS uridet ';
        qry = qry + 'FROM ITENS ';
        qry = qry + 'WHERE ITENS.CDEMPRESA = ' + cdempresa;

        const itens = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(itens);
    },

    async index_grp(req, res) { 

        const { cdempresa, cdgrpitem } = req.params;

        var qry = '';
        qry = qry + 'SELECT ITENS.ID AS id, ITENS.CDEMPRESA AS cdempresa, ITENS.CDITEM AS cditem, ';
        qry = qry +   'ITENS.DSITEM AS dsitem, ITENS.DSDETITEM AS dsdetitem, ITENS.CDGRPITEM AS cdgrpitem, ';
        qry = qry +   'ITENS.PRCVDA AS prcvda, ITENS.URI AS uri, ITENS.URIDET AS uridet ';
        qry = qry + 'FROM ITENS ';
        qry = qry + 'WHERE ITENS.CDEMPRESA = ' + cdempresa + ' ';
        qry = qry +   'AND ITENS.CDGRPITEM = ' + cdgrpitem;

        const itens = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(itens);
    },
    
    async store(req, res) {
        console.log('entrou no store')
        console.log(req.body)
        const {
            cdempresa, cditem, dsitem, dsdetitem, cdgrpitem, prcvda, uri, uridet
        } = req.body;

        const item = await Item.create({
            cdempresa, cditem, dsitem, dsdetitem, cdgrpitem, prcvda, uri, uridet
        });

        return res.json(item);
    },
    async update(req, res) {
        const { item_id } = req.params;

        const {
            cdempresa, cditem, dsitem, dsdetitem, cdgrpitem, prcvda, uri, uridet
        } = req.body;

        const item_aux = await Item.findByPk(item_id);
        if (!item_aux) {
            return res.status(400).json( { error: 'Item nao encontrado' });
        }

        await Item.update({
            cdempresa, cditem, dsitem, dsdetitem, cdgrpitem, prcvda, uri, uridet
            }, { where: { id: item_id }
        });

        return res.json();
    },

    async delete(req, res) {
        const { item_id } = req.params;

        const item = await Item.findByPk(item_id);
        if (!item) {
            return res.status(400).json({ error: 'Item not found' });
        }

        await Item.destroy( { where: { id: item_id } } );

        return res.json();
    }

};