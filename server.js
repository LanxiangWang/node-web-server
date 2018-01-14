const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');



// middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} URI: ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintain.hbs');
// });

app.use(express.static(__dirname + '/public'));

// Helper functions 
hbs.registerHelper('getCurrYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});




app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/', (req, res) => {
  res.render('index.hbs', {
    welcomeMessage: 'Hello!',
    pageTitle: 'Welcome!'
  });
})

console.log("End of Code");

// console.log('Start');

// app.use((req, res, next) => {
//   console.log('This is app.use: ');
//   console.log(req.path);
//   console.log('----------------');
//   next();
// });

// app.get('/', (req, res, next) => {
//   console.log(req.path);
//   next('route');
// }, (req, res, next) => {
//   console.log('This should not be shown.');
// });

// app.get('/', (req, res) => {
//   console.log('This is app.get, which is a route handler: ');
//   res.send('<h1> Hello World! </h>');
// });

// app.get('/bad', (req, res) => {
//   res.send({
//     errorMessage: 'Ops, something wrong.'
//   });
// });



app.listen(3000);