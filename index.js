const mysql = require('mysql2');
const express = require('express')
const status = require('express-status-monitor')
// const methodOverride = require('method-override')
// const path = require('path')
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: '97Mmodi@'
  });

const app = express()
// app.use('_method?')
app.use(status())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')

app.get('/client',(req,res)=>{
    let q = `select * from user`
    try{
        connection.query(q,(err,result)=>{
            if (err) throw err;
            res.render('index',{result})
        })
    
    }catch(err){
        console.log(err)
    }
    
    // res.send("welcome to home page")
})
app.get('/client/:id',(req,res)=>{
    const {id} = req.params
    let q = `select id, username, email from user where id ='${id}'`
    try{
            connection.query(q,(err,result)=>{
            if(err) throw err;
            res.render('details',{result})
        })
        }catch (err){
            console.log(err)
        }
})
app.get('/client/:id/edit',(req,res)=>{
    const {id} = req.params
    let q = `select id, username, email from user where id ='${id}'`
    try{
            connection.query(q,(err,result)=>{
            if(err) throw err;
            // console.log(result[0].id)
            res.render('edit',{result})
        })
        }catch (err){
            console.log(err)
        }
})
app.post('/client/:id/username',(req,res)=>{
    const{newName,password} =req.body;
    const {id} = req.params
       const q =`UPDATE user SET username = '${newName}' WHERE id ='${id}' AND password='${password}' `;
       try{
        
           connection.query(q,(err,result)=>{

            if (err) throw err;
            
            // console.log(result)
            // res.redirect('/client')
        })
       }catch (err){
        res.send("wrong password")
       }
})
app.post('/client/:id/email',(req,res)=>{
   const{newEmail,password} =req.body;
   const {id} = req.params
   const q =`UPDATE user SET email = '${newEmail}' WHERE id ='${id}' AND password='${password}' `;
   try{
       connection.query(q,(err,result)=>{
        if (err) throw err;
        // console.log(result)
        res.redirect('/client')

    })
   }catch (err){
    console.log(err)
   }
  
})
app.post('/client/search',(req,res)=>{
    const{username} = req.body;
    const q = `select id,username,email from user where username LIKE'%${username}%' OR email LIKE '%${username}%'`;
    try{
        connection.query(q,(err,result)=>{
            // console.log(result)
            if (err) throw err;
            res.render('search',{result})
        })

    } catch(err){
        console.log(err);
    }
})

app.listen(port,()=>{
    console.log(`app is running at port:${port}`)
})