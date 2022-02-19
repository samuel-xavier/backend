const Sequelize = require('sequelize');
const connection = require('../database');

const Tp_analise = require('../models/Tp_analises');
const { update } = require('../models/Tp_analises');

module.exports = {
    async index(req, res) {
        const tp_analises = await Tp_analise.findAll();

        return res.json(tp_analises);
    },

    async index_empresa(req, res) { 

        const { cdempresa } = req.params;

        var qry = '';
        qry = qry + 'SELECT tp_analises.ID AS id, tp_analises.CDEMPRESA AS cdempresa, ';
        qry = qry +   'tp_analises.TP_ANALISE AS tp_analise, tp_analises.DS_ANALISE AS ds_analise, ';
        qry = qry +   'tp_analises.DT_ANALISE AS dt_analise, tp_analises.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM tp_analises ';
        qry = qry + 'WHERE tp_analises.CDEMPRESA = ' + cdempresa;

        const tp_analises = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(tp_analises);
    },

    async index_perfil(req, res) { 

        const { cdempresa, perfil } = req.params;

        var qry = '';
        qry = qry + 'SELECT tp_analises.ID AS id, tp_analises.CDEMPRESA AS cdempresa, ';
        qry = qry +   'tp_analises.TP_ANALISE AS tp_analise, tp_analises.DS_ANALISE AS ds_analise, ';
        qry = qry +   'tp_analises.DT_ANALISE AS dt_analise, tp_analises.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM tp_analises ';
        qry = qry + 'WHERE tp_analises.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND tp_analises.TP_ANALISE = "' + perfil + '"';

        const tp_analises = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(tp_analises);
    },


    async store(req, res) {
        const { cdempresa, tp_analise, ds_analise, dt_analise, hr_analise } = req.body;

        const tp_analises = await Tp_analise.create({ cdempresa, tp_analise, ds_analise, dt_analise, hr_analise });

        return res.json(tp_analises);
    },

    async update(req, res) {
        const { tp_analise_id } = req.params;

        const { cdempresa, tp_analise, ds_analise, dt_analise, hr_analise } = req.body;

        const tp_analises = await Tp_analise.findByPk(tp_analise_id);
        
        if (!tp_analises) {
            return res.status(400).json({ error: 'Tipo de analise not found' });
        }

        await Tp_analise.update( { cdempresa, tp_analise, ds_analise, dt_analise, hr_analise }, { where: { id: tp_analise_id } } );

        return res.json();
    },

    async delete(req, res) {
        const { tp_analise_id } = req.params;

        const tp_analises = await Tp_analise.findByPk(tp_analise_id);
        if (!tp_analises) {
            return res.status(400).json({ error: 'Tipo de analise not found' });
        }

        await Tp_analise.destroy( { where: { id: tp_analise_id } } );

        return res.json();
    }

};