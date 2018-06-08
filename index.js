const express = require('express');
const hbs = require('express-handlebars');
const paypal = require('paypal-rest-sdk');
// const billing_plans = require('./objects_json/billingcreate.js');

//Import SDK
var sdk = require('./sdk.js');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AURg6NmIC2HFvKhFt-ov9oEaeDZWKj_o23sOg67rUKOwr51md1oTuny-AH3tu5HebLg2jCSCh6a-uHqD',
  'client_secret': 'EIhUT1ssc9YxvHevYmb0tv-o7V4fiisClKDHSljBcIulqCveWLR9xgfcd_TEP-xa2-m2_3QgHKVME1Mh'
});

const app = express();
app.listen(3000, () => console.log('Server started'));



// view engine setup
// creates a new app engine for express handlebar support
app.engine('.hbs', hbs({defaultLayout: 'layout', extname: '.hbs'})) ;
app.set('view engine', '.hbs');

// routes
app.get('/', (req, res) => res.render('index'));

// Route to subscribe to
app.get('/subscribe/:type', (req, res) => {
  let type = req.params.type;
  if(type == 'monthly') sdk.createMonthlyPlan(res);
  else if(type == 'yearly') sdk.createYearlyPlan(res);
});

// Route to go to if subscription Successful
app.get('/billing/success', (req, res) =>{
  let token = req.query.token;
  sdk.billingExecuteAgreement(token);

  res.send('Subscription Successful');
});
  
// Route to go to if Subscription Failed
app.get('/billing/cancel', (req, res) => res.send('Subscription Failed'));
