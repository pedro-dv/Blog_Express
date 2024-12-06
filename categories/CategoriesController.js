const express = require('express');
const router = express.Router();
const ModelCategories = require('./ModelCategories');
const slugify = require('slugify');




router.get('/admin/categories/new', (req, res)=>{
    res.render('admin/categories/new.ejs');
});



router.post('/categories/save', (req, res)=> {
    const title = req.body.title

    if (title != undefined){
        ModelCategories.create({
            title: title,
            slug: slugify(title)

        }).then(()=>{
            console.log('Categoria adicionada: ' + title)
            res.redirect('/admin/categories/new');
        });

    }else{
        res.redirect('/admin/categories/new');
    }
});



router.get('/admin/categories', (req, res) =>{
    ModelCategories.findAll().then(categories =>{
         res.render('admin/categories/index', {categories: categories})
    })
   
})



router.post('/categories/remover', (req, res) => {
    const id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) { 
            ModelCategories.destroy({
                where: { id: id }
            }).then(() => {
                res.redirect('/admin/categories');
            });

        } else {  // NÃO FOR UM NÚMERO
            res.redirect('/admin/categories');
        }

    } else {  // NULL
        res.redirect('/admin/categories');
    }
});


router.get('/categories/edit/:id', (req, res) => {
    console.log('Rota de edição chamada com ID:', req.params.id);
    var id = req.params.id;
    if (isNaN(id)) {
        return res.redirect('/admin/categories');
    }

    ModelCategories.findByPk(id).then(category => {
        if (category != undefined) {
            res.render('admin/categories/edit', { category: category });
        } else {
            res.redirect('/admin/categories');
        }
    }).catch(erro => {
        console.error(erro);
        res.redirect('/admin/categories');
    });
});




router.post('/categories/update/:id', (req, res) => {
    var id = req.params.id;  // O ID vem da URL
    var title = req.body.title;

    if (isNaN(id) || !title) {
        return res.redirect('/admin/categories');
    }

    ModelCategories.update(
        { title: title,         // Atualiza o título e o slug
          slug: slugify(title) 
        },
                                 
        { where: { id: id } }  // Condição para atualizar o ID correto

    ).then(() => {
        res.redirect('/admin/categories');
    }).catch(erro => {
        console.error(erro);
        res.redirect('/admin/categories');
    });
});




module.exports = router;