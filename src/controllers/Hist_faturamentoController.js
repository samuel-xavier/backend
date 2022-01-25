const Sequelize = require('sequelize');
const connection = require('../database');

const Hist_faturamento = require('../models/Hist_faturamento');
const { update } = require('../models/Hist_faturamento');

module.exports = {
    async index(req, res) {
        const hist_faturamento = await Hist_faturamento.findAll();

        return res.json(hist_faturamento);
    },
    
    async index_clientes_regiao(req, res) { 

        const { cdempresa, tp_analise, ds_regiao } = req.params;

        var qry = '';
        qry = qry + 'SELECT DISTINCT HIST_FATURAMENTO.CDEMPRESA AS cdempresa, ';
        qry = qry +   'HIST_FATURAMENTO.TP_ANALISE AS tp_analise, HIST_FATURAMENTO.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'HIST_FATURAMENTO.CNPJ AS cnpj,  HIST_FATURAMENTO.DS_CLI AS ds_cli ';
        qry = qry + 'FROM HIST_FATURAMENTO ';
        qry = qry + 'WHERE HIST_FATURAMENTO.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND HIST_FATURAMENTO.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND HIST_FATURAMENTO.DS_REGIAO = "' + ds_regiao + '" ';
        qry = qry + 'ORDER BY HIST_FATURAMENTO.DS_CLI';

        const hist_faturamento = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(hist_faturamento);
    },

    async index_cnpj(req, res) { 

        const { cdempresa, tp_analise, ds_regiao, cnpj } = req.params;

        var qry = '';
        qry = qry + 'SELECT HIST_FATURAMENTO.ID AS id, HIST_FATURAMENTO.CDEMPRESA AS cdempresa, ';
        qry = qry +   'HIST_FATURAMENTO.TP_ANALISE AS tp_analise, HIST_FATURAMENTO.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'HIST_FATURAMENTO.CNPJ AS cnpj,  HIST_FATURAMENTO.DS_CLI AS ds_cli, ';
        qry = qry +   'HIST_FATURAMENTO.ANO_MES AS ano_mes, HIST_FATURAMENTO.VLR_FATURAM AS vlr_faturam, ';
        qry = qry +   'HIST_FATURAMENTO.DT_ANALISE AS dt_analise, HIST_FATURAMENTO.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM HIST_FATURAMENTO ';
        qry = qry + 'WHERE HIST_FATURAMENTO.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND HIST_FATURAMENTO.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND HIST_FATURAMENTO.DS_REGIAO = "' + ds_regiao + '" ';    
        qry = qry +   'AND HIST_FATURAMENTO.CNPJ = "' + cnpj + '" ';
        qry = qry + 'ORDER BY HIST_FATURAMENTO.ANO_MES DESC';

        const hist_faturamento = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(hist_faturamento);
    },

    async store(req, res) {
        console.log('entrou no store')
        console.log(req.body)
        const {
            cdempresa, tp_analise, ds_regiao, cnpj, ds_cli, ano_mes, vlr_faturam, dt_analise, hr_analise
        } = req.body;

        const hist_faturamento = await Hist_faturamento.create({
            cdempresa, tp_analise, ds_regiao, cnpj, ds_cli, ano_mes, vlr_faturam, dt_analise, hr_analise
        });

        return res.json(hist_faturamento);
    },
    async update(req, res) {
        const { hist_faturamento_id } = req.params;

        const {
            cdempresa, tp_analise, ds_regiao, cnpj, ds_cli, ano_mes, vlr_faturam, dt_analise, hr_analise
        } = req.body;

        const hist_faturamento_aux = await Hist_faturamento.findByPk(hist_faturamento_id);
        if (!hist_faturamento_aux) {
            return res.status(400).json( { error: 'Hist faturam nao encontrado...' });
        }

        await Hist_faturamento.update({
            cdempresa, tp_analise, ds_regiao, cnpj, ds_cli, ano_mes, vlr_faturam, dt_analise, hr_analise
            }, { where: { id: hist_faturamento_id }
        });

        return res.json();
    },

    async delete(req, res) {
        const { hist_faturamento_id } = req.params;

        const hist_faturamento = await Hist_faturamento.findByPk(hist_faturamento_id);
        if (!hist_faturamento) {
            return res.status(400).json({ error: 'Hist faturam not found' });
        }

        await Hist_faturamento.destroy( { where: { id: hist_faturamento_id } } );

        return res.json();
    }

};