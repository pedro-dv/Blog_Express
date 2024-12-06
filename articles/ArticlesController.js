const express = require('express');
const router = express.Router();
const ModelCategories = require('../categories/ModelCategories.js');
const Article = require('./ModelArticles');
const slugify = require('slugify');
const ModelArticles = require('./ModelArticles');



router.get('/admin/articles', (req, res)=>{
    Article.findAll({
        include: [{model: ModelCategories, 
            required: false // Permite artigos sem categoria associada 
        }]
    }).then(articles =>{
        //console.log(JSON.stringify(articles, null, 2))
        res.render('admin/articles/index.ejs', { articles: articles });
    }) .catch(err => {
        console.error(err);
        res.status(500).send('Erro ao buscar artigos.');
    });
    
});

router.get('/admin/articles/new', (req, res)=>{
    ModelCategories.findAll()
    .then(categories => {
         res.render('admin/articles/new.ejs', {categories: categories});
    }).catch(err => {
        console.error(err);
        res.status(500).send("Erro ao carregar as categorias");
    });
   
});

router.post('/articles/save', (req, res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var categoryId = req.body.category

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: categoryId
    }).then(()=>{
        res.redirect("/admin/articles")
    }).catch(err => {
        console.error(err);
        res.status(500).send("Erro ao salvar artigo");
    });
});


router.post('/articles/remover', (req, res) => {
    const id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) { 
            ModelArticles.destroy({
                where: { id: id }
            }).then(() => {
                res.redirect('/admin/articles');
            });

        } else {  // NÃO FOR UM NÚMERO
            res.redirect('/admin/articles');
        }

    } else {  // NULL
        res.redirect('/admin/articles');
    }
});

module.exports = router;