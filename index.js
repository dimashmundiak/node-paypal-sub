const hbs = require('express-handlebars');
const paypal = require('paypal-rest-sdk');
const https = require('https');
const fs = require('fs');
const express = require('express');

const credentials = {
    key: fs.readFileSync('./self-signed/client-key.pem'),
    cert: fs.readFileSync('./self-signed/client-cert.pem')
};

const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server started'));

// Create HTTPS server with credentials and express middleware

// https.createServer(credentials, app).listen(port, () => console.log(`Server started. Port: ${port}`));


//Import SDK
var sdk = require('./sdk.js');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AT2nUcKO6rgoHXvHe0zLoN__jvpc2eLtkYv8xVXGQUbfV8cPFMbR-60tvhTPI7EZTKyoZu7bQM0PxZvY',
    'client_secret': 'EGqA-hhoh48OTswtbwaqYTI6jT1yUAHPbnntn8XYC2JfewMIewI9bdr2thQvzcUZ8y9LAQXs0Y2_xS-x'
});


// view engine setup
// creates a new app engine for express handlebar support
app.engine('.hbs', hbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');

// routes
app.get('/', (req, res) => res.render('index'));

// Route to subscribe to
app.get('/subscribe/:type', (req, res) => {
    let type = req.params.type;
    if (type == 'monthly') sdk.createMonthlyPlan(res);
    else if (type == 'yearly') sdk.createYearlyPlan(res);
});

// Route to go to if subscription Successful
app.get('/billing/success', (req, res) => {
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

app.get('/plans', (req, res) => {

    var list_billing_plan = {
        'status': 'ACTIVE',
        'page_size': 5,
        'page': 1,
        'total_required': 'yes'
    };

    paypal.billingPlan.list(list_billing_plan, function (error, billingPlan) {
        if (error) {
            throw error;
        } else {
            console.log("List Billing Plans Response");
            console.log(billingPlan);

            res.json(billingPlan);
        }
    });
});

app.post('/webhook', (req, res) => {
    console.log(req.body);

    res.send(req.body);
})
