const path = require('path');
const mysql = require('mysql');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();
const conn = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'marcos'
})

conn.connect((err) => {
  if (err) throw err;
  console.log('Database Connected');
})


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/employes', (req, res) => {
  let sql = `select * from employes`;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
    // res.render('employes', {
    //   results,
    //   msg: "marcos alanya"
    // });
  });
});

//route untuk insert data
app.post('/save', (req, res) => {
  let data = { product_name: req.body.product_name, product_price: req.body.product_price };
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

//route untuk update data
app.post('/update', (req, res) => {
  let sql = "UPDATE product SET product_name='" + req.body.product_name + "', product_price='" + req.body.product_price + "' WHERE product_id=" + req.body.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

//route untuk delete data
app.post('/delete', (req, res) => {
  let sql = "DELETE FROM product WHERE product_id=" + req.body.product_id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/');
  });
});

//server listening
app.listen(3000, () => {
  console.log('Server is running at port 3000');
});