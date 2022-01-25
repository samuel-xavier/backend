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
        qry = qry + 'SELECT TP_ANALISES.ID AS id, TP_ANALISES.CDEMPRESA AS cdempresa, ';
        qry = qry +   'TP_ANALISES.TP_ANALISE AS tp_analise, TP_ANALISES.DS_ANALISE AS ds_analise, ';
        qry = qry +   'TP_ANALISES.DT_ANALISE AS dt_analise, TP_ANALISES.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM TP_ANALISES ';
        qry = qry + 'WHERE TP_ANALISES.CDEMPRESA = ' + cdempresa;

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