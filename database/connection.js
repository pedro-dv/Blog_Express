const { Sequelize } = require('sequelize');

const connection = new Sequelize('Blog_db', 'root', 'L1nux2906*', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: console.log  mostrar as query SQL no console
    logging: false, // Desativa logs detalhados
    sync: { force: false } // Evita alterações automáticas
})

module.exports = connection