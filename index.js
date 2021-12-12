const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
var cors = require('cors'); //gerard
const moment =require('moment');
const PORT = process.env.PORT || 5000;



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'employee'
});
connection.connect();

const logger = (req, res, next) =>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`);   //=> kung https protocol http   //template litterals
next();
//original url ng nirerequest nya
//host ng address ng nagrerequest ng data ... ip address return
//for salak sa privellage kung allow syang kumuha ng data sa api natin

}
app.use(logger);
app.use(cors()); //required
app.use(express.json()); //middleware
app.use(express.urlencoded({extended: false}));


/*
app.get('/api/members/:id',(req, res)=> {
   //app.get('/api/members/:id',(req, res)=> {
    var id = req.params.id;
//res.send(id);
     connection.query(`SELECT * FROM userdata WHERE id = '${id}'`,(err, rows, fields)=>{
      if(err) throw err
        if(rows.length > 0){
            res.json(rows);
        }else{
            res.status(400).json({msg: `No user with the id of ${id}`});
        }

 
  });
*/

//details

app.get('/api/members/:id',(req, res)=> {

    var id = req.params.id;
    
    connection
    .query(`SELECT * FROM userdata WHERE id = '${id}'`,(err, rows, fields) => {
 
      if(err) throw err

      if(rows.length > 0){
        res.json(rows);
      }else{
          res.status(400).json({msg: `No user with an id of ${id}`});
      }

      
 
    });
 
 });

app.get('/api/members',(req, res)=> {
      connection.query(`SELECT * FROM userdata`,(err, rows, fields)=>{
       if(err) throw err
        
             res.json(rows);
    
         });
 
  


   // res.send("<h1>Hello Gerards</h1>");



});

app.post('/api/members', (req, res)=> {
        var fname = req.body.fname;
        var lname = req.body.lname;
        var email = req.body.lname;
        var gender = req.body.gender;


        //additional lang eto sa fetch apo
      /////  console.log(req.body);
/* ccomment muna this*/
        connection.query(`INSERT INTO userdata (first_name, last_name, email, gender)VALUES('${fname}','${lname}','${email}','${gender}')`,(err, rows, fields)=>{
            if(err) throw err
          
                  res.json({msg: `1 row inserted`});
         
      
       
        });



});
//update user
app.put('/api/members', (req, res)=> {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.lname;
    var gender = req.body.gender;
var id = req.body.id;
    connection
    .query(`UPDATE userdata SET first_name = '${fname}', last_name = '${lname}', email ='${email}', gender = '${gender}' WHERE id ='${id}'`,(err, rows, fields)=>{
        if(err) throw err
        res.json({msg: `was Updated Successfully`});

    });



});
//delete user
app.delete('/api/members',(req, res)=>{

    var id = req.body.id;
    connection
    .query(`DELETE FROM userdata WHERE id ='${id}'`,(err, rows, fields)=>{
        if(err) throw err
        res.json({msg: `data was deleted  Successfully`});
    });

});

app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, ()=> {
    console.log(`Server is started in port ${PORT}`);  // add template literals
})
