const Sequelize = require('sequelize');
const connection = require('../database');

const Perform_repr = require('../models/Perform_repr');
const { update } = require('../models/Perform_repr');

module.exports = {
    async index(req, res) {
        const perform_repr = await Perform_repr.findAll();

        return res.json(perform_repr);
    },
    
    async index_regiao(req, res) { 

        const { cdempresa, tp_analise, ds_regiao } = req.params;

        var qry = '';
        qry = qry + 'SELECT perform_repr.ID AS id, perform_repr.CDEMPRESA AS cdempresa, ';
        qry = qry +   'perform_repr.TP_ANALISE AS tp_analise, perform_repr.DS_REGIAO AS ds_regiao, ';
        qry = qry +   'perform_repr.ANO_MES AS ano_mes, perform_repr.QT_CLI_ATEND AS qt_cli_atend, ';
        qry = qry +   'perform_repr.VLR_META AS vlr_meta, perform_repr.VLR_FATURAM AS vlr_faturam, ';
        qry = qry +   'perform_repr.EFI AS efi, ';
        qry = qry +   'perform_repr.DT_ANALISE AS dt_analise, perform_repr.HR_ANALISE AS hr_analise ';
        qry = qry + 'FROM perform_repr ';
        qry = qry + 'WHERE perform_repr.CDEMPRESA = "' + cdempresa + '" ';
        qry = qry +   'AND perform_repr.TP_ANALISE = "' + tp_analise + '" ';
        qry = qry +   'AND perform_repr.DS_REGIAO = "' + ds_regiao + '" ';
        qry = qry + 'ORDER BY perform_repr.ANO_MES DESC';

        const perform_repr = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(perform_repr);
    },

    async store(req, res) {
        console.log('entrou no store')
        console.log(req.body)
        const {
            cdempresa, tp_analise, ds_regiao, ano_mes, qt_cli_atend, vlr_meta, vlr_faturam, efi, dt_analise, hr_analise
        } = req.body;

        const perform_repr = await Perform_repr.create({
            cdempresa, tp_analise, ds_regiao, ano_mes, qt_cli_atend, vlr_meta, vlr_faturam, efi, dt_analise, hr_analise
        });

        return res.json(perform_repr);
    },
    async update(req, res) {
        const { perform_repr_id } = req.params;

        const {
            cdempresa, tp_analise, ds_regiao, ano_mes, qt_cli_atend, vlr_meta, vlr_faturam, efi, dt_analise, hr_analise
        } = req.body;

        const perform_repr_aux = await Perform_repr.findByPk(perform_repr_id);
        if (!perform_repr_aux) {
            return res.status(400).json( { error: 'Performance repres nao encontrada...' });
        }

        await Perform_repr.update({
            cdempresa, tp_analise, ds_regiao, ano_mes, qt_cli_atend, vlr_meta, vlr_faturam, efi, dt_analise, hr_analise
            }, { where: { id: perform_repr_id }
        });

        return res.json();
    },

    async delete(req, res) {
        const { perform_repr_id } = req.params;

        const perform_repr = await Perform_repr.findByPk(perform_repr_id);
        if (!perform_repr) {
            return res.status(400).json({ error: 'Performance repres not found' });
        }

        await Perform_repr.destroy( { where: { id: perform_repr_id } } );

        return res.json();
    }

};