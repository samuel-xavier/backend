const Sequelize = require('sequelize');
const connection = require('../database');

const Analise_clientes = require('../models/Analise_clientes');
const { update } = require('../models/Analise_clientes');

module.exports = {
    async index(req, res) {
        const analise_clientes = await Analise_clientes.findAll();

        return res.json(analise_clientes);
    },

    async index_tpanalise(req, res) { 

        const { cdempresa, tp_analise } = req.params;

        var qry = '';
        qry = qry + 'SELECT ANALISE_CLIENTES.ID AS id, ANALISE_CLIENTES.CDEMPRESA AS cdempresa, ';
        qry = qry +   'ANALISE_CLIENTES.TP_ANALISE AS tp_analise, ANALISE_CLIENTES.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'ANALISE_CLIENTES.QT_VDA_MES AS qt_vda_mes, ANALISE_CLIENTES.QT_NOVOS AS qt_novos, ANALISE_CLIENTES.QT_RECUPER AS qt_recuper, ';
        qry = qry +   'ANALISE_CLIENTES.QT_ATIVOS AS qt_ativos, ANALISE_CLIENTES.QT_ATIVOS_180 AS qt_ativos_180, ANALISE_CLIENTES.QT_SEMVDA_90 AS qt_semvda_90, ';
        qry = qry +   'ANALISE_CLIENTES.DT_ANALISE AS dt_analise, ANALISE_CLIENTES.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM ANALISE_CLIENTES ';
        qry = qry + 'WHERE ANALISE_CLIENTES.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND ANALISE_CLIENTES.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND ANALISE_CLIENTES.DS_REGIAO <> "' + tp_analise + '"';

        const analise_clientes = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(analise_clientes);
    },

    async index_reg(req, res) { 

        const { cdempresa, tp_analise, ds_regiao } = req.params;

        var qry = '';
        qry = qry + 'SELECT ANALISE_CLIENTES.ID AS id, ANALISE_CLIENTES.CDEMPRESA AS cdempresa, ';
        qry = qry +   'ANALISE_CLIENTES.TP_ANALISE AS tp_analise, ANALISE_CLIENTES.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'ANALISE_CLIENTES.QT_VDA_MES AS qt_vda_mes, ANALISE_CLIENTES.QT_NOVOS AS qt_novos, ANALISE_CLIENTES.QT_RECUPER AS qt_recuper, ';
        qry = qry +   'ANALISE_CLIENTES.QT_ATIVOS AS qt_ativos, ANALISE_CLIENTES.QT_ATIVOS_180 AS qt_ativos_180, ANALISE_CLIENTES.QT_SEMVDA_90 AS qt_semvda_90, ';
        qry = qry +   'ANALISE_CLIENTES.DT_ANALISE AS dt_analise, ANALISE_CLIENTES.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM ANALISE_CLIENTES ';
        qry = qry + 'WHERE ANALISE_CLIENTES.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND ANALISE_CLIENTES.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND ANALISE_CLIENTES.DS_REGIAO = "' + ds_regiao + '"';

        const analise_clientes = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(analise_clientes);
    },
    
    async store(req, res) {
        console.log('entrou no store')
        console.log(req.body)
        const {
            cdempresa, tp_analise, ds_regiao, qt_vda_mes, qt_novos, qt_recuper, qt_ativos, qt_ativos_180, qt_semvda_90, dt_analise, hr_analise
        } = req.body;

        const analise_clientes = await Analise_clientes.create({
            cdempresa, tp_analise, ds_regiao, qt_vda_mes, qt_novos, qt_recuper, qt_ativos, qt_ativos_180, qt_semvda_90, dt_analise, hr_analise
        });

        return res.json(analise_clientes);
    },
    async update(req, res) {
        const { analise_clientes_id } = req.params;

        const {
            cdempresa, tp_analise, ds_regiao, qt_vda_mes, qt_novos, qt_recuper, qt_ativos, qt_ativos_180, qt_semvda_90, dt_analise, hr_analise
        } = req.body;

        const analise_clientes_aux = await Analise_clientes.findByPk(analise_clientes_id);
        if (!analise_clientes_aux) {
            return res.status(400).json( { error: 'Analise de clientes nao encontrada...' });
        }

        await Analise_clientes.update({
            cdempresa, tp_analise, ds_regiao, qt_vda_mes, qt_novos, qt_recuper, qt_ativos, qt_ativos_180, qt_semvda_90, dt_analise, hr_analise
            }, { where: { id: analise_clientes_id }
        });

        return res.json();
    },

    async delete(req, res) {
        const { analise_clientes_id } = req.params;

        const analise_clientes = await Analise_clientes.findByPk(analise_clientes_id);
        if (!analise_clientes) {
            return res.status(400).json({ error: 'Analise de clientes not found' });
        }

        await Analise_clientes.destroy( { where: { id: analise_clientes_id } } );

        return res.json();
    }

};