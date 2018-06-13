const hbs = require('express-handlebars');
const paypal = require('paypal-rest-sdk');
const https = require('https');
const fs = require('fs');
const express = require('express');
const request = require('request');

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
  sdk.invoiceCreate(res);
});


// Webhook Listeners
// Must be defined here first to be registered on the paypal developer dashboard
// Can have multiple callbacks for handiling different events
app.post('/callback', (req, res) => {
    res.send('POST request to the callback');
  });

app.post('/webhook_listener', (req, res) => {
    res.send('POST request to the WH_Listener');
    
    switch (event_type){
        case "BILLING.PLAN.CREATED":
            console.log("Billing Plan Created");
            break;
        case "BILLING.PLAN.UPDATED":
            console.log("BILLING PLAN UPDATED");
            break;
        case "BILLING.SUBSCRIPTION.CANCELLED":
            console.log("SUBSCRIPTION CANCELLED");
            break;
        case "BILLING.SUBSCRIPTION.CREATED":
            console.log("SUBSCRIPTION CREATED");
            break;
        case "BILLING.SUBSCRIPTION.RE-ACTIVATED":
            console.log("SUBSCRIPTION RE-ACTIVATED");
            break;
        case "BILLING.SUBSCRIPTION.SUSPENDED":
            console.log("SUBSCRIPTION SUSPENDED");
            break;
        case "BILLING.SUBSCRIPTION.UPDATED":
            console.log("SUBSCRIPTION UPDATED");
            break;
        case "PAYMENT.AUTHORIZATION.CREATED":
            // Handle payment AUTH CREATED
            console.log('Payment Authorization Created');
            break;
        case "PAYMENT.AUTHORIZATION.VOIDED":
            // Handle payment AUTH VOIDED
            console.log('Payment Authorization Voided');
            break;
        case "INVOICING.INVOICE.CANCELLED":
            console.log("INVOICE CANCELLED");
            break;
        case "INVOICING.INVOICE.CREATED":
            console.log("INVOICE CREATED");
            break;
        case "INVOICING.INVOICE.REFUNDED":
            console.log("INVOICE REFUNDED");
            break;
        case "INVOICING.INVOICE.SCHEDULED":
            console.log("INVOICE SCHEDULED");
            break;
        case "INVOICING.INVOICE.UPDATED":
            console.log("INVOICE UPDATED");
            break;
        case "INVOICING.INVOICE.PAID":
            console.log("INVOICE PAID");
            break;
            // Handle other webhooks
        default:
            console.log('break handled');
            break;
    };
    next();

  });