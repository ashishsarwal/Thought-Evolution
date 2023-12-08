const express = require('express');
const router = express.Router();
const con  = require('../config/connection');

router.get('/', (req,res) => {

    con.connect(function(err){
        if(err) console.log(err); 
        //console.log('Connected...');
        con.query(`select *
                   from blog;`
    , function (err, result, fields) {
            if (err) throw err;
            res.send(result);
            res.end();
          });
    });
});

router.get('/:id',(req,res) =>{
    con.connect(function(err){
        if(err) console.log(err); 
        //console.log('Connected...');
        con.query(`select *
                   from blog
                   where blog.Id = ${req.params.id};`
    , function (err, result, fields) {
            if (err) throw err;
            res.send(result);
            res.end();
          });
        });
});



router.post('/',(req,res) => {
    // log body to console
    console.log(req.body);
    // insert blog into the table
    con.connect(function(err){
        if(err) console.log(err)
        con.query(`select 1
                   from   blog
                   where  blog.Title like '%${req.body.Title}%';`
        ,function(err,result,feilds){
            if (err) throw err;
            if(result.length > 0){
                con.connect(function(err){
                    if(err) console.log(err); 
                    //console.log('Connected...');
                    con.query(`UPDATE blog
                               SET    blog.title = ${req.body.Title}
                               ,      blog.description = ${req.body.Description}
                               ,      blog.content = ${req.body.Content}
                               ,      blog.isActive = ${req.body.IsActive}
                               ,      blog.updatedBy = ${req.body.UpdatedBy}
                               ,      blog.updatedOn = ${req.body.UpdatedOn};`
                , function (err, result, fields) {
                        if (err) throw err;
                        res.status(200).send('blog created succesfully!');
                        res.end();
                        });

                });
            }
            else{
                con.connect(function(err){
                    if(err) console.log(err); 
                    //console.log('Connected...');
                    con.query(`INSERT INTO blog
                                (Id,
                                Title,
                                Description,
                                Content,
                                IsActive,
                                CreatedBy,
                                CreatedOn,
                                UpdatedBy,
                                UpdatedOn)
                                VALUES
                                (NULL,
                                ${req.body.Title},
                                ${req.body.Description},
                                ${req.body.Content},
                                ${req.body.IsActive},
                                NULL,
                                current_date(),
                                NULL,
                                current_date());`
                , function (err, result, fields) {
                        if (err) throw err;
                        res.status(200).send('blog created succesfully!');
                        res.end();
                        });

                });
            }
        })
    })
});

module.exports = router;
