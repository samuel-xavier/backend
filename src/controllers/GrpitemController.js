const Sequelize = require('sequelize');
const connection = require('../database');

const Grpitem = require('../models/Grpitem');
const { update } = require('../models/Grpitem');

module.exports = {
    async index(req, res) {
        const grpitens = await Grpitem.findAll();

        return res.json(grpitens);
    },

    async index_empresa(req, res) { 

        const { cdempresa } = req.params;

        var qry = '';
        qry = qry + 'SELECT GRPITENS.ID AS id, GRPITENS.CDEMPRESA AS cdempresa, ';
        qry = qry +   'GRPITENS.CDGRPITEM AS cdgrpitem, GRPITENS.DSGRPITEM AS dsgrpitem, ';
        qry = qry +   'GRPITENS.URI AS uri, GRPITENS.URIDET AS uridet ';
        qry = qry + 'FROM GRPITENS ';
        qry = qry + 'WHERE GRPITENS.CDEMPRESA = ' + cdempresa;

        const grpitens = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(grpitens);
    },

    async store(req, res) {
        const { cdempresa, cdgrpitem, dsgrpitem, uri, uridet } = req.body;

        const grpitem = await Grpitem.create({ cdempresa, cdgrpitem, dsgrpitem, uri, uridet });

        return res.json(grpitem);
    },

    async update(req, res) {
        const { grpitem_id } = req.params;

        const { cdempresa, cdgrpitem, dsgrpitem, uri, uridet } = req.body;

        const grpitem = await Grpitem.findByPk(grpitem_id);
        
        if (!grpitem) {
            return res.status(400).json({ error: 'Grupo de item not found' });
        }

        await Grpitem.update( { cdempresa, cdgrpitem, dsgrpitem, uri, uridet }, { where: { id: grpitem_id } } );

        return res.json();
    },

    async delete(req, res) {
        const { grpitem_id } = req.params;

        const grpitem = await Grpitem.findByPk(grpitem_id);
        if (!grpitem) {
            return res.status(400).json({ error: 'Grupo de item not found' });
        }

        await Grpitem.destroy( { where: { id: grpitem_id } } );

        return res.json();
    }

};