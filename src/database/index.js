const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Empresa = require('../models/Empresa');
const Item = require('../models/Item');
const Grpitem = require('../models/Grpitem');
const Analise_vdas = require('../models/Analise_vdas');
const Analise_pedpend = require('../models/Analise_pedpend');
const Tp_analises = require('../models/Tp_analises');
const Analise_clientes = require('../models/Analise_clientes');
const Vdas_detalhe = require('../models/Vdas_detalhe');
const Hist_faturamento = require('../models/Hist_faturamento');
const Perform_repr = require('../models/Perform_repr');

const connection = new Sequelize(dbConfig);

Empresa.init(connection);
Item.init(connection);
Grpitem.init(connection);
Analise_vdas.init(connection);
Analise_pedpend.init(connection);
Tp_analises.init(connection);
Analise_clientes.init(connection);
Vdas_detalhe.init(connection);
Hist_faturamento.init(connection);
Perform_repr.init(connection);

module.exports = connection;