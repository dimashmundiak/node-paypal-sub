// JSON Object for holding the plan creation's information

let plan_name = "Subscription";
let plan_description = "Subscription to the Desired Plan";

// ideally the plan's amount will be gotten from the form
let plan_amount = 40;
let plan_cycle = 0;
let plan_type = "REGULAR" // REGULAR/TRIAL
let payment_defintion_type = "INFINITE" // INFINITE/FIXED

let cancel_url = "https://paypal-node.herokuapp.com/billing/cancel";
let return_url = "https://paypal-node.herokuapp.com/billing/success";

let billingPlanTrial = {
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
                "currency": "USD",
                "value": "0"
            },
            "cycles": "1",
            "frequency": "DAY",
            "frequency_interval": "1",
            "name": "Trial",
            "type": "REGULAR"
        }
    ],
    "type": "FIXED"
}

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
                "currency": "USD",
                "value": "0"
            },
            "cycles": "2",
            "frequency": "WEEK",
            "frequency_interval": "1",
            "name": "Trial 1",
            "type": "REGULAR"
        }
    ],
    "type": payment_defintion_type
};

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
};

module.exports = {
    "billingPlanMonthly": billingPlanMonthly,
    "billingPlanYearly": billingPlanYearly,
    "billingPlanTrial": billingPlanTrial
};