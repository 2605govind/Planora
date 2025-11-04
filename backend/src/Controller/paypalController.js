import Plan from "../Model/Plan.js";
import User from "../Model/User.js";
import Transaction from "../Model/Transaction.js";
import { capturePayment, createOrder, verifyWebhookSignature } from "../services/planService.js";
import Refund from "../Model/Refund.js";

export const createPayPalOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planId } = req.body;


    const plan = await Plan.findByPk(planId);
    if (!plan) return res.status(404).json({ error: "Plan not found" });

    const order = await createOrder(plan.price);

    await Transaction.create({
      userId,
      planId,
      amount: plan.price,
      status: "PENDING",
      paypalOrderId: order.id,
      paymentMethod: 'orders'
    });

    res.json({ id: order.id, links: order.links });
  } catch (err) {
    console.error("Create Order Error:", err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
};



export const cancelPayPalOrder = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: "Missing token in query parameters." });
    }

    // Delete pending transaction with this PayPal order ID
    const tran = await Transaction.findOne({
      where: { paypalOrderId: token, status: "PENDING" },
    });

    if (!tran) {
      return res.status(404).json({
        message: "No pending transaction found for this token.",
      });
    }

    tran.status = "FAILED";
    await tran.save();


    res.json({
      message: "Payment cancelled and pending transaction FAILED.",
      token,
    });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({ error: "Error processing cancellation." });
  }
};


export const completePayPalOrder = async (req, res) => {
  try {
    const response = await capturePayment(req.query.token)

    res.json({ message: 'Purchased successfully', data: response });
  } catch (error) {
    res.send('Error: ' + error)
  }
};



export const handlePayPalWebhook = async (req, res) => {
  try {

    console.log("webhook chal rha hu ")
    const rawBody = req.body;

    // verify karo
    const verify = await verifyWebhookSignature(req.headers, rawBody);

    if (verify.verification_status !== "SUCCESS") {
      console.log("Invalid webhook signature");
      return res.sendStatus(400);
    }

    // ab webhook event parse karo
    const body = JSON.parse(rawBody.toString("utf8"));
    const { event_type, resource } = body;

    // console.log("meri body ", body );

    if (event_type === "CHECKOUT.ORDER.APPROVED" || event_type === "BILLING.SUBSCRIPTION.ACTIVATED") {
      const orderId = resource.id;
      const payerEmail = resource?.payer?.email_address;

      const transaction = await Transaction.findOne({ where: { paypalOrderId: orderId } });

      if (!transaction) {
        console.log("Transaction not found:", orderId);
        return res.sendStatus(404);
      }

      transaction.status = "COMPLETED";
      await transaction.save();

      const user = await User.findByPk(transaction.userId);
      const plan = await Plan.findByPk(transaction.planId);

      if (user && plan) {
        user.plan = plan.name;
        user.balance = plan.creditsPerMonth;
        // user.plan_start_date = Date.now();
        await user.save();
      }

      const pendingtransactions = await Transaction.destroy({
        where: { userId: user.id, status: 'PENDING' }
      });

      console.log(`webhook ${payerEmail} upgraded to ${plan.name}`);
    }else if(event_type === "PAYMENT.CAPTURE.COMPLETED") {
      // handle capture id
      const orderId = resource.supplementary_data.related_ids.order_id;
 
      const transaction = await Transaction.findOne({ where: { paypalOrderId: orderId } });
      // console.log("resource.id", resource.id)
      if(transaction) {
        transaction.OrderCapturesId = resource.id;
        await transaction.save();
      }

      // console.log("transaction", transaction)
      console.log("BILLING.SUBSCRIPTION.ACTIVATED govind")
    }else if(event_type === "PAYMENT.CAPTURE.REFUNDED") {
      const orderId = resource.invoice_id;

      const refundReq = await Refund.findOne({ where: { orderId: orderId } });

      if (!refundReq) {
        console.log("refundReq not found:", orderId);
        return res.sendStatus(404);
      }

      refundReq.status = "COMPLETED";
      await refundReq.save();

      const user = await User.findByPk(refundReq.userId);
      // const plan = await Plan.findByPk(refundReq.planId);

      if (user ) {
        user.plan = "FREE";
        user.balance = 0;
        user.plan_start_date = Date.now();
        await user.save();
      }
    }
   
    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook Error:", err.response?.data || err.message);
    res.sendStatus(500);
  }
};



