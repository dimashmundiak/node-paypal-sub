
// Merchant Info: Seller's Info
let merchant_info = {
    "email": "soheqy-facilitator@duck2.club",
    "first_name": "Jamie",
    "last_name": "Curtis",
    "business_name": "Curtis' Bakery",
    "phone": {
        "country_code": "44",
        "national_number": "7441900399 "
    },
    "address": {
        "line1": "64 London Rd.",
        "city": "Southampton",
        "postal_code": "SO15 4AN",
        "country_code": "GB"
    }
};
let note = "Curtis' Bakery voice 16 Jul, 2013 PST";

// Billing Info: ideally gotten from the POST Params
let billing_email = 'soheqy-buyer@duck2.club';
let shipping_info = {
    "first_name": "Sally",
    "last_name": "Patient",
    "business_name": "Not applicable",
    "phone": {
        "country_code": "44",
        "national_number": "7039871234"
    },
    "address": {
        "line1": "1234 Broad St.",
        "city": "Southampton",
        "postal_code": "SO44 2AN",
        "country_code": "GB"
    }
};


// INVOICE OBJECT
module.exports = {
    "merchant_info": merchant_info,
    "billing_info": [{
        "email": billing_email
    }],
    "items": [{
        "name": "Red Velvet Cupcakes",
        "quantity": 6,
        "unit_price": {
            "currency": "GBP",
            "value": 5
        }
    }],
    "note": note,
    "payment_term": {
        "term_type": "NET_45"
    },
    "shipping_info": shipping_info,
    "tax_inclusive": false,
    "total_amount": {
        "currency": "GBP",
        "value": "30.00"
    }
};