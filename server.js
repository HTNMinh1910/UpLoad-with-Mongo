const express = require('express')

//import { engine } from 'express-handlebars';
const expressHbs = require('express-handlebars');

const app = express()

const mongoose = require('mongoose');
const uri = 'mongodb+srv://minh:<password>@atlascluster.2ul3dwj.mongodb.net/list?retryWrites=true&w=majority';

const labModel = require('./labModel');

app.get('/lab', async (req, res) => {
  await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

  try {
    const labs = await labModel.find({tailieu: 2});

    // labModel.updateMany();
    // labModel.updateOne({ten: 'Lab 3'}, {ten: 'Lab 3 - 2023'})
    // labModel.deleteMany({ten: 'Lab 4'});
    // labModel.deleteOne({ten: 'Lab 4'});


    console.log(labs.toString());
    res.send(labs);
  } catch (err) {
    console.log(err);
  }
});

app.get('/add_lab', async (req, res) => {
  await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

  let lab = new labModel ({
    tieude : 'lab 7',
    url: 'linktailieu.com'
    //tailieu: 2
  });

  //lab.tailieu = 2;


  try {
    let kq = await lab.save();

    console.log(kq);

    let labs = await labModel.find();
    res.send(labs);

  } catch (err) {
    console.log(err);
  }
});

//app.engine('.hbs', ExpressHandlebars());
app.engine('.hbs', expressHbs.engine({ 
  extname: "hbs", 
  defaultLayout: 'main', 
  layoutsDir: "views/layouts/" }));

//app.engine( "hbs", engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/", }) );

app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home', {
    layout: 'main',
    //showContentMaytinh: false,

    helpers: {
      foo() { return 'foo. CP17305 - server Android'; }
    }
  });
});

app.get('/maytinh', (req, res) => {
  res.render('emptyView', {
    layout: 'main', 
    showContentMaytinh: true,
    soA: 15,
    soB: 7,
    phepTinh: 'cong',
    kq: 22,

  });
});


const port = 8000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
