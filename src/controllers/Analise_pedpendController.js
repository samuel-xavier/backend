const Sequelize = require('sequelize');
const connection = require('../database');

const Analise_pedpend = require('../models/Analise_pedpend');
const { update } = require('../models/Analise_pedpend');

module.exports = {
    async index(req, res) {
        const analise_pedpend = await Analise_pedpend.findAll();

        return res.json(analise_pedpend);
    },

    async index_tpanalise(req, res) { 

        const { cdempresa, tp_analise } = req.params;

        var qry = '';
        qry = qry + 'SELECT ANALISE_PEDPEND.ID AS id, ANALISE_PEDPEND.CDEMPRESA AS cdempresa, ANALISE_PEDPEND.TP_ANALISE AS tp_analise, ';
        qry = qry +   'ANALISE_PEDPEND.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'ANALISE_PEDPEND.CLASSIF AS classif, ANALISE_PEDPEND.QT_PEDIDOS AS qt_pedidos, ANALISE_PEDPEND.VL_PEDIDOS AS vl_pedidos, ';
        qry = qry +   'ANALISE_PEDPEND.PERCENT AS percent, ANALISE_PEDPEND.DT_ANALISE AS dt_analise,  ANALISE_PEDPEND.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM ANALISE_PEDPEND ';
        qry = qry + 'WHERE ANALISE_PEDPEND.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND ANALISE_PEDPEND.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND ANALISE_PEDPEND.DS_REGIAO <> "' + tp_analise + '"';

        const analise_pedpend = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(analise_pedpend);
    },

    async index_reg(req, res) { 

        const { cdempresa, tp_analise, ds_regiao } = req.params;

        var qry = '';
        qry = qry + 'SELECT ANALISE_PEDPEND.ID AS id, ANALISE_PEDPEND.CDEMPRESA AS cdempresa, ANALISE_PEDPEND.TP_ANALISE AS tp_analise, ';
        qry = qry +   'ANALISE_PEDPEND.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'ANALISE_PEDPEND.CLASSIF AS classif, ANALISE_PEDPEND.QT_PEDIDOS AS qt_pedidos, ANALISE_PEDPEND.VL_PEDIDOS AS vl_pedidos, ';
        qry = qry +   'ANALISE_PEDPEND.PERCENT AS percent, ANALISE_PEDPEND.DT_ANALISE AS dt_analise,  ANALISE_PEDPEND.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM ANALISE_PEDPEND ';
        qry = qry + 'WHERE ANALISE_PEDPEND.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND ANALISE_PEDPEND.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND ANALISE_PEDPEND.DS_REGIAO = "' + ds_regiao + '"';

        const analise_pedpend = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(analise_pedpend);
    },
    
    async store(req, res) {
        console.log('entrou no store')
        console.log(req.body)
        const {
            cdempresa, tp_analise, ds_regiao, classif, qt_pedidos, vl_pedidos, percent, dt_analise, hr_analise
        } = req.body;

        const analise_pedpend = await Analise_pedpend.create({
            cdempresa, tp_analise, ds_regiao, classif, qt_pedidos, vl_pedidos, percent, dt_analise, hr_analise
        });

        return res.json(analise_pedpend);
    },
    async update(req, res) {
        const { analise_pedpend_id } = req.params;

        const {
            cdempresa, tp_analise, ds_regiao, classif, qt_pedidos, vl_pedidos, percent, dt_analise, hr_analise
        } = req.body;

        const analise_pedpend_aux = await Analise_pedpend.findByPk(analise_pedpend_id);
        if (!analise_pedpend_aux) {
            return res.status(400).json( { error: 'Analise pedidos pendentes nao encontrada...' });
        }

        await Analise_pedpend.update({
            cdempresa, tp_analise, ds_regiao, classif, qt_pedidos, vl_pedidos, percent, dt_analise, hr_analise
            }, { where: { id: analise_pedpend_id }
        });

        return res.json();
    },

    async delete(req, res) {
        const { analise_pedpend_id } = req.params;

        const analise_pedpend = await Analise_pedpend.findByPk(analise_pedpend_id);
        if (!analise_pedpend) {
            return res.status(400).json({ error: 'Analise pedidos pendentes not found' });
        }

        await Analise_pedpend.destroy( { where: { id: analise_pedpend_id } } );

        return res.json();
    }

};