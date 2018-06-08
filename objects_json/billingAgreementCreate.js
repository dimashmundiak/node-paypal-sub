module.exports = (billing_plan_id) => {
    var isoDate = new Date();
/*    isoDate.setSeconds(isoDate.getSeconds() + 4);
    isoDate.toISOString().slice(0, 19) + 'Z';*/

    // Subscription starts a day after
    var d = new Date(Date.now()+86400000);
    // var n = new Date(d);
    var n = d.toISOString();

    return billingAgreementAttributes = {
        "name": "Subscription Agreement",
        "description": "Agreement for SubscriptionPlan",
        "start_date": n,
        "plan": {
            "id": billing_plan_id
        },
        "payer": {
            "payment_method": "paypal"
        }
    };
};