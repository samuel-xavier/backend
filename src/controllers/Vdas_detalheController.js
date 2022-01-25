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
        qry = qry + 'SELECT VDAS_DETALHE.ID AS id, VDAS_DETALHE.CDEMPRESA AS cdempresa, ';
        qry = qry +   'VDAS_DETALHE.TP_ANALISE AS tp_analise, VDAS_DETALHE.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'VDAS_DETALHE.CD_CLI AS cd_cli, VDAS_DETALHE.LOJA_CLI AS loja_cli, VDAS_DETALHE.DS_CLI AS ds_cli, ';
        qry = qry +   'VDAS_DETALHE.NR_DOCUMENTO AS nr_documento, VDAS_DETALHE.NAT_OPER AS nat_oper, VDAS_DETALHE.DT_EMISSAO AS dt_emissao, ';
        qry = qry +   'VDAS_DETALHE.TP_DOCUM AS tp_docum, VDAS_DETALHE.VLR_DOCUM AS vlr_docum, ';
        qry = qry +   'VDAS_DETALHE.DT_ANALISE AS dt_analise, VDAS_DETALHE.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM VDAS_DETALHE ';
        qry = qry + 'WHERE VDAS_DETALHE.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND VDAS_DETALHE.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND VDAS_DETALHE.DS_REGIAO <> "' + tp_analise + '"';

        const vdas_detalhe = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(vdas_detalhe);
    },

    async index_reg(req, res) { 

        const { cdempresa, tp_analise, ds_regiao } = req.params;

        var qry = '';
        qry = qry + 'SELECT VDAS_DETALHE.ID AS id, VDAS_DETALHE.CDEMPRESA AS cdempresa, ';
        qry = qry +   'VDAS_DETALHE.TP_ANALISE AS tp_analise, VDAS_DETALHE.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'VDAS_DETALHE.CD_CLI AS cd_cli, VDAS_DETALHE.LOJA_CLI AS loja_cli, VDAS_DETALHE.DS_CLI AS ds_cli, ';
        qry = qry +   'VDAS_DETALHE.NR_DOCUMENTO AS nr_documento, VDAS_DETALHE.NAT_OPER AS nat_oper, VDAS_DETALHE.DT_EMISSAO AS dt_emissao, ';
        qry = qry +   'VDAS_DETALHE.TP_DOCUM AS tp_docum, VDAS_DETALHE.VLR_DOCUM AS vlr_docum, ';
        qry = qry +   'VDAS_DETALHE.DT_ANALISE AS dt_analise, VDAS_DETALHE.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM VDAS_DETALHE ';
        qry = qry + 'WHERE VDAS_DETALHE.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND VDAS_DETALHE.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND VDAS_DETALHE.DS_REGIAO = "' + ds_regiao + '"';

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