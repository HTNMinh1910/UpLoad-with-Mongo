// const express = require('express')
// //import { engine } from 'express-handlebars';
// const expressHbs = require('express-handlebars');
// const app = express()
// const mongoose = require('mongoose');
// const uri = 'mongodb+srv://minh:vMExZqKigeWnxbVO@atlascluster.2ul3dwj.mongodb.net/list?retryWrites=true&w=majority';
// const labModel = require('./labModel');

// app.get('/', async (req, res) => {
//   await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

//   try {
//     const lab = await labModel.find();

//     // labModel.updateMany();
//     // labModel.updateOne({ten: 'Lab 3'}, {ten: 'Lab 3 - 2023'})
//     // labModel.deleteMany({ten: 'Lab 4'});
//     // labModel.deleteOne({ten: 'Lab 4'});


//     console.log(lab.toString());
//     res.send(lab);
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get('/add_lab', async (req, res) => {
//   await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

//   let lab = new labModel ({
//     tieude : 'lab 7',
//     url: 'linktailieu.com',
//     tailieu: 2
//   });


//   try {
//     let kq = await lab.save();

//     console.log(kq);

//     let labs = await labModel.find();
//     res.send(labs);

//   } catch (err) {
//     console.log(err);
//   }
// });

// app.engine('.hbs', expressHbs.engine({ 
//   extname: "hbs", 
//   defaultLayout: 'main', 
//   layoutsDir: "views/layouts/" }));
// app.set('view engine', '.hbs');
// app.set('views', './views');

// // app.get('/', (req, res) => {
// //   res.render('home', {
// //     layout: 'main',
// //     //showContentMaytinh: false,

// //     helpers: {
// //       foo() { return 'foo. CP17305 - server Android'; }
// //     }
// //   });
// // });

// app.get('/maytinh', (req, res) => {
//   res.render('emptyView', {
//     layout: 'main', 
//     showContentMaytinh: true,
//     soA: 15,
//     soB: 7,
//     phepTinh: 'cong',
//     kq: 22,

//   });
// });


// const port = 8000

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



// Part 2 mongoDB example
const express = require('express')
const app = express()
const expressHbs = require('express-handlebars')
const body = require('body-parser')
const method_override = require("method-override")
const path = require('path')
const port = 3000
const StaffModel = require('./StaffModel')
const db = require('./db')

db.connect()
app.use(method_override("_method"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('.hbs', expressHbs.engine({ 
    extname: "hbs", 
    defaultLayout: 'main', 
    layoutsDir: "views/layouts/",
    helpers: {
        sum: (a, b) => a + b
      }}));
  app.set('view engine', '.hbs');
  app.set('views', path.join(__dirname +'/views'));

app.get('/', (req, res, next) => {
    StaffModel.find({}).then(data => {
        data = data.map(data=>data.toObject());
        res.render('listNV', {data})
        console.log(data);
    }).catch(next)
})

app.delete('/delete/:id', (req, res, next) => {
    StaffModel.deleteOne({_id: req.params.id}).then(() => {
        res.redirect('/')
    }).catch(next)
})

app.put('/edit/:id', (req, res, next) => {
    StaffModel.updateOne({_id: req.params.id}, req.body).then(() => {
        res.redirect('/')
    }).catch(next)
})

app.get('/:id', (req, res, next) => {
    StaffModel.findById({_id: req.params.id}).then(edit => {
        // edit = edit.map(edit =>edit.toObject())
        edit = edit ? edit.toObject() : edit
        console.log(edit);
        res.redirect('listNV',{edit})
    }).catch(next)
})

app.post('/add_nv', (req, res, next) => {
    let new_staff = new StaffModel(req.body)
    console.log(new_staff)
    new_staff.save().then(()=>{
        res.redirect('/')
    }).catch(next)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
