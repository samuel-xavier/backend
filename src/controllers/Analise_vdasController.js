const Sequelize = require('sequelize');
const connection = require('../database');

const Analise_vdas = require('../models/Analise_vdas');
const { update } = require('../models/Analise_vdas');

module.exports = {
    async index(req, res) {
        const analise_vdas = await Analise_vdas.findAll();

        return res.json(analise_vdas);
    },

    async index_tpanalise(req, res) { 

        const { cdempresa, tp_analise } = req.params;

        var qry = '';
        qry = qry + 'SELECT ANALISE_VDAS.ID AS id, ANALISE_VDAS.CDEMPRESA AS cdempresa, ';
        qry = qry +   'ANALISE_VDAS.TP_ANALISE AS tp_analise, ANALISE_VDAS.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'ANALISE_VDAS.MET_DIA AS met_dia, ANALISE_VDAS.VDA_DIA AS vda_dia, ANALISE_VDAS.EFI_DIA AS efi_dia, ';
        qry = qry +   'ANALISE_VDAS.MET_ACU AS met_acu, ANALISE_VDAS.VDA_ACU AS vda_acu, ANALISE_VDAS.EFI_ACU AS efi_acu, ';
        qry = qry +   'ANALISE_VDAS.DT_ANALISE AS dt_analise, ANALISE_VDAS.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM ANALISE_VDAS ';
        qry = qry + 'WHERE ANALISE_VDAS.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND ANALISE_VDAS.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND ANALISE_VDAS.DS_REGIAO <> "' + tp_analise + '"';

        const analise_vdas = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(analise_vdas);
    },

    async index_reg(req, res) { 

        const { cdempresa, tp_analise, ds_regiao } = req.params;

        var qry = '';
        qry = qry + 'SELECT ANALISE_VDAS.ID AS id, ANALISE_VDAS.CDEMPRESA AS cdempresa, ';
        qry = qry +   'ANALISE_VDAS.TP_ANALISE AS tp_analise, ANALISE_VDAS.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'ANALISE_VDAS.MET_DIA AS met_dia, ANALISE_VDAS.VDA_DIA AS vda_dia, ANALISE_VDAS.EFI_DIA AS efi_dia, ';
        qry = qry +   'ANALISE_VDAS.MET_ACU AS met_acu, ANALISE_VDAS.VDA_ACU AS vda_acu, ANALISE_VDAS.EFI_ACU AS efi_acu, ';
        qry = qry +   'ANALISE_VDAS.DT_ANALISE AS dt_analise, ANALISE_VDAS.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM ANALISE_VDAS ';
        qry = qry + 'WHERE ANALISE_VDAS.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND ANALISE_VDAS.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND ANALISE_VDAS.DS_REGIAO = "' + ds_regiao + '"';

        const analise_vdas = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(analise_vdas);
    },
    
    async store(req, res) {
        console.log('entrou no store')
        console.log(req.body)
        const {
            cdempresa, tp_analise, ds_regiao, met_dia, vda_dia, efi_dia, met_acu, vda_acu, efi_acu, dt_analise, hr_analise
        } = req.body;

        const analise_vdas = await Analise_vdas.create({
            cdempresa, tp_analise, ds_regiao, met_dia, vda_dia, efi_dia, met_acu, vda_acu, efi_acu, dt_analise, hr_analise
        });

        return res.json(analise_vdas);
    },
    async update(req, res) {
        const { analise_vdas_id } = req.params;

        const {
            cdempresa, tp_analise, ds_regiao, met_dia, vda_dia, efi_dia, met_acu, vda_acu, efi_acu, dt_analise, hr_analise
        } = req.body;

        const analise_vdas_aux = await Analise_vdas.findByPk(analise_vdas_id);
        if (!analise_vdas_aux) {
            return res.status(400).json( { error: 'Analise de vendas nao encontrada...' });
        }

        await Analise_vdas.update({
            cdempresa, tp_analise, ds_regiao, met_dia, vda_dia, efi_dia, met_acu, vda_acu, efi_acu, dt_analise, hr_analise
            }, { where: { id: analise_vdas_id }
        });

        return res.json();
    },

    async delete(req, res) {
        const { analise_vdas_id } = req.params;

        const analise_vdas = await Analise_vdas.findByPk(analise_vdas_id);
        if (!analise_vdas) {
            return res.status(400).json({ error: 'Analise de vendas not found' });
        }

        await Analise_vdas.destroy( { where: { id: analise_vdas_id } } );

        return res.json();
    }

};