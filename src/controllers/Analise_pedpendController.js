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
        qry = qry + 'SELECT analise_pedpend.ID AS id, analise_pedpend.CDEMPRESA AS cdempresa, analise_pedpend.TP_ANALISE AS tp_analise, ';
        qry = qry +   'analise_pedpend.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'analise_pedpend.CLASSIF AS classif, analise_pedpend.QT_PEDIDOS AS qt_pedidos, analise_pedpend.VL_PEDIDOS AS vl_pedidos, ';
        qry = qry +   'analise_pedpend.PERCENT AS percent, analise_pedpend.DT_ANALISE AS dt_analise,  analise_pedpend.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM analise_pedpend ';
        qry = qry + 'WHERE analise_pedpend.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND analise_pedpend.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND analise_pedpend.DS_REGIAO <> "' + tp_analise + '" ';
        qry = qry + 'ORDER BY analise_pedpend.CLASSIF';

        const analise_pedpend = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(analise_pedpend);
    },

    async index_reg(req, res) { 

        const { cdempresa, tp_analise, ds_regiao } = req.params;

        var qry = '';
        qry = qry + 'SELECT analise_pedpend.ID AS id, analise_pedpend.CDEMPRESA AS cdempresa, analise_pedpend.TP_ANALISE AS tp_analise, ';
        qry = qry +   'analise_pedpend.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'analise_pedpend.CLASSIF AS classif, analise_pedpend.QT_PEDIDOS AS qt_pedidos, analise_pedpend.VL_PEDIDOS AS vl_pedidos, ';
        qry = qry +   'analise_pedpend.PERCENT AS percent, analise_pedpend.DT_ANALISE AS dt_analise,  analise_pedpend.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM analise_pedpend ';
        qry = qry + 'WHERE analise_pedpend.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND analise_pedpend.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND analise_pedpend.DS_REGIAO = "' + ds_regiao + '" ';
        qry = qry + 'ORDER BY analise_pedpend.CLASSIF';

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