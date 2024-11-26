const {Sequelize} = require('sequelize');
const connection = require('../database/connection');
const ModelCategories = require('../categories/ModelCategories');


const ModelArticles = connection.define('tb_Articles', {
    title:{
        type: Sequelize.STRING,allowNull: false
    },
    slug:{
        type: Sequelize.STRING, allowNull: false
    }, 
    body:{
        type: Sequelize.TEXT, allowNull: false
    }
})

ModelArticles.belongsTo(ModelCategories)  // um article Pertence a uma categorie
ModelCategories.hasMany(ModelArticles) // One categorie has Very articles

// { force: true }: Apaga e recria a tabela, perdendo os dados existentes. Use com cuidado.
//{ alter: true }: Atualiza a estrutura da tabela sem perder os dados.


ModelArticles.sync({ alter: true })
.then(()=> console.log('Tabela tb_Articles sicronizada com sucesso!'))
.catch( err => console.error(err))

module.exports = ModelArticles;