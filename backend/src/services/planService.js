import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE = process.env.PAYPAL_BASE_URL;
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID;


export async function generateAccessToken() {
  const res = await axios({
    url: `${BASE}/v1/oauth2/token`,
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    auth: { username: CLIENT_ID, password: CLIENT_SECRET },
    data: "grant_type=client_credentials",
  });

  return res.data.access_token;
}

export async function createOrder(amount) {
  // console.log("amount typeof  "+  typeof amount)
  const token = await generateAccessToken();
  const res = await axios.post(
    `${BASE}/v2/checkout/orders`,
    {
      intent: "CAPTURE",
      purchase_units: [{ amount: { currency_code: "USD", value: amount } }],
      application_context: {
        return_url: "http://localhost:5173/payment/success?mode=orders",
        cancel_url: "http://localhost:5173/payment/cancel?mode=orders",
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        brand_name: 'planora.io'
      },
    },

    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data;
}

export async function capturePayment(orderId) {
  // console.log("capturepaymeet   ", orderId);
  const accessToken = await generateAccessToken()

  const response = await axios({
    url: BASE + `/v2/checkout/orders/${orderId}/capture`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  })

  return response.data
}

export async function verifyWebhookSignature(headers, rawBody) {
  const token = await generateAccessToken();
  let webhookEvent;
  try {
    webhookEvent = JSON.parse(rawBody.toString("utf8"));
  } catch (e) {
    console.error("Error parsing webhook raw body:", e);
    throw new Error("Invalid webhook body");
  }

  const res = await axios.post(
    `${BASE}/v1/notifications/verify-webhook-signature`,
    {
      auth_algo: headers["paypal-auth-algo"],
      cert_url: headers["paypal-cert-url"],
      transmission_id: headers["paypal-transmission-id"],
      transmission_sig: headers["paypal-transmission-sig"],
      transmission_time: headers["paypal-transmission-time"],
      webhook_id: WEBHOOK_ID,
      webhook_event: webhookEvent,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}



export async function allBillingPlansService() {
  const accessToken = await generateAccessToken()

  const response = await axios({
    url: BASE + `/v1/billing/plans?sort_by=create_time&sort_order=desc`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Prefer': 'return=representation'
    }
  })

  return response.data
}

export async function showBillingPlanDetailsService(productId) {
  const accessToken = await generateAccessToken()

  const response = await axios({
    url: BASE + `/v1/billing/plans/${productId}`,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })

  return response.data
}



export async function createBillingPlanService(plan) {
  const token = await generateAccessToken();

  const productRes = await axios({
    url: `${BASE}/v1/catalogs/products`,
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: {
      name: plan.name,
      description: plan.description,
      type: "SERVICE",
      category: "SOFTWARE",
      creditsPerMonth: plan.creditsPerMonth,
      planType: plan.planType,
    }
  });
  const productId = productRes.data.id;

  const res = await axios({
    url: `${BASE}/v1/billing/plans`,
    method: "post",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'PayPal-Request-Id': 'PLAN-18062019-001',
      'Prefer': 'return=representation'
    },
    data: JSON.stringify({
      "product_id": productId,
      "name": plan.name,
      "description": plan.description,
      "status": "ACTIVE",
      "creditsPerMonth": plan.creditsPerMonth,
      "billing_cycles": [
        {
          "frequency": {
            "interval_unit": "MONTH",
            "interval_count": 1
          },
          "tenure_type": "REGULAR",
          "sequence": 1,
          "total_cycles": 0,
          "pricing_scheme": {
            "fixed_price": {
              "currency_code": "USD",
              "value": plan.price
            }
          }
        }
      ],
      "payment_preferences": {
        "auto_bill_outstanding": true,
        "setup_fee": {
          "currency_code": "USD",
          "value": "0.00"
        },
        "setup_fee_failure_action": "CANCEL",
        "payment_failure_threshold": 3
      },
      "quantity_supported": false
    })
  });
  return res.data;
}

export async function createPlanSubscriptionService(planId) {
  const token = await generateAccessToken();
  const body = {
    plan_id: planId,
    application_context: {
      brand_name: "planora.io",
      user_action: "SUBSCRIBE_NOW",
      return_url: "http://localhost:5173/payment/success?mode=subscriptions",
      cancel_url: "http://localhost:5173/payment/cancel?mode=subscriptions",
      shipping_preference: 'NO_SHIPPING',
    },
  };

  const res = await axios.post(
    `${BASE}/v1/billing/subscriptions`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );


  return res.data;
}


export async function deactivatePlanService(planId) {
  const token = await generateAccessToken();

  const res = await axios({
    url: `${BASE}v1/billing/plans/${planId}/deactivate`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    data: {}
  })
}


export async function listSubscriptionService(body) {
  const token = await generateAccessToken();

  const res = axios({
    url: `${BASE}/v1/billing/subscriptions`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    data: JSON.stringify({
      "plan_id": body.plan_id,
      "start_time": body.start_time,
      "quantity": "1",
      "shipping_amount": {
        "currency_code": "USD",
        "value": body.price
      },
      "subscriber": {
        // "name": {
        //   "given_name": "John",
        //   "surname": "Doe"
        // },
        // "email_address": "customer@example.com",
        "shipping_address": {
          "name": {
            // "full_name": "John Doe"
            "username": body.username
          },
          // "address": {
          //   "address_line_1": "2211 N First Street",
          //   "address_line_2": "Building 17",
          //   "admin_area_2": "San Jose",
          //   "admin_area_1": "CA",
          //   "postal_code": "95131",
          //   "country_code": "US"
          // }
        }
      },
      "application_context": {
        "brand_name": "planora",
        "locale": "en-US",
        "shipping_preference": "SET_PROVIDED_ADDRESS",
        "user_action": "SUBSCRIBE_NOW",
        "payment_method": {
          "payer_selected": "PAYPAL",
          "payee_preferred": "IMMEDIATE_PAYMENT_REQUIRED"
        },
        "return_url": "https://localhost:5173/subscription/returnUrl",
        "cancel_url": "https://localhost:5173/subscription/cancelUrl"
      }
    })
  })

  return res.data;
}







// refund 
export async function getOrderDetails(orderId) {
  const token = await generateAccessToken();
  const orderRes = await axios({
    method: "get",
    url: `${BASE}/v2/checkout/orders/${orderId}`,
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const captureId = orderRes?.data.purchase_units[0].payments.captures[0].id;
  return captureId;
}

export async function RefuldTheCapture(captureId, price) {
  const token = await generateAccessToken();

  const refundRes = await axios({
      method: "post",
      url: `${BASE}/v2/payments/captures/${captureId}/refund`,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      data: {
        amount: { value: price, currency_code: "USD" },
        note_to_payer: "Refund by order ID"
      }
    });
}