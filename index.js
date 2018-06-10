const hbs = require('express-handlebars');
const paypal = require('paypal-rest-sdk');
const https = require('https');
const fs = require('fs');
const express = require('express');

const credentials = {
  key: fs.readFileSync('./self-signed/client-key.pem'),
  cert: fs.readFileSync('./self-signed/client-cert.pem')
};

const app = express();
//app.listen(3000, () => console.log('Server started'));

// Create HTTPS server with credentials and express middleware
https.createServer(credentials, app).listen(443);


//Import SDK
var sdk = require('./sdk.js');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AURg6NmIC2HFvKhFt-ov9oEaeDZWKj_o23sOg67rUKOwr51md1oTuny-AH3tu5HebLg2jCSCh6a-uHqD',
  'client_secret': 'EIhUT1ssc9YxvHevYmb0tv-o7V4fiisClKDHSljBcIulqCveWLR9xgfcd_TEP-xa2-m2_3QgHKVME1Mh'
});


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

// Route for invoice creation
app.get('/invoice_create', (req, res) => {
  sdk.invoiceCreate();
});

// Webhook Callback
const WEBHOOK_ID = '37J13431BX100203Y';

// Webhook Listeners
// Miust be defined here first to be registered on the paypal developer dashboard
app.post('/callback', (req, res) => { 
  console.log(JSON.stringify(req));
  console.log(res);
});

app.post('/webhook_listener', (req, res) => { 
  console.log(req);
  console.log(res);
});
