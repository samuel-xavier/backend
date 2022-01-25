const Sequelize = require('sequelize');
const connection = require('../database');

const Vdas_detalhe = require('../models/Vdas_detalhe');
const { update } = require('../models/Vdas_detalhe');

module.exports = {
    async index(req, res) {
        const vdas_detalhe = await Vdas_detalhe.findAll();

        return res.json(vdas_detalhe);
    },

    async index_tpanalise(req, res) { 

        const { cdempresa, tp_analise } = req.params;

        var qry = '';
        qry = qry + 'SELECT vdas_detalhe.ID AS id, vdas_detalhe.CDEMPRESA AS cdempresa, ';
        qry = qry +   'vdas_detalhe.TP_ANALISE AS tp_analise, vdas_detalhe.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'vdas_detalhe.CD_CLI AS cd_cli, vdas_detalhe.LOJA_CLI AS loja_cli, vdas_detalhe.DS_CLI AS ds_cli, ';
        qry = qry +   'vdas_detalhe.NR_DOCUMENTO AS nr_documento, vdas_detalhe.NAT_OPER AS nat_oper, vdas_detalhe.DT_EMISSAO AS dt_emissao, ';
        qry = qry +   'vdas_detalhe.TP_DOCUM AS tp_docum, vdas_detalhe.VLR_DOCUM AS vlr_docum, ';
        qry = qry +   'vdas_detalhe.DT_ANALISE AS dt_analise, vdas_detalhe.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM vdas_detalhe ';
        qry = qry + 'WHERE vdas_detalhe.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND vdas_detalhe.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND vdas_detalhe.DS_REGIAO <> "' + tp_analise + '"';

        const vdas_detalhe = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(vdas_detalhe);
    },

    async index_reg(req, res) { 

        const { cdempresa, tp_analise, ds_regiao } = req.params;

        var qry = '';
        qry = qry + 'SELECT vdas_detalhe.ID AS id, vdas_detalhe.CDEMPRESA AS cdempresa, ';
        qry = qry +   'vdas_detalhe.TP_ANALISE AS tp_analise, vdas_detalhe.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'vdas_detalhe.CD_CLI AS cd_cli, vdas_detalhe.LOJA_CLI AS loja_cli, vdas_detalhe.DS_CLI AS ds_cli, ';
        qry = qry +   'vdas_detalhe.NR_DOCUMENTO AS nr_documento, vdas_detalhe.NAT_OPER AS nat_oper, vdas_detalhe.DT_EMISSAO AS dt_emissao, ';
        qry = qry +   'vdas_detalhe.TP_DOCUM AS tp_docum, vdas_detalhe.VLR_DOCUM AS vlr_docum, ';
        qry = qry +   'vdas_detalhe.DT_ANALISE AS dt_analise, vdas_detalhe.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM vdas_detalhe ';
        qry = qry + 'WHERE vdas_detalhe.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND vdas_detalhe.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND vdas_detalhe.DS_REGIAO = "' + ds_regiao + '"';

        const vdas_detalhe = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(vdas_detalhe);
    },
    
    async store(req, res) {
        console.log('entrou no store')
        console.log(req.body)
        const {
            cdempresa, tp_analise, ds_regiao, cd_cli, loja_cli, ds_cli, nr_documento, nat_oper, dt_emissao, tp_docum, vlr_docum, dt_analise, hr_analise
        } = req.body;

        const vdas_detalhe = await Vdas_detalhe.create({
            cdempresa, tp_analise, ds_regiao, cd_cli, loja_cli, ds_cli, nr_documento, nat_oper, dt_emissao, tp_docum, vlr_docum, dt_analise, hr_analise
        });

        return res.json(vdas_detalhe);
    },
    async update(req, res) {
        const { vdas_detalhe_id } = req.params;

        const {
            cdempresa, tp_analise, ds_regiao, cd_cli, loja_cli, ds_cli, nr_documento, nat_oper, dt_emissao, tp_docum, vlr_docum, dt_analise, hr_analise
        } = req.body;

        const vdas_detalhe_aux = await Vdas_detalhe.findByPk(vdas_detalhe_id);
        if (!vdas_detalhe_aux) {
            return res.status(400).json( { error: 'Vdas detalhe nao encontrada...' });
        }

        await Vdas_detalhe.update({
            cdempresa, tp_analise, ds_regiao, cd_cli, loja_cli, ds_cli, nr_documento, nat_oper, dt_emissao, tp_docum, vlr_docum, dt_analise, hr_analise
            }, { where: { id: vdas_detalhe_id }
        });

        return res.json();
    },

    async delete(req, res) {
        const { vdas_detalhe_id } = req.params;

        const vdas_detalhe = await Vdas_detalhe.findByPk(vdas_detalhe_id);
        if (!vdas_detalhe) {
            return res.status(400).json({ error: 'Vdas detalhe not found' });
        }

        await Vdas_detalhe.destroy( { where: { id: vdas_detalhe_id } } );

        return res.json();
    }

};