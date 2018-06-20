// This is the object to Create a Webhook Listener

// webhook listener URL
// This is the URL to attach your listener to that will be notified of events
const URL = 'https://paypal-node.herokuapp.com/webhook_listener';

module.exports = {
    "url": URL,
    // These are the types of events you want to be notified of.
    "event_types": [
        { "name": "BILLING.PLAN.CREATED" },
        { "name": "BILLING.PLAN.UPDATED" },
        { "name": "BILLING.SUBSCRIPTION.CANCELLED" },
        { "name": "BILLING.SUBSCRIPTION.CREATED" },
        { "name": "BILLING.SUBSCRIPTION.RE-ACTIVATED" },
        { "name": "BILLING.SUBSCRIPTION.SUSPENDED" },
        { "name": "BILLING.SUBSCRIPTION.UPDATED" },
        { "name": "PAYMENT.AUTHORIZATION.CREATED" },
        { "name": "PAYMENT.AUTHORIZATION.VOIDED" },
        { "name": "INVOICING.INVOICE.CANCELLED" },
        { "name": "INVOICING.INVOICE.CREATED" },
        { "name": "INVOICING.INVOICE.REFUNDED" },
        { "name": "INVOICING.INVOICE.SCHEDULED" },
        { "name": "INVOICING.INVOICE.UPDATED" },
        { "name": "INVOICING.INVOICE.PAID" },
    ]
};