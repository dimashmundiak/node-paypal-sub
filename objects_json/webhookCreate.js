// export the object that becomes the webhook JSON to be submitted

// webhook listener URL
const URL = 'https://127.0.0.1/webhook_listener';

module.exports = {
    "url": URL,
    "event_types": [
        {"name": "BILLING.PLAN.CREATED"},
        {"name": "BILLING.PLAN.UPDATED"},
        {"name": "BILLING.SUBSCRIPTION.CANCELLED"},
        {"name": "BILLING.SUBSCRIPTION.CREATED"},
        {"name": "BILLING.SUBSCRIPTION.RE-ACTIVATED"},
        {"name": "BILLING.SUBSCRIPTION.SUSPENDED"},
        {"name": "BILLING.SUBSCRIPTION.UPDATED"},
        {"name": "PAYMENT.AUTHORIZATION.CREATED"},
        {"name": "PAYMENT.AUTHORIZATION.VOIDED"},
        {"name": "INVOICING.INVOICE.CANCELLED"},
        {"name": "INVOICING.INVOICE.CREATED"},
        {"name": "INVOICING.INVOICE.REFUNDED"},
        {"name": "INVOICING.INVOICE.SCHEDULED"},
        {"name": "INVOICING.INVOICE.UPDATED"},
        {"name": "INVOICING.INVOICE.PAID"},
    ]
};