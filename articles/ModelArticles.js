const { Sequelize } = require('sequelize');
const connection = require('../database/connection');
const ModelCategories = require('../categories/ModelCategories');

const ModelArticles = connection.define('tb_Articles', {
    title: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING, 
        allowNull: false
    }, 
    body: {
        type: Sequelize.TEXT, 
        allowNull: false
    },
    categoryId: {  // Adicionando explicitamente o campo categoryId
        type: Sequelize.INTEGER, 
        allowNull: true, // Pode ser null caso o artigo não tenha categoria
        references: {
            model: ModelCategories,  // Fazendo referência ao modelo de categorias
            key: 'id'  // Coluna de referência no modelo de categorias
        }
    }
});

// Relacionamento entre as tabelas
ModelArticles.belongsTo(ModelCategories, { foreignKey: 'categoryId' }); // Cada artigo pertence a uma categoria
ModelCategories.hasMany(ModelArticles, { foreignKey: 'categoryId' }); // Uma categoria pode ter vários artigos

// Sincronizar o modelo
ModelArticles.sync({ alter: true })
.then(() => console.log('Tabela tb_Articles sincronizada com sucesso!'))
.catch(err => console.error(err));

module.exports = ModelArticles;
