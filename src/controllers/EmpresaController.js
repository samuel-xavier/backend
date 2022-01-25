const Sequelize = require('sequelize');
const connection = require('../database');

const Empresa = require('../models/Empresa');
const { update } = require('../models/Empresa');

module.exports = {
    async index(req, res) {
        const empresa = await Empresa.findAll();

        return res.json(empresa);
    },

    async index_one(req, res) { 

        const { cdempresa } = req.params;

        var qry = '';
        qry = qry + 'SELECT empresa.ID AS id, empresa.CDEMPRESA AS cdempresa, empresa.DSEMPRESA AS dsempresa, ';
        qry = qry +   'empresa.URI AS uri, empresa.URIDET AS uridet, empresa.LOGO AS logo ';
        qry = qry + 'FROM empresa ';
        qry = qry + 'WHERE empresa.CDEMPRESA = ' + cdempresa;

        const empresa = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(empresa);
    },

    async store(req, res) {
        const { cdempresa, dsempresa, uri, uridet, logo } = req.body;

        const empresa = await Empresa.create({ cdempresa, dsempresa, uri, uridet, logo });

        return res.json(empresa);
    },

    async update(req, res) {
        const { empresa_id } = req.params;

        const { cdempresa, dsempresa, uri, uridet, logo } = req.body;

        const empresa = await Empresa.findByPk(empresa_id);
        
        if (!empresa) {
            return res.status(400).json({ error: 'Empresa not found' });
        }

        await Empresa.update( { cdempresa, dsempresa, uri, uridet, logo }, { where: { id: empresa_id } } );

        return res.json();
    },

    async delete(req, res) {
        const { empresa_id } = req.params;

        const empresa = await Empresa.findByPk(empresa_id);
        if (!empresa) {
            return res.status(400).json({ error: 'Empresa not found' });
        }

        await Empresa.destroy( { where: { id: empresa_id } } );

        return res.json();
    }

};