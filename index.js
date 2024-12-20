const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const connection = require('./database/connection.js');

const ArticlesController = require('./articles/ArticlesController.js')
const CategoriesController = require('./categories/CategoriesController.js')


const ModelArticles = require('./articles/ModelArticles.js');
const ModelCategories = require('./categories/ModelCategories.js');



// View engine
app.set('view engine', 'ejs');
// Body Parser aceitar dados de formulario
app.use(bodyParser.urlencoded({extended: false}));
// body Parser aceitar do tipo JSON
app.use(bodyParser.json());
// Arquivos Staticos
app.use(express.static('public'));



// Conection in database
connection
.authenticate()
.then(()=>{
    console.log('Conexaõ feita com sucesso!');
}).catch( err =>{
    console.log(err);
})




// Trazendo Rota do ArticlesController
app.use('/', ArticlesController);

// Trazendo Rota do CategoriesController
app.use('/', CategoriesController);



app.get('/', (req, res)=> {
    ModelArticles.findAll({order: [['id', 'DESC']]})
    .then((articles)=> {
        ModelCategories.findAll()
        .then(categories=>{
            res.render('index', {articles: articles, categories: categories});
        })
        
    })
   
});



app.get('/:slug', (req, res)=>{
    var slug = req.params.slug;
    ModelArticles.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined){
            ModelCategories.findAll()
            .then(categories=>{
                res.render('articles.ejs', {article: article, categories: categories});
            })

        }else{
            res.redirect('/');
        }
    }).catch(err =>{
        res.redirect('/');
    });
    
});









app.listen(4000, (err) => {
    if(err){
         console.log('Erro ao Processar!')
    }else{
         console.log('Servidor rodando com sucesso!')
    }
});
       

