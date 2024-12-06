const {Sequelize} = require('sequelize');
const connection = require('../database/connection')


const ModelCategories = connection.define('tb_categories', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
     slug:{
        type: Sequelize.STRING,
        allowNull: false
    }

})

ModelCategories.sync()
    .then(() => console.log('Tabela tb_categories sincronizada com sucesso!'))
    .catch(err => console.error('Erro ao sincronizar a tabela:', err));


module.exports = ModelCategories;