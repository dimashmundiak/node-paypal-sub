const paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AURg6NmIC2HFvKhFt-ov9oEaeDZWKj_o23sOg67rUKOwr51md1oTuny-AH3tu5HebLg2jCSCh6a-uHqD',
  'client_secret': 'EIhUT1ssc9YxvHevYmb0tv-o7V4fiisClKDHSljBcIulqCveWLR9xgfcd_TEP-xa2-m2_3QgHKVME1Mh'
});

// JSON Object for holding the plan creation's information

let plan_name = "Subscription";
let plan_description = "Subscription to the Desired Plan";

// ideally the plan's amount will be gotten from the form
let plan_amount = 40;
let plan_cycle = 0;
let plan_type = "REGULAR" // REGULAR/TRIAL
let payment_defintion_type = "INFINITE" // INFINITE/FIXED

let cancel_url = "https://127.0.0.1/billing/cancel";
let return_url = "https://127.0.0.1/billing/success";

let billingPlanMonthly = {
  "description": plan_description,
  "merchant_preferences": {
        "auto_bill_amount": "yes",
        "cancel_url": cancel_url,
        "initial_fail_amount_action": "continue",
        "max_fail_attempts": "1",
        "return_url": return_url,
    },
    "name": plan_name,
    "payment_definitions": [
        {
            "amount": {
                "currency": "GBP",
                "value": "30",
            },
            "cycles": "0",
            "frequency": "MONTH",
            "frequency_interval": "1",
            "name": "Monthly 1",
            "type": "REGULAR"
        },
        {
            "amount": {
                "currency": "GBP",
                "value": "0"
            },
            "cycles": "2",
            "frequency": "WEEK",
            "frequency_interval": "1",
            "name": "Trial 1",
            "type": "TRIAL"
        }
    ],
    "type": payment_defintion_type
}

let billingPlanYearly = {
  "description": plan_description,
  "merchant_preferences": {
        "auto_bill_amount": "yes",
        "cancel_url": cancel_url,
        "initial_fail_amount_action": "continue",
        "max_fail_attempts": "1",
        "return_url": return_url,
    },
    "name": plan_name,
    "payment_definitions": [
        {
            "amount": {
                "currency": "GBP",
                "value": "306",
            },
            "cycles": "0",
            "frequency": "YEAR",
            "frequency_interval": "1",
            "name": "Yearly",
            "type": "REGULAR"
        },
        {
            "amount": {
                "currency": "GBP",
                "value": "0"
            },
            "cycles": "2",
            "frequency": "WEEK",
            "frequency_interval": "1",
            "name": "Trial 1",
            "type": "TRIAL"
        }
    ],
    "type": payment_defintion_type
}

module.exports = {
  "billingPlanMonthly": billingPlanMonthly,
  "billingPlanYearly": billingPlanYearly
}

paypal.billingPlan.create(billingPlanMonthly, (err, billingPlan) => {
        if (err) throw err;
        else {
            console.log(billingPlan);
            
        }
    });