const Sequelize = require('sequelize');
const connection = require('../database');

const Hist_faturamento = require('../models/Hist_faturamento');
const { update } = require('../models/Hist_faturamento');

module.exports = {
    async index(req, res) {
        const hist_faturamento = await Hist_faturamento.findAll();

        return res.json(hist_faturamento);
    },
    
    async index_clientes_ou_cidades_regiao(req, res) { 

        const { cdempresa, tp_analise, ds_regiao, tp_consulta } = req.params;

        var mes = new Date().getMonth() +1;
        var ano = new Date().getFullYear();

        if (mes > 4) {
          mes = mes - 4
          if (mes < 10) {mes = '0' + mes}
          var anomes_fin = ano.toString() + mes.toString()
        } else if (mes < 5) {
                 if (mes == 4) {mes = 12}
                 if (mes == 3) {mes = 11}
                 if (mes == 2) {mes = 10}
                 if (mes == 1) {mes = '09'}
                 ano = ano - 1
                 var anomes_fin = ano.toString() + mes.toString()
          }
  
        if (tp_consulta == 'clientes') {
            var qry = '';
            qry = qry + 'SELECT DISTINCT hist_faturamento.CDEMPRESA AS cdempresa, ';
            qry = qry +   'hist_faturamento.TP_ANALISE AS tp_analise, hist_faturamento.DS_REGIAO AS ds_regiao, ';
            qry = qry +   'hist_faturamento.CNPJ AS cnpj,  hist_faturamento.DS_CLI AS ds_cli ';
            qry = qry + 'FROM hist_faturamento ';
            qry = qry + 'WHERE hist_faturamento.CDEMPRESA = "' + cdempresa + '" ';
            qry = qry +   'AND hist_faturamento.TP_ANALISE = "' + tp_analise + '" ';
            qry = qry +   'AND hist_faturamento.DS_REGIAO = "' + ds_regiao + '" ';
            qry = qry + 'ORDER BY hist_faturamento.DS_CLI';
        }

        if (tp_consulta == 'cidades_svda90') {
            var qry = '';
            qry = qry + 'SELECT DISTINCT hist_faturamento.UF_CIDADE AS uf_cidade, max(HIST_AUX.anomes) AS ano_mes ';
            qry = qry + 'FROM hist_faturamento ';
            qry = qry + 'LEFT JOIN (SELECT hist_faturamento.CDEMPRESA AS empresa, ';
            qry = qry + '	               hist_faturamento.TP_ANALISE AS tpanalise, ';
            qry = qry + '                  hist_faturamento.DS_REGIAO AS regiao, ';
            qry = qry + '                  hist_faturamento.UF_CIDADE AS ufcidade, ';
            qry = qry + '                  hist_faturamento.DS_CLI AS cliente, ';
            qry = qry + '                  max(hist_faturamento.ANO_MES) AS anomes ';
            qry = qry + '		    FROM hist_faturamento ';
            qry = qry + '           GROUP BY hist_faturamento.CDEMPRESA, hist_faturamento.TP_ANALISE, ';
            qry = qry + '                    hist_faturamento.DS_REGIAO, hist_faturamento.UF_CIDADE, hist_faturamento.DS_CLI ';
            qry = qry + '		   ) AS HIST_AUX ';
            qry = qry + '  ON HIST_AUX.empresa = hist_faturamento.CDEMPRESA ';
            qry = qry + '    AND HIST_AUX.tpanalise = hist_faturamento.TP_ANALISE ';
            qry = qry + '    AND HIST_AUX.regiao = hist_faturamento.DS_REGIAO ';
            qry = qry + '    AND HIST_AUX.ufcidade = hist_faturamento.UF_CIDADE ';
            qry = qry + '    AND HIST_AUX.cliente = hist_faturamento.DS_CLI ';
            qry = qry + 'WHERE hist_faturamento.CDEMPRESA = "' + cdempresa + '" ';
            qry = qry + '  AND hist_faturamento.TP_ANALISE = "' + tp_analise + '" ';
            qry = qry + '  AND hist_faturamento.DS_REGIAO = "' + ds_regiao + '" ';
            qry = qry + '  AND HIST_AUX.anomes <= "' + anomes_fin + '" ';
            qry = qry + 'GROUP BY hist_faturamento.UF_CIDADE ';
            qry = qry + 'ORDER BY hist_faturamento.UF_CIDADE';
        }

        const hist_faturamento = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(hist_faturamento);
    },
    async index_clientes_05(req, res) { 

        //chave01:
        //  tp_consulta: vda90 => uf_cidade
        //  tp_consulta: cnpj  => cnpj

        const { cdempresa, tp_analise, ds_regiao, tp_consulta, chave01 } = req.params;

        var mes = new Date().getMonth() +1;
        var ano = new Date().getFullYear();

        if (mes > 4) {
          mes = mes - 4
          if (mes < 10) {mes = '0' + mes}
          var anomes_fin = ano.toString() + mes.toString()
        } else if (mes < 5) {
                 if (mes == 4) {mes = 12}
                 if (mes == 3) {mes = 11}
                 if (mes == 2) {mes = 10}
                 if (mes == 1) {mes = '09'}
                 ano = ano - 1
                 var anomes_fin = ano.toString() + mes.toString()
          }
  
        if (tp_consulta == 'svda90') {
          var qry = '';
          qry = qry + 'SELECT DISTINCT hist_faturamento.DS_CLI AS ds_cli, HIST_AUX.anomes AS ano_mes ';
          qry = qry + 'FROM hist_faturamento ';
          qry = qry + 'LEFT JOIN (SELECT hist_faturamento.CDEMPRESA AS empresa, ';
          qry = qry + '                  hist_faturamento.TP_ANALISE AS tpanalise, ';
          qry = qry + '                  hist_faturamento.DS_REGIAO AS regiao, ';
          qry = qry + '                  hist_faturamento.DS_CLI AS cliente, ';
          qry = qry + '                  max(hist_faturamento.ANO_MES) AS anomes ';
          qry = qry + '           FROM hist_faturamento ';
          qry = qry + '           GROUP BY hist_faturamento.CDEMPRESA, hist_faturamento.TP_ANALISE, ';
          qry = qry + '                    hist_faturamento.DS_REGIAO, hist_faturamento.DS_CLI ';
          qry = qry + '          ) AS HIST_AUX ';
          qry = qry + '  ON HIST_AUX.empresa = hist_faturamento.CDEMPRESA ';
          qry = qry + '    AND HIST_AUX.tpanalise = hist_faturamento.TP_ANALISE ';
          qry = qry + '    AND HIST_AUX.regiao = hist_faturamento.DS_REGIAO ';
          qry = qry + '    AND HIST_AUX.cliente = hist_faturamento.DS_CLI ';
          qry = qry + 'WHERE hist_faturamento.CDEMPRESA = "' + cdempresa + '" ';
          qry = qry +   'AND hist_faturamento.TP_ANALISE = "' + tp_analise + '" ';
          qry = qry +   'AND hist_faturamento.DS_REGIAO = "' + ds_regiao + '" ';
          qry = qry +   'AND hist_faturamento.UF_CIDADE = "' + chave01 + '" ';
          qry = qry +   'AND HIST_AUX.anomes <= "' + anomes_fin + '" ';
          qry = qry + 'ORDER BY HIST_AUX.anomes';
        }

        if (tp_consulta == 'cnpj') {
          var qry = '';
          qry = qry + 'SELECT hist_faturamento.ID AS id, hist_faturamento.CDEMPRESA AS cdempresa, ';
          qry = qry +   'hist_faturamento.TP_ANALISE AS tp_analise, hist_faturamento.DS_REGIAO AS ds_regiao, ';
          qry = qry +   'hist_faturamento.CNPJ AS cnpj,  hist_faturamento.DS_CLI AS ds_cli, ';
          qry = qry +   'hist_faturamento.UF_CIDADE AS uf_cidade, ';
          qry = qry +   'hist_faturamento.ANO_MES AS ano_mes, hist_faturamento.VLR_FATURAM AS vlr_faturam, ';
          qry = qry +   'hist_faturamento.DT_ANALISE AS dt_analise, hist_faturamento.HR_ANALISE AS hr_analise ';
          qry = qry + 'FROM hist_faturamento ';
          qry = qry + 'WHERE hist_faturamento.CDEMPRESA = "' + cdempresa + '" ';
          qry = qry +   'AND hist_faturamento.TP_ANALISE = "' + tp_analise + '" ';
          qry = qry +   'AND hist_faturamento.DS_REGIAO = "' + ds_regiao + '" ';    
          qry = qry +   'AND hist_faturamento.CNPJ = "' + chave01 + '" ';
          qry = qry + 'ORDER BY hist_faturamento.ANO_MES DESC';
        }

        const hist_faturamento = await connection.query( qry,
            { type: Sequelize.QueryTypes.SELECT }
            );

        return res.json(hist_faturamento);
    },

    async store(req, res) {
        const {
            cdempresa, tp_analise, ds_regiao, cnpj, ds_cli, uf_cidade, ano_mes, vlr_faturam, dt_analise, hr_analise
        } = req.body;

        const hist_faturamento = await Hist_faturamento.create({
            cdempresa, tp_analise, ds_regiao, cnpj, ds_cli, uf_cidade, ano_mes, vlr_faturam, dt_analise, hr_analise
        });

        return res.json(hist_faturamento);
    },
    async update(req, res) {
        const { hist_faturamento_id } = req.params;

        const {
            cdempresa, tp_analise, ds_regiao, cnpj, ds_cli, uf_cidade, ano_mes, vlr_faturam, dt_analise, hr_analise
        } = req.body;

        const hist_faturamento_aux = await Hist_faturamento.findByPk(hist_faturamento_id);
        if (!hist_faturamento_aux) {
            return res.status(400).json( { error: 'Hist faturam nao encontrado...' });
        }

        await Hist_faturamento.update({
            cdempresa, tp_analise, ds_regiao, cnpj, ds_cli, uf_cidade, ano_mes, vlr_faturam, dt_analise, hr_analise
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