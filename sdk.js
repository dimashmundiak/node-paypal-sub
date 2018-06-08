const paypal = require('paypal-rest-sdk');
const url = require('url');
const billing_plans = require('./objects_json/billingcreate.js');
const billing_agreement = require('./objects_json/billingAgreementCreate.js');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AURg6NmIC2HFvKhFt-ov9oEaeDZWKj_o23sOg67rUKOwr51md1oTuny-AH3tu5HebLg2jCSCh6a-uHqD',
  'client_secret': 'EIhUT1ssc9YxvHevYmb0tv-o7V4fiisClKDHSljBcIulqCveWLR9xgfcd_TEP-xa2-m2_3QgHKVME1Mh'
});

module.exports =  {
  createMonthlyPlan: function(res){
    return paypal.billingPlan.create(billing_plans.billingPlanMonthly, (err, billingPlan) => {
        if (err) throw err;
        else {
            console.log(billingPlan);
            this.billingPlanUpdate(billingPlan.id, res);
        }
    });
  },

  createYearlyPlan: function(res){
    return paypal.billingPlan.create(billing_plans.billingPlanYearly, (err, billingPlan) => {
        if (err) throw err;
        else {
            console.log(billingPlan);
            this.billingPlanUpdate(billingPlan.id, res);
        }
    }); 
  },

  billingPlanUpdate: function(billingPlanId, res){
    let billing_plan_update_attributes = [
      {
        "op": "replace",
        "path": "/",
        "value": {
          "state": "ACTIVE"
        }
      }
    ];

    //get the billing plan that is to be changed
    return paypal.billingPlan.get(billingPlanId, (error, billingPlan) => {
      if (error) throw error;
      else {
          console.log("Get Billing Plan");
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

  billingAgreementCreate: function(billingAgreementAttributes, res){
      // Use activated billing plan to create agreement
      return paypal.billingAgreement.create(billingAgreementAttributes, (error, billingAgreement) => {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Create Billing Agreement Response");
            //console.log(billingAgreement);
            for (var i = 0; i < billingAgreement.links.length; i++) {
                if (billingAgreement.links[i].rel === 'approval_url') {
                    var approval_url = billingAgreement.links[i].href;
                    console.log("Payment token is");
                    console.log(url.parse(approval_url, true).query.token);

                    console.log("Redirect to approval URL");
                    res.redirect(approval_url);

                    // See billing_agreements/execute.js to see example for executing agreement 
                    // after you have payment token
                }
            }
        }
      }); // emd billing agreement creation
  },

  billingExecuteAgreement: function(paymentToken){
    //Retrieve payment token appended as a parameter to the redirect_url specified in
    //billing plan was created. It could also be saved in the user session
    paypal.billingAgreement.execute(paymentToken, {}, function (error, billingAgreement) {
        if (error) {
            console.log(error);
            throw error;
        } else {
            console.log("Billing Agreement Execute Response");
            console.log(JSON.stringify(billingAgreement));
        }
    });
  }

};