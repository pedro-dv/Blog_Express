const express = require('express');
const router = express.Router();
const ModelCategories = require('./ModelCategories');
const slugify = require('slugify');

router.get('/admin/categories/new', (req, res)=>{
    res.render('admin/categories/new.ejs');
});

//85986330090

router.post('/categories/save', (req, res)=> {
    const title = req.body.title

    if (title != undefined){
        ModelCategories.create({
            title: title,
            slug: slugify(title)

        }).then(()=>{
            console.log('Categoria adicionada: ' + title)
            res.redirect('/');
        });

    }else{
        res.redirect('/admin/categories/new');
    }
});




router.get('/admin/categories', (req, res) =>{
    res.render('admin/categories/index')
})


module.exports = router;