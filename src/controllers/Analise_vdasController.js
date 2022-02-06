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
        qry = qry + 'SELECT analise_vdas.ID AS id, analise_vdas.CDEMPRESA AS cdempresa, ';
        qry = qry +   'analise_vdas.TP_ANALISE AS tp_analise, analise_vdas.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'analise_vdas.MET_DIA AS met_dia, analise_vdas.VDA_DIA AS vda_dia, analise_vdas.EFI_DIA AS efi_dia, ';
        qry = qry +   'analise_vdas.MET_ACU AS met_acu, analise_vdas.VDA_ACU AS vda_acu, analise_vdas.EFI_ACU AS efi_acu, ';
        qry = qry +   'analise_vdas.DT_ANALISE AS dt_analise, analise_vdas.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM analise_vdas ';
        qry = qry + 'WHERE analise_vdas.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND analise_vdas.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND analise_vdas.DS_REGIAO <> "' + tp_analise + '" ';
        qry = qry + 'ORDER BY analise_vdas.EFI_ACU DESC';

        const analise_vdas = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(analise_vdas);
    },

    async index_reg(req, res) { 

        const { cdempresa, tp_analise, ds_regiao } = req.params;

        var qry = '';
        qry = qry + 'SELECT analise_vdas.ID AS id, analise_vdas.CDEMPRESA AS cdempresa, ';
        qry = qry +   'analise_vdas.TP_ANALISE AS tp_analise, analise_vdas.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'analise_vdas.MET_DIA AS met_dia, analise_vdas.VDA_DIA AS vda_dia, analise_vdas.EFI_DIA AS efi_dia, ';
        qry = qry +   'analise_vdas.MET_ACU AS met_acu, analise_vdas.VDA_ACU AS vda_acu, analise_vdas.EFI_ACU AS efi_acu, ';
        qry = qry +   'analise_vdas.DT_ANALISE AS dt_analise, analise_vdas.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM analise_vdas ';
        qry = qry + 'WHERE analise_vdas.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND analise_vdas.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND analise_vdas.DS_REGIAO = "' + ds_regiao + '" ';
        qry = qry + 'ORDER BY analise_vdas.EFI_ACU DESC';

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