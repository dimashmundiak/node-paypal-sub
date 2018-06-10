const paypal = require('paypal-rest-sdk');
const url = require('url');
const billing_plans = require('./objects_json/billingCreate.js');
const billing_agreement = require('./objects_json/billingAgreementCreate.js');
const invoice_json = require('./objects_json/invoiceCreate.js');
const webhook_json = require('./objects_json/webhookCreate.js');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AURg6NmIC2HFvKhFt-ov9oEaeDZWKj_o23sOg67rUKOwr51md1oTuny-AH3tu5HebLg2jCSCh6a-uHqD',
  'client_secret': 'EIhUT1ssc9YxvHevYmb0tv-o7V4fiisClKDHSljBcIulqCveWLR9xgfcd_TEP-xa2-m2_3QgHKVME1Mh'
});

module.exports =  {
  // Create Sample Monthly Billing Plan with Trial Period
  createMonthlyPlan: function(res){
    return paypal.billingPlan.create(billing_plans.billingPlanMonthly, (err, billingPlan) => {
        if (err) throw err;
        else {
            // console.log(billingPlan);
            this.billingPlanUpdate(billingPlan.id, res);
        }
    });
  },

  // Create Sample Yearly Plan with Trial Period
  createYearlyPlan: function(res){
    return paypal.billingPlan.create(billing_plans.billingPlanYearly, (err, billingPlan) => {
        if (err) throw err;
        else {
            //console.log(billingPlan);
            this.billingPlanUpdate(billingPlan.id, res);
        }
    }); 
  },

  // Update the Billing plan to active
  // because default state is just 'creaeted'
  billingPlanUpdate: function(billingPlanId, res){
    let billing_plan_update_attributes = [
      {
        "op": "replace",
        "path": "/",
        "value": {"state": "ACTIVE"}
      }
    ];

    //get the billing plan that is to be changed
    return paypal.billingPlan.get(billingPlanId, (error, billingPlan) => {
      if (error) throw error;
      else {
          console.log("Get Current Billing Plan");
          // console.log(JSON.stringify(billingPlan));

          // Activate the plan by changing status to Active
          paypal.billingPlan.update(billingPlanId, billing_plan_update_attributes, (error, response) => {
              if (error) {
                  console.log(error.response);
                  throw error;
              } else {
                  // alert
                  console.log('Your plan has been activated');

                  let billingAgreementAttributes = billing_agreement(billingPlanId);
                  this.billingAgreementCreate(billingAgreementAttributes, res);
              }
          }); // end billing plan update
      }
    }); // billing plan get
  },

  // Need billing agreement between you and user
  billingAgreementCreate: function(billingAgreementAttributes, res){
      // Use activated billing plan to create agreement
      return paypal.billingAgreement.create(billingAgreementAttributes, (error, billingAgreement) => {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Create Billing Agreement Response");

            // get approval URL for customer to pay
            for (let i = 0; i < billingAgreement.links.length; i++) {
                if (billingAgreement.links[i].rel === 'approval_url') {
                    let approval_url = billingAgreement.links[i].href;

                    // getting payment token
                    let token = url.parse(approval_url, true).query.token;
                    console.log("Payment token is" + token);

                    // Redirecting to subscriber URL
                    console.log("Redirecting to approval URL");
                    res.redirect(approval_url);

                    // See billing_agreements/execute.js to see example for executing agreement 
                    // after you have payment token
                    this.billingExecuteAgreement(token);
                }
            }
        }
      }); // emd billing agreement creation
  },

  // Execute billing agreement so user can approve
  billingExecuteAgreement: function(paymentToken){
    //Retrieve payment token appended as a parameter to the redirect_url specified in
    //billing plan was created. It could also be saved in the user session
    paypal.billingAgreement.execute(paymentToken, {}, function (error, billingAgreement) {
        if (error) {
            console.log(error);
            throw error;
        } else {
            console.log("Billing Agreement Execute Response");
            console.log(billingAgreement);
        }
    });
  },

  // Create Invoice
  invoiceCreate: function(){
    // alias the invoiceSend() from the module.exports to avoid scope problems
    let invoiceSend = this.invoiceSend;
    return paypal.invoice.create(invoice_json, function (error, invoice) {
        if (error) {
          console.log(error.response);
          throw error;
        }
        else {
            console.log("Create Invoice Response");
            console.log(invoice);
            // Send invoice.id to tell PayPal to send invoice to user
            invoiceSend(invoice.id);
        }
    });
  },

  // Send Invoice
  invoiceSend: function(invoiceId){
    return paypal.invoice.send(invoiceId, function (error, rv) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Send Invoice Response");
            console.log(rv);
            // TODO Response
        }
    });
  },

  // Webhook Get/Search
  webhookGet: function(){}

};